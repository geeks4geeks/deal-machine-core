import {
  LOGOUT,

  GET_LISTS,
  REFRESH_LISTS,
  GET_LISTS_FAIL,
  GET_LISTS_SUCCESS,

  CREATE_LIST,
  CREATE_LIST_FAIL,
  CREATE_LIST_SUCCESS,

  UPDATE_LIST,
  UPDATE_LIST_FAIL,
  UPDATE_LIST_SUCCESS,

  REMOVE_LIST,
  REMOVE_LIST_FAIL,
  REMOVE_LIST_SUCCESS,

  SET_LIST_MODAL,
  RESET_LIST_MODAL,

  UPDATE_LIST_SEARCH,

  LIST_COUNT,
  LIST_COUNT_FAIL,
  LIST_COUNT_SUCCESS,
  BUILD_LIST,
  BUILD_LIST_FAIL,
  BUILD_LIST_SUCCESS,

  SET_ACTIVE_LIST,

  GET_SINGLE_LIST_ITEM,
  REFRESH_SINGLE_LIST_ITEM,
  GET_SINGLE_LIST_ITEM_SUCCESS,

} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  lists: [],

  lists_loading: false,
  lists_refreshing: false,
  lists_begin: 0,
  lists_loaded_all: false,
  lists_limit: 25,

  list_modal: null,

  list_search: "",

  get_list_count: 0,
  get_list_count_loading: false,

  active_list: null,
  loading_single_list_item: false,
  refreshing_single_list_item: false,
  lists_limits: null

}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){

    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    break;

    case GET_LISTS:
      return {
        ...state,
        list_properties_error: '',
        lists_loading: true,
        lists_refreshing: false
      };
    case REFRESH_LISTS:
      return {
        ...state,
        list_properties_error: '',
        lists_loading: true,
        lists_refreshing: true,
        lists_begin: 0,
        lists_loaded_all: false,
        lists: []
      };
    case GET_LISTS_FAIL:
      return{
        ...state,
        lists_loading: false,
        lists_refreshing: false,
        loading_single_list_item: false,
        refreshing_single_list_item: false

      }
    case GET_LISTS_SUCCESS:

      return{
        ...state,
        lists_refreshing: false,
        lists_loading: false,
        lists: state.lists.concat(action.payload.lists),
        lists_begin: state.lists_begin + action.payload.lists.length,
        lists_loaded_all: action.payload.lists.length < state.lists_limit,
        lists_limits: action.payload.lists_limits ? action.payload.lists_limits : state.lists_limits
      }

    case RESET_LIST_MODAL:
      return{
        ...state,
        list_modal: INITIAL_STATE.list_modal,
        list_search: INITIAL_STATE.list_search
      }

    case SET_LIST_MODAL:
      return{
        ...state,
        list_modal: action.payload
      }

    case UPDATE_LIST_SEARCH:
      return{
        ...state,
        list_search: action.payload
      }
    case BUILD_LIST:
      return{
        ...state,
        list_loading: true
      }
    case SET_ACTIVE_LIST:
      return{
        ...state,
        active_list: action.payload
      }
    case BUILD_LIST:
      return{
        ...state,
      }
    case BUILD_LIST_FAIL:
      return{
        ...state,
      }
    case BUILD_LIST_SUCCESS:
      return{
        ...state,
        list_search: "",
        list_modal: state.list_modal ? {
          ...state.list_modal,
          selected_lists: action.payload.lists.length > 0 ? [...state.list_modal.selected_lists, action.payload.lists[0]] : state.list_modal.selected_lists
        } : state.list_modal,
        lists: action.payload.lists.length > 0 ? [action.payload.lists[0], ...state.lists] : state.lists,
        active_list: action.payload.lists.length > 0 ? action.payload.lists[0] : state.active_list,
        lists_limits: action.payload.lists_limits ? action.payload.lists_limits : state.lists_limits
      }
    case CREATE_LIST:
      return{
        ...state,
        list_loading: true
      }
    case CREATE_LIST_FAIL:

      return{
        ...state,
        list_loading: false
      }
    case CREATE_LIST_SUCCESS:
      return{
        ...state,
        list_loading: false,
        list_search: "",
        list_modal: state.list_modal ? {
          ...state.list_modal,
          selected_lists: action.payload.lists.length > 0 ? [...state.list_modal.selected_lists, action.payload.lists[0]] : state.list_modal.selected_lists
        } : state.list_modal,
        lists: action.payload.lists.length > 0 ? [action.payload.lists[0], ...state.lists] : state.lists,
        lists_limits: action.payload.lists_limits ? action.payload.lists_limits : state.lists_limits
      }

    case REMOVE_LIST_SUCCESS:
      return {
        ...state,
        lists: state.lists.filter(({id}) => id != action.payload),
        active_list: null
      };
    case LIST_COUNT:
      return {
        ...state,
        get_list_count: 0,
        get_list_count_loading: true,
      };
    case LIST_COUNT_FAIL:
      return {
        ...state,
        get_list_count_loading: false,
      };
    case LIST_COUNT_SUCCESS:
      return {
        ...state,
        get_list_count: action.payload.lead_count,
        get_list_count_loading: false
      };
    case GET_SINGLE_LIST_ITEM:
      return{
        ...state,
        loading_single_list_item: true,
        refreshing_single_list_item: false,
      }
    case REFRESH_SINGLE_LIST_ITEM:
      return{
        ...state,
        loading_single_list_item: true,
        refreshing_single_list_item: true
      }
    case GET_SINGLE_LIST_ITEM_SUCCESS:
      return{
        ...state,
        loading_single_list_item: false,
        refreshing_single_list_item: false,
        active_list: action.payload.lists ? action.payload.lists[0] : state.active_list,
        lists: action.payload.lists ? state.lists.map((list, i)=>{
          if(action.payload.lists[0].id == list.id){
            return action.payload.lists[0]
          }
          return list
        }) : state.lists
      }
    case UPDATE_LIST_SUCCESS:
      return{
        ...state,
        active_list: action.payload.lists ? action.payload.lists[0] : state.active_list,
        lists: action.payload.lists ? state.lists.map((list, i)=>{
          if(action.payload.lists[0].id == list.id){
            return action.payload.lists[0]
          }
          return list
        }) : state.lists
      }

    default:
      return state;
  }
}
