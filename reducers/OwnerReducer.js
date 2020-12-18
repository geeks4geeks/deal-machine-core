import {
  LOGOUT,

  GET_OWNER_INFO,
  GET_OWNER_INFO_FAIL,
  GET_OWNER_INFO_SUCCESS,

  UPDATE_OWNER_INFO,
  UPDATE_OWNER_INFO_FAIL,
  UPDATE_OWNER_INFO_SUCCESS
} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  owner_loading: false,
  main_owner_info: null
}

export default (state = INITIAL_STATE, action) => {

  switch(action.type){
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };

    case GET_OWNER_INFO:
      return{
        ...state,
        owner_loading: true,
        main_owner_info: null
      }

    case GET_OWNER_INFO_FAIL:
      return{
        ...state,
        owner_loading: false
      }

    case GET_OWNER_INFO_SUCCESS:
      return{
        ...state,
        owner_loading: false,
        main_owner_info: action.payload.owners ? action.payload.owners.length > 0 ? action.payload.owners[0] : state.main_owner_info : state.main_owner_info
      }


    case UPDATE_OWNER_INFO_SUCCESS:
      return{
        main_owner_info: action.payload.owners ? action.payload.owners.length > 0 ? action.payload.owners[0] : state.main_owner_info : state.main_owner_info
      }

    default:
      return state;
  }
}
