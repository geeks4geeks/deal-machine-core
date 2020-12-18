import {
  LOGOUT,
  GET_TEAM,
  GET_TEAM_FAIL,
  GET_TEAM_SUCCESS,
  REFRESH_TEAM,
  SELECT_TEAM,
  TEAM_FIELD_CHANGED,
  EDIT_TEAM,
  EDIT_TEAM_FAIL,
  EDIT_TEAM_SUCCESS,
  UPDATE_TEAM_LINK,
  RESET_INVITE,
  SET_PERMISSIONS,
  SET_MEMBER,
  SET_INVITE,

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

const INITIAL_STATE = {
  my_team: [],
  other_teams: [],
  invites: [],
  member: null,
  invite: null,
  team_loading: false,
  refreshing: false,
  team_error: '',
  active_team: null,
  invite_clearance_level: 0,
  invite_email: '',
  invite_link: '',
  invite_can_approve_mail: 1,
  invite_can_enhanced_search: 1,
  invite_can_edit_templates: 1,
  invite_can_export_data: 0,
  invite_can_see_all_deals: 1,

  team_members: [],
  team_members_loading: false,
  team_members_error: '',
  team_members_refreshing: false,
  team_members_loaded_all: false,
  team_members_limit: 25,
  team_members_begin: 0,
  team_members_search: "",

  active_team_member: null,

  invite_type: "team_member"


}

const updateMember = (originalMember, newMembers) => {
  for(var i = 0; i<newMembers.length; i++){
    if(originalMember.id == newMembers[i].id && originalMember.member_type == newMembers[i].member_type){
      return newMembers[i]
    }
  }
  return originalMember;
}


export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case RESET_INVITE:
      return {
        ...state,
        invite_clearance_level: INITIAL_STATE.invite_clearance_level,
        invite_email: INITIAL_STATE.invite_email,
        invite_link: INITIAL_STATE.invite_link,
        invite_can_approve_mail: INITIAL_STATE.invite_can_approve_mail,
        invite_can_enhanced_search: INITIAL_STATE.invite_can_enhanced_search,
        invite_can_edit_templates: INITIAL_STATE.invite_can_edit_templates,
        invite_can_export_data: INITIAL_STATE.invite_can_export_data,
        invite_can_see_all_deals: INITIAL_STATE.invite_can_see_all_deals
      };
    case SET_PERMISSIONS:
      return {
        ...state,
        invite_clearance_level: action.payload.member.team_clearance_level,
        invite_can_approve_mail: action.payload.member.can_approve_mail,
        invite_can_enhanced_search: action.payload.member.can_enhanced_search,
        invite_can_edit_templates: action.payload.member.can_edit_templates,
        invite_can_export_data: action.payload.member.can_export_data,
        invite_can_see_all_deals: action.payload.member.can_see_all_deals
      }
    case TEAM_FIELD_CHANGED:
      //action.payload == {prop: 'name', value: 'Jane'}
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
    case GET_TEAM:
      return {
        ...state,
        team_loading: true,
        my_team: [],
        other_teams: [],
        member: null,
        invite: null,
        team_error: ''
      };

    case REFRESH_TEAM:
      return {
        ...state,
        refreshing: true,
        my_team: [],
        other_teams: [],
        invites: [],
        member: null,
        invite: null,
        team_error: ''
      };
    case GET_TEAM_FAIL:
      return {
        ...state,
        team_loading: false,
        refreshing: false,
        team_error: action.payload
      };
    case GET_TEAM_SUCCESS:
      return {
        ...state,
        team_loading: false,
        refreshing: false,
        my_team: action.payload.my_team,
        other_teams: action.payload.other_teams,
        invites: action.payload.invites,
        member: action.payload.member,
        invite: action.payload.invite
      };
      case GET_TEAM:
        return {
          ...state,
          team_loading: true,
          my_team: [],
          other_teams: [],
          team_error: ''
        };

    case EDIT_TEAM:
      return {
        ...state,
        team_error: ''
      };
    case EDIT_TEAM_FAIL:
      return {
        ...state,
        team_error: action.payload
      };
    case EDIT_TEAM_SUCCESS:
      return {
        ...state,
        my_team: action.payload.my_team,
        other_teams: action.payload.other_teams,
        invites: action.payload.invites,
        member: action.payload.member,
        invite: action.payload.invite,
        invite_email: '',
        invite_clearance_level: 0
      };
    case SELECT_TEAM:
      return {
        ...state,
        active_team: action.payload
      };
    case UPDATE_TEAM_LINK:
      return {
        ...state,
        invite_link: action.payload.user ? action.payload.user.team_link : state.invite_link
      };

    case SET_MEMBER:
      return{
        ...state,
        member: action.payload
      }
    case SET_INVITE:

      return{
        ...state,
        invite: action.payload
      }

    case GET_TEAM_MEMBERS:
      return {
        ...state,
        team_members: [],
        team_members_loading: true,
        team_members_refreshing: false,
        team_members_error: "",
        team_members_loaded_all: false,
        team_members_begin: 0
      };

    case REFRESH_TEAM_MEMBERS:
      return {
        ...state,
        team_members: [],
        team_members_loading: true,
        team_members_refreshing: true,
        team_members_error: "",
        team_members_loaded_all: false,
        team_members_begin: 0
      };
    case LOAD_MORE_TEAM_MEMBERS:
    case REPLACE_TEAM_MEMBERS:
      return {
        ...state,
        team_members_loading: true,
        team_members_refreshing: false,
        team_members_error: "",
        team_members_loaded_all: false
      }
    case GET_TEAM_MEMBERS_FAIL:
      return {
        ...state,
        team_members_loading: false,
        team_members_refreshing: false,
        team_members_error: action.payload
      };


    case GET_TEAM_MEMBERS_SUCCESS:
      return {
        ...state,
        team_members: state.team_members.concat(action.payload.team_members),
        team_members_loading: false,
        team_members_refreshing: false,
        team_members_loaded_all: action.payload.team_members.length < state.team_members_limit,
        team_members_begin: state.team_members_begin + action.payload.team_members.length
      };

    case REPLACE_TEAM_MEMBERS:
      return {
        ...state,
        team_members: action.payload.team_members,
        team_members_loading: false,
        team_members_refreshing: false,
        team_members_loaded_all: action.payload.team_members.length < state.team_members_limit,
        team_members_begin: state.team_members_begin + action.payload.team_members.length
      };
    case EDIT_TEAM_MEMBERS_SEARCH:
      return {
        ...state,
        team_members_search: action.payload
      };

    case SELECT_ACTIVE_TEAM_MEMBER:
      return {
        ...state,
        active_team_member: action.payload
      }

    case UPDATE_TEAM_MEMBERS_SUCCESS:
      return {
        ...state,
        team_members: action.payload.team_members ? state.team_members.map(
           (member, i) => updateMember(member, action.payload.team_members)) : state.team_members,
        active_team_member: action.payload.team_members ? updateMember(state.active_team_member, action.payload.team_members) : state.active_team_member
      }
    case INVITE_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        team_members: action.payload.team_members ? action.payload.team_members.concat(state.team_members) : state.team_members,
        active_team_member: null
      }
    case REVOKE_TEAM_INVITE_SUCCESS:
    case REMOVE_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        team_members: action.payload.team_member_id && action.payload.member_type ? state.team_members.filter(({id, member_type}) => id != action.payload.team_member_id || member_type != action.payload.member_type) : state.team_members,
        active_team_member: null
      }

    case SET_INVITE_TYPE:
      return{
        ...state,
        invite_type: action.payload
      }

    default:
      return state;
  }
}
