import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,

  GET_OWNER_INFO,
  GET_OWNER_INFO_FAIL,
  GET_OWNER_INFO_SUCCESS,

  UPDATE_OWNER_INFO,
  UPDATE_OWNER_INFO_FAIL,
  UPDATE_OWNER_INFO_SUCCESS,

  TRIGGER_ACTIVITY_UPDATE,
  TRIGGER_DEAL_CREDIT_RELOAD
} from 'app/DealMachineCore/types';

import { appRedirect } from 'app/NativeActions';

import api from 'app/DealMachineCore/apis/DealMachineAPIV2';
const dm_api = api.create();

export const getOwnerInfo = ({ token, deal_id }) => {
  return (dispatch) => {

    dispatch({ type: GET_OWNER_INFO });

    dm_api.getOwnerInfo({
      token,
      deal_id
    })
      .then(response => {

        if(response.problem != null){

          dispatch({ type: GET_OWNER_INFO_FAIL, payload: response.problem });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.problem, title: "Error"}
          });

        }else if(response.data.error != false){

          dispatch({ type: GET_OWNER_INFO_FAIL, payload: response.data.error });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.data.error, title: "Error"}
          });

          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          dispatch({ type: GET_OWNER_INFO_SUCCESS, payload: response.data.results });
        }
      });
    };

};

export const updateOwnerInfo = ({ token, type, deal_id, owner_mailing_address_id, owner_phone_number_id, owner_email_address_id, owner_name, address,
address2, city, state, zip, send_to_address, phone_label, phone_number, bad_phone, email_label, email_address, onSuccess = null }) => {
  return (dispatch) => {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: UPDATE_OWNER_INFO });

    dm_api.updateOwnerInfo({
      token,
      type,
      deal_id,
      owner_mailing_address_id,
      owner_phone_number_id,
      owner_email_address_id,
      owner_name,
      address,
      address2,
      city,
      state,
      zip,
      send_to_address,
      phone_label,
      phone_number,
      bad_phone,
      email_label,
      email_address
    })
      .then(response => {
        if(response.problem != null){
          dispatch({ type: UPDATE_OWNER_INFO_FAIL });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.problem , title: "Error"}
          });
        }else if(response.data.error != false){
          dispatch({ type: UPDATE_OWNER_INFO_FAIL });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.data.error , title: "Error"}
          });

          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{

          if(onSuccess){
            onSuccess();
          }

          dispatch({ type: UPDATE_OWNER_INFO_SUCCESS, payload: response.data.results });
          if(type === "skip_trace"){
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: {message: "You've successfully skip traced this owner", title: "Success!"}
            });
          }else if(type === "edit_property_address" || type == "restore_property_address"){
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: {message: "You've successfully updated this lead's property address.", title: "Success!"}
            });
          }else{
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: {message: "You've successfully updated this owner's information", title: "Success!"}
            });
          }
          switch(type){

            case "skip_trace":
              dispatch({
                type: TRIGGER_ACTIVITY_UPDATE,
                payload: true
              });
              dispatch({
                type: TRIGGER_DEAL_CREDIT_RELOAD,
                payload: true
              });

            break;

            case "edit_property_address":
              appRedirect({dispatch, redirect: "goBack", payload: {remove: "edit-property-address"}});
            break;

            case "owner_name_and_address":
              appRedirect({dispatch, redirect: "goBack", payload: {remove: "add-owner"}});
            break;

            case "edit_owner_name_and_address":
              appRedirect({dispatch, redirect: "goBack", payload: {remove: "edit-owner"}});
            break;

            case "create_mailing_address":
              appRedirect({dispatch, redirect: "goBack", payload: {remove: "add-owner-mailing-address"}});
            break;

            case "edit_mailing_address":
            case "remove_mailing_address":
              appRedirect({dispatch, redirect: "goBack", payload: {remove: "edit-owner-mailing-address"}});
            break;

            case "create_phone_number":
              appRedirect({dispatch, redirect: "goBack", payload: {remove: "add-owner-phone-number"}});
            break;

            case "edit_phone_number":
            case "remove_phone_number":
              appRedirect({dispatch, redirect: "goBack", payload: {remove: "edit-owner-phone-number"}});
            break;

            case "create_email_address":
              appRedirect({dispatch, redirect: "goBack", payload: {remove: "add-owner-email-address"}});
            break;

            case "edit_email_address":
            case "remove_email_address":
              appRedirect({dispatch, redirect: "goBack", payload: {remove: "edit-owner-email-address"}});
            break;




          }

        }
      });
    };

};


export const determineDisplayProperty = (property) => {

  if(property.deal){
    if(property.deal.property_address && property.deal.property_address !== "" && (
      property.deal.property_address !== property.property_address ||
      property.deal.property_address2 !== property.property_address2 ||
      property.deal.property_address_city !== property.property_address_city ||
      property.deal.property_address_state !== property.property_address_state ||
      property.deal.property_address_zip !== property.property_address_zip
    )){
      return {
        custom_property: true,
        property_address: property.deal.property_address,
        property_address2: property.deal.property_address2,
        property_address_city: property.deal.property_address_city,
        property_address_state: property.deal.property_address_state,
        property_address_zip: property.deal.property_address_zip,
        property_address_full: property.deal.property_address_full,
      }

    }
  }

  return {
    custom_property: false,
    property_address: property.property_address,
    property_address2: property.property_address2,
    property_address_city: property.property_address_city,
    property_address_state: property.property_address_state,
    property_address_zip: property.property_address_zip,
    property_address_full: property.property_address_full,

  }

}

export const determineMainOwnerInfo = (property) => {

  //if(!property.owner_name || property.owner_name === ""){
  if(property.deal){

    if(property.deal.owner_name && property.deal.owner_name !== ""
    && property.deal.custom_owner == true){
      return {
        owner_name: property.deal.owner_name,
        owner_firstname: property.deal.owner_firstname,
        owner_lastname: property.deal.owner_lastname,
        owner_middlename: property.deal.owner_middlename,
        owner_name_suffix: property.deal.owner_name_suffix,

        owner_address: property.deal.owner_address,
        owner_address2: property.deal.owner_address2,
        owner_address_city: property.deal.owner_address_city,
        owner_address_state: property.deal.owner_address_state,
        owner_address_zip: property.deal.owner_address_zip,

        owner_status_info: property.deal.owner_status_info,
        corp_owner: property.deal.owner_status_info ? property.deal.owner_status_info.corp_owner : 0,

        send_to_owner_address: property.deal.send_to_owner_address ? property.deal.send_to_owner_address : 1,

        did_skip_trace: property.deal.did_skip_trace ? property.deal.did_skip_trace : 0,
        skip_trace_successful: property.deal.skip_trace_successful ? property.deal.skip_trace_successful : 0,
        skip_trace_owner_name: property.deal.skip_trace_owner_name ? property.deal.skip_trace_owner_name : "",
        custom_owner: property.deal.custom_owner
      }

    }
  }
  //}

  return {
    owner_name: property.owner_name,
    custom_owner: false,

    owner_firstname: property.owner_firstname,
    owner_lastname: property.owner_lastname,
    owner_middlename: property.owner_middlename,
    owner_name_suffix: property.owner_name_suffix,

    owner_address: property.owner_address,
    owner_address2: property.owner_address2,
    owner_address_city: property.owner_address_city,
    owner_address_state: property.owner_address_state,
    owner_address_zip: property.owner_address_zip,

    owner_status_info: property.owner_status_info,
    corp_owner: property.owner_status_info ? property.owner_status_info.corp_owner : 0,

    send_to_owner_address: property.deal ? property.deal.send_to_owner_address : 1,
    did_skip_trace: property.deal ? property.deal.did_skip_trace : 0,
    skip_trace_successful: property.deal ? property.deal.skip_trace_successful : 0,
    skip_trace_owner_name: property.deal ? property.deal.skip_trace_owner_name : ""

  }

}
