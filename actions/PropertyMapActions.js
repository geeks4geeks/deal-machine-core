import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,

  GET_MAP_PROPERTIES,
  REFRESH_MAP_PROPERTIES,
  GET_MAP_PROPERTIES_SUCCESS,
  GET_MAP_PROPERTIES_FAIL,

  UPDATE_MAP_LOCATION,
  SELECT_ACTIVE_PROPERTY,

  GET_MAP_REVERSE_GEOCODE,
  GET_MAP_REVERSE_GEOCODE_SUCCESS,
  GET_MAP_REVERSE_GEOCODE_FAIL,

  GET_AUTOCOMPLETE,
  GET_AUTOCOMPLETE_FAIL,
  GET_AUTOCOMPLETE_SUCCESS,
  CLEAR_AUTOCOMPLETE,

  ADD_DEAL,
  ADD_DEAL_FAIL,
  ADD_DEAL_SUCCESS,

  TOGGLE_TAP_TO_ADD,
  SWITCH_MAP_MODE,

  SET_LAST_LOCATION,
  FOCUS_SEARCH_BAR,

  HIDE_PROPERTY_LIST
} from 'app/DealMachineCore/types';


import { appRedirect } from 'app/NativeActions';

import api from 'app/DealMachineCore/apis/DealMachineAPIV2';
const dm_api = api.create();

export const getMapProperties = ({ token, load_type, bounds, limit, dont_include_properties, dont_include_deals, dont_include_route_sections, map_type = "map", filters = {}, route_id = null }) => {
  return (dispatch) => {

    switch(load_type){
      default:
        dispatch({ type: GET_MAP_PROPERTIES });
      break;

      case "refresh":
        dispatch({ type: REFRESH_MAP_PROPERTIES });
      break;
    }
    dm_api.mapProperties({
      token,
      map_type,
      bounds,
      limit,
      filters,
      dont_include_properties: load_type == "refresh" ? "" : dont_include_properties,
      dont_include_deals: load_type == "refresh" ? "" : dont_include_deals,
      dont_include_route_sections,
      route_id
    })
      .then(response => {

        if(response.problem != null){
          getMapPropertiesFail(dispatch, response.problem);
        }else if(response.data.error != false){
          getMapPropertiesFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          getMapPropertiesSuccess(dispatch, response.data.results);
        }
      });
    };

};

const getMapPropertiesFail = (dispatch, error) => {

  dispatch({ type: GET_MAP_PROPERTIES_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
}

const getMapPropertiesSuccess = (dispatch, results) => {
  dispatch({ type: GET_MAP_PROPERTIES_SUCCESS, payload: results });
}

export const updateMapLocation = ({coordinates, active_property}) => {
  return{
    type: UPDATE_MAP_LOCATION,
    payload: {coordinates, active_property}
  };
}

export const setLastLocation = ({coordinates}) => {

  return{
    type: SET_LAST_LOCATION,
    payload: coordinates
  };
}

export const selectActiveProperty = (property) => {
  return{
    type: SELECT_ACTIVE_PROPERTY,
    payload: property
  };
}
export const focusSearchBar = (toggle) => {
  return{
    type: FOCUS_SEARCH_BAR,
    payload: toggle
  };
}


export const getReverseGeocode = ({ token, coordinate }) => {
  return (dispatch) => {

    dispatch({ type: GET_MAP_REVERSE_GEOCODE });

    dm_api.reverseGeocode({
      token,
      coordinate
    })
      .then(response => {
        if(response.problem != null){
          getReverseGeocodeFail(dispatch, response.problem);
        }else if(response.data.error != false){
          getReverseGeocodeFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          getReverseGeocodeSuccess(dispatch, response.data.results);
        }
      });
    };

};

const getReverseGeocodeFail = (dispatch, error) => {

  dispatch({ type: GET_MAP_REVERSE_GEOCODE_FAIL, payload: error });

}

const getReverseGeocodeSuccess = (dispatch, results) => {
  dispatch({ type: GET_MAP_REVERSE_GEOCODE_SUCCESS, payload: results });
}

export const getAutocomplete = ({ token, search, limit = 5, type }) => {
  return (dispatch) => {

    dispatch({ type: GET_AUTOCOMPLETE });

    dm_api.autocomplete({
      token,
      search,
      limit,
      type
    })
      .then(response => {
        if(response.problem != null){
          getAutocompleteFail(dispatch, response.problem);
        }else if(response.data.error != false){
          getAutocompleteFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          getAutocompleteSuccess(dispatch, response.data.results);
        }
      });
    };

};

const getAutocompleteFail = (dispatch, error) => {

  dispatch({ type: GET_AUTOCOMPLETE_FAIL, payload: error });

}

const getAutocompleteSuccess = (dispatch, results) => {
  dispatch({ type: GET_AUTOCOMPLETE_SUCCESS, payload: results });
}

export const clearAutocomplete = () => {
  return{
    type: CLEAR_AUTOCOMPLETE
  }
}

export const addDeal = ({ token, add_type, property = null, route_id = 0, address, address2, city, state, zip, devicetype }) => {
  return (dispatch) => {

    if(add_type == "manual"){
      dispatch({type: IS_LOADING, payload: true});
    }
    dispatch({ type: ADD_DEAL, payload: {property: property} });

    dm_api.addDeal({
      token,
      property,
      route_id,
      address,
      address2,
      city,
      state,
      zip,
      devicetype
    })
      .then(response => {
        if(response.problem != null){
          addDealFail({dispatch, error: response.problem, property, add_type});
        }else if(response.data.error != false){
          addDealFail({dispatch, error: response.data.error, property, add_type});
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          addDealSuccess({dispatch, results: response.data.results, property, add_type});
        }
      });
    };

};


const addDealFail = ({dispatch, error, property, add_type}) => {

  dispatch({ type: ADD_DEAL_FAIL, payload: {error, property} });

  if(add_type == "manual"){
    dispatch({type: IS_LOADING, payload: false});

  }

  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });


}

const addDealSuccess = ({dispatch, results, property, add_type}) => {
  dispatch({ type: ADD_DEAL_SUCCESS, payload: {
    ...results,
    added_property: results.property,
    property,
    add_type,
    badges: results.badges
  } });

  if(add_type == "manual" || add_type == "manual_map"){
    dispatch({
      type: SUCCESS_MESSAGE,
      payload: {
        message: "You've successfully added a property.",
        title: "Success!"
      }
    });
    appRedirect({dispatch, redirect: "property", payload:{property_id: results.property.property_id, map: "default", add_type}});
  }

}

export const toggleTapToAdd = (toggle) => {

  return {
    type: TOGGLE_TAP_TO_ADD,
    payload: toggle
  }
}

export const switchMapMode = (mode) => {

  return {
    type: SWITCH_MAP_MODE,
    payload: mode
  }
}

export const hidePropertyList = (toggle) => {

  return {
    type: HIDE_PROPERTY_LIST,
    payload: toggle
  }
}
