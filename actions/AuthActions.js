import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  INIT_APP,
  AUTH_FIELD_CHANGED,
  GET_USER,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOAD_USER,
  TOGGLE_ACCOUNT_ACTION_SHEET,
  TRIGGER_LOGOUT,
  LOGOUT,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  AUTH_UNLOAD,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  TOGGLE_COPY,
  GET_MAIN_PLANS,
  GET_MAIN_PLANS_FAIL,
  GET_MAIN_PLANS_SUCCESS,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_SUCCESS,
  TOGGLE_ONBOARDING,
  SET_TRACKING_EVENT,

  GET_TERMS,
  GET_TERMS_FAIL,
  GET_TERMS_SUCCESS,

  GET_TUTORIAL_SUCCESS,
  COMPLETE_TUTORIAL,
  COMPLETE_TUTORIAL_SUCCESS
} from 'app/DealMachineCore/types';

import { appRedirect, saveData, removeData } from 'app/NativeActions';
import {store} from 'app/store';

import API from 'app/DealMachineCore/apis/DealMachineAPI';
import APIV2 from 'app/DealMachineCore/apis/DealMachineAPIV2';

const api = API.create();
const apiv2 = APIV2.create();

export const toggleOnboarding = (toggle) =>{
  return {
    type: TOGGLE_ONBOARDING,
    payload: toggle
  };
}


export const initApp = (start) => {
  return {
    type: INIT_APP,
    payload: start
  };
};
export const toggleCopy = (toggle) => {
  return {
    type: TOGGLE_COPY,
    payload: toggle
  };
};


export const getMainPlans = () => {
  return (dispatch) => {
    dispatch({ type:  GET_MAIN_PLANS });
    api.plans().then(response => {
        if(response.problem != null){
          getMainPlansFail(dispatch, response.problem);
        }else if(response.data.error != false){
          getMainPlansFail(dispatch, response.data.error);
        } else {
          getAnalyticsSuccess(dispatch, response.data.results);
        }
      });
  };
};

const getMainPlansFail = (dispatch, error) => {
  dispatch({ type: GET_MAIN_PLANS_FAIL, payload: error });
};

const getAnalyticsSuccess = (dispatch, plans) => {
  dispatch({
    type: GET_MAIN_PLANS_SUCCESS,
    payload: {plans}
  });
};

export const authFieldChanged = ({ prop, value }) => {
  return {
    type: AUTH_FIELD_CHANGED,
    payload: { prop, value }
  };
};
export const authUnload = () => {
  return {
    type: AUTH_UNLOAD
  };
};

export const registerUser = ({ email, password, phone, check_phone = 1, firstname, lastname, company, city, accepted_terms, affiliate_partner = 0, promo, from_campaign, from_source, branch_id, device, signupKey = 'dealmachine123', team_id = null }) => {

  return (dispatch) => {
    dispatch({ type: REGISTER_USER });
    dispatch({type: IS_LOADING, payload: true});
    dispatch({ type: SET_TRACKING_EVENT, payload: "registerUser" });

    dispatch({ type: SET_TRACKING_EVENT, payload: "intercom_entered_email" });

    apiv2.signup(email, password, phone, check_phone, firstname, lastname, company, city, accepted_terms, affiliate_partner, team_id, promo, from_campaign, from_source, branch_id, device, signupKey)
      .then(response => {

        if(response.problem != null){
          registerUserFail(dispatch, response.problem);
        } else if(response.data.error != false){
          registerUserFail(dispatch, response.data.error);
        } else {
          saveData({prop: "token", value: response.data.results.token});

          registerUserSuccess({
            dispatch: dispatch,
            user: response.data.results.user,
            badges: response.data.results.badges,
            billing: response.data.results.billing,
            plans: [],
            team: [],
            notifications: response.data.results.notifications,
            partner: response.data.results.partner,
            token: response.data.results.token,
            is_partner: response.data.results.is_partner,
            accepted_affiliate_latest_terms: response.data.results.accepted_affiliate_latest_terms,
            partner_info: response.data.results.partner_info,
            dealfinder_page: response.data.results.dealfinder_page,
            team_link_defaults: response.data.results.team_link_defaults,
            default_preset: response.data.results.default_preset,
            affiliate_partner: affiliate_partner
          });

        }
      });

  };
};


export const loginUser = ({email, password, device}) => {
  return (dispatch) => {
    dispatch({type: IS_LOADING, payload: true});
    dispatch({ type: LOGIN_USER });
    dispatch({ type: SET_TRACKING_EVENT, payload: "loginUser" });


    apiv2.login(email, password, device)
      .then(response => {
        if(response.problem != null){
          loginUserFail(dispatch, response.problem);
        } else if(response.data.error != false){
          loginUserFail(dispatch, response.data.error);
        } else {
          saveData({prop: "token", value: response.data.results.token});

          loginUserSuccess({
            dispatch: dispatch,
            token: response.data.results.token,
            user: response.data.results.user,
            badges: response.data.results.badges,
            billing: response.data.results.billing,
            plans: [],
            team: [],
            notifications: response.data.results.notifications,
            partner: response.data.results.partner,
            is_partner: response.data.results.is_partner,
            accepted_affiliate_latest_terms: response.data.results.accepted_affiliate_latest_terms,
            partner_info: response.data.results.partner_info,
            dealfinder_page: response.data.results.dealfinder_page,
            team_link_defaults: response.data.results.team_link_defaults,
            default_preset: response.data.results.default_preset,
            type:"login"
          });

        }
      });
  };
};
export const triggerLogout = (trigger) => {
  return {
    type: TRIGGER_LOGOUT,
    payload: trigger
  }
}

const loginUserFail = (dispatch, error) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "loginFail" });


}


const loginUserSuccess = ({dispatch, user, badges, billing, plans, team, partner, notifications, token, is_partner, accepted_affiliate_latest_terms, partner_info, type, dealfinder_page, team_link_defaults, default_preset}) => {
  dispatch({type: IS_LOADING, payload: false});
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: {user, badges, billing, plans, team, notifications, is_partner, accepted_affiliate_latest_terms, partner_info, token, dealfinder_page, team_link_defaults, default_preset}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "loginSuccess" });


  appRedirect({dispatch, redirect: "init", payload: {user, billing, dealfinder_page, is_partner, accepted_affiliate_latest_terms, type}});
}

const registerUserFail = (dispatch, error) => {
  dispatch({ type: REGISTER_USER_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "registerFail" });

}

const registerUserSuccess = ({dispatch, user, billing, plans, team, partner, dealfinder_page, team_link_defaults, token, affiliate_partner}) => {
  dispatch({type: IS_LOADING, payload: false});

  const device = store.getState().native.device;
  if (device == "desktop") {
    if (window.gtag) {
      /*
      window.gtag("event", "conversion", {
        send_to: "AW-848400355/vnaaCKPos7EBEOOfxpQD",
        transaction_id: ""
      });
      */
    }
    if(window.fbq) {
      window.fbq("track", "SignUp");
    }
  }


  dispatch({type: SET_TRACKING_EVENT, payload: "entered_email"});

  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: {user, billing, plans, team, partner, token, dealfinder_page, team_link_defaults}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "registerSuccess" });

  if(affiliate_partner == 1){
    appRedirect({dispatch, redirect: "partner"});
  }else{
    appRedirect({dispatch, redirect: "init", payload: {user, billing, dealfinder_page, is_partner: 0, accepted_affiliate_latest_terms: 0, type: "login"}});
  }

}

export const toggleAccountActionSheet = (sheet) => {
  return {
    type: TOGGLE_ACCOUNT_ACTION_SHEET,
    payload: sheet
  };
};

export const getUser = ({token, device, redirect, loading}) => {
  return (dispatch) => {

    dispatch({ type: SET_TRACKING_EVENT, payload: "getUser" });

    if(loading){
      dispatch({type: IS_LOADING, payload: true});
    }
    dispatch({ type: GET_USER });
    apiv2.getUser(token, device)
      .then(response => {
        if(response.problem != null){
          dispatch({ type: INIT_APP, payload: true });
          loginUserFail(dispatch, response.problem);
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
          dispatch({type: IS_LOADING, payload: false});


        } else if(response.data.error != false){
          dispatch({ type: INIT_APP, payload: true });
          loginUserFail(dispatch, response.data.error);
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
          dispatch({type: IS_LOADING, payload: false});


        } else {


          loginUserSuccess({
            dispatch: dispatch,
            token: token,
            user: response.data.results.user,
            badges: response.data.results.badges,
            billing: response.data.results.billing,
            plans: [],
            team: [],
            notifications: response.data.results.notifications,
            partner: response.data.results.partner,
            is_partner: response.data.results.is_partner,
            accepted_affiliate_latest_terms: response.data.results.accepted_affiliate_latest_terms,
            partner_info: response.data.results.partner_info,
            dealfinder_page: response.data.results.dealfinder_page,
            team_link_defaults: response.data.results.team_link_defaults,
            default_preset: response.data.results.default_preset,
            type:redirect || loading ? "login" : "load"
          });
        }
      });
  };
};



export const forgotPassword = ({email}) => {
  return (dispatch) => {
    dispatch({type: IS_LOADING, payload: true});
    dispatch({ type: FORGOT_PASSWORD });
    dispatch({ type: SET_TRACKING_EVENT, payload: "forgotPassword" });

    api.forgot(email)
      .then(response => {
        if(response.problem != null){
          forgotPasswordFail(dispatch, response.problem);
        } else if(response.data.error != false){
          forgotPasswordFail(dispatch, response.data.error);
        } else {
          forgotPasswordSuccess(dispatch);
        }
      });
  };
};

export const resetPasswordCheck = ({email, token, type}) => {
  return (dispatch) => {

    dispatch({type: IS_LOADING, payload: true});
    api.resetpasswordcheck(email, token, type)
      .then(response => {
        if(response.problem != null){
          forgotPasswordFail(dispatch, response.problem);
        }else if(response.data.error != false){
          forgotPasswordFail(dispatch, response.data.error)
        }else{
          dispatch({type: IS_LOADING, payload: false});
        }
      });
  }
};

const forgotPasswordFail = (dispatch, error) => {
  dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "forgotPasswordFail" });
  appRedirect({dispatch, redirect: "goBack", payload: {type: "login"}});

}

const forgotPasswordSuccess = (dispatch) => {
  dispatch({
    type: FORGOT_PASSWORD_SUCCESS
  });
  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {message: "A link has been sent to your email address.", title: "Success!"}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "forgotPasswordSuccess" });
  appRedirect({dispatch, redirect: "goBack", payload: {type: "login"}});
}

export const resetPassword = ({type, payload}) => {
  return (dispatch) => {

    dispatch({type: IS_LOADING, payload: true});

    api.resetpassword(type, payload)
      .then(response => {
        if(response.problem != null){
          resetPasswordFail(dispatch, response.problem);
        }else if(response.data.error != false){
          resetPasswordFail(dispatch, response.data.error);
        }else{
          saveData({prop: "token", value: response.data.results.token});

          loginUserSuccess({
            dispatch: dispatch,
            token: response.data.results.token,
            user: response.data.results.user,
            badges: response.data.results.badges,
            billing: response.data.results.billing,
            plans: [],
            team: [],
            notifications: response.data.results.notifications,
            partner: response.data.results.partner,
            is_partner: response.data.results.is_partner,
            accepted_affiliate_latest_terms: response.data.results.accepted_affiliate_latest_terms,
            partner_info: response.data.results.partner_info,
            dealfinder_page: response.data.results.dealfinder_page,
            team_link_defaults: response.data.results.team_link_defaults,
            default_preset: response.data.results.default_preset,
            type:"login"
          });


        }
      });
  }
};

const resetPasswordFail = (dispatch, error) => {
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "resetPasswordFail" });
}



export const getTermsOfService = ({type}) => {
  return (dispatch) => {

    dispatch({ type: GET_TERMS });

    api.termsOfService(type)
      .then(response => {
        if(response.data.error != false){

          dispatch({type: GET_TERMS_FAIL, payload: response.data.error});

        } else {
          dispatch({type: GET_TERMS_SUCCESS, payload: response.data.results});

        }
      });
  };
};

export const getTutorial = ({token, tutorial_slug}) => {
  return (dispatch) => {

    apiv2.getTutorial({token, tutorial_slug})
      .then(response => {
        if(response.problem != null){
        }else if(response.data.error != false){
        }else{
          dispatch({
            type: GET_TUTORIAL_SUCCESS,
            payload: response.data.results
          });
        }
      });
  };
}

export const completeTutorial = ({token, tutorial_slug}) => {
  return (dispatch) => {

    dispatch({type: COMPLETE_TUTORIAL})

    apiv2.completeTutorial({token, tutorial_slug})
      .then(response => {
        if(response.problem != null){
        }else if(response.data.error != false){
        }else{
          dispatch({
            type: COMPLETE_TUTORIAL_SUCCESS,
            payload: response.data.results
          });
        }
      });
  };
}
