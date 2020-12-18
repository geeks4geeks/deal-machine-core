import {
  LOGOUT,
  RESET_ACTIVITY,
  DRAG_PANEL,
  TOGGLE_DRAG,
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
  IS_DRAGGING,
  INIT_MAIL_TIMELINE,

  TOGGLE_TEAM_OPTIONS,
  EDIT_TEAM_SEARCH_CHANGED,
  TEAM_SEARCH_CHANGED,

  GET_TEAM_ACTIVITY,
  GET_TEAM_ACTIVITY_FAIL,
  GET_TEAM_ACTIVITY_SUCCESS,
  REFRESH_TEAM_ACTIVITY,
  LOAD_MORE_TEAM_ACTIVITY,

  GET_ACTIVITY_PROPERTIES,
  GET_ACTIVITY_PROPERTIES_FAIL,
  GET_ACTIVITY_PROPERTIES_SUCCESS,
  REFRESH_ACTIVITY_PROPERTIES,
  LOAD_MORE_ACTIVITY_PROPERTIES,

  UPDATE_DETAILED_OPTIONS,

  SET_ACTIVITY_PROPERTIES_TYPE,

  GET_MAILERS,
  GET_MAILERS_FAIL,
  GET_MAILERS_SUCCESS,
  REFRESH_MAILERS,
  LOAD_MORE_MAILERS,

  SWITCH_NOTIFICATION_PANEL_TAB

} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  dragged_value: -75,
  drag_toggle: true,
  is_dragging: false,
  activity_tab: "all",
  refreshing: false,
  reload: false,
  message: "",
  toggle_message_type: false,
  message_type: "note",
  message_height: 0,
  mentions: {
    keyword: "",
    tracker: false,
    prev_char: ' '
  },
  loading: false,
  error: '',
  activity_items: [],
  editNote:{},
  originalNote:{},
  mail_timeline:[],
  detailed_options: false,


  team_activity: [],
  team_activity_loading: false,
  team_activity_refreshing: false,
  team_activity_loaded_all:false,
  team_activity_begin: 0,
  team_activity_limit: 25,
  toggle_team_options: '',
  teamSearch: '',
  loading: false,
  refreshing: false,
  editTeamSearch: '',


  activity_properties: [],
  activity_properties_loading: false,
  activity_properties_refreshing: false,
  activity_properties_loaded_all:false,
  activity_properties_begin: 0,
  activity_properties_limit: 25,

  activity_properties_type: null,

  mailers: [],
  mailers_loading: false,
  mailers_refreshing: false,
  mailers_loaded_all:false,
  mailers_begin: 0,
  mailers_limit: 25,

  notification_panel_tab: "tasks"
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){

    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };

    case RESET_ACTIVITY:
      return {
        ...state,
        activity_items: INITIAL_STATE.activity_items,
        loading: INITIAL_STATE.loading,
        refreshing: INITIAL_STATE.refreshing,
        error: INITIAL_STATE.error
      };
    case SET_MESSAGE_HEIGHT:

      return {
        ...state,
        message_height: action.payload
      }
    case TOGGLE_DRAG:

      return {
        ...state,
        drag_toggle: action.payload
      };
    case IS_DRAGGING:

      return {
        ...state,
        is_dragging: action.payload
      }


    case DRAG_PANEL:
      return {
        ...state,
        dragged_value: action.payload
      };
    case CHANGE_ACTIVITY_TAB:
      return {
        ...state,
        activity_tab: action.payload,
        message_height: INITIAL_STATE.message_height,
        message: ""

      };
    case MESSAGE_FIELD_CHANGE:
      return {
        ...state,
        message: action.payload
      };
    case TOGGLE_MESSAGE_TYPE_SWITCH:
      return {
        ...state,
        toggle_message_type: action.payload
      };
    case CHANGE_MESSAGE_TYPE_SWITCH:
      return {
        ...state,
        message_type: action.payload,
        toggle_message_type: false
      };

    case CHANGE_MENTION:
      return {
        ...state,
        mentions: {
          ...state.mentions,
          [action.payload.prop]: action.payload.value
        }
      };
    case GET_ACTIVITY:
      return {
        ...state,
        activity_items: [],
        loading: true,
        error: ''
      };
    case UPDATE_ACTIVITY:
      return {
        ...state,
        loading: false,
        error: ''
      };
    case TRIGGER_ACTIVITY_UPDATE:
      return {
        ...state,
        reload: action.payload
      };
    case GET_ACTIVITY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        activity_items: action.payload.activity
      };
    case POST_NOTE:
      return {
        ...state,
        error: '',
        message: '',
        mentions: INITIAL_STATE.mentions,
        message_height: INITIAL_STATE.message_height,
        activity_items: [action.payload, ...state.activity_items]
      };


    case UPDATE_NOTE:
      return {
        ...state,
        error: ''
      };
    case POST_NOTE_FAIL:
    case UPDATE_NOTE_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case POST_NOTE_SUCCESS:
    case UPDATE_NOTE_SUCCESS:
    case REMOVE_NOTE_SUCCESS:
      return {
        ...state,
        activity_items: action.payload.activity
      };
    case INIT_EDIT_NOTE:
      return{
        ...state,
        editNote: action.payload.note,
        originalNote: action.payload.note
      }
    case EDIT_NOTE_FIELD_CHANGED:
      return{
        ...state,
        editNote:{
          ...state.editNote,
          [action.payload.prop]: action.payload.value
        }
      }
    case INIT_MAIL_TIMELINE:
      return {
        ...state,
        mail_timeline: action.payload.addresses
      }

    case GET_TEAM_ACTIVITY:
      return{
        ...state,
        team_activity: [],
        team_activity_loading: true,
        team_activity_refreshing: false,
        team_activity_begin: 0,
        team_activity_loaded_all: false
      };
    case REFRESH_TEAM_ACTIVITY:
      return{
        ...state,
        team_activity: [],
        team_activity_loading: false,
        team_activity_refreshing: true,
        team_activity_begin: 0,
        team_activity_loaded_all: false
      };
    case LOAD_MORE_TEAM_ACTIVITY:
      return{
        ...state,
        team_activity_loading: true,
        team_activity_refreshing: false,
        team_activity_loaded_all: true
      };
    case GET_TEAM_ACTIVITY_FAIL:
      return{
        ...state,
        team_activity_loading: false,
        team_activity_refreshing: false
      }
    case GET_TEAM_ACTIVITY_SUCCESS:

      return{
        ...state,
        team_activity_loading: false,
        team_activity_refreshing: false,
        team_activity: state.team_activity.concat(action.payload.activity),
        team_activity_begin: state.team_activity_begin+action.payload.activity.length,
        team_activity_loaded_all: action.payload.activity.length < state.team_activity_limit
      }

    case TOGGLE_TEAM_OPTIONS:
          return {
            ...state,
            toggle_team_options: action.payload
          };
    case TEAM_SEARCH_CHANGED:
            return {
              ...state,
              begin: 0,
              teamSearch: action.payload
            };
    case EDIT_TEAM_SEARCH_CHANGED:
      return {
        ...state,
        editTeamSearch: action.payload
      }

    case UPDATE_DETAILED_OPTIONS:
      return{
        ...state,
        detailed_options: action.payload
      }

    case GET_ACTIVITY_PROPERTIES:
      return{
        ...state,
        activity_properties: [],
        activity_properties_loading: true,
        activity_properties_refreshing: false,
        activity_properties_begin: 0,
        activity_properties_loaded_all: false
      };
    case REFRESH_ACTIVITY_PROPERTIES:
      return{
        ...state,
        activity_properties: [],
        activity_properties_loading: false,
        activity_properties_refreshing: true,
        activity_properties_begin: 0,
        activity_properties_loaded_all: false
      };
    case LOAD_MORE_ACTIVITY_PROPERTIES:
      return{
        ...state,
        activity_properties_loading: true,
        activity_properties_refreshing: false,
        activity_properties_loaded_all: true
      };
    case GET_ACTIVITY_PROPERTIES_FAIL:
      return{
        ...state,
        activity_properties_loading: false,
        activity_properties_refreshing: false
      }
    case GET_ACTIVITY_PROPERTIES_SUCCESS:

      return{
        ...state,
        activity_properties_loading: false,
        activity_properties_refreshing: false,
        activity_properties: state.activity_properties.concat(action.payload.properties),
        activity_properties_begin: state.activity_properties_begin+action.payload.properties.length,
        activity_properties_loaded_all: action.payload.properties.length < state.activity_properties_limit
      }
    case SET_ACTIVITY_PROPERTIES_TYPE:
      return{
        ...state,
        activity_properties_type: action.payload,
        activity_properties: []
      }

    case GET_MAILERS:
      return{
        ...state,
        mailers: [],
        mailers_loading: true,
        mailers_refreshing: false,
        mailers_begin: 0,
        mailers_loaded_all: false
      };
    case REFRESH_MAILERS:
      return{
        ...state,
        mailers: [],
        mailers_loading: false,
        mailers_refreshing: true,
        mailers_begin: 0,
        mailers_loaded_all: false
      };
    case LOAD_MORE_MAILERS:
      return{
        ...state,
        mailers_loading: true,
        mailers_refreshing: false,
        mailers_loaded_all: true
      };
    case GET_MAILERS_FAIL:
      return{
        ...state,
        mailers_loading: false,
        mailers_refreshing: false
      }
    case GET_MAILERS_SUCCESS:

      return{
        ...state,
        mailers_loading: false,
        mailers_refreshing: false,
        mailers: state.mailers.concat(action.payload.mailers),
        mailers_begin: state.mailers_begin+action.payload.mailers.length,
        mailers_loaded_all: action.payload.mailers.length < state.mailers_limit
      }
    case SWITCH_NOTIFICATION_PANEL_TAB:
      return{
        ...state,
        notification_panel_tab: action.payload
      }

    default:
      return state;
  }
}
