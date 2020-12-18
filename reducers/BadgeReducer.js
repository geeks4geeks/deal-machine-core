import {
  LOGOUT,
  GET_ALL_BADGES,
  GET_ALL_BADGES_FAIL,
  GET_ALL_BADGES_SUCCESS,
  UPDATE_BADGE,
  UPDATE_BADGE_SUCCESS,
  TOGGLE_BADGE_POPUP,
  LOGIN_USER_SUCCESS,
  NEW_DEAL_SUCCESS,
  GET_DEALS_SUCCESS,
  UPDATE_HOUSE_SUCCESS,
  EDIT_TEAM_SUCCESS,
  END_TRACKED_ROUTE_SUCCESS,
  ADD_DEAL_SUCCESS
} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  not_earned_badges: [],
  all_badges: [],
  my_badges:[],
  top_badges:[],
  badges_loading: "",
  badges_error: "",
  badges_refreshing: "",
  badges_loaded_all: "",
  toggle_badge_popup: false,
  badge:{
    id:"",
    slug:"",
    group_slug:"",
    group_level:"",
    is_group_badge:"",
    title:"",
    description:"",
    image:"",
    seen_badge:"",
    date_earned:""
  }
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){

    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };

    case GET_ALL_BADGES:
      return {
        ...state,
        badges_loading: true,
        badges_error: '',
        badges_refreshing: false,
        badges_loaded_all: false
      };

      case GET_ALL_BADGES_FAIL:
        return {
          ...state,
          badges_loading: false,
          badges_refreshing: false,
          badges_error: action.payload
        };

      case GET_DEALS_SUCCESS:
      case LOGIN_USER_SUCCESS:
      case GET_ALL_BADGES_SUCCESS:
      case NEW_DEAL_SUCCESS:
      case ADD_DEAL_SUCCESS:
      case UPDATE_HOUSE_SUCCESS:
      case EDIT_TEAM_SUCCESS:
      case END_TRACKED_ROUTE_SUCCESS:

        return {
          ...state,
          top_badges:action.payload.badges ? action.payload.badges.my_badges : state.top_badges,
          not_earned_badges: action.payload.badges ? action.payload.badges.all_badges.filter(o => !action.payload.badges.my_badges.find(o2 => o.id == o2.id)).sort(function(a, b) {
              return parseInt(a.badge_order) - parseFloat(b.badge_order);
          }) : state.not_earned_badges,
          all_badges: action.payload.badges ? action.payload.badges.all_badges : state.all_badges,
          my_badges: action.payload.badges ? action.payload.badges.my_badges : state.my_badges,
          badges_loading: false,
          badges_refreshing: false,
          badges_loaded_all: true
        };


      case TOGGLE_BADGE_POPUP:
        return {
          ...state,
          toggle_badge_popup:action.payload.toggle,
          badge: action.payload.badge
        }
      case UPDATE_BADGE:
        return {
          ...state,
          badge: INITIAL_STATE.badge,
          toggle_badge_popup:false,
        }
      case UPDATE_BADGE_SUCCESS:
        return {
          ...state,
          top_badges:action.payload.badges.my_badges,
          not_earned_badges: action.payload.badges.all_badges.filter(o => !action.payload.badges.my_badges.find(o2 => o.id == o2.id)).sort(function(a, b) {
              return parseInt(a.badge_order) - parseFloat(b.badge_order);
          }),
          all_badges: action.payload.badges.all_badges,
          my_badges: action.payload.badges.my_badges
        }

    default:
      return state;
  }
}
