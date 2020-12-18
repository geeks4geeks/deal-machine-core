import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,

  GET_LISTS,
  REFRESH_LISTS,
  GET_LISTS_FAIL,
  GET_LISTS_SUCCESS,

  SET_LIST_MODAL,
  RESET_LIST_MODAL,

  UPDATE_LIST_SEARCH,

  CREATE_LIST,
  CREATE_LIST_FAIL,
  CREATE_LIST_SUCCESS,

  UPDATE_LIST,
  UPDATE_LIST_FAIL,
  UPDATE_LIST_SUCCESS,
  REMOVE_LIST_SUCCESS,

  UPDATE_USER_LIST_SETTINGS,
  UPDATE_USER_LIST_SETTINGS_FAIL,
  UPDATE_USER_LIST_SETTINGS_SUCCESS,

  BUILD_LIST,
  BUILD_LIST_FAIL,
  BUILD_LIST_SUCCESS,

  LIST_COUNT,
  LIST_COUNT_FAIL,
  LIST_COUNT_SUCCESS,

  SET_ACTIVE_LIST,
  GET_SINGLE_LIST_ITEM,
  GET_SINGLE_LIST_ITEM_SUCCESS,
  REFRESH_SINGLE_LIST_ITEM
} from 'app/DealMachineCore/types';


import { appRedirect, AppConfig } from 'app/NativeActions';

import api from 'app/DealMachineCore/apis/DealMachineAPIV2';
const dm_api = api.create();

export const getLists = ({ token, load_type, search = "", list_id = null, begin = 0, limit = 25 }) => {
  return (dispatch) => {

    switch(load_type){
      default:
        dispatch({ type: GET_LISTS });
      break;

      case "refresh":
        dispatch({ type: REFRESH_LISTS });
      break;

      case "single_list":
        dispatch({ type: GET_SINGLE_LIST_ITEM });
      break;

      case "refresh_single_list":
        dispatch({ type: REFRESH_SINGLE_LIST_ITEM });
      break;
    }
    dm_api.getLists({
      token,
      search,
      begin,
      list_id,
      limit
    })
      .then(response => {
        if(response.problem != null){
          dispatch({ type: GET_LISTS_FAIL });
        }else if(response.data.error != false){
          dispatch({ type: GET_LISTS_FAIL });

          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{

          switch(load_type){
            default:
              dispatch({ type: GET_LISTS_SUCCESS, payload: response.data.results });
            break;

            case "single_list":
            case "refresh_single_list":
              dispatch({ type: GET_SINGLE_LIST_ITEM_SUCCESS, payload: response.data.results });
            break;
          }
        }
      });
    };

};

export const resetListModal = () => {
  return{
    type: RESET_LIST_MODAL
  }
}
export const setActiveList = (list) => {
  return{
    type: SET_ACTIVE_LIST,
    payload: list
  }
}
export const setListModal = ({title, description, type, selected_leads, selected_lists, modalAction = null, cancelAction = null, fieldsUpdated = null, popoverTarget = null, popoverPlacement = "right"}) => {
  return{
    type: SET_LIST_MODAL,
    payload: {
      title,
      description,
      type,
      selected_leads,
      selected_lists,
      modalAction,
      cancelAction,
      fieldsUpdated,
      popoverTarget,
      popoverPlacement
    }
  }
}

export const updateListSearch = (search) => {
  return {
    type: UPDATE_LIST_SEARCH,
    payload: search
  }
}

export const updateList = ({token, type, title, smart_list, start_marketing, list_id, location_type, zip, city, state, drawing_coordinates = [], preset, filters}) => {
  return (dispatch) => {

    switch(type){
      default:
        dispatch({ type: IS_LOADING, payload: true });
        dispatch({ type: UPDATE_LIST });
      break;

      case "build_list_count":
        dispatch({ type: LIST_COUNT });

      break;
    }

    dm_api.updateList({
      token,
      type: type,
      list_id: list_id,
      title,
      smart_list,
      start_marketing,
      location_type,
      zip,
      city,
      state,
      drawing_coordinates: drawing_coordinates,
      filters: filters
    })
      .then(response => {
        if(response.problem != null){
          switch(type){
            default:
              dispatch({ type: UPDATE_LIST_FAIL });
              dispatch({
                type: ERROR_MESSAGE,
                payload: {message: response.problem , title: "Error"}
              });
            break;

            case "build_list_count":
              dispatch({ type: LIST_COUNT_FAIL });

            break;
          }
        }else if(response.data.error != false){

          switch(type){
            default:
              dispatch({ type: UPDATE_LIST_FAIL });
              dispatch({
                type: ERROR_MESSAGE,
                payload: {message: response.data.error , title: "Error"}
              });
            break;

            case "build_list_count":
              dispatch({ type: LIST_COUNT_FAIL });

            break;
          }

          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{

          switch(type){
            default:
              dispatch({ type: UPDATE_LIST_SUCCESS, payload: response.data.results });

              dispatch({
                type: SUCCESS_MESSAGE,
                payload: {message: "You've successfully updated your list", title: "Success!"}
              });

            break;

            case "build_list_count":
              dispatch({ type: LIST_COUNT_SUCCESS, payload: response.data.results });
            break;

            case "remove_list":
              dispatch({ type: REMOVE_LIST_SUCCESS, payload: list_id });
              dispatch({
                type: SUCCESS_MESSAGE,
                payload: {message: "You've successfully removed your list", title: "Success!"}
              });
              dispatch({ type: REMOVE_LIST_SUCCESS, payload: list_id });
              appRedirect({dispatch, redirect: "goBack", payload: {type: "list_builder"}});


            break;
          }



        }
      });
    };
}


export const buildList = ({
  token,
  title,
  list_type,
  smart_list,
  start_marketing,
  list_preset,
  list_filters = {},
  list_area_type,
  list_area,
  list_area_2,
  list_geo_fence,
  estimated_count
}) => {
  return (dispatch) => {

    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: BUILD_LIST });

    dm_api.updateList({
      token,
      type: "build_list",
      title,
      list_type,
      smart_list,
      start_marketing,
      list_preset,
      list_filters: JSON.stringify(list_filters),
      list_area_type,
      list_area,
      list_area_2,
      list_geo_fence,
      estimated_count
    })
      .then(response => {
        if(response.problem != null){
          dispatch({ type: BUILD_LIST_FAIL });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.problem , title: "Error"}
          });
        }else if(response.data.error != false){
          dispatch({ type: BUILD_LIST_FAIL });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.data.error , title: "Error"}
          });

          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          dispatch({ type: BUILD_LIST_SUCCESS, payload: response.data.results });

          dispatch({
            type: SUCCESS_MESSAGE,
            payload: {message: "Your list is being built. You will recieve an email upon completion.", title: "Success!"}
          });

          if(response.data.results.lists){
            appRedirect({dispatch, redirect: "list_item_replace", payload: {id: response.data.results.lists[0].id}});
          }else{
            appRedirect({dispatch, redirect: "goBack", payload: {type: "list_builder"}});
          }

        }
      });
    };

};

export const createList = ({ token, title }) => {
  return (dispatch) => {

    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: CREATE_LIST });

    dm_api.updateList({
      token,
      type: "create_list",
      title
    })
      .then(response => {
        if(response.problem != null){
          dispatch({ type: CREATE_LIST_FAIL });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.problem , title: "Error"}
          });
        }else if(response.data.error != false){
          dispatch({ type: CREATE_LIST_FAIL });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.data.error , title: "Error"}
          });

          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          dispatch({ type: CREATE_LIST_SUCCESS, payload: response.data.results });

          dispatch({
            type: SUCCESS_MESSAGE,
            payload: {message: "You've successfully created a new list", title: "Success!"}
          });
          appRedirect({dispatch, redirect: "goBack", payload: {remove: "create-list"}});

        }
      });
    };

};



export const updateUserListSettings = ({ token, user_list_columns, type }) => {
  return (dispatch) => {

    dispatch({ type: UPDATE_USER_LIST_SETTINGS });

    if(type !== "in_background"){
      dispatch({ type: IS_LOADING, payload: true });
    }

    const list_columns = JSON.stringify(user_list_columns);

    dm_api.updateListSettings({
      token,
      type: "list_settings",
      user_list_columns: list_columns
    })
      .then(response => {
        if(response.problem != null){
          dispatch({ type: UPDATE_USER_LIST_SETTINGS_FAIL });

          if(type !== "in_background"){
            dispatch({
              type: ERROR_MESSAGE,
              payload: {message: response.problem , title: "Error"}
            });
          }
        }else if(response.data.error != false){
          dispatch({ type: UPDATE_USER_LIST_SETTINGS_FAIL });

          if(type !== "in_background"){
            dispatch({
              type: ERROR_MESSAGE,
              payload: {message: response.data.error , title: "Error"}
            });

            if(response.data.valid == "invalid"){
              dispatch({ type: TRIGGER_LOGOUT, payload: true });
            }
          }


        }else{
          dispatch({ type: UPDATE_USER_LIST_SETTINGS_SUCCESS, payload: response.data.results });
          if(type !== "in_background"){
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: {message: "You've successfully saved your options", title: "Success!"}
            });
            appRedirect({dispatch, redirect: "goBack", payload: {remove: "lead-options"}});
          }
        }
      });
    };

};
