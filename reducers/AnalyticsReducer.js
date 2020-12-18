

import {
  LOGOUT,
  GET_ANALYTICS,
  REFRESH_ANALYTICS,
  GET_ANALYTICS_FAIL,
  GET_ANALYTICS_SUCCESS,

  CHANGE_ANALYTICS_DATES_OPTION,
  UPDATE_SINGLE_ANALYTICS_FILTER,

  UPDATE_ANALYTICS_FILTER,

  SET_ANALYTICS_TYPE
} from 'app/DealMachineCore/types';

import moment from 'moment';


var date = new Date();
var offsetInHours = date.getTimezoneOffset() / 60;
var end_date = moment().add(1, "day").subtract(offsetInHours, "hours").format("YYYY-MM-DD");

const INITIAL_STATE = {
  analytics_dates: null,
  active_deals: null,
  analytics_loading: false,
  analytics_refreshing: false,
  analytics_error: '',

  analytics_filters:{
    team_member: "none",
    team_member_title: "Everyone",

    tag: "none",
    tag_title: "All Property Tags",

    campaign: "none",
    campaign_title: "N/A",

    template: "none",
    template_title: "All Templates"

  },

  date_option: "4wk",
  start_date:moment().subtract(28, "days").format("YYYY-MM-DD"),
  end_date:end_date,

  analytics_type: null
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case GET_ANALYTICS:
      return {
        ...state,
        analytics_dates: null,
        active_deals: null,
        analytics_loading: true,
        analytics_error: ''
      };
    case REFRESH_ANALYTICS:
      return {
        ...state,
        analytics_dates: null,
        active_deals: null,
        analytics_refreshing: true,
        analytics_error: ''
      };
    case GET_ANALYTICS_FAIL:
      return {
        ...state,
        analytics_loading: false,
        analytics_refreshing: false,
        analytics_error: action.payload
      };
    case GET_ANALYTICS_SUCCESS:
      return {
        ...state,
        analytics_dates: action.payload.analytics_dates,
        active_deals: action.payload.active_deals,
        analytics_loading: false,
        analytics_refreshing: false
      };
    case CHANGE_ANALYTICS_DATES_OPTION:
      return {
        ...state,
        date_option: action.payload.date_option,
        start_date: action.payload.start_date,
        end_date: action.payload.end_date
      };


    case UPDATE_ANALYTICS_FILTER:
      return{
        ...state,
        analytics_filters:action.payload.filters
      };
    case UPDATE_SINGLE_ANALYTICS_FILTER:
      return{
        ...state,
        analytics_filters:{
          ...state.analytics_filters,
          [action.payload.prop]: action.payload.value
        }
      };

    case SET_ANALYTICS_TYPE:
      return{
        ...state,
        analytics_type: action.payload
      }

    default:
      return state;
  }
}
