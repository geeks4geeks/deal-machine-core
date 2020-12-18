import {
  LOGOUT,
  RESET_BILLING,
  BILLING_FIELD_CHANGED,
  SAVE_CARD,
  SAVE_CARD_SUCCESS,
  SAVE_CARD_FAIL,
  GET_CARD,
  GET_CARD_FAIL,
  GET_CARD_SUCCESS,
  SELECT_PLAN,
  RESET_SELECTED_PLAN,
  CANCEL_PLAN,
  CANCEL_PLAN_SUCCESS,
  CANCEL_PLAN_FAIL,
  TOGGLE_PLAN_FREQUENCY,
  GET_INVOICES,
  LOAD_MORE_INVOICES,
  REFRESH_INVOICES,
  GET_INVOICES_SUCCESS,
  LOAD_INVOICES_SUCCESS,
  GET_INVOICES_FAIL,
  INIT_EDIT_CREDIT_PURCHASE,
  EDIT_CREDIT_PURCHASE,
  EDIT_CREDITS,
  EDIT_CREDITS_FAIL,
  EDIT_CREDITS_SUCCESS,

  GET_PAUSE_PLAN_INFO,
  GET_PAUSE_PLAN_INFO_FAIL,
  GET_PAUSE_PLAN_INFO_SUCCESS,
  PAUSE_OR_CANCEL_PLAN,
  PAUSE_OR_CANCEL_PLAN_FAIL,
  PAUSE_OR_CANCEL_PLAN_SUCCESS,
  SELL_LEADS,
  SELL_LEADS_FAIL,
  SELL_LEADS_SUCCESS,

  GET_DEAL_CREDITS,
  GET_PLAN_MODUALS,
  GET_BILLING_FAIL,
  GET_DEAL_CREDITS_SUCCESS,
  TRIGGER_DEAL_CREDIT_RELOAD,

  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,

  SET_FEATURE_MODAL,
  GET_PLAN_MODUALS_SUCCESS,

  UPDATE_TEAM_MEMBERS_SUCCESS,
  UPDATE_BILLING_ADDON_SUCCESS,

  GET_LEAD_LIMITS,
  GET_LEAD_LIMITS_SUCCESS,

  SET_BILLING_DETAILS,
  ADD_DEAL_SUCCESS
} from 'app/DealMachineCore/types';

import moment from 'moment';

const INITIAL_STATE = {
  card: {
    number: "",
    expMonth: "",
    expYear: "",
    cvc: ""
  },
  error:'',
  loading: false,
  selected_plan: {
    id: 0,
    enterprise: 0,
    commitment_length_months:0,
    trial_length_days:14
  },
  frequency: "",
  price: 0,

  invoices: [],
  invoices_loading: false,
  invoices_error: '',
  invoices_refreshing: false,
  invoices_loaded_all: false,
  invoices_limit: 25,
  begin: 0,
  editCreditPurchase: {
    credit_amount: "50"
  },

  pause_plan_info: null,
  pause_plan_info_loading: false,

  deal_credits_loading: false,
  deal_credits: null,
  trigger_deal_credit_reload: false,
  pricing: {
    pricing_tier: 0,
    pricing_tier_name: "Free Plan",
    mailer_price: 99,
    ballpoint_price: 297,
    skip_trace_price: 25,
    corporate_skip_trace_price: 50
  },
  card_info:{
    has_card: 0,
    bad_card: null,
    last4: null
  },
  free_trial_info:{
    plan_module_title: "",
    plan_module_type: "",
    plan_module_tier: 0,
    is_on_free_trial: false,
    is_trial_over: false,
    is_approved_to_charge: 0,
    days_left_on_trial: 0,
    total_trial_days: 0,
    trial_end_date: null,
    show_banner: true,
    banner_text: "",
    banner_button_text: "",
    banner_button_link: ""
  },
  canceled_access_info:{
    has_access: true,
    plan_module_title: "",
    plan_module_type: "",
    plan_module_tier: 0,
    days_left: 0,
    did_cancel: false,
    did_pause: false,
    show_banner: true
  },
  warning_info:{
    show_warning: false,
    banner_text: "",
    banner_button_text: "",
    banner_button_link: ""
  },
  plan_modules:[],
  feature_modal: null,

  current_team_members: 0,
  team_member_limit: 30,

  loading_plan_module_options: false,
  current_plan_module_coupon: null,
  current_plan_module_options:[],

  billing_addons: [],
  billing_details: null,

  plan_frequency: "monthly",

  loading_lead_limits: false,
  total_lead_count: 0,
  current_lead_limit: 50000,
  additional_limit_price: 0,
  current_billing_cycle_driving_lead_count: 0,
  driving_lead_limit: 0,

}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){

    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      }

    case RESET_BILLING:
      return {
        ...state,
        card: {
          number: "",
          expMonth: "",
          expYear: "",
          cvc: ""
        }
      }
    break;
    case BILLING_FIELD_CHANGED:
      return {
        ...state,
        card:{
          ...state.card,
          [action.payload.prop]: action.payload.value
        }
      };
    case SELECT_PLAN:
      return {
        ...state,
        selected_plan: action.payload.selected_plan,
        frequency: action.payload.frequency,
        price: action.payload.price
      };
    case SAVE_CARD:
    case CANCEL_PLAN:
      return {
        ...state,
        error: '',
        loading: true,
      };
    case CANCEL_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SAVE_CARD_FAIL:
    case CANCEL_PLAN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case RESET_SELECTED_PLAN:
      return {
        ...state,
        selected_plan: action.payload.plan ? action.payload.plan :
          action.payload.plans ? action.payload.plans.length > 0 ?
            action.payload.plans[0] : state.selected_plan : state.selected_plan,
        frequency: action.payload.frequency,
        price: action.payload.price
      }
    case TOGGLE_PLAN_FREQUENCY:
      return {
        ...state,
        frequency: action.payload
      }
    case REFRESH_INVOICES:
      return {
        ...state,
        invoices: [],
        invoices_loading: false,
        invoices_refreshing: true,
        invoices_error: '',
        invoices_loaded_all: false,
        begin: 0
      }
    case GET_INVOICES:
      return {
        ...state,
        invoices: [],
        invoices_loading: true,
        invoices_refreshing: false,
        invoices_error: '',
        invoices_loaded_all: false,
        begin: 0
      };
    case LOAD_MORE_INVOICES:
      return {
        ...state,
        invoices_loading: true,
        invoices_refreshing: false,
        invoices_error: '',
        invoices_loaded_all: true,
      };
    case GET_INVOICES_FAIL:
      return {
        ...state,
        invoices_loading: false,
        invoices_refreshing: false,
        invoices_error: action.payload
      };
    case LOAD_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: state.invoices.concat(action.payload.invoices),
        invoices_loading: false,
        invoices_refreshing: false,
        invoices_loaded_all: action.payload.invoices.length < state.invoices_limit,
        total_spent: action.payload.total_spent,
        start_date: action.payload.start_date,
        end_date: action.payload.end_date,
        begin: state.begin+action.payload.invoices.length

      };
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload.invoices,
        invoices_loading: false,
        invoices_refreshing: false,
        invoices_loaded_all: action.payload.invoices.length < state.invoices_limit,
        total_spent: action.payload.total_spent,
        start_date: action.payload.start_date,
        end_date: action.payload.end_date,
        begin: state.begin+action.payload.invoices.length

      };

    case INIT_EDIT_CREDIT_PURCHASE:
      return {
        ...state,
        editCreditPurchase: action.payload
      };

    case EDIT_CREDIT_PURCHASE:
      return {
        ...state,
        editCreditPurchase:{
          ...state.editCreditPurchase,
          [action.payload.prop]: action.payload.value
        }
      };
    case EDIT_CREDITS:
      return {
        ...state
      };
    case EDIT_CREDITS_FAIL:
      return {
        ...state
      };

    case GET_PAUSE_PLAN_INFO:
      return{
        ...state,
        pause_plan_info: null,
        pause_plan_info_loading: true
      };
    case GET_PAUSE_PLAN_INFO_FAIL:
      return{
        ...state,
        pause_plan_info_loading: false
      };

    case GET_PAUSE_PLAN_INFO_SUCCESS:
      return{
        ...state,
        pause_plan_info: action.payload,
        pause_plan_info_loading: false
      };

    case GET_DEAL_CREDITS:
      return{
        ...state,
        deal_credits_loading: true,
        trigger_deal_credit_reload: false
      }

    case GET_BILLING_FAIL:
      return{
        ...state,
        loading_plan_module_options: false,
        deal_credits_loading: false,
        trigger_deal_credit_reload: false
      }
    case GET_DEAL_CREDITS_SUCCESS:
      return{
        ...state,
        deal_credits_loading: false,
        deal_credits: action.payload.deal_credits,
        trigger_deal_credit_reload: false
      }
    case TRIGGER_DEAL_CREDIT_RELOAD:
      return{
        ...state,
        trigger_deal_credit_reload: action.payload
      }

    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case SAVE_CARD_SUCCESS:
    case PAUSE_OR_CANCEL_PLAN_SUCCESS:
    case EDIT_CREDITS_SUCCESS:
    case ADD_DEAL_SUCCESS:
      return{
        ...state,
        loading: false,
        deal_credits: action.payload.billing ? action.payload.billing.deal_credits : state.deal_credits,
        pricing:{
          pricing_tier: action.payload.billing ? action.payload.billing.pricing_tier : state.pricing_tier,
          pricing_tier_name: action.payload.billing ? action.payload.billing.pricing_tier : state.pricing_tier_name,
          mailer_price: action.payload.billing ? action.payload.billing.mailer_price : state.pricing.mailer_price,
          ballpoint_price: action.payload.billing ? action.payload.billing.ballpoint_price : state.pricing.ballpoint_price,
          skip_trace_price: action.payload.billing ? action.payload.billing.skip_trace_price : state.pricing.skip_trace_price,
          corporate_skip_trace_price: action.payload.billing ? action.payload.billing.corporate_skip_trace_price : state.pricing.corporate_skip_trace_price,
        },
        team_member_limit: action.payload.billing ? action.payload.billing.team_member_limit : state.team_member_limit,
        current_team_members: action.payload.billing ? action.payload.billing.current_team_members : state.current_team_members,
        signature_limit: action.payload.billing ? action.payload.billing.signature_limit : state.signature_limit,
        card_info: action.payload.billing ? action.payload.billing.card_info : state.card_info,
        plan_modules: action.payload.billing ? action.payload.billing.plan_modules : state.plan_modules,
        free_trial_info: action.payload.billing ? action.payload.billing.free_trial_info : state.free_trial_info,
        canceled_access_info: action.payload.billing ? action.payload.billing.canceled_access_info : state.canceled_access_info,
        warning_info: action.payload.billing ? action.payload.billing.warning_info : state.warning_info,
        billing_addons: action.payload.billing ? action.payload.billing.billing_addons : state.billing_addons,
        plan_frequency: action.payload.billing ? action.payload.billing.plan_frequency : state.plan_frequency

      }

    case SET_FEATURE_MODAL:
      return{
        ...state,
        feature_modal: action.payload
      }

    case GET_LEAD_LIMITS:
      return{
        ...state,
        loading_lead_limits: true,

        total_lead_count: INITIAL_STATE.total_lead_count,
        current_lead_limit: INITIAL_STATE.current_lead_limit,
        additional_limit_price: INITIAL_STATE.additional_limit_price,
        current_billing_cycle_driving_lead_count: INITIAL_STATE.current_billing_cycle_driving_lead_count,
        driving_lead_limit: INITIAL_STATE.driving_lead_limit,

      }
    case GET_LEAD_LIMITS_SUCCESS:
      return{
        ...state,
        loading_lead_limits: false,
        total_lead_count: action.payload.total_lead_count ? action.payload.total_lead_count : state.total_lead_count,
        current_lead_limit: action.payload.current_lead_limit ? action.payload.current_lead_limit : state.current_lead_limit,
        additional_limit_price: action.payload.additional_limit_price ? action.payload.additional_limit_price : state.additional_limit_price,
        current_billing_cycle_driving_lead_count: action.payload.current_billing_cycle_driving_lead_count ? action.payload.current_billing_cycle_driving_lead_count : state.current_billing_cycle_driving_lead_count,
        driving_lead_limit: action.payload.driving_lead_limit ? action.payload.driving_lead_limit : state.driving_lead_limit,
      }

    case GET_PLAN_MODUALS:
      return{
        ...state,
        loading_plan_module_options: true,
        current_plan_module_options:[],
        current_plan_module_coupon: null,
      }
    case GET_PLAN_MODUALS_SUCCESS:
      return{
        ...state,
        loading_plan_module_options: false,
        current_plan_module_coupon: action.payload.plan_module_coupon ? action.payload.plan_module_coupon : state.current_plan_module_coupon,
        current_plan_module_options: action.payload.plan_module_options ? action.payload.plan_module_options : state.current_plan_module_options
      }
    case UPDATE_BILLING_ADDON_SUCCESS:
      return{
        ...state,
        card_info: action.payload.billing ? action.payload.billing.card_info : state.card_info,
        plan_modules: action.payload.billing ? action.payload.billing.plan_modules : state.plan_modules,
        billing_addons: action.payload.billing ? action.payload.billing.billing_addons : state.billing_addons
      }
    case UPDATE_TEAM_MEMBERS_SUCCESS:
      return{
        ...state,
        plan_modules: action.payload.billing ? action.payload.billing.plan_modules : state.billing.plan_modules,
        current_team_members: action.payload.billing ? action.payload.billing.current_team_members : state.billing.current_team_members,
        team_member_limit: action.payload.billing ? action.payload.billing.team_member_limit : state.billing.team_member_limit
      }
    case SET_BILLING_DETAILS:
      return{
        ...state,
        billing_details:{
          title: action.payload.title,
          plan_module_title: action.payload.plan_module_title,
          slug: action.payload.slug,
          plan_module_info: action.payload.plan_module_info,
          show_limits: action.payload.show_limits,
          current_count: action.payload.current_count,
          current_limit: action.payload.current_limit,
          limit_title: action.payload.limit_title,

        }
      }

    default:
      return state;
  }
}
