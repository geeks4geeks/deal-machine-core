import {
  LOGOUT,
  GET_TEAM_LINK_INFO,
  GET_TEAM_LINK_INFO_SUCCESS,

  EDIT_TEAM_SUCCESS,
  GET_TEAM_SUCCESS,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS
} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  //for actual page
  team_link_loading: false,
  team_link_info: null,

  //for editing the page
  live_page: "off",
  require_training: 0,
  user_team_link: "",
  user_dealfinder_page: null,
  dealfinder_page_defaults: null
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case GET_TEAM_LINK_INFO:
      return {
        ...state,
        team_link_loading: true,
        team_link_info: null
      };

    case GET_TEAM_LINK_INFO_SUCCESS:

      return {
        ...state,
        team_link_loading: false,
        team_link_info: action.payload
      };

    case EDIT_TEAM_SUCCESS:
    case GET_TEAM_SUCCESS:
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:

      return {
        ...state,
        user_dealfinder_page: action.payload.dealfinder_page,
        dealfinder_page_defaults: action.payload.team_link_defaults,
        user_team_link: action.payload.dealfinder_page.team_link ? action.payload.dealfinder_page.team_link : "",
        live_page: action.payload.dealfinder_page.live_page ? action.payload.dealfinder_page.live_page : "off",
        require_training: action.payload.dealfinder_page.require_training ? action.payload.dealfinder_page.require_training : 0,
      }


    default:
      return state;
  }
}
