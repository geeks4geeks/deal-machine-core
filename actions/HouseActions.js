import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  OWNER_LOOKUP,
  OWNER_LOOKUP_FAIL,
  OWNER_LOOKUP_SUCCESS,
  HOUSE_RESET,
  SOFT_HOUSE_RESET,
  TOGGLE_HOUSE_ACTION_SHEET,
  INIT_HOUSE,
  UPDATE_HOUSE,
  UPDATE_HOUSE_SUCCESS,
  UPDATE_HOUSE_FAIL,
  UPDATE_HOUSE_LOCAL,
  CHANGE_HOUSE_TAB,
  OTHER_POSSIBLE_MATCHES_TOGGLE,
  OTHER_OWNER_LOOKUP,
  OTHER_OWNER_LOOKUP_FAIL,
  OTHER_OWNER_LOOKUP_SUCCESS,
  INIT_EDIT_HOUSE,
  EDIT_HOUSE_FIELD_CHANGE,
  TRIGGER_LOOKUP,
  EDIT_OPM,
  EDIT_OPM_FAIL,
  EDIT_OPM_SUCCESS,
  SENT_MAIL_COUNT_ADD,
  HIDE_CTA,
  TRIGGER_ACTIVITY_UPDATE,
  TOGGLE_EDIT_TAGS,
  EDIT_PROPERTY_TAGS,
  DELETE_DEAL,
  TOGGLE_ALL_ADDRESSES_SUCCESS,
  GET_SINGLE_DEAL,
  GET_SINGLE_DEAL_FAIL,
  GET_SINGLE_DEAL_SUCCESS,
  RELOAD_PREVIEWS,

  SET_TRACKING_EVENT,
  REDRAW_MARKERS,

  GOOGLE_STREET_VIEW_SUCCESS,
  TRIGGER_DEAL_CREDIT_RELOAD
} from 'app/DealMachineCore/types';

import { appRedirect } from 'app/NativeActions';
import { formatUsPhone, toTitleCase, ownerNameFormat } from './CommonFunctions';

import moment from "moment";

import API from 'app/DealMachineCore/apis/DealMachineAPI';
import PrivateAPI from 'app/DealMachineCore/apis/DealMachinePrivateAPI';

const dm_private_api = PrivateAPI.create();
const api = API.create();




export const getSingleDeal = ({ token, deal_id }) => {
  return (dispatch) => {

    dispatch({ type: GET_SINGLE_DEAL });
    dispatch({ type: SET_TRACKING_EVENT, payload: "getSingleDeal" });


    api.deals({token, search: "", begin: 0, limit: 25, deal_id})
      .then(response => {
        if(response.problem != null){
          getSingleDealFail(dispatch, response.problem);
        }else if(response.data.error != false){
          getSingleDealFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){

            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          if(response.data.results.deals.length > 0){
            getSingleDealSuccess(dispatch, response.data.results.deals[0], response.data.results.all_tags, response.data.results.all_statuses );
          }else{
            getSingleDealFail(dispatch, "This deal does not exist");
          }
        }
      });
  };
};


const getSingleDealFail = (dispatch, error) => {
  dispatch({ type: GET_SINGLE_DEAL_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "getSingleDealFail" });

}

const getSingleDealSuccess = (dispatch, deal, all_tags, all_statuses) => {


  dispatch({
    type: GET_SINGLE_DEAL_SUCCESS,
    payload: {
      info: deal,
      owner: {
        owner_name: deal.owner_name,
        owner_address: deal.owner_address,
        owner_address2: deal.owner_address2,
        owner_address_city: deal.owner_address_city,
        owner_address_state: deal.owner_address_state,
        owner_address_zip: deal.owner_address_zip,
        use_owner_address: deal.use_owner_address
      },
      more_info: deal.more_info ? deal.more_info : null,
      other_possible_matches: deal.other_possible_matches,
      all_tags: all_tags,
      all_statuses: all_statuses,
      tags: deal.tags
    }
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "getSingleDealSuccess" });


}

export const initEditAddress = ({address}) =>{

  var deal = {};

  deal["address_id"] = address.address_id;
  deal["owner_address"] = toTitleCase(address.address);
  if(address.address2){
    deal["owner_address2"] = toTitleCase(address.address2);
  }else{
    deal["owner_address2"] = "";
  }
  deal["owner_address_city"] = toTitleCase(address.address_city);
  deal["owner_address_state"] = address.address_state;
  deal["owner_address_zip"] = address.address_zip;
  deal["use_owner_address"] = address.address_send_mail;
  deal["bad_address"] = address.bad_address;

  return {
    type: INIT_EDIT_HOUSE,
    payload: {deal, originalAddress:address, newAddress: false}
  };
}

export const initNewAddress = () =>{

  var deal = {};

  deal["address_id"] = 0;
  deal["owner_address"] = "";
  deal["owner_address2"] = "";
  deal["owner_address_city"] = "";
  deal["owner_address_state"] = "";
  deal["owner_address_zip"] = "";
  deal["use_owner_address"] = 1;

  return {
    type: INIT_EDIT_HOUSE,
    payload: {deal, newAddress: true}
  };
}

export const initNewPhone = () =>{

  var deal = {};
  deal["phone_id"] = 0;
  deal["phone_number"] = "";
  deal["phone_type"] = "";
  deal["send_message"] = 1;
  deal["manual_phone"] = 1;

  return {
    type: INIT_EDIT_HOUSE,
    payload: {deal, newPhone: true}
  };
}

export const initEditPhone = ({phone}) =>{

  var deal = {};
  deal["phone_id"] = phone.phone_id;
  deal["phone_number"] = formatUsPhone(phone.number);
  deal["phone_type"] = phone.type;
  deal["send_message"] = phone.send_message;
  deal["manual_phone"] = phone.manual_phone;
  deal["bad_phone"] = phone.bad_phone;

  return {
    type: INIT_EDIT_HOUSE,
    payload: {deal, newPhone: false, originalPhone: phone}
  };
}

export const initNewEmail = () =>{

  var deal = {};
  deal["email_id"] = 0;
  deal["email"] = "";
  deal["label"] = "";
  deal["send_mail"] = 1;
  deal["manual_email"] = 1;

  return {
    type: INIT_EDIT_HOUSE,
    payload: {deal, newEmail: true}
  };
}

export const initEditEmail = ({email}) =>{

  var deal = {};
  deal["email_id"] = email.email_id;
  deal["email"] = email.email;
  deal["label"] = email.label;
  deal["send_mail"] = email.send_mail;
  deal["manual_email"] = email.manual_email;
  deal["bad_email"] = email.bad_email;

  return {
    type: INIT_EDIT_HOUSE,
    payload: {deal, newEmail: false, originalEmail: email}
  };
}


export const initEditHouse = ({info, owner}) =>{

  var deal = {};
  deal["address_id"] = 0;

  if(owner.owner_name){
    deal["owner_name"] = ownerNameFormat(owner.owner_name, info);
    deal["owner_address"] = toTitleCase(owner.owner_address);
    deal["owner_address2"] = toTitleCase(owner.owner_address2);
    deal["owner_address_city"] = toTitleCase(owner.owner_address_city);
    deal["owner_address_state"] = owner.owner_address_state;
    deal["owner_address_zip"] = owner.owner_address_zip;
    deal["use_owner_address"] = owner.use_owner_address;
  }

  if(info){
    deal["resend_freq"] = info.resend_freq;
    deal["resend_limit"] = info.resend_limit;
    deal["resend_freq_switch"] = info.resend_freq == 0 ? "off" : "on";
    deal["resend_limit_switch"] = info.resend_limit == 0 ? "on" : "off";
    deal["mail_template_id"] = info.mail_template_id;
    deal["mail_template_name"] = info.mail_template_name;
    deal["campaign_id"] = info.campaign_id;
    deal["campaign_title"] = info.campaign_title;
    deal["bad_address"] = info.bad_address;

    deal["closed_date"] = info.closed_date;
    deal["purchase_price"] = info.purchase_price;
    deal["purchase_exit_strategy"] = info.purchase_exit_strategy;
    deal["purchase_profit"] = info.purchase_profit;
    deal["purchase_notes"] = info.purchase_notes;


  }

  return {
    type: INIT_EDIT_HOUSE,
    payload: {deal}
  };
}

export const editHouseFieldChange = ({ prop, value }) => {
  return {
    type: EDIT_HOUSE_FIELD_CHANGE,
    payload: { prop, value }
  };
};

export const initHouse = ({deal}) => {

  if(deal){

    return {
      type: INIT_HOUSE,
      payload: {
        info: deal,
        owner: {
          owner_name: deal.owner_name,
          owner_address: deal.owner_address,
          owner_address2: deal.owner_address2,
          owner_address_city: deal.owner_address_city,
          owner_address_state: deal.owner_address_state,
          owner_address_zip: deal.owner_address_zip,
          use_owner_address: deal.use_owner_address
        },
        more_info: deal.more_info ? deal.more_info : null,
        other_possible_matches: deal.other_possible_matches,
        tags: deal.tags
      }
    };

  }

};
export const changeHouseTab = (tab) => {
  return {
    type: CHANGE_HOUSE_TAB,
    payload: tab
  };
};

export const otherPossibleMatchesToggle = (toggle) => {
  return {
    type: OTHER_POSSIBLE_MATCHES_TOGGLE,
    payload: toggle
  };
};

export const softHouseReset = () => {
  return {
    type: SOFT_HOUSE_RESET
  };
};

export const houseReset = () => {
  return {
    type: HOUSE_RESET
  };
};

export const toggleHouseActionSheet = (sheet) => {
  return {
    type: TOGGLE_HOUSE_ACTION_SHEET,
    payload: sheet
  };
};


export const ownerLookup = ({ token, deal_id }) => {
  return (dispatch) => {
    dispatch({ type: OWNER_LOOKUP, payload: { deal_id } });

    dispatch({
      type: REDRAW_MARKERS,
      payload:[deal_id]
    });

    dispatch({ type: SET_TRACKING_EVENT, payload: "ownerLookup" });


    api.lookup(token, deal_id, null)
      .then(response => {
        if(response.problem != null){
          ownerLookupFail(dispatch, deal_id, response.problem);
        }else if(response.data.error != false){
          ownerLookupFail(dispatch, deal_id, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          ownerLookupSuccess(dispatch, deal_id, response.data.results.owner, response.data.results.owner_status_info, response.data.results.more_info, response.data.results.other_possible_matches, response.data.results.other_possible_matches_tried, response.data.results.corp_owner);
        }
      });
  };
};

const ownerLookupFail = (dispatch, deal_id, error) => {
  dispatch({ type: OWNER_LOOKUP_FAIL, payload: {deal_id, error} });
  dispatch({ type: SET_TRACKING_EVENT, payload: "ownerLookupFail" });

}

const ownerLookupSuccess = (dispatch, deal_id, owner, owner_status_info, more_info, other_possible_matches, other_possible_matches_tried, corp_owner) => {
  dispatch({
    type: OWNER_LOOKUP_SUCCESS,
    payload: {deal_id, owner, owner_status_info, more_info, other_possible_matches, other_possible_matches_tried, corp_owner}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "ownerLookupSuccess" });


  dispatch({
    type: REDRAW_MARKERS,
    payload:[deal_id]
  });

}







export const editOPM = ({ token, deal_id, type, payload }) => {

  return (dispatch) => {


    dispatch({type: IS_LOADING, payload: true});
    dispatch({ type: EDIT_OPM });

    dispatch({ type: SET_TRACKING_EVENT, payload: "editOPM" });


    switch(type){
      case "toggle_address":
        appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal_id}});

      break;

      case "toggle_phone":
        appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal_id}});
      break;
    }

    api.opm(token, deal_id, type, payload)
      .then(response => {

        if(response.problem != null){
          editOPMFail(dispatch, response.problem);

        }else if(response.data.error != false){
          editOPMFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          editOPMSuccess(dispatch, type, payload, deal_id, response.data.results.other_possible_matches, response.data.results.change_log, response.data.results.billing);
        }
      });
  };
};



const editOPMFail = (dispatch, error) => {

  dispatch({ type: EDIT_OPM_FAIL, payload: error });

  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "editOPMFail" });

}

const editOPMSuccess = (dispatch, type, payload, deal_id, other_possible_matches, change_log, billing) => {

  dispatch({
    type: EDIT_OPM_SUCCESS,
    payload: { deal_id, other_possible_matches, billing }
  });

  dispatch({
    type: REDRAW_MARKERS,
    payload:[deal_id]
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "editOPMSuccess" });


  switch(type){
    default:
      dispatch({type: IS_LOADING, payload: false});
    break;
    case "toggle_all_addresses":
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've added all addresses to the mail queue. They'll be sent once you approve the deal or on your next repeating mail cycle.", title: "Success!", change_log: change_log}
      });
      dispatch({type: TOGGLE_ALL_ADDRESSES_SUCCESS, payload: {deal_id}});
    break;
    case "toggle_address":
      if(payload.value == 1){
        dispatch({
          type: SUCCESS_MESSAGE,
          payload: {message: "You've added this address to the mail queue.", title: "Success!", change_log: change_log}
        });
      }else{
        dispatch({
          type: SUCCESS_MESSAGE,
          payload: {message: "You've removed this address from the mail queue.", title: "Success!", change_log: change_log}
        });
      }

    break;

    case "toggle_phone":
      dispatch({type: IS_LOADING, payload: false});

    break;
    case "edit_address":
      appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal_id}});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated the address.", title: "Success!", change_log: change_log}
      });
    break;

    case "new_address":
      appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal_id}});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully added the address.", title: "Success!", change_log: change_log}

      });
    break;

    case "remove_address":
      appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal_id}});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully removed the address.", title: "Success!", change_log: change_log}

      });
    break;

    case "edit_phone":
      appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal_id}});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated the phone number.", title: "Success!", change_log: change_log}

      });
    break;

    case "new_phone":
      appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal_id}});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully added a phone number.", title: "Success!", change_log: change_log}
      });
    break;

    case "remove_phone":
      appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal_id}});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully removed the phone number.", title: "Success!", change_log: change_log}
      });
    break;

    case "edit_email":
      appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal_id}});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated the email address.", title: "Success!", change_log: change_log}

      });
    break;

    case "new_email":
      appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal_id}});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully added an email address.", title: "Success!", change_log: change_log}
      });
    break;

    case "remove_email":
      appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal_id}});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully removed the email address.", title: "Success!", change_log: change_log}
      });
    break;


  }

}




export const otherOwnerLookup = ({ token, deal_id }) => {
  return (dispatch) => {
    dispatch({ type: OTHER_OWNER_LOOKUP });
    dispatch({ type: SET_TRACKING_EVENT, payload: "enhancedSearch" });

    api.lookup(token, deal_id, "yes")
      .then(response => {

        if(response.problem != null){
          otherOwnerLookupFail(dispatch, deal_id, response.problem);
        }else if(response.data.error != false){
          otherOwnerLookupFail(dispatch, deal_id, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          otherOwnerLookupSuccess(dispatch, deal_id, response.data.results.other_possible_matches, response.data.results.other_possible_matches_tried, response.data.results.corp_owner, response.data.results.billing);
        }
      });
  };
};

const otherOwnerLookupFail = (dispatch, deal_id, error) => {
  dispatch({ type: OTHER_OWNER_LOOKUP_FAIL, payload: {deal_id, error} });
  dispatch({
    type: TRIGGER_ACTIVITY_UPDATE,
    payload: true
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "enhancedSearchFail" });

}

const otherOwnerLookupSuccess = (dispatch, deal_id, other_possible_matches, other_possible_matches_tried, corp_owner, billing) => {
  dispatch({
    type: OTHER_OWNER_LOOKUP_SUCCESS,
    payload: {deal_id, other_possible_matches, other_possible_matches_tried, corp_owner, billing}
  });
  dispatch({
    type: TRIGGER_ACTIVITY_UPDATE,
    payload: true
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "enhancedSearchSuccess" });

  dispatch({
    type: REDRAW_MARKERS,
    payload:[deal_id]
  });


}


export const updateHouse = ({ token, deal_id, type, payload, onSuccess = null, property_id }) => {
  return (dispatch) => {

    dispatch({type: IS_LOADING, payload: true});
    dispatch({type: UPDATE_HOUSE});

    dispatch({ type: SET_TRACKING_EVENT, payload: "updateHouse" });


    if(type == "property_address"){
      appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal_id}});
    }

    var api_type = type;
    if(type == "approve_main"){
      api_type = "approve";
    }else if(type == "pause_main"){
      api_type = "pause";
    }else if(type == "won_deal"){
      api_type = "deal_status";
    }
    api.editDeal(token, deal_id, api_type, payload)
      .then(response => {

        if(response.problem != null){
          updateHouseFail(dispatch, response.problem);
        }else if(response.data.error != false){
          updateHouseFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          if(onSuccess){
            onSuccess();
          }
          updateHouseSuccess(dispatch, response.data.results.deals, response.data.results.change_log, response.data.results.billing, response.data.results.badges, type, property_id);
        }
      });
  };
};


const updateHouseFail = (dispatch, error) => {
  dispatch({ type: UPDATE_HOUSE_FAIL, payload: error });


  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "updateHouseFail" });

}

const updateHouseSuccess = (dispatch, deals, change_log, billing, badges, type, property_id) => {


  var deal = null;
  if(deals.length > 0){
    deal = deals[0];
  }

  dispatch({
    type: UPDATE_HOUSE_SUCCESS,
    payload: {
      deal: deal,
      info: deal,
      owner: {
        owner_name: deal.owner_name,
        owner_address: deal.owner_address,
        owner_address2: deal.owner_address2,
        owner_address_city: deal.owner_address_city,
        owner_address_state: deal.owner_address_state,
        owner_address_zip: deal.owner_address_zip,
        use_owner_address: deal.use_owner_address
      },
      more_info: deal.more_info ? deal.more_info : null,
      other_possible_matches: deal.other_possible_matches,
      tags: deal.tags,
      billing: billing,
      purchase_price: deal.purchase_price,
      purchase_exit_strategy: deal.purchase_exit_strategy,
      purchase_profit: deal.purchase_profit,
      purchase_notes: deal.purchase_notes,
      badges: badges
    }
  });

  switch(type){
    default:
      dispatch({type: IS_LOADING, payload: false});
    break;

    case 'delete':
      appRedirect({dispatch, redirect: "goBack", payload: {remove: "property", property_id: property_id}});

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've permanently deleted the deal.", title: "Success!", change_log: change_log}
      });

      dispatch({
        type: DELETE_DEAL,
        payload: {
          deal_id: deal.id,
          property_id: property_id
        }
      });

    break;

    case 'close':
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully closed the deal.", title: "Success!", change_log: change_log}
      });
      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });
    break;

    case 'open':
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully opened the deal.", title: "Success!", change_log: change_log}
      });
      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });
    break;

    case 'archive':
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully sent this deal to the trash", title: "Success!", change_log: change_log}
      });
      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });

    break;

    case 'unarchive':
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully restored this deal.", title: "Success!", change_log: change_log}
      });
      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });

    break;
    case 'approve_main':

  
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your mail has been placed in the send queue.", title: "Success!", change_log: change_log}
      });

      dispatch({
        type: TRIGGER_DEAL_CREDIT_RELOAD,
        payload: true
      });

    break;
    case 'approve':
    case 'approve_all':

      dispatch({type: IS_LOADING, payload: false});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your mail has been placed in the send queue.", title: "Success!", change_log: change_log}
      });
      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });
      dispatch({
        type: SENT_MAIL_COUNT_ADD
      });

      dispatch({
        type: TRIGGER_DEAL_CREDIT_RELOAD,
        payload: true
      });




    break;

    case 'pause_main':

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your mailers have been paused. You can resume at anytime.", title: "Success!", change_log: change_log}

      });

      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });

      dispatch({
        type: TRIGGER_DEAL_CREDIT_RELOAD,
        payload: true
      });

    break;

    case 'pause':
    case 'unapprove':

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your mailers have been paused. You can resume at anytime.", title: "Success!", change_log: change_log}

      });
      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });

      dispatch({
        type: TRIGGER_DEAL_CREDIT_RELOAD,
        payload: true
      });

    break;

    case 'tags':

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated the Property Tags for this deal.", title: "Success!", change_log: change_log}

      });

      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });

    break;

    case "template":
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated your deal's mail template.", title: "Success!", change_log: change_log}
      });
      appRedirect({dispatch, redirect: "goBack", payload: {type: "mailing_options", deal_id: deal.id}});

      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });

    break;


    case "repeat_mail":
    case "repeat_options":
    case "mailing_options":
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated your deal's Mailing Mail options", title: "Success!", change_log: change_log}
      });
      appRedirect({dispatch, redirect: "goBack", payload: {remove: "mailing-options"}});

      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });
    break;

    case "property_address":
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated the property address.", title: "Success!", change_log: change_log}
      });

      dispatch({
        type: TRIGGER_LOOKUP,
        payload: true
      });

      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });

    break;

    case "owner":
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated the owner information.", title: "Success!", change_log: change_log}
      });
      appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal.id}});

      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });

    break;

    case "deal_status":
      appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal.id}});
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated this deals status.", title: "Success!", change_log: change_log}
      });

      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });

    break;

    case "won_deal":
      dispatch({type: IS_LOADING, payload: false});

      appRedirect({dispatch, redirect: "goBack", payload: {type: "deal", id: deal.id}});

      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });
    break;

    case "purchase_details":
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated this deal's purchase details.", title: "Success!", change_log: change_log}
      });
      appRedirect({dispatch, redirect: "goBack", payload: {remove: "purchase-details"}});

      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });

    break;

    case "edit_photo":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated this deal's photo.", title: "Success!", change_log: change_log}
      });

      dispatch({
        type: TRIGGER_ACTIVITY_UPDATE,
        payload: true
      });

    break;

  }




  dispatch({
    type: REDRAW_MARKERS,
    payload:[deal.id]
  });

  dispatch({
    type: RELOAD_PREVIEWS,
    payload:{
      date: moment().format("X"),
      reload: true,
      reloadId: deal.id
    }
  })

  dispatch({ type: SET_TRACKING_EVENT, payload: "updateHouseSuccess_"+type });
}

export const updateHouseLocal = ({ prop, value, success }) => {

  return (dispatch) => {
    dispatch ({
      type: UPDATE_HOUSE_LOCAL,
      payload: { prop, value }
    });

    switch(prop){
      case "approved":
        if(value == 1 && success == true){
          dispatch({
            type: SUCCESS_MESSAGE,
            payload: {message: "Your mail has been placed in the send queue.", title: "Success!"}
          });
        }
      break;
    }
  };

};

export const hideCTA = ({token, deal_id}) => {

    return (dispatch) => {

      dispatch ({type: HIDE_CTA});

      api.editDeal(token, deal_id, "hide_cta")
        .then(response => {
          if(response.problem != null){
            //updateHouseFail(dispatch, response.problem);
          }else if(response.data.error != false){
            //updateHouseFail(dispatch, response.data.error);
            if(response.data.valid == "invalid"){
              dispatch({ type: TRIGGER_LOGOUT, payload: true });
            }
          } else {
            updateHouseSuccess(dispatch, response.data.results.deals, null, response.data.results.billing, response.data.results.badges, null);
          }
        });

    };
}

export const toggleEditTags = (toggle) =>{
  return {
    type: TOGGLE_EDIT_TAGS,
    payload: toggle
  }
}

export const editPropertyTags = (tags) => {
  return {
    type: EDIT_PROPERTY_TAGS,
    payload: tags
  }
}

export const getGoogleStreetView = ({token, deal_id}) => {
  return (dispatch) => {

    dispatch({type: IS_LOADING, payload: true});

    dm_private_api.generateStreetViewImage({token, deal_id})
      .then(response => {
        if(response.problem != null){
          getGoogleStreetViewFail(dispatch, response.problem);
        }else if(response.data.error != false){
          getGoogleStreetViewFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          getGoogleStreetViewSuccess(dispatch, response.data.results, deal_id);
        }
      });

  };
}

const getGoogleStreetViewFail = (dispatch, error) =>{

  dispatch({type: IS_LOADING, payload: false});

  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });


}

const getGoogleStreetViewSuccess = (dispatch, results, deal_id) =>{

  dispatch({type: IS_LOADING, payload: false});

  dispatch({
    type: GOOGLE_STREET_VIEW_SUCCESS,
    payload: {deal_id: deal_id, image: results.image}
  });


  dispatch({
    type: TRIGGER_ACTIVITY_UPDATE,
    payload: true
  });
}
