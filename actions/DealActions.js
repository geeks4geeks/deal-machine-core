import {
  RESET_ACTIVITY,
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  GET_DEALS,

  GET_DEALS_FAIL,
  GET_DEALS_SUCCESS,
  GET_DEALS_SUCCESS_REPLACE,
  GET_MAP_DEALS,
  GET_MAP_DEALS_SUCCESS,
  SET_ACTIVE_DEAL,
  GET_MAIN_PLANS_SUCCESS,
  SEARCH_CHANGED,
  EDIT_SEARCH_CHANGED,
  FILTER_CHANGED,
  REFRESH_DEALS,
  LOAD_MORE_DEALS,
  TOGGLE_DEALS_OPTIONS,
  NEW_DEAL,
  NEW_DEAL_FAIL,
  NEW_DEAL_SUCCESS,
  INIT_EDIT_FILTERS,
  EDIT_FILTER,
  SAVE_FILTERS,
  CLEAR_FILTER,
  CLEAR_ALL_FILTERS,
  SELECT_DEAL,
  DESELECT_DEAL,
  SELECT_ALL_DEALS,
  DESELECT_ALL_DEALS,
  INIT_EDIT_DEALS,
  EDIT_DEALS,
  SAVE_EDIT_DEALS,
  SAVE_EDIT_DEALS_FAIL,
  SAVE_EDIT_DEALS_SUCCESS,
  SAVE_EDIT_DEALS_SUCCESS_DELETE,
  PHOTO_BUTTON_TOGGLE,
  INIT_HOUSE,
  RELOAD_DEALS,
  SET_TRACKING_EVENT,
  TRIGGER_LOOKUP,
  VALID_ADDRESS,
  TOGGLE_INVALID_ADDRESS,
  SET_DEAL_SCROLL_POSITION,
  INVALID_NEW_DEAL_ADDRESS,
  VALID_ADDRESS_FAIL,
  REDRAW_MARKERS,
  TOGGLE_REGION_CHANGE,
  GET_TOTAL_PURCHASE_AMOUNT
} from "app/DealMachineCore/types";

import { appRedirect } from "app/NativeActions";
import { getActivity, resetActivity } from "app/NativeActions";

import { store } from "app/store";

import API from "app/DealMachineCore/apis/DealMachineAPI";

import PrivateAPI from "app/DealMachineCore/apis/DealMachinePrivateAPI";
import APIV2 from "app/DealMachineCore/apis/DealMachineAPIV2";

const dm_private_api = PrivateAPI.create();
const api = API.create();
const apiv2 = APIV2.create();

export const reloadDeals = () => {
  return {
    type: RELOAD_DEALS
  };
};

export const photoButtonToggle = toggle => {
  return {
    type: PHOTO_BUTTON_TOGGLE,
    payload: toggle
  };
};
export const editSearchChanged = editSearch => {
  return {
    type: EDIT_SEARCH_CHANGED,
    payload: editSearch
  };
};
export const searchChanged = search => {
  return {
    type: SEARCH_CHANGED,
    payload: search
  };
};
export const toggleDealsOptions = toggle => {
  return {
    type: TOGGLE_DEALS_OPTIONS,
    payload: toggle
  };
};

export const filterChanged = ({ filter, filter_title }) => {
  return {
    type: FILTER_CHANGED,
    payload: { filter, filter_title }
  };
};

export const getDeals = ({
  token,
  search = "",
  filters,
  begin = 0,
  limit = 25,
  load_type,
  bounds = {},
  dont_include = null
}) => {
  return dispatch => {
    switch (load_type) {
      default:
        dispatch({ type: GET_DEALS });
        dispatch({ type: SET_TRACKING_EVENT, payload: "getDeals" });

        break;

      case "refresh":
        dispatch({ type: REFRESH_DEALS });
        dispatch({ type: SET_TRACKING_EVENT, payload: "refreshDeals" });

        break;

      case "load_more":
        dispatch({ type: LOAD_MORE_DEALS });
        dispatch({ type: SET_TRACKING_EVENT, payload: "loadMoreDeals" });

        break;

      case "map_refresh":
        dispatch({ type: REFRESH_DEALS });
        dispatch({ type: SET_TRACKING_EVENT, payload: "getMapRefreshDeals" });
        break;

      case "map":
        dispatch({ type: GET_MAP_DEALS });
        dispatch({ type: SET_TRACKING_EVENT, payload: "getMapDeals" });
        break;
    }

    api
      .deals({
        token,
        search,
        filters,
        begin,
        limit,
        bounds,
        type: load_type,
        dont_include
      })
      .then(response => {
        if (response.problem != null) {
          getDealsFail(dispatch, response.problem);
        } else if (response.data.error != false) {
          getDealsFail(dispatch, response.data.error);

          if (response.data.valid == "invalid") {
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          getDealsSuccess(
            dispatch,
            load_type,
            response.data.results.deals,
            response.data.results.deals_count,
            response.data.results.badges,
            response.data.results.all_tags,
            response.data.results.all_statuses,
            bounds
          );
        }
      });
  };
};

const getDealsFail = (dispatch, error) => {
  dispatch({ type: GET_DEALS_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getDealsFail" });
};

const getDealsSuccess = (
  dispatch,
  load_type,
  deals,
  deals_count,
  badges,
  all_tags,
  all_statuses,
  bounds
) => {
  switch (load_type) {
    default:
    case "refresh":
      dispatch({
        type: GET_DEALS_SUCCESS_REPLACE,
        payload: { deals, deals_count, badges, all_tags, all_statuses }
      });
      dispatch({ type: SET_TRACKING_EVENT, payload: "getDealsSuccess" });

      break;

    case "load_more":
      dispatch({
        type: GET_DEALS_SUCCESS,
        payload: { deals, deals_count, badges, all_tags, all_statuses }
      });
      dispatch({ type: SET_TRACKING_EVENT, payload: "loadMoreDealsSuccess" });

      break;

    case "map":
      dispatch({
        type: GET_MAP_DEALS_SUCCESS,
        payload: { deals, deals_count, all_tags, all_statuses, bounds }
      });
      dispatch({ type: SET_TRACKING_EVENT, payload: "getMapDealsSuccess" });

      break;
  }
};

export const newDeal = ({
  use_anyway,
  dispatch,
  token,
  image,
  lat,
  long,
  address,
  address1,
  address2,
  city,
  state,
  zip,
  type,
  property
}) => {
  if (dispatch) {
    validateAddress({
      dispatch,
      token,
      image,
      lat,
      long,
      address,
      address1,
      address2,
      city,
      state,
      zip,
      type
    });
  } else {
    return dispatch => {
      if (use_anyway || property) {
        executeNewDeal({
          dispatch,
          token,
          image,
          lat,
          long,
          address,
          address1,
          address2,
          city,
          state,
          zip,
          type,
          property
        });
      } else {
        validateAddress({
          dispatch,
          token,
          image,
          lat,
          long,
          address,
          address1,
          address2,
          city,
          state,
          zip,
          type
        });
      }
    };
  }
};

const validateAddress = ({
  dispatch,
  token,
  image,
  lat,
  long,
  address,
  address1,
  address2,
  city,
  state,
  zip,
  type
}) => {
  dispatch({ type: IS_LOADING, payload: true });

  dm_private_api
    .validateAddress(token, address1, address2, city, state, zip)
    .then(response => {
      if (response.problem != null) {
        validAddressFail(dispatch, response.problem);
      } else if (response.data.error != false) {
        validAddressFail(dispatch, response.data.error);
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else if (response.data.results.success == false) {
        dispatch({ type: IS_LOADING, payload: false });
        dispatch({ type: TOGGLE_INVALID_ADDRESS, payload: true });
        dispatch({
          type: VALID_ADDRESS,
          payload: response.data.results.formatted_address
        });
      } else {
        executeNewDeal({
          dispatch,
          token,
          image,
          lat,
          long,
          address,
          address1,
          address2,
          city,
          state,
          zip,
          type
        });
      }
    });
};

export const executeNewDeal = ({
  dispatch,
  token,
  image,
  lat,
  long,
  address,
  address1,
  address2,
  city,
  state,
  zip,
  type,
  property
}) => {
  if (!property || property == null) {
    dispatch({ type: IS_LOADING, payload: true });
  }

  dispatch({ type: NEW_DEAL, payload: { property } });
  dispatch({ type: SET_TRACKING_EVENT, payload: "newDeal" });

  api
    .newDeal(
      token,
      image,
      lat,
      long,
      address,
      address1,
      address2,
      city,
      state,
      zip,
      property
    )
    .then(response => {
      if (response.problem != null) {
        newDealFail(dispatch, response.problem, property);
      } else if (response.data.error != false) {
        newDealFail(dispatch, response.data.error, property);
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        newDealSuccess(
          dispatch,
          token,
          response.data.results.deal,
          response.data.results.badges,
          response.data.results.all_tags,
          response.data.results.all_statuses,
          type,
          property
        );
      }
    });
};

const newDealFail = (dispatch, error, property) => {
  dispatch({
    type: NEW_DEAL_FAIL,
    payload: {
      error,
      property
    }
  });

  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "newDealFail" });
};

const newDealSuccess = (
  dispatch,
  token,
  deal,
  badges,
  all_tags,
  all_statuses,
  type,
  property
) => {
  dispatch({ type: IS_LOADING, payload: false });

  //set active deal for map
  dispatch({
    type: NEW_DEAL_SUCCESS,
    payload: { deal, badges, all_tags, all_statuses, property }
  });

  dispatch({
    type: RESET_ACTIVITY
  });

  dispatch({
    type: INIT_HOUSE,
    payload: {
      info: deal,
      owner: {
        owner_name: deal.owner_name,
        owner_address: deal.owner_address,
        owner_address2: deal.owner_address2,
        owner_address_city: deal.owner_address_city,
        owner_address_state: deal.owner_address_state,
        owner_address_zip: deal.owner_address_zip,
        use_owner_address: deal.use_owner_address
      },
      tags: deal.tags,
      more_info: deal.more_info ? deal.more_info : null,
      other_possible_matches: deal.other_possible_matches
    }
  });

  //look up owner

  switch (type) {
    case "manual":
      dispatch({
        type: SET_TRACKING_EVENT,
        payload: "mapManualNewDealSuccess"
      });
      appRedirect({ dispatch, redirect: "goBack", payload: { type: "deals" } });

      dispatch({
        type: SET_ACTIVE_DEAL,
        payload: { deal }
      });
      dispatch({
        type: TRIGGER_LOOKUP,
        payload: true
      });
      dispatch({
        type: TOGGLE_REGION_CHANGE,
        payload: true
      });

      break;

    default:
    case "map":
      //look up owner
      const activeProperty = store.getState().property.activeProperty;
      if (activeProperty) {
        if (deal.property_address_mak == activeProperty.property_address_mak) {
          dispatch({
            type: SET_ACTIVE_DEAL,
            payload: { deal }
          });
        }
      }

      if (!property || property == null) {
        dispatch({ type: TRIGGER_LOOKUP, payload: true });
      }

      dispatch({ type: SET_TRACKING_EVENT, payload: "mapNewDealSuccess" });

      break;
  }

  /*
  appRedirect({dispatch, redirect: "dashboard"})
  setTimeout(function(){
    appRedirect({dispatch, redirect: "new_deal", payload:{deal: deal, id: deal.id}})
  }, 10);
  */
};

export const initEditFilters = () => {
  return {
    type: INIT_EDIT_FILTERS
  };
};

export const saveFilters = () => {
  return {
    type: SAVE_FILTERS
  };
};

export const editFilter = ({ prop, value }) => {
  return {
    type: EDIT_FILTER,
    payload: { prop, value }
  };
};

export const clearAllFilters = () => {
  return {
    type: CLEAR_ALL_FILTERS
  };
};

export const clearFilter = filter => {
  return {
    type: CLEAR_FILTER,
    payload: filter
  };
};

export const selectDeal = deal => {
  return {
    type: SELECT_DEAL,
    payload: deal
  };
};

export const deselectDeal = deal => {
  return {
    type: DESELECT_DEAL,
    payload: deal
  };
};

export const selectAllDeals = () => {
  return {
    type: SELECT_ALL_DEALS
  };
};
export const deselectAllDeals = () => {
  return {
    type: DESELECT_ALL_DEALS
  };
};

export const initEditDeals = () => {
  return {
    type: INIT_EDIT_DEALS
  };
};

export const editDeals = ({ prop_group, prop, value }) => {
  return {
    type: EDIT_DEALS,
    payload: { prop_group, prop, value }
  };
};

export const getTotalPurchaseAmount = (
  dealEdits,
  selected_deals,
  deals_count,
  select_all_deals
) => {
  var total_purchase_amount = 0;
  if (dealEdits.approve.toggled) {
    //add all items for sending mail
    if (select_all_deals) {
      total_purchase_amount = parseInt(deals_count) + total_purchase_amount;
    } else {
      total_purchase_amount =
        parseInt(selected_deals.length) + total_purchase_amount;
    }
  }

  if (dealEdits.enhanced_search.toggled) {
    //add all items for enhanced searching
    if (select_all_deals) {
      total_purchase_amount = parseInt(deals_count) + total_purchase_amount;
    } else {
      total_purchase_amount =
        parseInt(selected_deals.length) + total_purchase_amount;
    }
  }
  return {
    type: GET_TOTAL_PURCHASE_AMOUNT,
    payload: total_purchase_amount
  };
};

export const saveEditDeals = ({ token, type = "bulk_edit", payload }) => {
  return dispatch => {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: SAVE_EDIT_DEALS });

    dispatch({ type: SET_TRACKING_EVENT, payload: "saveEditDeals" });

    api.editDeal(token, null, type, payload).then(response => {
      if (response.problem != null) {
        saveEditDealsFail(dispatch, response.problem);
      } else if (response.data.error != false) {
        saveEditDealsFail(dispatch, response.data.error);
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        saveEditDealsSuccess(
          dispatch,
          payload,
          response.data.results.deals,
          response.data.results.change_log
        );
      }
    });
  };
};

const saveEditDealsFail = (dispatch, error) => {
  dispatch({ type: SAVE_EDIT_DEALS_FAIL, payload: error });

  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "saveEditDealsFail" });
};

const saveEditDealsSuccess = (dispatch, payload, deals, change_log) => {
  //if bulk edit includes an enhanced search
  if (payload.edits.enhanced_search == 1) {
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: {
        message:
          "You've successfully edited all of the selected deals. Enhanced Search edits will take a couple minutes to complete.",
        title: "Success!",
        change_log: change_log
      }
    });
  } else {
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: {
        message: "You've successfully edited all of the selected deals.",
        title: "Success!",
        change_log: change_log
      }
    });
  }

  //handle Permanently deleting multiple deals
  if (
    payload.edits.edit_status == 1 &&
    payload.edits.status == "delete_deals"
  ) {
    dispatch({
      type: SAVE_EDIT_DEALS_SUCCESS_DELETE,
      payload: { deals }
    });
  } else {
    dispatch({
      type: SAVE_EDIT_DEALS_SUCCESS,
      payload: { deals }
    });

    dispatch({
      type: REDRAW_MARKERS,
      payload: deals
        .map(deal => {
          return deal.id;
        })
        .join()
    });
  }

  dispatch({
    type: REDRAW_MARKERS,
    payload: deals
      .map(deal => {
        return deal.id;
      })
      .join()
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "saveEditDealsSuccess" });

  appRedirect({
    dispatch,
    redirect: "goBack",
    payload: { type: "deals", toggle: payload.redirect }
  });
};

export const setActiveDeal = deal => {
  return {
    type: SET_ACTIVE_DEAL,
    payload: { deal }
  };
};

export const setDealScrollPosition = deal_scroll_id => {
  return {
    type: SET_DEAL_SCROLL_POSITION,
    payload: deal_scroll_id
  };
};

const validAddressFail = (dispatch, error) => {
  dispatch({ type: VALID_ADDRESS_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "validAddressFail" });
};
