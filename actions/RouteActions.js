import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  TOGGLE_SHOW_ROUTES,
  ACKNOWLEDGE_END_ROUTE,
  UPDATE_ROUTE_TIMER,
  START_TRACKED_ROUTE,
  START_TRACKED_ROUTE_SUCCESS,
  START_TRACKED_ROUTE_FAIL,
  UPDATE_TRACKED_ROUTE,
  UPDATE_TRACKED_ROUTE_SUCCESS,
  UPDATE_TRACKED_ROUTE_FAIL,
  END_TRACKED_ROUTE,
  END_TRACKED_ROUTE_SUCCESS,
  END_TRACKED_ROUTE_FAIL,
  UPDATE_CURRENT_ROUTE_SECTION,
  REMOVE_TRACKED_ROUTE,
  REMOVE_TRACKED_ROUTE_FAIL,
  REMOVE_TRACKED_ROUTE_SUCCESS,
  REFRESH_ROUTES,
  LOAD_MORE_ROUTES,
  GET_ROUTES,
  GET_ROUTES_FAIL,
  LOAD_MORE_ROUTES_SUCCESS,
  GET_ROUTES_SUCCESS,
  INIT_EDIT_ROUTE_FILTERS,
  UPDATE_ROUTE_FILTER,
  UPDATE_SINGLE_ROUTE_FILTER,
  EDIT_ROUTE_FILTER,
  SAVE_ROUTE_FILTERS,
  SELECT_ACTIVE_ROUTE,
  GET_ROUTE_PROPERTIES,
  REFRESH_ROUTE_PROPERTIES,
  GET_ROUTE_PROPERTIES_FAIL,
  GET_ROUTE_PROPERTIES_SUCCESS,
  ROUTE_PROPERTIES_TOGGLE_TAB,

  TOGGLE_DRIVING_IMAGES
} from "app/DealMachineCore/types";

import { getDistance, convertDistance } from "geolib";
import { appRedirect } from 'app/NativeActions';

import APIV2 from "app/DealMachineCore/apis/DealMachineAPIV2";
const apiv2 = APIV2.create();

const calculateTotalMiles = ({ coordinates, previous_total = 0 }) => {
  let total = 0;
  if (coordinates.length > 0) {
    for (let i = 0; i < coordinates.length; i++) {
      if (i != 0 && i != coordinates.length - 1) {
        total =
          total +
          getDistance(
            {
              latitude: coordinates[i - 1].latitude,
              longitude: coordinates[i - 1].longitude
            },
            {
              latitude: coordinates[i].latitude,
              longitude: coordinates[i].longitude
            }
          );
      }
    }

    total = convertDistance(total, "mi");

    if (!previous_total) {
      previous_total = 0;
    }
    total = parseFloat(total) + parseFloat(previous_total);

    return parseFloat(total).toFixed(2);
  } else {
    return "0.00";
  }
};

export const acknowledgeEndRoute = () => {
  return {
    type: ACKNOWLEDGE_END_ROUTE
  };
};

export const updateRouteTimer = () => {
  return {
    type: UPDATE_ROUTE_TIMER
  };
};
export const routePropertiesToggleTab = (toggle) => {
  return {
    type: ROUTE_PROPERTIES_TOGGLE_TAB,
    payload: toggle
  };
};


export const getRoutes = ({ token, type, begin = 0, filters }) => {
  return dispatch => {
    switch (type) {
      case "refresh":
        dispatch({ type: REFRESH_ROUTES });
        break;

      case "load_more":
        dispatch({ type: LOAD_MORE_ROUTES });
        break;

      default:
      case "load":
        dispatch({ type: GET_ROUTES });
        break;
    }

    apiv2.getTrackedRoutes({ token, begin, filters }).then(response => {
      if (response.problem != null) {
        getRoutesFail(dispatch, response.problem);
      } else if (response.data.error != false) {
        getRoutesFail(dispatch, response.data.error);
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        getRoutesSuccess(dispatch, response.data.results.routes, type);
      }
    });
  };
};

const getRoutesFail = (dispatch, error) => {
  dispatch({ type: GET_ROUTES_FAIL, payload: error });
};

const getRoutesSuccess = (dispatch, routes, type) => {
  if (type == "load_more") {
    dispatch({ type: LOAD_MORE_ROUTES_SUCCESS, payload: { routes } });
  } else {
    dispatch({ type: GET_ROUTES_SUCCESS, payload: { routes } });
  }
};

export const toggleShowRoutes = toggle => {
  return {
    type: TOGGLE_SHOW_ROUTES,
    payload: toggle
  };
};
export const toggleDrivingImages = toggle => {
  return {
    type: TOGGLE_DRIVING_IMAGES,
    payload: toggle
  };
};

export const startTrackedRoute = ({ token }) => {
  return dispatch => {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: START_TRACKED_ROUTE });

    apiv2.startTrackedRoute({ token }).then(response => {

      if (response.problem != null) {
        startTrackedRouteFail({ dispatch, error: response.problem });
      } else if (response.data.error != false) {
        startTrackedRouteFail({ dispatch, error: response.data.error });
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        startTrackedRouteSuccess({ dispatch, results: response.data.results });
      }
    });
  };
};

const startTrackedRouteFail = ({ dispatch, error }) => {
  dispatch({ type: IS_LOADING, payload: false });
  dispatch({ type: START_TRACKED_ROUTE_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
};

const startTrackedRouteSuccess = ({ dispatch, results }) => {
  dispatch({ type: IS_LOADING, payload: false });

  dispatch({
    type: START_TRACKED_ROUTE_SUCCESS,
    payload: results
  });
};

export const updateCurrentRouteSection = ({
  start_time,
  coordinates,
  current_route
}) => {
  let total_miles = null;
  if (current_route) {
    total_miles = calculateTotalMiles({
      coordinates,
      previous_total: current_route ? current_route.total_miles : 0
    });
  }
  return {
    type: UPDATE_CURRENT_ROUTE_SECTION,
    payload: { total_miles, start_time, coordinates }
  };
};

export const updateTrackedRoute = ({
  token,
  route_id,
  coordinates,
  current_route
}) => {
  return dispatch => {
    dispatch({ type: UPDATE_TRACKED_ROUTE });

    const total_miles = calculateTotalMiles({
      coordinates,
      previous_total: current_route.total_miles
    });

    apiv2
      .updateTrackedRoute({ token, route_id, total_miles, coordinates })
      .then(response => {
        if (response.problem != null) {
          updateTrackedRouteFail({ dispatch, error: response.problem });
        } else if (response.data.error != false) {
          updateTrackedRouteFail({ dispatch, error: response.data.error });
          if (response.data.valid == "invalid") {
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          updateTrackedRouteSuccess({
            dispatch,
            results: response.data.results
          });
        }
      });
  };
};

const updateTrackedRouteFail = ({ dispatch, error }) => {
  dispatch({ type: UPDATE_TRACKED_ROUTE_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
};

const updateTrackedRouteSuccess = ({ dispatch, results }) => {
  dispatch({ type: UPDATE_TRACKED_ROUTE_SUCCESS, payload: results });
};

export const stopTrackedRoute = ({
  token,
  route_id,
  coordinates,
  current_route
}) => {
  return dispatch => {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: END_TRACKED_ROUTE });

    const total_miles = calculateTotalMiles({
      coordinates,
      previous_total: current_route.total_miles
    });

    apiv2
      .stopTrackedRoute({ token, route_id, coordinates, total_miles })
      .then(response => {
        if (response.problem != null) {
          stopTrackedRouteFail({ dispatch, error: response.problem });
        } else if (response.data.error != false) {
          stopTrackedRouteFail({ dispatch, error: response.data.error });
          if (response.data.valid == "invalid") {
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          stopTrackedRouteSuccess({ dispatch, results: response.data.results });
        }
      });
  };
};

const stopTrackedRouteFail = ({ dispatch, error }) => {
  dispatch({ type: IS_LOADING, payload: false });
  dispatch({ type: END_TRACKED_ROUTE_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
};

const stopTrackedRouteSuccess = ({ dispatch, results }) => {
  dispatch({ type: IS_LOADING, payload: false });
  dispatch({ type: END_TRACKED_ROUTE_SUCCESS, payload: results });
};

export const removeTrackedRoute = ({
  token,
  route_id,
  route_type = "route_section"
}) => {
  return dispatch => {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: REMOVE_TRACKED_ROUTE });

    apiv2.removeTrackedRoute({ token, route_id, route_type }).then(response => {
      if (response.problem != null) {
        removeTrackedRouteFail({ dispatch, error: response.problem });
      } else if (response.data.error != false) {
        removeTrackedRouteFail({ dispatch, error: response.data.error });
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        removeTrackedRouteSuccess({ dispatch, results: response.data.results });
      }
    });
  };
};

const removeTrackedRouteFail = ({ dispatch, error }) => {
  dispatch({ type: IS_LOADING, payload: false });
  dispatch({ type: REMOVE_TRACKED_ROUTE_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
};

const removeTrackedRouteSuccess = ({ dispatch, results }) => {
  dispatch({ type: IS_LOADING, payload: false });
  dispatch({ type: REMOVE_TRACKED_ROUTE_SUCCESS, payload: results });

  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {
      message: "You've successfully deleted this route.",
      title: "Success!"
    }
  });

  appRedirect({dispatch, redirect: "goBack", payload:{remove: "route", route_id: results.route_id}})

};
export const initEditRouteFilters = () => {
  return {
    type: INIT_EDIT_ROUTE_FILTERS
  };
};

export const updateRouteFilter = ({ prop, value }) => {
  return {
    type: UPDATE_ROUTE_FILTER,
    payload: { prop, value }
  };
};

export const updateSingleRouteFilter = ({ prop, value }) => {
  return {
    type: UPDATE_SINGLE_ROUTE_FILTER,
    payload: { prop, value }
  };
};

export const editRouteFilter = ({ prop, value }) => {
  return {
    type: EDIT_ROUTE_FILTER,
    payload: { prop, value }
  };
};

export const saveRouteFilters = () => {
  return {
    type: SAVE_ROUTE_FILTERS
  };
};

export const selectActiveRoute = route => {
  return {
    type: SELECT_ACTIVE_ROUTE,
    payload: route
  };
};

export const getRouteProperties = ({
  token,
  type,
  begin = 0,
  limit,
  route_id
}) => {
  return dispatch => {
    switch (type) {
      case "refresh":
        dispatch({ type: REFRESH_ROUTE_PROPERTIES });
        break;

      default:
      case "load":
        dispatch({ type: GET_ROUTE_PROPERTIES });
        break;
    }

    apiv2.listProperties({ token, begin, limit, route_id }).then(response => {
      if(response.problem != null){
        dispatch({
          type: GET_ROUTE_PROPERTIES_FAIL,
          payload: response.problem
        });
      }else if(response.data.error != false){
        dispatch({
          type: GET_ROUTE_PROPERTIES_FAIL,
          payload: response.data.error
        });
        if (response.data.valid == "invalid"){
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      }else{
        dispatch({
          type: GET_ROUTE_PROPERTIES_SUCCESS,
          payload: response.data.results
        });
      }
    });
  };
};
