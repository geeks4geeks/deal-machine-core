import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  GET_ANALYTICS,
  REFRESH_ANALYTICS,
  GET_ANALYTICS_FAIL,
  GET_ANALYTICS_SUCCESS,
  TOGGLE_ANALYTICS_TEAM,

  CHANGE_ANALYTICS_DATES_OPTION,
  UPDATE_ANALYTICS_FILTER,
  UPDATE_SINGLE_ANALYTICS_FILTER,

  SET_TRACKING_EVENT,

  SET_ANALYTICS_TYPE
} from 'app/DealMachineCore/types';

import API from 'app/DealMachineCore/apis/DealMachineAPI';
import moment from 'moment';

const api = API.create();

export const toggleAnalyticsTeam = (team) => {
  return {
    type: TOGGLE_ANALYTICS_TEAM,
    payload: team
  }
}

export const getAnalytics = ({ token, type, start_date, end_date, date_option, filters}) => {
  return (dispatch) => {

    switch(type){
      default:
        dispatch({ type:  GET_ANALYTICS });
        dispatch({ type: SET_TRACKING_EVENT, payload: "getAnalytics" });

      break;

      case "refresh":
        dispatch({ type:  REFRESH_ANALYTICS });
        dispatch({ type: SET_TRACKING_EVENT, payload: "refreshAnalytics" });

      break;
    }

    api.analytics({token, start_date, end_date, date_option, filters})
      .then(response => {
        if(response.problem != null){
          getAnalyticsFail(dispatch, response.problem);
        }else if(response.data.error != false){
          getAnalyticsFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          getAnalyticsSuccess(dispatch, response.data.results);
        }
      });
  };
};

const getAnalyticsFail = (dispatch, error) => {
  dispatch({ type: GET_ANALYTICS_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getAnalyticsFail" });

};

const getAnalyticsSuccess = (dispatch, results) => {

  dispatch({
    type: GET_ANALYTICS_SUCCESS,
    payload: {analytics_dates: results.dates, active_deals: results.active_deals}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getAnalyticsSuccess" });

};

export const changeAnalyticsDateOption = ({date_option, start_date = null, end_date = null, user}) => {

  let new_start_date = "";
  let new_end_date = "";

  var date = new Date();
  var offsetInHours = date.getTimezoneOffset() / 60;
  new_end_date = moment().add(1, "day").subtract(offsetInHours, "hours").format("YYYY-MM-DD");

  switch(date_option){

    default:
    case "4wk":
      new_start_date = moment().subtract(28, "days").format("YYYY-MM-DD");
    break;

    case "mtd":
      new_start_date = moment().startOf('month').format('YYYY-MM-DD');
    break;

    case "qtd":
      new_start_date = moment().startOf('quarter').format('YYYY-MM-DD');
    break;

    case "ytd":
      new_start_date = moment().startOf('year').format('YYYY-MM-DD');
    break;

    case "all":
      new_start_date = moment(user.date_created).format('YYYY-MM-DD');
    break;


    case "custom":
      new_start_date = start_date;
      new_end_date = end_date;
    break;

  }

  return{
    type: CHANGE_ANALYTICS_DATES_OPTION,
    payload: {
      date_option: date_option,
      start_date: new_start_date,
      end_date: new_end_date
    }
  }

}

export const updateAnlyticsFilters = (filters) => {
  return{
    type: UPDATE_ANALYTICS_FILTER,
    payload: {filters}
  }
}

export const updateSingleAnlyticsFilters = ({prop, value}) => {
  return{
    type: UPDATE_SINGLE_ANALYTICS_FILTER,
    payload: {prop, value}
  }
}

export const setAnalyticsType = (analytics_type) =>{
  return{
    type: SET_ANALYTICS_TYPE,
    payload: analytics_type
  }
}
