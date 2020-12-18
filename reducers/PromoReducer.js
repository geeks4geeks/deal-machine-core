import {
  LOGOUT,
  ENTER_PROMO,
  ENTER_PROMO_FAIL,
  ENTER_PROMO_SUCCESS,
  RESET_PROMO,
  PROMO_FIELD_CHANGE
} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  promoText: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){

    case RESET_PROMO:
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      }
    break;
    case PROMO_FIELD_CHANGE:
      return {
        ...state,
        promoText: action.payload
      };
    case ENTER_PROMO:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case ENTER_PROMO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        promoText: ''
      };
    case ENTER_PROMO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
