
import {
  TRIGGER_LOGOUT,
  GET_TAGS,
  GET_TAGS_FAIL,
  GET_TAGS_SUCCESS,
  CREATE_TAG,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAIL,
  REMOVE_TAG_SUCCESS,
  REMOVE_TAG_FAIL,
  HIDE_TAG_SUCCESS,
  HIDE_TAG_FAIL,
  SHOW_TAG_SUCCESS,
  SHOW_TAG_FAIL,
  GET_HIDE_TEAM_TAG_SUCCESS,
  GET_HIDE_TEAM_TAG_FAIL,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  UPDATE_TEAM_TAG,
  IS_LOADING
} from 'app/DealMachineCore/types';

import { appRedirect } from 'app/NativeActions';

import API from 'app/DealMachineCore/apis/DealMachineAPI';
const api = API.create();


export const getTags = (token, search) => {

  return(dispatch) => {

    dispatch({type: GET_TAGS});

    api.getTags(token, search)
    .then(response => {
      if(response.problem != null){

        getTeamTagsFail(dispatch, response.data.error);

      }else if(response.data.error != false){

        getTeamTagsFail(dispatch, response.data.error);
        if(response.data.valid == "invalid"){
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }

      }else{
        dispatch({type: IS_LOADING, payload: false});
        getTeamTagsSuccess(dispatch, response.data.results);
      }

    });
  }
}

export const createTeamTag = ({token, title = title, type='create'}) => {

  return (dispatch) => {

    dispatch({type: IS_LOADING, payload: true});

      api.updateTags(token, { title }, type)
      .then(response => {

        if(response.problem != null){

          createTeamTagFail(dispatch, response.problem);

        }else if(response.data.error != false){

          createTeamTagFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }

        }else{
          dispatch({type: IS_LOADING, payload: false});
          createTeamTagSuccess(dispatch, response.data.results);
        }
      });
    }
}

export const removeTeamTag = ({token, tag_id, type='remove'}) => {

  return (dispatch) => {

    dispatch({type: IS_LOADING, payload: true});

      api.updateTags(token, { tag_id }, type)
      .then(response => {


        if(response.problem != null){

          removeTeamTagFail(dispatch, response.data.error);

        }else if(response.data.error != false){

          removeTeamTagFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }

        }else{
          dispatch({type: IS_LOADING, payload: false});
          removeTeamTagSuccess(dispatch, response.data.results);
        }

      });
    }
  }

export const hideDefaultTag = ({token, tag_id, type='hide'}) => {

  return (dispatch) => {

    dispatch({type: IS_LOADING, payload: true});

      api.updateTags(token, { tag_id }, type)
        .then(response => {

        if(response.problem != null){

          hideDefaultTagFail(dispatch, response.data.error);

        }else if(response.data.error != false){

          hideDefaultTagFail(dispatch, response.data.error);
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }

        }else{
          dispatch({type: IS_LOADING, payload: false});
          hideDefaultTagSuccess(dispatch, response.data.results);
        }

    });
  }
}

export const showDefaultTag = ({token, tag_id, type='show'}) => {

  return (dispatch) => {

    dispatch({type: IS_LOADING, payload: true});

      api.updateTags(token, { tag_id }, type)
        .then(response => {

          if(response.problem != null){

            showDefaultTagFail(dispatch, response.data.error);

          }else if(response.data.error != false){

            showDefaultTagFail(dispatch, response.data.error);
            if(response.data.valid == "invalid"){
              dispatch({ type: TRIGGER_LOGOUT, payload: true });
            }

          }else{
            dispatch({type: IS_LOADING, payload: false});
            showDefaultTagSuccess(dispatch, response.data.results);
          }

      });
  }
}

const createTeamTagSuccess = (dispatch, results) => {
  dispatch({
    type: CREATE_TAG_SUCCESS,
    payload: {tags: results.tags}
  });
  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {message: "Tag was successfully created.", title: "Success!"}
  });

  //appRedirect({dispatch, redirect: "goBack", payload: {type: "tags"}});
  appRedirect({dispatch, redirect: "goBack", payload: {remove: "create-tag"}});


}

const createTeamTagFail = (dispatch, error) => {
  dispatch({
    type: CREATE_TAG_FAIL,
    payload: {error}
  });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
}

const removeTeamTagSuccess = (dispatch, results) => {
  dispatch({
    type: REMOVE_TAG_SUCCESS,
    payload: {tags: results.tags}
  });
  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {message: "Tag was successfully removed.", title: "Success!"}
  });
}

const removeTeamTagFail = (dispatch, error) => {
  dispatch({
    type: REMOVE_TAG_FAIL,
    payload: {error}
  });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
}

const hideDefaultTagSuccess = (dispatch, results) => {

  dispatch({
    type: HIDE_TAG_SUCCESS,
    payload: {tags: results.tags}
  });
  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {message: "Tag was hidden successfully.", title: "Success!"}
  });
}

const hideDefaultTagFail = (dispatch, error) => {
  dispatch({
    type: HIDE_TAG_FAIL,
    payload: {error}
  });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
}

const showDefaultTagSuccess = (dispatch, results) => {
  dispatch({
    type: SHOW_TAG_SUCCESS,
    payload: {tags: results.tags}
  });
  dispatch({
    type: SUCCESS_MESSAGE,
    payload: {message: "The default tag is now available to use.", title: "Success!"}
  });
}

const showDefaultTagFail = (dispatch, error) => {
  dispatch({
    type: SHOW_TAG_FAIL,
    payload: {error}
  });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
}

const getTeamTagsSuccess = (dispatch, results) => {
  dispatch({
    type: GET_TAGS_SUCCESS,
    payload: {tags: results.tags}
  });
};

const getTeamTagsFail = (dispatch, error) => {
  dispatch({
    type: GET_TAGS_FAIL,
    payload: {error}
  });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });

}
