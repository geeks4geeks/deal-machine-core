import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  ADDRESS_FIELD_CHANGE,
  ADDRESS_INIT,
  UPDATE_RETURN_ADDRESS,
  UPDATE_RETURN_ADDRESS_FAIL,
  UPDATE_RETURN_ADDRESS_SUCCESS,
  RESET_SETTINGS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_PHOTO_TYPE,
  INIT_UPDATE_USER,
  UPDATE_USER_FIELD_CHANGE,
  SELECT_STATE,
  SELECT_DEFAULT_SENDING_OPTIONS,
  RELOAD_DEALS,
  TOGGLE_ONBOARDING,
  SET_EDIT_RETURN_LOCATION,
  SET_DARK_MODE,
  SET_PHOTO_CAMERAROLL,
  SET_TRACKING_EVENT,

  UPDATE_MAP_LOCATION
} from 'app/DealMachineCore/types';

import { appRedirect } from 'app/NativeActions';

import API from 'app/DealMachineCore/apis/DealMachineAPI';
import APIV2 from 'app/DealMachineCore/apis/DealMachineAPIV2';


const api = API.create();
const apiv2 = APIV2.create();





export const addressInit = ({address}) => {

  const return_address = {
    address: address.address || "",
    address2: address.address2 || "",
    city: address.address_city || "",
    state: address.address_state || "",
    zipcode: address.address_zip || "",
    phone: address.phone || ""
  }

  return {
    type: ADDRESS_INIT,
    payload: {return_address}
  };
};

export const selectDefaultSendingOptions = (toggle) => {
  return {
    type: SELECT_DEFAULT_SENDING_OPTIONS,
    payload: toggle
  }
}

export const resetSettings = () => {
  return {
    type: RESET_SETTINGS
  }
}


export const addressFieldChanged = ({ prop, value }) => {
  return {
    type: ADDRESS_FIELD_CHANGE,
    payload: { prop, value }
  };
};

export const updatePhotoType = (photo_type) => {
  return {
    type: UPDATE_PHOTO_TYPE,
    payload: photo_type
  };
};


export const updateReturnAddress = ({ token, address, address2, city, state, zipcode, phone, onboarding }) => {
  return (dispatch) => {
    dispatch({type: IS_LOADING, payload: true});
    dispatch({type: UPDATE_RETURN_ADDRESS});
    api.editReturnAddress(token, address, address2, city, state, zipcode, phone)
      .then(response => {

        if(response.problem != null){
          updateReturnAddressFail(dispatch, response.problem);
        }else if(response.data.error != false){
          updateReturnAddressFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          updateReturnAddressSuccess(dispatch, response.data.results.return_address, onboarding);
        }
      });
  };
};

const updateReturnAddressFail = (dispatch, error) => {
  dispatch({ type: UPDATE_RETURN_ADDRESS_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
}

const updateReturnAddressSuccess = (dispatch, return_address, onboarding) => {
  dispatch({
    type: UPDATE_RETURN_ADDRESS_SUCCESS,
    payload: {
      address: return_address.address,
      address2: return_address.address2,
      address_city: return_address.address_city,
      address_state: return_address.address_state,
      address_zip: return_address.address_zip,
      phone: return_address.phone,
    }
  });

  if(!onboarding){

    appRedirect({dispatch, redirect: "goBack", payload: {type: "settings"}});

    dispatch({
      type: SUCCESS_MESSAGE,
      payload: {message: "You've successfully updated your return address.", title: "Success!"}
    });

  }else{

    dispatch({type: IS_LOADING, payload: false});
    appRedirect({dispatch, redirect: "creditReloadOnboarding"});

  }


}

export const selectState = ({state}) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_STATE,
      payload: {state}
    });
    appRedirect({dispatch, redirect: "goBack"});

  };
};

export const updateUser = ({ token, type, payload }) => {
  return (dispatch) => {
    dispatch({type: IS_LOADING, payload: true});
    dispatch({type: UPDATE_USER});
    dispatch({ type: SET_TRACKING_EVENT, payload: "updateUser" });

    apiv2.editUser(token, type, payload)
      .then(response => {
        if(response.problem != null){
          updateUserFail(dispatch, response.problem);
        }else if(response.data.error != false){
          updateUserFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          if(type == "resend_freq" || type == "default_template"){
            appRedirect({dispatch, redirect: "goBack", payload: {type: "settings"}});


          }
          updateUserSuccess(dispatch, response.data.results.user, response.data.results.billing, response.data.results.plans, response.data.results.team, response.data.results.partner, response.data.results.notifications, type);
        }
      });
  };
};

const updateUserFail = (dispatch, error) => {
  dispatch({ type: UPDATE_USER_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "updateUserFail" });

}

const updateUserSuccess = (dispatch, user, billing, plans, team, partner, notifications, type) => {

  dispatch({
    type: UPDATE_USER_SUCCESS,
    payload: {user, billing, plans, team, partner, notifications}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "updateUserSuccess_"+type });


  switch(type){
    default:
      dispatch({type: IS_LOADING, payload: false});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've updated your account.", title: "Success!"}
      });
    break;

    case "accept_terms":

      dispatch({type: IS_LOADING, payload: false});

      appRedirect({dispatch, redirect: "main"});
      appRedirect({dispatch, redirect: "dashboard"});

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've accepted our terms of service.", title: "Success!"}
      });


    break;
    case "send_verify_email":
      dispatch({type: IS_LOADING, payload: false});
    break;
    case "send_verify_phone":
      dispatch({type: IS_LOADING, payload: false});

    break;
    case "resend_verify_email":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've resent your verification email.", title: "Success!"}
      });

    break;

    case "resend_verify_phone":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've resent your verification text.", title: "Success!"}
      });

    break;

    case "default_location":
      appRedirect({dispatch, redirect: "goBack", payload:{remove: "default-location"}});
      dispatch({
        type: TOGGLE_ONBOARDING,
        payload: false
      });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've set your default location.", title: "Success!"}
      });
      dispatch({
        type: UPDATE_MAP_LOCATION,
        payload: {coordinates:{
          latitude: parseFloat(user.user_default_lat),
          longitude: parseFloat(user.user_default_lng),
          heading: 0
        }, active_property: null}
      });

    break;

    case "update_notifications":
    case "update_all_notifications":


      dispatch({type: IS_LOADING, payload: false});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your notification settings have been updated.", title: "Success!"}
      });

      appRedirect({dispatch, redirect: "goBack", payload: {type: "settings"}});




    break;

    case "resend_options_onboarding":
    case "mailing_options_onboarding":

      dispatch({type: IS_LOADING, payload: false});

      dispatch({
        type: TOGGLE_ONBOARDING,
        payload: false
      });
      appRedirect({dispatch, redirect: "main"});
      appRedirect({dispatch, redirect: "dashboard"});

      dispatch({ type: SET_TRACKING_EVENT, payload: "intercom_set_repeat_options" });


    break;

    case "resend_options":
    case "mailing_options":

      dispatch({type: IS_LOADING, payload: false});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've updated your account's mailing options.", title: "Success!"}
      });

      appRedirect({dispatch, redirect: "goBack", payload: {remove: "mailing-options"}});


    break;

    case "resend_options_and_update_deals":
    case "mailing_options_and_update_deals":

      dispatch({type: IS_LOADING, payload: false});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've updated your account's mailing options. All deals have also been updated to the new settings.", title: "Success!"}
      });
      dispatch({ type: RELOAD_DEALS });

      appRedirect({dispatch, redirect: "goBack", payload: {remove: "mailing-options"}});

    break;

    case "create_account":

      dispatch({type: IS_LOADING, payload: false});
      appRedirect({dispatch, redirect: "init", payload:{user, billing, dealfinder_page: {}, is_partner: 0, accepted_affiliate_latest_terms: 0}});

    break;

    case "update_information":
    case "update_user_information":

      appRedirect({dispatch, redirect: "goBack", payload: {type: "user_settings"}});

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your information has been updated.", title: "Success!"}
      });
    break;

    case "update_user_information_phone":

      appRedirect({dispatch, redirect: "verifyPhone"});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your information has been updated.", title: "Success!"}
      });
    break;

    case "verify_email":
      appRedirect({dispatch, redirect: "verifyPhone"});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You successfully verified your email.", title: "Success!"}
      });

    break;

    case "verify_phone":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You successfully verified your phone number.", title: "Success!"}
      });

      appRedirect({dispatch, redirect: "dashboard"});

    break;

    case "change_verify_email":
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your email address has been updated.", title: "Success!"}
      });
    break;

    case "change_verify_phone":
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your phone number has been updated.", title: "Success!"}
      });
    break;

    case "change_email":
      appRedirect({dispatch, redirect: "verifyEmail"});

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your email address has been updated.", title: "Success!"}
      });
    break;

    case "change_password":
      appRedirect({dispatch, redirect: "goBack", payload: {type: "user_settings"}});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your password has been updated.", title: "Success!"}
      });
    break;

    case "grab_google_street_view":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your settings have been updated! You photos will begin to populate within 1-2 hours.", title: "Success!"}
      });
    break;

    case "reset_password":
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your password has been updated. Please login using your new password", title: "Success!"}
      });
      appRedirect({dispatch, redirect: "goBack", payload: {type: "login"}});
    break;



  }

}

export const initUpdateUser = ({user}) => {

  return {
    type: INIT_UPDATE_USER,
    payload: {user: {
      ...user,
      default_resend_freq_switch: user.default_resend_freq == 0 ? "off" : "on",
      default_resend_limit_switch: user.default_resend_limit == 0 ? "on" : "off"
    }}
  }
}

export const updateUserFieldChange = ({ prop, value }) => {
  return {
    type: UPDATE_USER_FIELD_CHANGE,
    payload: { prop, value }
  };
};

export const setPhotoToCameraroll = (save_photo_to_cameraroll_toggle) => {

  let save_photo_to_cameraroll = false;

  if(save_photo_to_cameraroll_toggle){
    save_photo_to_cameraroll = true;
  }else{
    save_photo_to_cameraroll = false;
  }

  return{
    type: SET_PHOTO_CAMERAROLL,
    payload: save_photo_to_cameraroll
  }
}

export const setEditReturnLocation = (location) => {
  return {
    type: SET_EDIT_RETURN_LOCATION,
    payload: location
  }
}
