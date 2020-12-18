import {

  INIT_APP,
  AUTH_FIELD_CHANGED,
  GET_USER,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  TOGGLE_ACCOUNT_ACTION_SHEET,
  LOGOUT,
  TRIGGER_LOGOUT,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  AUTH_UNLOAD,
  UPDATE_RETURN_ADDRESS_SUCCESS,
  UPDATE_USER_SUCCESS,
  SAVE_TEMPLATE_SUCCESS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  GET_STATS_SUCCESS,
  SAVE_CARD_SUCCESS,
  UPDATE_BILLING_ADDON_SUCCESS,
  CANCEL_PLAN_SUCCESS,
  TOGGLE_COPY,
  GET_MAIN_PLANS,
  GET_MAIN_PLANS_FAIL,
  GET_MAIN_PLANS_SUCCESS,
  OTHER_OWNER_LOOKUP_SUCCESS,
  SENT_MAIL_COUNT_ADD,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_SUCCESS,
  REQUEST_TO_JOIN_TEAM_SUCCESS,
  CANCEL_TEAM_REQUEST_SUCCESS,
  EDIT_TEAM_SUCCESS,
  GET_TEAM_SUCCESS,
  UPDATE_TEAM_LINK,
  TOGGLE_ONBOARDING,
  EDIT_CREDITS_SUCCESS,
  SAVE_SIGNATURE_SUCCESS,
  CREATE_SIGNATURE_SUCCESS,

  GET_TERMS,
  GET_TERMS_FAIL,
  GET_TERMS_SUCCESS,

  GET_TUTORIAL_SUCCESS,
  COMPLETE_TUTORIAL,
  COMPLETE_TUTORIAL_SUCCESS,

  UPDATE_TEAM_MEMBERS_SUCCESS,
  PAUSE_OR_CANCEL_PLAN_SUCCESS
} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  init: false,
  token: '',

  email: '',
  phone: '',
  city: '',
  password: '',
  firstname: '',
  lastname: '',
  company: '',
  accepted_terms: 0,
  promoText: '',
  accepted_terms: 0,

  user: null,
  error: '',
  loading: false,
  plans_loading:false,
  plans_error: '',
  plans:[],
  actionSheet: null,
  trigger_logout: false,
  onboarding: false,
  signup_type: '',
  signup_team_name: '',
  signup_team_company: '',
  signup_branch_link: '',
  from_campaign: '',
  from_source: '',
  branch_id: '',
  partner: '',
  partner_logo: '',
  partner_logo_white: '',
  copy_tab: "",
  all_badges:[],
  my_badges:[],
  top_badges:[],
  not_earned_badges:[],

  terms_of_service: "",
  terms_error: "",
  terms_loading: false,

  tutorial: null
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){

    case LOGOUT:
    case CANCEL_PLAN_SUCCESS:
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        trigger_logout: false,
        init: true
      };

    case INIT_APP:
      return {
        ...state,
        init: action.payload
      };

    case TOGGLE_COPY:
      return{
        ...state,
        copy_tab: action.payload
      }
    case AUTH_FIELD_CHANGED:
      //action.payload === {prop: 'name', value: 'Jane'}
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        error: '',
        loading: true
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_USER:

      return {
        ...state,
        error: '',
        loading: true
      }
    break;
    case LOGIN_USER:
      return {
        ...state,
        error: ''
      }

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        init: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case GET_STATS_SUCCESS:
    case UPDATE_TEAM_LINK:
    case EDIT_CREDITS_SUCCESS:
      return {
        ...state,
        user: action.payload.user
      }

    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        password: '',
        loading: false
      };

    case REGISTER_USER:
      return {
        ...state,
        error: ''
      }

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        init: true,
        user: action.payload.user,
        token: action.payload.token
      };

    case REGISTER_USER_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        error: '',
        loading: true
      };
    case DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case TRIGGER_LOGOUT:
      return {
        ...state,
        trigger_logout: action.payload
      };

    case SAVE_CARD_SUCCESS:
    case UPDATE_BILLING_ADDON_SUCCESS:
      return {
        ...state,
        user: action.payload.user
      };
    case AUTH_UNLOAD:
      return {
        ...state,
        ...INITIAL_STATE,
        init: true
      };
    case TOGGLE_ACCOUNT_ACTION_SHEET:
      return {
        ...state,
        actionSheet: action.payload
      };
    case UPDATE_RETURN_ADDRESS_SUCCESS:
      return {
        ...state,
        user:{
          ...state.user,
          address: action.payload.address,
          address2: action.payload.address2,
          address_city: action.payload.address_city,
          address_state: action.payload.address_state,
          address_zip: action.payload.address_zip,
          phone: action.payload.phone,

        }
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user
      };
    case SAVE_TEMPLATE_SUCCESS:
      return {
        ...state,
        user:{
          ...state.user,
          default_template_id: action.payload.default_template_id ? action.payload.default_template_id : state.user.default_template_id
        }
      };
    case GET_MAIN_PLANS:
      return{
        ...state,
        plans_loading: true,
        plans_error: ''
      };
    case GET_MAIN_PLANS_FAIL:
      return{
        ...state,
        plans_loading: false,
        plans_error: action.payload
      };
    case GET_MAIN_PLANS_SUCCESS:
      return{
        ...state,
        plans_loading: false,
        plans: action.payload.plans
      };

    case EDIT_TEAM_SUCCESS:
    case GET_TEAM_SUCCESS:
    case REQUEST_TO_JOIN_TEAM_SUCCESS:
    case CANCEL_TEAM_REQUEST_SUCCESS:
    case UPDATE_TEAM_MEMBERS_SUCCESS:
    case PAUSE_OR_CANCEL_PLAN_SUCCESS:
      return{
        ...state,
        user: action.payload.user
      }


    case OTHER_OWNER_LOOKUP_SUCCESS:
      return{
        ...state,
        user: {
          ...state.user
        }
      }

    case TOGGLE_ONBOARDING:
      return {
        ...state,
        onboarding: action.payload
      };

    case SAVE_SIGNATURE_SUCCESS:
    case CREATE_SIGNATURE_SUCCESS:
      return {
        ...state,
        user: action.payload.user ? action.payload.user : state.user
      };

    case GET_TERMS:

      return{
        ...state,
        terms_of_service: "",
        terms_loading: true,
        terms_error: ""
      };

    case GET_TERMS_FAIL:

      return{
        ...state,
        terms_loading: false,
        terms_error: action.payload
      };

    case GET_TERMS_SUCCESS:

      return{
        ...state,
        terms_of_service: action.payload,
        terms_loading: false
      };

    case GET_TUTORIAL_SUCCESS:
      return{
        ...state,
        tutorial: action.payload.tutorial ? action.payload.tutorial : null
      };
    case COMPLETE_TUTORIAL:
    case COMPLETE_TUTORIAL_SUCCESS:
      return{
        ...state,
        tutorial: null
      };

    default:
      return state;
  }
}
