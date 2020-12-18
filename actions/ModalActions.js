import {
  TRIGGER_LOGOUT,
  TOGGLE_MODAL,
  START_MODAL_FADE,
  SET_MODAL,
  SET_PLAN_MODAL,
  TOGGLE_PLAN_MODAL,
  SUCCESS_MESSAGE,
  RESET_SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  RESET_ERROR_MESSAGE,
  IS_LOADING,
  SET_LOADING_MESSAGE,
  SHOW_NOTIFICATION,
  SET_NOTIFICATION,
  TOGGLE_REDIRECT,
  UNDO_ACTION,
  UNDO_ACTION_FAIL,
  UNDO_ACTION_SUCCESS,

  UPDATE_HOUSE_SUCCESS,
  SAVE_EDIT_DEALS_SUCCESS,
  TRIGGER_ACTIVITY_UPDATE,

  EDIT_OPM_SUCCESS,

  SET_TRACKING_EVENT,

  TOGGLE_DEAL_CREDIT_MODAL,

  UPDATE_LEAD_SUCCESS,
  SET_EDIT_MODAL
} from 'app/DealMachineCore/types';

import APIV2 from 'app/DealMachineCore/apis/DealMachineAPIV2';
const apiv2 = APIV2.create();

export const toggleModal = ({show, type}) => {
  return {
    type: TOGGLE_MODAL,
    payload: {show, type}
  };
};

export const toggleDealCreditModal = (toggle) => {
  return {
    type: TOGGLE_DEAL_CREDIT_MODAL,
    payload: toggle
  };
};


export const startFadeOut = () => {
  return {
    type: START_MODAL_FADE
  };
};

export const setModal = ({title, description, icon, image = "", onPress, submit, buttonType, onCancel, cancel}) => {
  return {
    type: SET_MODAL,
    payload: {title, description, icon, image, onPress, submit, buttonType, cancel, onCancel}
  };
};

export const showNotification = (toggle) => {
  return {
    type: SHOW_NOTIFICATION,
    payload: toggle
  };
};

export const setNotification = ({type, title, subtitle, text, onPress, image, email}) => {
  return {
    type: SET_NOTIFICATION,
    payload: {type, title, subtitle, text, onPress, image, email}
  };
};

export const setPlanModal = ({ plan }) => {
  return {
    type: SET_PLAN_MODAL,
    payload: { plan }
  };
};

export const togglePlanModal = (toggle) => {
  return {
    type: TOGGLE_PLAN_MODAL,
    payload: toggle
  };
};

export const resetSuccessMessage = () => {
  return {
    type: RESET_SUCCESS_MESSAGE
  };
};

export const showSuccess = (message, title) => {
  return {
    type: SUCCESS_MESSAGE,
    payload: {message, title}
  };
}

export const resetErrorMessage = () => {
  return {
    type: RESET_ERROR_MESSAGE
  };
};

export const showErrorMessage = (message, title) => {
  return {
    type: ERROR_MESSAGE,
    payload: {message, title}
  };
}

export const setLoadingMessage = (message, title) => {
  return {
    type: SET_LOADING_MESSAGE,
    payload: {message, title}
  };
};

export const isLoading = (toggle) => {
  return {
    type: IS_LOADING,
    payload: toggle
  };
};

export const toggleRedirect = ({type, data}) => {
  return {
    type: TOGGLE_REDIRECT,
    payload: {type, data}
  };
};

export const undoAction = ({token, change_group_id}) => {
  return (dispatch) => {

    dispatch({type: IS_LOADING, payload: true});
    dispatch({ type: UNDO_ACTION });

    dispatch({ type: SET_TRACKING_EVENT, payload: "undo" });


    apiv2.undoAction(token, change_group_id)
      .then(response => {
        if(response.problem != null){
          undoActionFail(dispatch, response.problem);
        }else if(response.data.error != false){
          undoActionFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          undoActionSuccess(dispatch, response.data.results);
        }
      });
  };
}


const undoActionFail = (dispatch, error) => {
  dispatch({ type: UNDO_ACTION_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "undoFail" });

}

const undoActionSuccess = (dispatch, results) => {

  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {message: "Undo successful.", title: "Success!", change_log:null}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "undoSuccess_"+results.item_type });


  //what type of action what it? Update redux accordingly
  if(results.item_type){
    switch(results.item_type){
      case "opm":

        /*
        if(results.other_possible_matches && results.deal_id){
          dispatch({
            type: EDIT_OPM_SUCCESS,
            payload: {
              deal_id: results.deal_id,
              other_possible_matches: results.other_possible_matches }
          });
        }
        */

      break;
      case "houses":

        dispatch({
          type: UPDATE_LEAD_SUCCESS,
          payload: { properties: results.properties }
        });

      break;

    }

  }
}

export const setEditModal = ({title, description, slug, type, fields, save_button_text,
  modalAction = null, cancelAction = null, fieldsUpdated=null, always_save = false,
  can_remove = false, remove_button_text, remove_button_description, removeAction = null,
  popoverTarget = null, popoverPlacement = null}) => {
  return{
    type: SET_EDIT_MODAL,
    payload: {
      title,
      description,

      slug,
      type,

      fields,
      save_button_text,

      always_save,
      can_remove,
      remove_button_text,
      remove_button_description,
      removeAction,

      modalAction,
      cancelAction,
      fieldsUpdated,

      popoverTarget,
      popoverPlacement
    }
  }
}
