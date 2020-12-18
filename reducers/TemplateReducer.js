import {
  LOGOUT,
  GET_TEMPLATES,
  GET_TEMPLATES_FAIL,
  GET_TEMPLATES_SUCCESS,
  REFRESH_TEMPLATES,
  TEMPLATE_INIT,
  TEMPLATE_FIELD_CHANGED,
  TEMPLATE_RESET,
  SAVE_TEMPLATE,
  SAVE_TEMPLATE_SUCCESS,
  SAVE_SIGNATURE_SUCCESS,
  CREATE_SIGNATURE_SUCCESS,
  CREATE_TEMPLATE_SUCCESS,
  SAVE_TEMPLATE_FAIL,
  DELETE_TEMPLATE,
  GET_PREVIEW,
  GET_PREVIEW_FAIL,
  GET_PREVIEW_SUCCESS,
  RESET_PREVIEW,
  PREVIEW_IMAGE_LOADED,
  SELECT_STATE,
  GET_TEMPLATE,
  GET_TEMPLATE_SUCCESS,
  SELECT_DEFAULT_TEMPLATE,
  SET_PREVIEW_TYPE,
  SHOW_TEMPLATE_PREVIEW,
  RELOAD_PREVIEWS,
  GENERATE_PREVIEW_IMAGES,
  GENERATE_PREVIEW_IMAGES_SUCCESS
} from "app/DealMachineCore/types";

const INITIAL_STATE = {
  templates: [],
  template_error: "",
  template_loading: false,
  html_templates: [],
  html_template_types: [],
  campaigns: [],
  refreshing: false,
  editTemplate: null,
  originalTemplate: null,
  preview_loading: false,
  preview_error: "",
  preview_image: "",
  preview_loaded: false,
  preview_type: null,
  preview_id: 0,
  select_default_template: false,
  preview_info: {
    show: false,
    save_info: false,
    deal_id: 0,
    template_id: 0,
    html_template_id: 0,
    date: null,
    reload: false,
    reloadId: 0,
    payload: {}
  },
  preview_image_front: null,
  preview_image_back: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };


    case GENERATE_PREVIEW_IMAGES:
      return {
        ...state,
        templates:
          action.payload.save_info == 1 &&
          action.payload.template_id &&
          action.payload.template_id != 0
            ? state.templates.map((template, i) =>
                template.id == action.payload.template_id
                  ? {
                      ...template,
                      template_preview: null,
                      template_preview_back: null
                    }
                  : template
              )
            : state.templates,
        preview_info: {
          ...state.preview_info,
          template_preview: null,
          template_preview_back: null
        },
        preview_image_front: null,
        preview_image_back: null
      };

    case GENERATE_PREVIEW_IMAGES_SUCCESS:
      return {
        ...state,
        templates:
          action.payload.save_info == 1 &&
          action.payload.template_id &&
          action.payload.template_id &&
          action.payload.template_id != 0
            ? state.templates.map((template, i) =>
                template.id == action.payload.template_id
                  ? {
                      ...template,
                      template_preview: action.payload.image,
                      template_preview_back: action.payload.image_back
                    }
                  : template
              )
            : state.templates,
        preview_info: {
          ...state.preview_info,
          template_preview: action.payload.image,
          template_preview_back: action.payload.image_back
        },
        preview_image_front: action.payload.image,
        preview_image_back: action.payload.image_back
      };
    case GET_TEMPLATE:
      return {
        ...state,
        template_loading: true,
        editTemplate: INITIAL_STATE.editTemplate,
        originalTemplate: INITIAL_STATE.originalTemplate,
        template_error: "",
        preview_image_front: null,
        preview_image_back: null
      };
    case GET_TEMPLATE_SUCCESS:
      return {
        ...state,
        template_loading: false,
        html_templates: action.payload.html_templates
          ? action.payload.html_templates
          : state.html_templates,
        html_template_types: action.payload.html_template_types
          ? action.payload.html_template_types
          : state.html_template_types,
        editTemplate: action.payload.template,
        originalTemplate: action.payload.template,
        preview_image_front: action.payload.template.template_preview,
        preview_image_back: action.payload.template.template_preview_back
      };

    case GET_TEMPLATES:
      return {
        ...state,
        template_loading: true,
        templates: [],
        html_templates: [],
        html_template_types: [],
        template_error: ""
      };
    case SAVE_TEMPLATE:
      return {
        ...state,
        template_error: ""
      };
    case REFRESH_TEMPLATES:
      return {
        ...state,
        refreshing: true,
        templates: [],
        html_templates: [],
        html_template_types: [],
        template_error: ""
      };
    case GET_TEMPLATES_FAIL:
    case SAVE_TEMPLATE_FAIL:
      return {
        ...state,
        refreshing: false,
        template_error: action.payload
      };
    case GET_TEMPLATES_SUCCESS:
      return {
        ...state,
        template_loading: false,
        refreshing: false,
        templates: action.payload.templates,
        html_templates: action.payload.html_templates,
        html_template_types: action.payload.html_template_types
      };
    case SAVE_SIGNATURE_SUCCESS:
      return {
        ...state,
        templates: action.payload.templates
      };
    case CREATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        template_loading: false,
        refreshing: false,
        templates: action.payload.templates
          ? action.payload.templates
          : state.templates,
        html_templates: action.payload.html_templates
          ? action.payload.html_templates
          : state.html_templates,
        html_template_types: action.payload.html_template_types
          ? action.payload.html_template_types
          : state.html_template_types
      };
    case SAVE_TEMPLATE_SUCCESS:
      return {
        ...state,
        refreshing: false,
        templates: action.payload.template
          ? state.templates.map((template, i) =>
              template.id == action.payload.template.id
                ? action.payload.template
                : template
            )
          : state.templates
      };
    case CREATE_SIGNATURE_SUCCESS:
      return {
        ...state,
        templates: action.payload.templates
          ? action.payload.templates
          : state.templates
      };
    case DELETE_TEMPLATE:
      return {
        ...state,
        templates: state.templates.filter(
          ({ id }) => id != action.payload.template_id
        )
      };
    case TEMPLATE_INIT:
      return {
        ...state,
        editTemplate: action.payload.template,
        originalTemplate: action.payload.template,
        preview_image_front: action.payload.template.template_preview,
        preview_image_back: action.payload.template.template_preview_back
      };
    case TEMPLATE_RESET:
      return {
        ...state,
        editTemplate: INITIAL_STATE.editTemplate,
        originalTemplate: INITIAL_STATE.originalTemplate,
        preview_image_front: null,
        preview_image_back: null
      };

    case TEMPLATE_FIELD_CHANGED:
      return {
        ...state,
        editTemplate: {
          ...state.editTemplate,
          [action.payload.prop]: action.payload.value
        }
      };
    case SELECT_STATE:
      return {
        ...state,
        editTemplate: {
          ...state.editTemplate,
          return_address_state: action.payload.state
        }
      };
    case RESET_PREVIEW:
      return {
        ...state,
        preview_type: state.preview_type,
        preview_id: state.preview_id,
        preview_loading: false,
        preview_error: "",
        preview_image: "",
        preview_loaded: false
      };
    case GET_PREVIEW:
      return {
        ...state,
        preview_loading: true,
        preview_error: "",
        preview_image: ""
      };
    case GET_PREVIEW_FAIL:
      return {
        ...state,
        preview_loading: false,
        preview_error: action.payload,
        preview_image: ""
      };
    case GET_PREVIEW_SUCCESS:
      return {
        ...state,
        preview_loading: false,
        preview_error: "",
        preview_image: action.payload
      };
    case PREVIEW_IMAGE_LOADED:
      return {
        ...state,
        preview_loaded: true
      };
    case SELECT_DEFAULT_TEMPLATE:
      return {
        ...state,
        select_default_template: action.payload
      };
    case SET_PREVIEW_TYPE:
      return {
        ...state,
        preview_type: action.payload.type,
        preview_id: action.payload.id
      };
    case SHOW_TEMPLATE_PREVIEW:
      return {
        ...state,
        preview_info: action.payload.preview_info
      };
    case RELOAD_PREVIEWS:
      return {
        ...state,
        preview_info: {
          ...state.preview_info,
          date: action.payload.date,
          reload: action.payload.reload,
          reloadId: action.payload.reloadId
        }
      };
    default:
      return state;
  }
};
