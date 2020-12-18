import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  GET_CAMPAIGNS,
  REFRESH_CAMPAIGNS,
  GET_CAMPAIGNS_FAIL,
  GET_CAMPAIGNS_SUCCESS,
  GET_CAMPAIGN,
  GET_CAMPAIGN_FAIL,
  GET_CAMPAIGN_SUCCESS,
  CAMPAIGN_INIT,
  CAMPAIGN_RESET,
  CAMPAIGN_FIELD_CHANGED,
  SAVE_CAMPAIGN,
  SAVE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_SUCCESS,
  SAVE_CAMPAIGN_FAIL,
  DELETE_CAMPAIGN,
  ADD_CAMPAIGN_STEP,
  REMOVE_CAMPAIGN_STEP,
  EDIT_CAMPAIGN_STEP,
  REINDEX_CAMPAIGN_STEPS,
  SET_TRACKING_EVENT
} from "app/DealMachineCore/types";

import { appRedirect } from "app/NativeActions";

import API from "app/DealMachineCore/apis/DealMachineAPI";
const api = API.create();

export const getCampaigns = ({ token, type, campaign_id = null }) => {
  return dispatch => {
    switch (type) {
      case "campaign":
        dispatch({ type: GET_CAMPAIGN });
        dispatch({ type: SET_TRACKING_EVENT, payload: "getCampaigns" });

        break;

      case "refresh":
        dispatch({ type: REFRESH_CAMPAIGNS });
        dispatch({ type: SET_TRACKING_EVENT, payload: "refreshCampaigns" });

        break;

      case "load":
      default:
        dispatch({ type: GET_CAMPAIGNS });
        dispatch({ type: SET_TRACKING_EVENT, payload: "loadCampaigns" });

        break;
    }

    api.campaigns(token, campaign_id).then(response => {
      if (response.problem != null) {
        getCampaignsFail(dispatch, response.problem);
      } else if (response.data.error != false) {
        getCampaignsFail(dispatch, response.data.error);
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        if (type != "campaign") {
          getCampaignsSuccess(dispatch, response.data.results.campaigns);
        } else {
          if (response.data.results.campaigns.length > 0) {
            dispatch({
              type: GET_CAMPAIGN_SUCCESS,
              payload: { campaign: response.data.results.campaigns[0] }
            });
          }
        }
      }
    });
  };
};

const getCampaignsFail = (dispatch, error) => {
  dispatch({ type: GET_CAMPAIGNS_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getCampaignsFail" });
};

const getCampaignsSuccess = (dispatch, campaigns) => {
  dispatch({
    type: GET_CAMPAIGNS_SUCCESS,
    payload: { campaigns }
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getCampaignsSuccess" });
};

export const campaignInit = ({ campaign }) => {
  return {
    type: CAMPAIGN_INIT,
    payload: { campaign }
  };
};

export const campaignReset = () => {
  return {
    type: CAMPAIGN_RESET
  };
};

export const campaignFieldChanged = ({ prop, value }) => {
  return {
    type: CAMPAIGN_FIELD_CHANGED,
    payload: { prop, value }
  };
};

export const saveCampaign = ({ token, campaign_id, type, payload }) => {
  return dispatch => {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: SAVE_CAMPAIGN });
    dispatch({ type: SET_TRACKING_EVENT, payload: "saveCampaign" });

    api.saveCampaign(token, campaign_id, type, payload).then(response => {
      if (response.problem != null) {
        saveCampaignFail(dispatch, response.problem);
      } else if (response.data.error != false) {
        saveCampaignFail(dispatch, response.data.error);
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        if (response.data.results.campaigns) {
          if (type == "delete") {
            deleteCampaignSuccess(dispatch, campaign_id);
          } else if (type == "update") {
            saveCampaignSuccess(dispatch, response.data.results.campaigns[0]);
          } else if (type == "create" || type == "duplicate") {
            createCampaignSuccess(
              dispatch,
              response.data.results.campaigns,
              type
            );
          } else {
            dispatch({ type: IS_LOADING, payload: false });
          }
        } else {
          saveCampaignFail(dispatch, "Something went wrong. Please try again.");
        }
      }
    });
  };
};

const saveCampaignFail = (dispatch, error) => {
  dispatch({ type: SAVE_CAMPAIGN_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "saveCampaignFail" });
};
const deleteCampaignSuccess = (dispatch, campaign_id) => {
  dispatch({ type: IS_LOADING, payload: false });
  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {
      message: "Your campaign was successfully deleted",
      title: "Success!"
    }
  });

  dispatch({
    type: DELETE_CAMPAIGN,
    payload: { campaign_id }
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "deleteCampaignSuccess" });

  appRedirect({ dispatch, redirect: "goBack", payload: { type: "campaigns" } });
};
const createCampaignSuccess = (dispatch, campaigns, type) => {
  dispatch({ type: IS_LOADING, payload: false });
  dispatch({
    type: CREATE_CAMPAIGN_SUCCESS,
    payload: { campaigns }
  });
  if (type == "create") {
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: {
        message: "Your campaign was successfully created!",
        title: "Success!"
      }
    });
  } else if (type == "duplicate") {
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: {
        message: "Your mail campaign was successfully copied!",
        title: "Success!"
      }
    });
  }

  dispatch({ type: SET_TRACKING_EVENT, payload: "createCampaignSuccess" });

  appRedirect({ dispatch, redirect: "goBack", payload: { type: "campaigns" } });
};
const saveCampaignSuccess = (dispatch, campaign) => {
  dispatch({
    type: SAVE_CAMPAIGN_SUCCESS,
    payload: { campaign }
  });

  dispatch({ type: IS_LOADING, payload: false });

  dispatch({
    type: SUCCESS_MESSAGE,
    payload: { message: "Your campaign has been saved.", title: "Success!" }
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "saveCampaignSuccess" });

  appRedirect({ dispatch, redirect: "goBack", payload: { type: "campaigns" } });
};

export const addCampaignStep = ({ step }) => {
  return {
    type: ADD_CAMPAIGN_STEP,
    payload: { step }
  };
};

export const removeCampaignStep = ({ step }) => {
  return dispatch => {
    dispatch({
      type: REMOVE_CAMPAIGN_STEP,
      payload: { step_id: step.id, step_index: step.index }
    });

    dispatch({
      type: REINDEX_CAMPAIGN_STEPS
    });
  };
};

export const editCampaignStep = ({ id, index, prop, value }) => {
  return {
    type: EDIT_CAMPAIGN_STEP,
    payload: { id, index, prop, value }
  };
};
