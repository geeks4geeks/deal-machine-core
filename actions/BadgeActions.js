import {
  GET_ALL_BADGES,
  GET_ALL_BADGES_FAIL,
  GET_ALL_BADGES_SUCCESS,
  SET_TRACKING_EVENT,
  TOGGLE_BADGE_POPUP,
  UPDATE_BADGE,
  UPDATE_BADGE_SUCCESS,
  UPDATE_BADGE_FAIL,
  IS_LOADING,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  TRIGGER_LOGOUT
} from 'app/DealMachineCore/types';

import API from 'app/DealMachineCore/apis/DealMachineAPI';
import PrivateAPI from 'app/DealMachineCore/apis/DealMachinePrivateAPI';

const api = API.create();
const dm_private_api = PrivateAPI.create();



export const getAllBadges = ({token}) => {
  return(dispatch) => {

    dispatch({type: GET_ALL_BADGES});

    api.getAllBadges({token})
    .then(response => {
      if(response.problem != null){

        getAllBadgesFail(dispatch, response.data.error);

      }else if(response.data.error != false){

        getAllBadgesFail(dispatch, response.data.error);
        if(response.data.valid == "invalid"){
          dispatch({ type: TRIGGER_LOGOUT, payload: false });
        }

      }else{
        getAllBadgesSuccess(dispatch, response.data.results);
      }

    });
  }
}
const getAllBadgesSuccess = (dispatch, results) => {
  dispatch({
    type: GET_ALL_BADGES_SUCCESS,
    payload: {
      badges:{
        all_badges: sortBadgesArray(results.all_badges),
        my_badges: sortBadgesArray(results.my_badges)
      }
    }
  });
};

const getAllBadgesFail = (dispatch, error) => {
  dispatch({
    type: GET_ALL_BADGES_FAIL,
    payload: {error}
  });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
};


export const updateBadge = ({token, payload, type}) => {
  return (dispatch) => {

    dispatch({type: UPDATE_BADGE});

      api.seenBadge({token, payload, type})
      .then(response => {
        if(response.problem != null){

          updateBadgeFail(dispatch, response.data.error);

        }else{
          updateBadgeSuccess(dispatch, response.data.results);
        }

      });
    }
  }

  const updateBadgeSuccess = (dispatch, results) => {

    dispatch({
      type: UPDATE_BADGE_SUCCESS,
      payload: {
        badges:{
          all_badges: sortBadgesArray(results.all_badges),
          my_badges: sortBadgesArray(results.my_badges)
        }
      }
    });
  };

  const updateBadgeFail = (dispatch, error) => {
    dispatch({
      type: UPDATE_BADGE_FAIL,
      payload: {error}
    });
  }

export const toggleBadgePopup = (toggle, badge) => {
  return{
    type: TOGGLE_BADGE_POPUP,
    payload: {toggle, badge}
  }
};

export const sortBadgesArray = (badge_array) => {

      var sorted_array
      var p1 = [];
      var p2 = [];
      var p3 = [];
      var p4 = [];
      var p5 = [];

      for (var i = 0; i < badge_array.length; i++) {
          if (badge_array[i].group_level == 5) {
              p5.push(badge_array[i]);
          }

          else if (badge_array[i].group_level == 4) {
              p4.push(badge_array[i]);
          }

          else if (badge_array[i].group_level == 3) {
              p3.push(badge_array[i]);
          }
          else if (badge_array[i].group_level == 2) {
              p2.push(badge_array[i]);
          }
          else if (badge_array[i].group_level == 1) {
              p1.push(badge_array[i]);
          }
      }
      sorted_array=p5.concat(p4, p3, p2, p1);
return sorted_array
}
