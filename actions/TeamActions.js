import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  GET_TEAM,
  GET_TEAM_FAIL,
  GET_TEAM_SUCCESS,
  REFRESH_TEAM,
  SELECT_TEAM,
  TEAM_FIELD_CHANGED,
  EDIT_TEAM,
  EDIT_TEAM_FAIL,
  EDIT_TEAM_SUCCESS,
  REQUEST_TO_JOIN_TEAM_SUCCESS,
  CANCEL_TEAM_REQUEST_SUCCESS,
  UPDATE_TEAM_LINK,
  RESET_INVITE,
  SET_PERMISSIONS,
  SET_MEMBER,
  SET_INVITE,
  TOGGLE_TEAM_OPTIONS,
  EDIT_TEAM_SEARCH_CHANGED,
  TEAM_SEARCH_CHANGED,

  SET_TRACKING_EVENT,

  GET_TEAM_MEMBERS,
  REFRESH_TEAM_MEMBERS,
  LOAD_MORE_TEAM_MEMBERS,
  GET_TEAM_MEMBERS_FAIL,
  GET_TEAM_MEMBERS_SUCCESS,
  REPLACE_TEAM_MEMBERS,
  REPLACE_TEAM_MEMBERS_SUCCESS,
  EDIT_TEAM_MEMBERS_SEARCH,

  SELECT_ACTIVE_TEAM_MEMBER,

  UPDATE_TEAM_MEMBERS,
  UPDATE_TEAM_MEMBERS_FAIL,
  UPDATE_TEAM_MEMBERS_SUCCESS,
  REVOKE_TEAM_INVITE_SUCCESS,
  REMOVE_TEAM_MEMBER_SUCCESS,
  INVITE_TEAM_MEMBER_SUCCESS,

  SET_INVITE_TYPE
} from 'app/DealMachineCore/types';

import { appRedirect } from 'app/NativeActions';

import API from 'app/DealMachineCore/apis/DealMachineAPI';
import APIV2 from 'app/DealMachineCore/apis/DealMachineAPIV2';

const api = API.create();
const apiv2 = APIV2.create();

export const selectTeam = (team_id) => {
  return {
    type: SELECT_TEAM,
    payload: team_id
  }
}

export const toggleTeamOptions = (toggle) => {
  return {
    type: TOGGLE_TEAM_OPTIONS,
    payload: toggle
  };
};

export const setInviteType = (type) => {
  return {
    type: SET_INVITE_TYPE,
    payload: type
  };
};




export const editTeamSearchChanged = (editTeamSearch) => {
  return {
    type: EDIT_TEAM_SEARCH_CHANGED,
    payload: editTeamSearch
  }
}
export const teamSearchChanged = (teamSearch) => {
  return {
    type: TEAM_SEARCH_CHANGED,
    payload: teamSearch
  };
};

export const resetInvite = () => {
  return {
    type: RESET_INVITE
  };
};
export const setPermissions = ({ member }) => {
  return {
    type: SET_PERMISSIONS,
    payload: { member }
  };
};

export const setMember = (member) => {
  return {
    type: SET_MEMBER,
    payload: member
  };
};

export const setInvite = (invite) => {
  return {
    type: SET_INVITE,
    payload: invite
  };
};

export const teamFieldChanged = ({ prop, value }) => {
  return {
    type: TEAM_FIELD_CHANGED,
    payload: { prop, value }
  };
};



export const getTeam = ({ token, team, member, invite, type }) => {
  return (dispatch) => {

    switch(type){
      case "refresh":
        dispatch({ type: REFRESH_TEAM });
        dispatch({ type: SET_TRACKING_EVENT, payload: "refreshTeam" });

      break;

      case "load":
      default:
        dispatch({ type:  GET_TEAM });
        dispatch({ type: SET_TRACKING_EVENT, payload: "getTeam" });

      break;
    }

    api.team(token, team, member, invite)
      .then(response => {
        if(response.problem != null){
          getTeamFail(dispatch, response.problem);
        }else if(response.data.error != false){
          getTeamFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          getTeamSuccess(dispatch, response.data.results.my_team, response.data.results.other_teams, response.data.results.invites, response.data.results.member, response.data.results.invite, response.data.results.user, response.data.results.dealfinder_page, response.data.results.team_link_defaults);
        }
      });
  };
};

const getTeamFail = (dispatch, error) => {
  dispatch({ type: GET_TEAM_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "getTeamFail" });

};

const getTeamSuccess = (dispatch, my_team, other_teams, invites, member, invite, user, dealfinder_page, team_link_defaults) => {
  dispatch({
    type: GET_TEAM_SUCCESS,
    payload: {my_team, other_teams, invites, member, invite, user, dealfinder_page, team_link_defaults}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "getTeamSuccess" });

};



export const editTeam = ({ token, team, type, payload }) => {
  return (dispatch) => {
    dispatch({type: IS_LOADING, payload: true});
    dispatch({ type: EDIT_TEAM });

    dispatch({ type: SET_TRACKING_EVENT, payload: "editTeam" });


    api.editTeam(token, team, type, payload)
      .then(response => {
        if(response.problem != null){
          editTeamFail(dispatch, response.problem);
        }else if(response.data.error != false){
          editTeamFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          editTeamSuccess(dispatch, type, response.data.results.my_team, response.data.results.other_teams, response.data.results.invites, response.data.results.member, response.data.results.invite, response.data.results.user, response.data.results.badges, response.data.results.dealfinder_page, response.data.results.team_link_defaults);
        }
      });
  };
};

const editTeamFail = (dispatch, error) => {
  dispatch({ type: EDIT_TEAM_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "editTeamFail" });

};

const editTeamSuccess = (dispatch, type, my_team, other_teams, invites, member, invite, user, badges, dealfinder_page, team_link_defaults) => {

  dispatch({
    type: EDIT_TEAM_SUCCESS,
    payload: {my_team, other_teams, invites,  member, invite, user, badges, dealfinder_page, team_link_defaults}
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "editTeamSuccess_"+type });


  switch(type){
    default:
      dispatch({type: IS_LOADING, payload: false});
    break;

    case "add_member":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your invite has been sent.", title: "Success!"}
      });
      appRedirect({dispatch, redirect: "goBack", payload:{type: "team"}})
    break;

    case "accept_request":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully accepted the request.", title: "Success!"}
      });
      appRedirect({dispatch, redirect: "goBack", payload:{type: "team"}})
    break;


    case "edit_clearance_level":
    case "edit_permissions":
    case "edit_invite_clearance_level":
    case "edit_invite_permissions":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated this user's permissions.", title: "Success!"}
      });

      //appRedirect({dispatch, redirect: "goBack", payload:{type: "team"}})

    break;

    case "remove_member":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully removed the team member.", title: "Success!"}
      });
      appRedirect({dispatch, redirect: "goBack", payload:{type: "team"}})
    break;

    case "decline_request":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully declined the request.", title: "Success!"}
      });
      appRedirect({dispatch, redirect: "goBack", payload:{type: "team"}})
    break;

    case "remove_invite":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully remove the invitation.", title: "Success!"}
      });
      appRedirect({dispatch, redirect: "goBack", payload:{type: "team"}})
    break;

    case "resend_invite":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your invite has been sent.", title: "Success!"}
      });
      appRedirect({dispatch, redirect: "goBack", payload:{type: "team"}})
    break;

    case "leave_team":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully left the team.", title: "Success!"}
      });

    break;

    case "accept_invite":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully accepted the invitation.", title: "Success!"}
      });

    break;

    case "request_to_join":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your request has been sent.", title: "Success!"}
      });
      dispatch({
        type: REQUEST_TO_JOIN_TEAM_SUCCESS,
        payload: {user}
      });
      appRedirect({dispatch, redirect: "requestedTeam"})

    break;

    case "cancel_request":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "Your request has been canceled.", title: "Success!"}
      });

      dispatch({
        type: CANCEL_TEAM_REQUEST_SUCCESS,
        payload: {user}
      });

      appRedirect({dispatch, redirect: "billingOnboarding"})

    break;

    case "create_team_link":
      dispatch({
        type: UPDATE_TEAM_LINK,
        payload: {user}
      });


      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully created your invite link.", title: "Success!"}
      });

    break;

    case "edit_team_link":
      dispatch({
        type: UPDATE_TEAM_LINK,
        payload: {user}
      });

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully edited your invite link.", title: "Success!"}
      });

    break;

    case "update_team_link":
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully edited your DealFinder page and training.", title: "Success!"}
      });

    break;

    case "complete_dealfinder_training":
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully completed your DealFinder training.", title: "Success!"}
      });

    break;

    case "remove_team_link":
      dispatch({
        type: UPDATE_TEAM_LINK,
        payload: {user}
      });

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully deactivated your invite link.", title: "Success!"}
      });

    break;
  }

};


export const getTeamMembers = ({ token, load_type = "load", type, begin = 0, search = "" }) => {
  return dispatch => {
    switch (load_type) {
      case "refresh":
        dispatch({ type: REFRESH_TEAM_MEMBERS });
      break;

      case "load_more":
        dispatch({ type: LOAD_MORE_TEAM_MEMBERS });
      break;

      default:
      case "load":
        dispatch({ type: GET_TEAM_MEMBERS });
      break;

      case "replace":
        dispatch({ type: REPLACE_TEAM_MEMBERS });
      break;
    }

    apiv2.getTeamMembers({ token, type, begin, search }).then(response => {

      if (response.problem != null) {
        dispatch({ type: GET_TEAM_MEMBERS_FAIL, payload: response.problem });
      } else if (response.data.error != false) {
        dispatch({ type: GET_TEAM_MEMBERS_FAIL, payload: response.data.error });
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        if(type == "replace"){
          dispatch({ type: REPLACE_TEAM_MEMBERS_SUCCESS, payload: response.data.results });
        }else{
          dispatch({ type: GET_TEAM_MEMBERS_SUCCESS, payload: response.data.results });
        }
      }
    });
  };
};


export const updateTeamMembers = ({ token, type, team_member_id, member_type, module_type, email,
  team_clearance_level, can_approve_mail, can_enhanced_search, can_see_all_deals, can_edit_templates, can_export_data
 }) => {
  return dispatch => {
    dispatch({type: IS_LOADING, payload: true});

    apiv2.updateTeamMembers({ token, type, team_member_id, member_type, module_type, email, team_clearance_level, can_approve_mail, can_enhanced_search, can_see_all_deals, can_edit_templates, can_export_data }).then(response => {

      if (response.problem != null) {
        dispatch({
          type: ERROR_MESSAGE,
          payload: {message: response.problem, title: "Error"}
        });
      } else if (response.data.error != false) {
        dispatch({
          type: ERROR_MESSAGE,
          payload: {message: response.data.error, title: "Error"}
        });
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        if(type == "revoke_invite"){
          appRedirect({dispatch, redirect: "goBack", payload: {remove: "invite", invite_id: team_member_id}});
          dispatch({ type: REVOKE_TEAM_INVITE_SUCCESS, payload: {team_member_id, member_type} });
        }else if(type == "remove_member"){
          appRedirect({dispatch, redirect: "goBack", payload: {remove: "user", user_id: team_member_id}});
          dispatch({ type: REMOVE_TEAM_MEMBER_SUCCESS, payload: {team_member_id, member_type} });
        }else if(type == "invite_member" || type == "invite_dealfinder"){
          dispatch({ type: INVITE_TEAM_MEMBER_SUCCESS, payload: response.data.results });
          appRedirect({dispatch, redirect: "goBack", payload: {remove: "invite"}});
        }else{
          dispatch({ type: UPDATE_TEAM_MEMBERS_SUCCESS, payload: response.data.results });
        }

        switch(type){
          case "revoke_invite":
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: {message: "You've successfully created your revoked this invitation.", title: "Success!"}
            });
          break;

          case "resend_invite":
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: {message: "You've successfully resent this invitation.", title: "Success!"}
            });
          break;

          case "invite_member":
          case "invite_dealfinder":
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: {message: "You've successfully invited this user.", title: "Success!"}
            });
          break;

          case "edit_permissions":
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: {message: "You've successfully edited this user's permissions.", title: "Success!"}
            });
          break;

          case "remove_member":
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: {message: "You've successfully removed this user from your team.", title: "Success!"}
            });
          break;

          case "grant_access":
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: {message: "You've successfully granted access to this feature.", title: "Success!"}
            });
          break;

          case "remove_access":
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: {message: "You've successfully removed access to this feature.", title: "Success!"}
            });
          break;
        }

      }
    });
  };
};

export const selectActiveTeamMember = (team_member) => {
  return{
    type: SELECT_ACTIVE_TEAM_MEMBER,
    payload: team_member
  }
}
