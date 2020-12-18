import {
  LOGOUT,
  TOGGLE_DRAWER,
  CHANGE_TAB,
  GET_STATS,
  GET_STATS_FAIL,
  GET_STATS_SUCCESS,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  LOCK_DRAWER,
  NEW_DEAL_SUCCESS,
  UPDATE_HOUSE_SUCCESS,
  ENTER_PROMO_SUCCESS,
  EDIT_TEAM_SUCCESS,
  OTHER_OWNER_LOOKUP_SUCCESS,
  OTHER_OWNER_LOOKUP_FAIL,
  TOGGLE_VIDEO,
  SET_VIDEO,
  TOGGLE_CAN_POP,
  SET_SHARE_OPTIONS,
  GET_INVOICES_SUCCESS,
  EDIT_OPM_SUCCESS,
  GET_ANALYTICS_SUCCESS,

  GET_DEAL_CREDITS_SUCCESS
} from 'app/DealMachineCore/types';
import { AppConfig } from 'app/NativeActions';

const INITIAL_STATE = {
  open: null,
  tab: "dashboard",
  can_pop: "",
  shareOptions:{
    url: "",
    message: "",
    title: "",
    subject: ""
  },
  stats: {
    pending_approval_count: 0,
    repeating_mail_count: 0,
    open_deals_count: 0,
    invite_count: 0,
    billing:{
      mail_credits_available: 0,
      mail_credits_used: 0,
      deal_marketing_credits: 0,
      enhanced_search_credits_included: 0,
      enhanced_search_credits_used: 0,
      plan_name: "",
      plan_id: "",
      plan: {
        additional_price: 99,
        enhanced_search_price: 99
      },
      frequency: "",
      bill_period: null,
      last4: "",
      is_customer: false,
      tier: 0,
      include_dealfinders: 0,
      include_teammates: 0,
      frequency: "",
      price: 0,
      bad_card: 0,
      canceled_plan: 0,
      deal_credits:{
        deal_credits_remaining:{
          pretty: 0,
          database_format: 0
        },
        total_deal_credits:{
          pretty: 0,
          database_format: 0
        },
        total_deal_credits_used:{
          pretty: 0,
          database_format: 0
        },
        total_deal_credits_queued:{
          pretty: 0,
          database_format: 0
        },
        total_mailers_queued:{
          pretty: 0,
          database_format: 0
        },
        default_credit_reload:{
          pretty: 0,
          database_format: 0
        }
      },
      billing_addons:[]
    },
    invite:{
      code: '',
      title: '',
      description: '',
      url: '',
      share_message: '',
      share_title: '',
      subject: ''
    },
    partner:{
      id: 0
    },
    plans:[],
    team: [],
    teams:[]
  },

  lockDrawer: false,
  error: '',
  reload: false,
  video_toggle: false,
  video: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case TOGGLE_DRAWER:
      return {
        ...state,
        lockDrawer: false,
        open: action.payload
      };
    case TOGGLE_CAN_POP:
      return {
        ...state,
        can_pop: action.payload
      };
    case CHANGE_TAB:
      return {
        ...state,
        open: AppConfig().device != "desktop" ? false : state.open,

        //lockDrawer: AppConfig().device != "desktop" ? false : state.lockDrawer,
        tab: action.payload
      };
    case LOCK_DRAWER:
      return {
        ...state,
        lockDrawer: action.payload
      };
    case GET_STATS:
      return {
        ...state,
        error: '',
        reload: false
      };
    case GET_STATS_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case EDIT_TEAM_SUCCESS:
      return {
        ...state,
        stats: {
          ...state.stats,
          team: action.payload.my_team
        }
      }

    case ENTER_PROMO_SUCCESS:
      return {
        ...state,
        reload: true,
        stats: {
          ...state.stats,
          plans: action.payload.plans,
          billing: action.payload.billing,
          team: action.payload.team,
          partner: action.payload.partner
        }
      };
    case GET_STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload.stats
      };
    case NEW_DEAL_SUCCESS:
    case OTHER_OWNER_LOOKUP_FAIL:
      return {
        ...state,
        reload: true
      };

    case UPDATE_HOUSE_SUCCESS:
    case OTHER_OWNER_LOOKUP_SUCCESS:
    case EDIT_OPM_SUCCESS:
      return {
        ...state,
        stats:{
          ...state.stats,
          billing: action.payload.billing ? action.payload.billing : state.stats.billing,
          reload: true
        }
      };

    case GET_DEAL_CREDITS_SUCCESS:
      return {
        ...state,
        stats:{
          ...state.stats,
          billing: {
            ...state.stats.billing,
            deal_credits: action.payload.deal_credits
          }
        }
      };

    case TOGGLE_VIDEO:
      return {
        ...state,
        video_toggle: action.payload
      };
    case SET_VIDEO:
      return {
        ...state,
        video: action.payload
      }
    case SET_SHARE_OPTIONS:
      return {
        ...state,
        shareOptions:{
          ...state.shareOptions,
          url: action.payload.url,
          message: action.payload.message,
          title: action.payload.title,
          subject: action.payload.subject
        }
      }


    default:
      return state;
  }
}
