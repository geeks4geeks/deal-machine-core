import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  ENTER_PROMO,
  ENTER_PROMO_FAIL,
  ENTER_PROMO_SUCCESS,
  RESET_PROMO,
  PROMO_FIELD_CHANGE,

  SET_TRACKING_EVENT
} from 'app/DealMachineCore/types';


import API from 'app/DealMachineCore/apis/DealMachineAPI';
import { appRedirect } from 'app/NativeActions';

const api = API.create();

export const resetPromo = () => {
  return {
    type: RESET_PROMO
  }
};

export const promoFieldChange = (value) => {
  return {
    type: PROMO_FIELD_CHANGE,
    payload: value
  };
};


export const enterPromo = ({ token, promo }) => {
  return (dispatch) => {
    dispatch({type: IS_LOADING, payload: true});
    dispatch({type: ENTER_PROMO});

    dispatch({ type: SET_TRACKING_EVENT, payload: "enterPromo" });

    api.enterPromo(token, promo)
      .then(response => {

        if(response.problem != null){
          enterPromoFail(dispatch, response.problem);
        }else if(response.data.error != false){
          enterPromoFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          enterPromoSuccess(dispatch, response.data.results.user, response.data.results.billing, response.data.results.plans, response.data.results.team, response.data.results.partner);
        }
      });
  };
};

const enterPromoFail = (dispatch, error) => {
  dispatch({ type: ENTER_PROMO_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "enterPromoFail" });

}

const enterPromoSuccess = (dispatch, user, billing, plans, team, partner) => {
  dispatch({
    type: ENTER_PROMO_SUCCESS,
    payload: {user, billing, plans, team, partner}
  });
  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {message: "Your promo code has been accepted.", title: "Success!"}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "enterPromoSuccess" });

  appRedirect({dispatch, redirect: "goBack", payload: {type: "settings"}});

}
