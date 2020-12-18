import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  GET_TEMPLATES,
  GET_TEMPLATES_FAIL,
  GET_TEMPLATES_SUCCESS,
  GET_TEMPLATE,
  GET_TEMPLATE_SUCCESS,
  REFRESH_TEMPLATES,
  TEMPLATE_INIT,
  TEMPLATE_FIELD_CHANGED,
  TEMPLATE_RESET,
  SAVE_TEMPLATE,
  SAVE_TEMPLATE_SUCCESS,
  CREATE_TEMPLATE_SUCCESS,
  SAVE_TEMPLATE_FAIL,
  GET_PREVIEW,
  GET_PREVIEW_FAIL,
  GET_PREVIEW_SUCCESS,
  RESET_PREVIEW,
  PREVIEW_IMAGE_LOADED,
  SELECT_DEFAULT_TEMPLATE,
  SET_PREVIEW_TYPE,
  DELETE_TEMPLATE,
  SHOW_TEMPLATE_PREVIEW,
  RELOAD_PREVIEWS,
  SET_EDIT_RETURN_LOCATION,
  GENERATE_PREVIEW_IMAGES,
  GENERATE_PREVIEW_IMAGES_SUCCESS,
  GENERATE_PREVIEW_IMAGES_FAIL,
  SET_TRACKING_EVENT
} from "app/DealMachineCore/types";

import { appRedirect } from "app/NativeActions";

import moment from "moment";

import API from "app/DealMachineCore/apis/DealMachineAPI";
import PrivateAPI from "app/DealMachineCore/apis/DealMachinePrivateAPI";
const api_private = PrivateAPI.create();
const api = API.create();

export const getTemplates = ({ token, type, template = null, team }) => {
  return dispatch => {
    switch (type) {
      case "template":
        dispatch({ type: GET_TEMPLATE });
        dispatch({ type: SET_TRACKING_EVENT, payload: "getTemplate" });

        break;

      case "refresh":
        dispatch({ type: REFRESH_TEMPLATES });
        dispatch({ type: SET_TRACKING_EVENT, payload: "refreshTemplates" });

        break;

      case "load":
      default:
        dispatch({ type: GET_TEMPLATES });
        dispatch({ type: SET_TRACKING_EVENT, payload: "getTemplates" });

        break;
    }

    api.templates(token, template, team).then(response => {
      if (response.problem != null) {
        getTemplatesFail(dispatch, response.problem);
      } else if (response.data.error != false) {
        getTemplatesFail(dispatch, response.data.error);
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        if (type != "template") {
          getTemplatesSuccess(
            dispatch,
            response.data.results.templates,
            response.data.results.html_templates,
            response.data.results.html_template_types,
            response.data.results.signatures
          );
        } else {
          if (response.data.results.templates.length > 0) {
            dispatch({
              type: GET_TEMPLATE_SUCCESS,
              payload: {
                template: response.data.results.templates[0],
                html_templates: response.data.results.html_templates,
                html_template_types: response.data.results.html_template_types,
                signatures: response.data.results.signatures
              }
            });
          }
        }
      }
    });
  };
};

export const setPreviewType = ({ type, id }) => {
  return {
    type: SET_PREVIEW_TYPE,
    payload: { type, id }
  };
};
const getTemplatesFail = (dispatch, error) => {
  dispatch({ type: GET_TEMPLATES_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getTemplatesFail" });
};

const getTemplatesSuccess = (
  dispatch,
  templates,
  html_templates,
  html_template_types,
  signatures
) => {
  dispatch({
    type: GET_TEMPLATES_SUCCESS,
    payload: { templates, html_templates, html_template_types, signatures }
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getTemplatesSuccess" });
};

export const templateInit = ({ template }) => {
  return {
    type: TEMPLATE_INIT,
    payload: { template }
  };
};

export const templateReset = () => {
  return {
    type: TEMPLATE_RESET
  };
};

export const templateFieldChanged = ({ prop, value }) => {
  return {
    type: TEMPLATE_FIELD_CHANGED,
    payload: { prop, value }
  };
};

export const selectDefaultTemplate = toggle => {
  return {
    type: SELECT_DEFAULT_TEMPLATE,
    payload: toggle
  };
};

export const saveTemplate = ({
  token,
  template_id,
  type,
  payload,
  edit_return_location,
  deal_id
}) => {
  return dispatch => {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: SAVE_TEMPLATE });
    dispatch({ type: SET_TRACKING_EVENT, payload: "getTemplate" });

    api.saveTemplate(token, template_id, type, payload).then(response => {
      if (response.problem != null) {
        saveTemplateFail(dispatch, response.problem);
      } else if (response.data.error != false) {
        saveTemplateFail(dispatch, response.data.error);
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        if (response.data.results.templates) {
          if (type == "delete") {
            deleteTemplateSuccess(dispatch, template_id);
          } else if (type == "update") {
            saveTemplateSuccess(dispatch, response.data.results.templates[0]);
          } else if (type == "create" || type == "duplicate") {
            createTemplateSuccess(
              dispatch,
              type,
              response.data.results.templates,
              response.data.results.html_templates,
              response.data.results.html_template_types,
              response.data.results.signatures,
              edit_return_location,
              deal_id,
              response.data.results.new_template_id,
              response.data.results.new_template_title
            );
          } else {
            dispatch({ type: IS_LOADING, payload: false });
          }
        } else {
          saveTemplateFail(dispatch, "Something went wrong. Please try again.");
        }
      }
    });
  };
};

const saveTemplateFail = (dispatch, error) => {
  dispatch({ type: SAVE_TEMPLATE_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getTemplateFail" });
};
const deleteTemplateSuccess = (dispatch, template_id) => {
  dispatch({ type: IS_LOADING, payload: false });
  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {
      message: "Your template was successfully deleted",
      title: "Success!"
    }
  });

  dispatch({
    type: DELETE_TEMPLATE,
    payload: { template_id }
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "deleteTemplateSuccess" });

  appRedirect({ dispatch, redirect: "goBack", payload: { type: "templates" } });
};
const createTemplateSuccess = (
  dispatch,
  type,
  templates,
  html_templates,
  html_template_types,
  signatures,
  edit_return_location = null,
  deal_id = 0,
  new_template_id,
  new_template_title
) => {
  dispatch({ type: IS_LOADING, payload: false });
  dispatch({
    type: CREATE_TEMPLATE_SUCCESS,
    payload: {
      templates,
      html_templates,
      html_template_types,
      signatures,
      new_template_id,
      new_template_title
    }
  });
if(type == "create"){
  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {
      message: "Your mail template was successfully created!",
      title: "Success!"
    }
  });
}else if(type == "duplicate"){
  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {
      message: "Your mail template was successfully copied!",
      title: "Success!"
    }
  });
}


  dispatch({ type: SET_TRACKING_EVENT, payload: "createTemplateSuccess" });

  switch (edit_return_location) {
    default:
    case null:
      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { type: "templates" }
      });
      break;

    case "campaigns":
      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { type: "campaigns" }
      });
      break;

    case "sending_options":
      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { type: "sending_options" }
      });
      break;

    case "mailing_options":
      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { type: "mailing_options", deal_id: deal_id }
      });
      break;
  }

  dispatch({ type: SET_EDIT_RETURN_LOCATION, payload: null });
};
const saveTemplateSuccess = (dispatch, template) => {
  dispatch({
    type: SAVE_TEMPLATE_SUCCESS,
    payload: { template }
  });

  dispatch({ type: IS_LOADING, payload: false });

  dispatch({
    type: SUCCESS_MESSAGE,
    payload: { message: "Your template has been saved.", title: "Success!" }
  });

  dispatch({
    type: RELOAD_PREVIEWS,
    payload: {
      date: moment().format("X"),
      reload: true,
      reloadId: template.id
    }
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "saveTemplateSuccess" });

  appRedirect({ dispatch, redirect: "goBack", payload: { type: "templates" } });
};

export const resetPreview = () => {
  return {
    type: RESET_PREVIEW
  };
};
export const previewImageLoaded = () => {
  return {
    type: PREVIEW_IMAGE_LOADED
  };
};

export const getPreview = ({ token, house, template }) => {
  return dispatch => {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: GET_PREVIEW });
    api.previewMail(token, house, template).then(response => {
      if (response.problem != null) {
        getPreviewFail(dispatch, response.problem);
      } else if (response.data.error != false) {
        getPreviewFail(dispatch, response.data.error);
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        getPreviewSuccess(dispatch, response.data.results);
      }
    });
  };
};

const getPreviewFail = (dispatch, error) => {
  dispatch({ type: GET_PREVIEW_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
};

const getPreviewSuccess = (dispatch, postcard) => {
  dispatch({
    type: GET_PREVIEW_SUCCESS,
    payload: postcard
  });
  dispatch({ type: IS_LOADING, payload: false });
};

export const showTemplatePreview = ({
  save_info,
  reload,
  reloadId,
  show,
  deal_id,
  template_id,
  template_type,
  html_template_id,
  payload,
  date,
  template_preview,
  template_preview_back
}) => {
  return {
    type: SHOW_TEMPLATE_PREVIEW,
    payload: {
      preview_info: {
        save_info,
        reload,
        reloadId,
        show,
        deal_id,
        template_id,
        template_type,
        html_template_id,
        payload,
        date,
        template_preview,
        template_preview_back
      }
    }
  };
};

export const reloadPreviews = ({ date, reload, reloadId }) => {
  return {
    type: RELOAD_PREVIEWS,
    payload: { date, reload, reloadId }
  };
};

export const generatePreviewImages = ({
  token,
  url,
  template_id = 0,
  deal_id = 0,
  html_template_id = 0,
  save_info = 0
}) => {

  return dispatch => {
    dispatch({
      type: GENERATE_PREVIEW_IMAGES,
      payload: {
        deal_id: deal_id,
        template_id: template_id,
        save_info: save_info
      }
    });

    api_private
      .generatePreviewImages({
        token,
        url,
        template_id,
        deal_id,
        html_template_id,
        save_info
      })
      .then(response => {
        if (response.problem != null) {
          dispatch({
            type: GENERATE_PREVIEW_IMAGES_FAIL,
            payload: response.problem
          });
        } else if (response.data.error != false) {
          dispatch({
            type: GENERATE_PREVIEW_IMAGES_FAIL,
            payload: response.data.error
          });
        } else {
          dispatch({
            type: GENERATE_PREVIEW_IMAGES_SUCCESS,
            payload: {
              deal_id: deal_id,
              template_id: template_id,
              image: response.data.results.image,
              image_back: response.data.results.image_back,
              save_info: save_info
            }
          });
        }
      });
  };
};
