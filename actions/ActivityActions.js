import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  RESET_ACTIVITY,
  DRAG_PANEL,
  TOGGLE_DRAG,
  IS_DRAGGING,
  CHANGE_ACTIVITY_TAB,
  MESSAGE_FIELD_CHANGE,
  TOGGLE_MESSAGE_TYPE_SWITCH,
  CHANGE_MESSAGE_TYPE_SWITCH,
  CHANGE_MENTION,
  GET_ACTIVITY,
  GET_ACTIVITY_FAIL,
  GET_ACTIVITY_SUCCESS,
  POST_NOTE,
  POST_NOTE_FAIL,
  POST_NOTE_SUCCESS,
  UPDATE_NOTE,
  UPDATE_NOTE_FAIL,
  UPDATE_NOTE_SUCCESS,
  REMOVE_NOTE_SUCCESS,
  EDIT_NOTE_FIELD_CHANGED,
  INIT_EDIT_NOTE,
  SET_MESSAGE_HEIGHT,
  UPDATE_ACTIVITY,
  TRIGGER_ACTIVITY_UPDATE,
  INIT_MAIL_TIMELINE,

  GET_TEAM_ACTIVITY,
  GET_TEAM_ACTIVITY_FAIL,
  GET_TEAM_ACTIVITY_SUCCESS,
  REFRESH_TEAM_ACTIVITY,
  LOAD_MORE_TEAM_ACTIVITY,

  SET_TRACKING_EVENT,
  UPDATE_DETAILED_OPTIONS,

  GET_ACTIVITY_PROPERTIES,
  GET_ACTIVITY_PROPERTIES_FAIL,
  GET_ACTIVITY_PROPERTIES_SUCCESS,
  REFRESH_ACTIVITY_PROPERTIES,
  LOAD_MORE_ACTIVITY_PROPERTIES,

  SET_ACTIVITY_PROPERTIES_TYPE,

  GET_MAILERS,
  GET_MAILERS_FAIL,
  GET_MAILERS_SUCCESS,
  REFRESH_MAILERS,
  LOAD_MORE_MAILERS,

  SWITCH_NOTIFICATION_PANEL_TAB

} from 'app/DealMachineCore/types';

import { appRedirect } from 'app/NativeActions';

import API from 'app/DealMachineCore/apis/DealMachineAPI';
import APIV2 from 'app/DealMachineCore/apis/DealMachineAPIV2';

const api = API.create();
const apiv2 = APIV2.create();

export const resetActivity = () => {
  return {
    type: RESET_ACTIVITY
  };
}

export const dragPanel = (dragged_value) => {
  return {
    type: DRAG_PANEL,
    payload: dragged_value
  }
}

export const toggleDrag = (toggle) => {
  return {
    type: TOGGLE_DRAG,
    payload: toggle
  }
}
export const isDragging = (toggle) => {
  return {
    type: IS_DRAGGING,
    payload: toggle
  }
}
export const changeActivityTab = (tab) => {
  return {
    type: CHANGE_ACTIVITY_TAB,
    payload: tab
  }
}
export const messageFieldChange = (message) => {
  return {
    type: MESSAGE_FIELD_CHANGE,
    payload: message
  }
}

export const setMessageHeight = (height) => {
  return {
    type: SET_MESSAGE_HEIGHT,
    payload: height
  }
}

export const toggleMessageTypeSwitch = (toggle) => {
  return {
    type: TOGGLE_MESSAGE_TYPE_SWITCH,
    payload: toggle
  }
}

export const changeMessageTypeSwitch = (message_type) => {
  return {
    type: CHANGE_MESSAGE_TYPE_SWITCH,
    payload: message_type
  }
}

export const changeMention = ({prop, value}) => {
  return {
    type: CHANGE_MENTION,
    payload: {prop, value}
  }
}

export const triggerActivityUpdate = (trigger) => {
  return {
    type: TRIGGER_ACTIVITY_UPDATE,
    payload: trigger
  }
}

export const updateDetailedOptions = (toggle) => {
  return {
    type: UPDATE_DETAILED_OPTIONS,
    payload: toggle
  }
}

export const setActivityPropertiesType = ({slug, title, date, route_id, team_member_id}) => {
  return {
    type: SET_ACTIVITY_PROPERTIES_TYPE,
    payload: {slug, title, date, route_id, team_member_id}
  }
}

export const switchNotifcationPanelTab = (tab) => {
  return {
    type: SWITCH_NOTIFICATION_PANEL_TAB,
    payload: tab
  }
}



export const getActivity = ({ token, deal_id, type }) => {
  return (dispatch) => {
    switch(type){
      default:
        dispatch({ type: GET_ACTIVITY });
        dispatch({ type: SET_TRACKING_EVENT, payload: "getActivity" });

      break;

      case "update":
        dispatch({ type: UPDATE_ACTIVITY });
        dispatch({ type: SET_TRACKING_EVENT, payload: "updateActivity" });

      break;
    }

    api.activity(token, deal_id)
      .then(response => {

        if(response.problem != null){
          getActivityFail(dispatch, response.problem);
        }else if(response.data.error != false){
          getActivityFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          getActivitySuccess(dispatch, response.data.results.activity, response.data.results.all_tags);
        }
      });
  };
};


const getActivityFail = (dispatch, error) => {
  dispatch({ type: SET_TRACKING_EVENT, payload: "getActivityFail" });
  dispatch({ type: GET_ACTIVITY_FAIL, payload: error });
}

const getActivitySuccess = (dispatch, activity, all_tags) => {
  dispatch({ type: SET_TRACKING_EVENT, payload: "getActivitySuccess" });
  dispatch({
    type: GET_ACTIVITY_SUCCESS,
    payload: {activity, all_tags}
  });
}

export const updateNote = ({ token, deal_id, type, payload }) => {
  return (dispatch) => {


    switch(type){
      case "post_note":
        dispatch({ type: POST_NOTE, payload });
        dispatch({ type: SET_TRACKING_EVENT, payload: "postNote" });

      break;
      case "edit_note":
        dispatch({ type: UPDATE_NOTE });
        dispatch({type: IS_LOADING, payload: true});
        dispatch({ type: SET_TRACKING_EVENT, payload: "editNote" });


      break;
      case "remove_note":
        dispatch({ type: UPDATE_NOTE });
        dispatch({type: IS_LOADING, payload: true});
        dispatch({ type: SET_TRACKING_EVENT, payload: "removeNote" });

      break;
    }



    api.note(token, deal_id, type, payload)
      .then(response => {

        if(response.problem != null){
          noteFail(dispatch, response.problem);
        }else if(response.data.error != false){
          noteFail(dispatch, response.data.error, type);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          noteSuccess(dispatch, response.data.results.activity, type, deal_id);
        }
      });
  };
};


const noteFail = (dispatch, error, type) => {

  switch(type){
    case "post_note":
      dispatch({ type: POST_NOTE_FAIL, payload: error });
      dispatch({type: IS_LOADING, payload: false});
      dispatch({ type: SET_TRACKING_EVENT, payload: "postNoteFail" });

    break;
    case "edit_note":
      dispatch({ type: UPDATE_NOTE_FAIL, payload: error });
      dispatch({
        type: ERROR_MESSAGE,
        payload: {message: error, title: "Error"}
      });
      dispatch({ type: SET_TRACKING_EVENT, payload: "editNoteFail" });

    break;
    case "remove_note":
      dispatch({ type: UPDATE_NOTE_FAIL, payload: error });
      dispatch({
        type: ERROR_MESSAGE,
        payload: {message: error, title: "Error"}
      });
      dispatch({ type: SET_TRACKING_EVENT, payload: "removeNoteFail" });

    break;
  }




}

const noteSuccess = (dispatch, activity, type, deal_id) => {

  switch(type){
    case "post_note":
      dispatch({ type: POST_NOTE_SUCCESS, payload: {activity} });
      dispatch({type: IS_LOADING, payload: false});
      dispatch({ type: SET_TRACKING_EVENT, payload: "postNoteSuccess" });
    break;
    case "edit_note":

      dispatch({ type: UPDATE_NOTE_SUCCESS, payload: {activity} });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated the note.", title: "Success!"}
      });
      dispatch({ type: SET_TRACKING_EVENT, payload: "editNoteSuccess" });
      appRedirect({dispatch, redirect: "goBack", payload: {remove: "edit-note"}});

    break;
    case "remove_note":
      dispatch({ type: REMOVE_NOTE_SUCCESS, payload: {activity} });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully removed the note.", title: "Success!"}
      });
      dispatch({ type: SET_TRACKING_EVENT, payload: "removeNoteSuccess" });

      appRedirect({dispatch, redirect: "goBack", payload: {remove: "edit-note"}});
    break;
  }
}
export const initMailTimeline = ({addresses}) => {
  return {
    type: INIT_MAIL_TIMELINE,
    payload: {addresses}
  }
}

export const initEditNote = ({note}) => {
  return {
    type: INIT_EDIT_NOTE,
    payload: {note}
  }
}

export const editNoteFieldChanged = ({prop, value}) => {
  return {
    type: EDIT_NOTE_FIELD_CHANGED,
    payload: {prop, value}
  }
}

/* common functions */
export const renderActivityName = (item, user) =>{
  if(item.user_id == user.id){
    return "You";
  }else{
    return item.firstname+" "+item.lastname;
  }
}

export const renderActivityMailTitle = (item) =>{
  if(item.timeline.returned_to_sender_date != null){
    return "Mail returned to sender.";
  }else if(item.timeline.processed_for_delivery_date != null && (item.timeline.re_routed_date == null || item.timeline.re_routed_date < item.timeline.processed_for_delivery_date)){
    return "Mail delivered.";
  }else if(item.timeline.re_routed_date != null){
    return "Mail re-routed.";
  }else if(item.timeline.in_local_area_date != null){
    return "Mail in local area.";
  }else if(item.timeline.in_transit_date != null){
    return "Mail in transit.";
  }else{
    return "Mail sent.";
  }

}

export const renderActivityCopy = ({activity_items, item, user}) =>{
    var activity_text = "";

    if(activity_items){
      if(activity_items.length > 0){
        item = activity_items[0]
      }
    }
    if(item && user){

      switch(item.activity_type){

        case "created":

          activity_text = renderActivityName(item, user)+" added this lead.";

          switch(item.lead_source){
            case "mobile_map":
              activity_text = renderActivityName(item, user)+" added this lead via DealMachine Street Engine.";
            break;

            case "desktop_map":
              activity_text = renderActivityName(item, user)+" added this lead via the desktop map.";
            break;

            case "mobile_manual":
            case "desktop_manual":
              activity_text = renderActivityName(item, user)+" added this lead manually.";
            break;

            case "bulk_import":
              activity_text = renderActivityName(item, user)+" added this lead via a bulk import.";
            break;

            case "chrome_extension":
              activity_text = renderActivityName(item, user)+" added this lead via Virtual D4D.";
            break;

            case "driving_route":
              if(item.driving_route){
                activity_text = renderActivityName(item, user)+" added this lead via DealMachine Street Engine ("+item.driving_route.driver_name+"'s Route).";
              }else{
                activity_text = renderActivityName(item, user)+" added this lead via DealMachine Street Engine.";
              }
            break;

            case "build_list":
              activity_text = renderActivityName(item, user)+" added this lead via DealMachine List Engine.";
            break;

          }

        break;


        case "approved":
        case "bulk_edit_start_mailers":
          activity_text = renderActivityName(item, user)+" started mailers.";
        break;

        case "archived":
          activity_text = renderActivityName(item, user)+" trashed this lead.";
        break;

        case "paused":
        case "bulk_edit_pause_mailers":

          activity_text = renderActivityName(item, user)+" paused mailers.";
        break;

        case "closed":
          activity_text = renderActivityName(item, user)+" closed this deal.";
        break;

        case "change_log":

          switch(item.action_type){


            case "approve":
            case "bulk_edit_start_mailers":

              activity_text = renderActivityName(item, user)+" started mailers.";
            break;

            case "pause":
            case "bulk_edit_pause_mailers":

              activity_text = renderActivityName(item, user)+" paused mailers.";
            break;

            case "archive":
              activity_text = renderActivityName(item, user)+" trashed this lead.";
            break;

            case "unarchive":
              activity_text = renderActivityName(item, user)+" restored this lead.";
            break;

            case "close":
              activity_text = renderActivityName(item, user)+" closed this deal.";
            break;

            case "deal_status":
            case "bulk_edit_change_status":

              activity_text = renderActivityName(item, user)+" updated this lead's status.";
            break;

            case "bulk_edit":
              activity_text = renderActivityName(item, user)+" updated this lead.";
    				break;

            case "settings_update":
              activity_text = renderActivityName(item, user)+" updated this lead when changing the default mailing options from the user's settings.";
            break;

    				case "edit_photo":
              activity_text = renderActivityName(item, user)+" updated this lead's photo.";

    				break;

    				case "mailing_options":
            case "bulk_edit_mailing_option":

              activity_text = renderActivityName(item, user)+" updated this lead's mailing options.";
    				break;

    				case "owner":
              activity_text = renderActivityName(item, user)+" updated this property's owner information.";
    				break;

    				case "property_address":
              activity_text = renderActivityName(item, user)+" updated this property's property address.";

    				break;

    				case "purchase_details":
              activity_text = renderActivityName(item, user)+" updated this deal's purchase details.";
    				break;

    				case "tags":
              activity_text = renderActivityName(item, user)+" updated this lead's property tags.";
    				break;
          }


        break;

        case "enhanced_search":
          activity_text = renderActivityName(item, user)+" used a Skip Trace.";
        break;

        case "mailed":
          activity_text = renderActivityMailTitle(item);
        break;

        case "note":
          activity_text = renderActivityName(item, user)+" wrote a note.";
        break;

        default:
          activity_text = "";
        break;
      }

    }

    return activity_text;

}

export const getTeamActivity = ({token, search = "", begin = 0, load_type}) => {

  return (dispatch) => {

      switch(load_type){
        default:
        case "load":
          dispatch({ type: GET_TEAM_ACTIVITY });
          dispatch({ type: SET_TRACKING_EVENT, payload: "getTeamActivity" });

        break;

        case "refresh":
          dispatch({ type: REFRESH_TEAM_ACTIVITY });
          dispatch({ type: SET_TRACKING_EVENT, payload: "refreshTeamActivity" });

        break;

        case "load_more":
          dispatch({ type: LOAD_MORE_TEAM_ACTIVITY });
          dispatch({ type: SET_TRACKING_EVENT, payload: "loadMoreTeamActivity" });
        break;
      }
    apiv2.dashboardActivity(token, search, begin)
    .then(response => {

      if(response.problem != null){
        getTeamActivityFail(dispatch, response.problem);
      }else if(response.data.error != false){
        getTeamActivityFail(dispatch, response.data.error);
        if(response.data.valid == "invalid"){
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        getTeamActivitySuccess(dispatch, response.data.results.activity);
      }
    });

  }
}

const getTeamActivityFail = (dispatch, error) =>{
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
  dispatch({ type: GET_TEAM_ACTIVITY_FAIL, payload: error });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getTeamActivityFail" });

}

const getTeamActivitySuccess = (dispatch, activity) => {
  dispatch({
    type: GET_TEAM_ACTIVITY_SUCCESS,
    payload: {activity}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getTeamActivitySuccess" });

}



export const getActivityProperties = ({token, begin = 0, load_type, filters }) => {

  return (dispatch) => {

      switch(load_type){
        default:
        case "load":
          dispatch({ type: GET_ACTIVITY_PROPERTIES });

        break;

        case "refresh":
          dispatch({ type: REFRESH_ACTIVITY_PROPERTIES });

        break;

        case "load_more":
          dispatch({ type: LOAD_MORE_ACTIVITY_PROPERTIES });
        break;
      }

      apiv2.listProperties({
        token,
        filters,
        begin,
      }).then(response => {
      if(response.problem != null){
        dispatch({ type: GET_ACTIVITY_PROPERTIES_FAIL, payload: response.problem });

      }else if(response.data.error != false){
        dispatch({ type: GET_ACTIVITY_PROPERTIES_FAIL, payload: response.data.error });

        if(response.data.valid == "invalid"){
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        dispatch({ type: GET_ACTIVITY_PROPERTIES_SUCCESS, payload: response.data.results });
      }
    });
  }
}


export const getMailers = ({token, begin = 0, load_type, min_date_mailed, max_date_mailed }) => {

  return (dispatch) => {

      switch(load_type){
        default:
        case "load":
          dispatch({ type: GET_MAILERS });

        break;

        case "refresh":
          dispatch({ type: REFRESH_MAILERS });

        break;

        case "load_more":
          dispatch({ type: LOAD_MORE_MAILERS });
        break;
      }

      apiv2.getMailers({
        token,
        min_date_mailed,
        max_date_mailed,
        begin
      }).then(response => {
      if(response.problem != null){
        dispatch({ type: GET_MAILERS_FAIL, payload: response.problem });

      }else if(response.data.error != false){
        dispatch({ type: GET_MAILERS_FAIL, payload: response.data.error });

        if(response.data.valid == "invalid"){
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        dispatch({ type: GET_MAILERS_SUCCESS, payload: response.data.results });
      }
    });
  }
}
