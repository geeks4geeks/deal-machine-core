import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,

  GET_PROPERTIES,
  REFRESH_PROPERTIES,
  GET_PROPERTIES_SUCCESS,
  GET_PROPERTIES_FAIL,

  SET_ACTIVE_PROPERTY,
  TOGGLE_TAP_TO_ADD,

  EDIT_PROPERTY_MAP_OPTIONS
} from 'app/DealMachineCore/types';

import PrivateAPI from 'app/DealMachineCore/apis/DealMachinePrivateAPI';
const dm_private_api = PrivateAPI.create();

export const editPropertyMapOptions = ({prop, value}) => {

  return {
    type: EDIT_PROPERTY_MAP_OPTIONS,
    payload: {prop, value}
  }
}


export const setActiveProperty = (property) => {

  return {
    type: SET_ACTIVE_PROPERTY,
    payload: {property}
  }
}

export const getProperties = ({ token, type, bounds, dont_include }) => {
  return (dispatch) => {

    switch(type){
      default:
        dispatch({ type: GET_PROPERTIES });
      break;

      case "refresh":
        dispatch({ type: REFRESH_PROPERTIES });
      break;
    }
    dm_private_api.properties({token, bounds, dont_include: type == "refresh" ? "" : dont_include})
      .then(response => {
        if(response.problem != null){
          getPropertiesFail(dispatch, response.problem);
        }else if(response.data.error != false){
          getPropertiesFail(dispatch, response.data.error);

          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{

          getPropertiesSuccess(dispatch, response.data.results);
        }
      });
    };

};

const getPropertiesFail = (dispatch, error) => {

  dispatch({ type: GET_PROPERTIES_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
}

const getPropertiesSuccess = (dispatch, results) => {
  dispatch({ type: GET_PROPERTIES_SUCCESS, payload: results });
}
