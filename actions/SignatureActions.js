import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,

  GET_SIGNATURES,
  REFRESH_SIGNATURES,
  GET_SIGNATURES_FAIL,
  GET_SIGNATURES_SUCCESS,
  GET_SIGNATURE,
  GET_SIGNATURE_FAIL,
  GET_SIGNATURE_SUCCESS,

  SIGNATURE_INIT,
  SIGNATURE_RESET,
  SIGNATURE_FIELD_CHANGED,
  SAVE_SIGNATURE,
  SAVE_SIGNATURE_SUCCESS,
  CREATE_SIGNATURE_SUCCESS,
  SAVE_SIGNATURE_FAIL,
  DELETE_SIGNATURE,

  SET_EDIT_RETURN_LOCATION,

  SET_TRACKING_EVENT,

  RELOAD_PREVIEWS,
  TOGGLE_ONBOARDING
} from 'app/DealMachineCore/types';

import { appRedirect } from 'app/NativeActions';

import moment from 'moment';

import API from 'app/DealMachineCore/apis/DealMachineAPI';
const api = API.create();

export const getSignatures = ({ token, type, signature_id = null }) => {
  return (dispatch) => {
    switch(type){
      case "signature":
        dispatch({ type: GET_SIGNATURE });
        dispatch({ type: SET_TRACKING_EVENT, payload: "getSignatures" });

      break;

      case "refresh":
        dispatch({ type: REFRESH_SIGNATURES });
        dispatch({ type: SET_TRACKING_EVENT, payload: "refreshSignatures" });

      break;

      case "load":
      default:
        dispatch({ type: GET_SIGNATURES });
        dispatch({ type: SET_TRACKING_EVENT, payload: "loadSignatures" });

      break;
    }

    api.signatures(token, signature_id)
      .then(response => {
        if(response.problem != null){
          getSignaturesFail(dispatch, response.problem);
        }else if(response.data.error != false){
          getSignaturesFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          if(type != "signature"){
            getSignaturesSuccess(dispatch, response.data.results.signatures);
          }else{
            if(response.data.results.signatures.length > 0){
              dispatch({
                type: GET_SIGNATURE_SUCCESS,
                payload: {signature: response.data.results.signatures[0]}
              });
            }
          }
        }
      });
  };
};


const getSignaturesFail = (dispatch, error) => {
  dispatch({ type: GET_SIGNATURES_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getSignaturesFail" });

};

const getSignaturesSuccess = (dispatch, signatures) => {
  dispatch({
    type: GET_SIGNATURES_SUCCESS,
    payload: {signatures}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getSignaturesSuccess" });

};


export const signatureInit = ({signature}) => {
  return {
    type: SIGNATURE_INIT,
    payload: {signature}
  };
};

export const signatureReset = () => {
  return {
    type: SIGNATURE_RESET
  }
}

export const signatureFieldChanged = ({ prop, value }) => {
  return {
    type: SIGNATURE_FIELD_CHANGED,
    payload: { prop, value }
  };
};



export const saveSignature = ({ token, signature_id, type, payload, edit_return_location }) => {
  return (dispatch) => {
    dispatch({type: IS_LOADING, payload: true});
    dispatch({ type: SAVE_SIGNATURE });
    dispatch({ type: SET_TRACKING_EVENT, payload: "saveSignature" });

    api.saveSignature(token, signature_id, type, payload)
      .then(response => {

        if(response.problem != null){
          saveSignatureFail(dispatch, response.problem);
        }else if(response.data.error != false){
          saveSignatureFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {

          if(response.data.results.signatures){

            if(type == "delete"){

              deleteSignatureSuccess(dispatch, signature_id)

            }else if(type == "update"){
              saveSignatureSuccess(dispatch, response.data.results.signatures[0], response.data.results.templates);
            }else if(type == "create"){
              createSignatureSuccess(dispatch, type, response.data.results.signatures, response.data.results.templates, response.data.results.user, edit_return_location);
            }else if(type == "onboarding" || type == "onboarding_new"){
              createSignatureSuccess(dispatch, type, response.data.results.signatures, response.data.results.templates, response.data.results.user);
            }else{
              dispatch({type: IS_LOADING, payload: false});
            }

          }else{
            saveSignatureFail(dispatch, "Something went wrong. Please try again.");
          }

        }
      });

  };
};

const saveSignatureFail = (dispatch, error) => {
  dispatch({ type: SAVE_SIGNATURE_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "saveSignatureFail" });

};
const deleteSignatureSuccess = (dispatch, signature_id) =>{
  dispatch({type: IS_LOADING, payload: false});
  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {message: "Your signature was successfully deleted", title: "Success!"}
  });

  dispatch({
    type: DELETE_SIGNATURE,
    payload: {signature_id}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "deleteSignatureSuccess" });


  appRedirect({dispatch, redirect: "goBack", payload: {type: "signatures"}})
}
const createSignatureSuccess = (dispatch, type, signatures, templates, user = null, edit_return_location) => {

  dispatch({type: IS_LOADING, payload: false});
  dispatch({
    type: CREATE_SIGNATURE_SUCCESS,
    payload: { type, signatures, templates, user }
  });

  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {message: "Your signature was successfully created!", title: "Success!"}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "createSignatureSuccess" });


  if(type == "onboarding"){


    dispatch({type: IS_LOADING, payload: false});
    dispatch({ type: SET_TRACKING_EVENT, payload: "createSignatureOnboardingSuccess" });

    dispatch({ type: TOGGLE_ONBOARDING, payload: false });
    appRedirect({dispatch, redirect: "goBack", payload:{remove: "onboarding-signature"}});

    dispatch({ type: SET_TRACKING_EVENT, payload: "intercom_set_signature" });

  }else{



    switch(edit_return_location){
      default:
      case null:
        appRedirect({dispatch, redirect: "goBack", payload: {type: "signatures"}})
      break;

      case "templates":

        appRedirect({dispatch, redirect: "goBack", payload: {type: "editTemplate"}})
      break;

      case "campaigns":
        appRedirect({dispatch, redirect: "goBack", payload: {type: "editCampaign"}})
      break;
    }
    dispatch({type: SET_EDIT_RETURN_LOCATION, payload: null});

  }

}
const saveSignatureSuccess = (dispatch, signature, templates) => {

    dispatch({
      type: SAVE_SIGNATURE_SUCCESS,
      payload: {signature, templates}
    });

    dispatch({type: IS_LOADING, payload: false});

    dispatch({
      type: SUCCESS_MESSAGE,
      payload: {message: "Your signature has been saved.", title: "Success!"}
    });

    dispatch({ type: SET_TRACKING_EVENT, payload: "saveSignatureSuccess" });


    appRedirect({dispatch, redirect: "goBack", payload: {type: "signatures"}})





};
