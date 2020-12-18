import {
  LOGOUT,
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
  SET_NOTIFICATION,
  SHOW_NOTIFICATION,
  TOGGLE_REDIRECT,
  UNDO_ACTION,
  UNDO_ACTION_FAIL,
  UNDO_ACTION_SUCCESS,
  TOGGLE_DEAL_CREDIT_MODAL,
  SET_EDIT_MODAL
} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  show: false,
  type: '',
  startFade: false,
  title: '',
  description: '',
  icon: '',
  image: '',
  onPress: null,
  onCancel: null,
  submit: '',
  buttonType: '',
  cancel: '',
  plan: {},
  toggle_plan: "monthly",
  success_message: "",
  success_title: "",
  error_message: "",
  error_title: "",
  loading_message: "",
  loading_title: "",
  is_loading: false,
  show_notification: false,
  notification: {
    title: "",
    subtitle: "",
    text: "",
    image: "",
    email: "",
    type: "",
    onPress: null
  },
  redirect: null,
  redirect_data: null,
  change_log: null,
  deal_credit_modal_show: false,

  edit_modal: null
}

export default (state = INITIAL_STATE, action) => {

  switch(action.type){
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case SHOW_NOTIFICATION:
      return {
        ...state,
        show_notification: action.payload
      };
    case SET_NOTIFICATION:
      return {
        ...state,
        notification:{
          title: action.payload.title,
          subtitle: action.payload.subtitle,
          text: action.payload.text,
          image: action.payload.image,
          email: action.payload.email,
          type: action.payload.type,
          onPress: action.payload.onPress
        }
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        startFade: false,
        show: action.payload.show,
        type: action.payload.type
      };
    case SET_MODAL:
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        icon: action.payload.icon,
        image: action.payload.image,
        submit: action.payload.submit,
        buttonType: action.payload.buttonType,
        cancel: action.payload.cancel,
        onPress: action.payload.onPress,
        onCancel: action.payload.onCancel
      };
    case SET_PLAN_MODAL:
      return {
        ...state,
        plan: action.payload.plan
      };
    case TOGGLE_PLAN_MODAL:
      return {
        ...state,
        toggle_plan: action.payload
      };
    case START_MODAL_FADE:
      return {
        ...state,
        startFade: true
      };
    case SUCCESS_MESSAGE:
      return {
        ...state,
        success_message: action.payload.message,
        success_title: action.payload.title,
        error_message: "",
        error_title: "",
        is_loading: false,
        loading_message: "",
        loading_title: "",
        change_log: action.payload.change_log ? action.payload.change_log : null
      };
    case RESET_SUCCESS_MESSAGE:
      return{
        ...state,
        success_message: "",
        success_title: ""
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        success_message: "",
        success_title: "",
        error_message: action.payload.message,
        error_title: action.payload.title,
        is_loading: false,
        loading_message: "",
        loading_title: ""
      };
    case RESET_ERROR_MESSAGE:
      return{
        ...state,
        error_message: ""
      };
    case IS_LOADING:
      return{
        ...state,
        success_message: "",
        success_title: "",
        error_message: "",
        error_title: "",
        is_loading: action.payload,
        loading_message: !action.payload ? "" : state.loading_message,
        loading_title: !action.payload ? "" : state.loading_title,
      };
    case SET_LOADING_MESSAGE:
      return{
        ...state,
        loading_message: action.payload.message,
        loading_title: action.payload.title
      };
    case TOGGLE_REDIRECT:
      return{
        ...state,
        redirect: action.payload.type,
        redirect_data: action.payload.type ? action.payload.data : null
      };
    case UNDO_ACTION_SUCCESS:
      return{
        ...state,
        change_log: null
      }

    case TOGGLE_DEAL_CREDIT_MODAL:
      return{
        ...state,
        deal_credit_modal_show: action.payload
      }
    case SET_EDIT_MODAL:
      return{
        ...state,
        edit_modal: action.payload
      }

    default:
      return state;
  }
}
