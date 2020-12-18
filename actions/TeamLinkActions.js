import {
  START_REDIRECT,
  GET_TEAM_LINK_INFO,
  GET_TEAM_LINK_INFO_SUCCESS
} from 'app/DealMachineCore/types';

import API from 'app/DealMachineCore/apis/DealMachineAPI';
const api = API.create();

export const getTeamLinkInfo = (team_link) => {
  return (dispatch) => {

    dispatch({ type:  GET_TEAM_LINK_INFO });

    api.teamLink(team_link)
      .then(response => {
        if(response.problem != null){
          getTeamLinkInfoFail(dispatch, response.problem);
        }else if(response.data.error != false){
          getTeamLinkInfoFail(dispatch, response.data.error);
        } else {
          getTeamLinkInfoSuccess(dispatch, response.data.results);
        }
      });
  };
};

const getTeamLinkInfoFail = (dispatch, error) => {
  dispatch({
    type: START_REDIRECT,
    payload: "/page-not-found"
  });
};

const getTeamLinkInfoSuccess = (dispatch, results) => {
  dispatch({
    type: GET_TEAM_LINK_INFO_SUCCESS,
    payload: results
  });
};
