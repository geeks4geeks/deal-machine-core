import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  TOGGLE_DRAWER,
  CHANGE_TAB,
  GET_STATS,
  GET_STATS_FAIL,
  GET_STATS_SUCCESS,
  LOCK_DRAWER,
  TOGGLE_VIDEO,
  SET_VIDEO,
  TOGGLE_CAN_POP,
  SET_SHARE_OPTIONS,

  SET_TRACKING_EVENT
} from 'app/DealMachineCore/types';

import { appRedirect, AppConfig } from 'app/NativeActions';

import API from 'app/DealMachineCore/apis/DealMachineAPI';
const api = API.create();


export const setVideo = (video) => {
  return {
    type: SET_VIDEO,
    payload: video
  };
};

export const setShareOptions = ({url, message, title, subject}) => {
  return {
    type: SET_SHARE_OPTIONS,
    payload: {url, message, title, subject}
  };
}



export const toggleVideo = (toggle) => {
  return {
    type: TOGGLE_VIDEO,
    payload: toggle
  };
};

export const toggleCanPop = (toggle) => {
  return {
    type: TOGGLE_CAN_POP,
    payload: toggle
  };
};

export const toggleDrawer = (toggle) => {
  return {
    type: TOGGLE_DRAWER,
    payload: toggle
  };
};

export const lockDrawer = (lock) => {
  return {
    type: LOCK_DRAWER,
    payload: lock
  };
};

export const changeTab = (newTab, currentTab) => {
  return (dispatch) => {
    changeTabAction(dispatch, newTab, currentTab);
  }
};

const changeTabAction = (dispatch, newTab, currentTab) => {

  dispatch({
    type: CHANGE_TAB,
    payload: newTab
  });
  /*
  if(newTab != currentTab && AppConfig().device != "desktop"){
    switch(newTab){
      case "deals":
        appRedirect({dispatch, redirect: "deals"})

      break;

      case "analytics":
        appRedirect({dispatch, redirect: "analytics"})
      break;

      case "templates":
        appRedirect({dispatch, redirect: "templates"})
      break;

      case "settings":
        appRedirect({dispatch, redirect: "settings"})
      break;

      case "team":
        appRedirect({dispatch, redirect: "team"})
      break;

      case "partner":
        appRedirect({dispatch, redirect: "partner"})
      break;


      default:
        appRedirect({dispatch, redirect: "deals"})
      break;
    }
  }else{

  }
  */
}


export const getStats = ({ token }) => {
  return (dispatch) => {

    dispatch({ type: GET_STATS });

    dispatch({ type: SET_TRACKING_EVENT, payload: "getStats" });


    api.stats(token)
      .then(response => {
        if(response.problem != null){
          getStatsFail(dispatch, response.problem);
        }else if(response.data.error != false){
          getStatsFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          getStatsSuccess(dispatch, response.data.results.stats, response.data.results.user);
        }
      });
  };
};


const getStatsFail = (dispatch, error) => {
  dispatch({ type: GET_STATS_FAIL, payload: error });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getStatsFail" });

}
const getStatsSuccess = (dispatch, stats, user) => {

  dispatch({
    type: GET_STATS_SUCCESS,
    payload: {stats, user}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "getStatsSuccess" });

}
