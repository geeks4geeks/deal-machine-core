import {
  LOGOUT,
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAIL,
  CREATE_TAG,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAIL,
  REMOVE_TAG_SUCCESS,
  REMOVE_TAG_FAIL,
  HIDE_TAG_SUCCESS,
  HIDE_TAG_FAIL,
  SHOW_TAG_SUCCESS,
  SHOW_TAG_FAIL,


  GET_DEALS_SUCCESS_REPLACE,
  GET_DEALS_SUCCESS,
  GET_MAP_DEALS_SUCCESS,
  GET_SINGLE_DEAL_SUCCESS,
  GET_HIDE_TEAM_TAG_SUCCESS,
  GET_HIDE_TEAM_TAG_FAIL,
  NEW_DEAL_SUCCESS
} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  tags_loaded: false,
  tags_loading: false,
  tags_error: false,
  custom_tags:[],
  default_tags: []
};

export default (state = INITIAL_STATE, action) => {

  switch(action.type){

    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case GET_TAGS:
      return {
        ...state,
        tags_loading: true,
        custom_tags: false,
        custom_tags: [],
        default_tags: []
      }
    case GET_DEALS_SUCCESS_REPLACE:
    case GET_DEALS_SUCCESS:
    case GET_MAP_DEALS_SUCCESS:
    case GET_SINGLE_DEAL_SUCCESS:
    case NEW_DEAL_SUCCESS:
      return {
        ...state,
        custom_tags: action.payload.all_tags ?
          action.payload.all_tags.filter(function(obj) {
            return obj.custom_tag == 1;}) : state.custom_tags,

        default_tags: action.payload.all_tags ?
          action.payload.all_tags.filter(function(obj) {
            return obj.custom_tag != 1;}) : state.default_tags,

        tags_loaded: true
      };

    case GET_TAGS_SUCCESS:
    case CREATE_TAG_SUCCESS:
    case REMOVE_TAG_SUCCESS:
    case HIDE_TAG_SUCCESS:
    case SHOW_TAG_SUCCESS:

      return {
        ...state,
        tags_loading: false,
        custom_tags: action.payload.tags ?
          action.payload.tags.filter(function(obj) {
            return obj.custom_tag == 1;}) : state.custom_tags,
        default_tags: action.payload.tags ?
          action.payload.tags.filter(function(obj) {
            return obj.custom_tag != 1;}) : state.default_tags,
        tags_loaded: true
      }

    case GET_TAGS_FAIL:
    case REMOVE_TAG_FAIL:
    case HIDE_TAG_FAIL:
    case SHOW_TAG_FAIL:
    case CREATE_TAG_FAIL:
      return {
        ...state,
        tags_loading: false,
        tags_loaded: false,
        tags_error: action.payload.error
      };


    default:
        return state;
    }
  }
