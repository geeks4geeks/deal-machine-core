import {
  LOGOUT,
  UPDATE_MARKETING_USER,
  UPDATE_MARKETING_PARTNER,
  UPDATE_MARKETING_PARTNER_FROM_PROMO
} from 'app/DealMachineCore/types';

const INITIAL_STATE = {

  user_info:{
    branch_id: '',
    from_campaign: '',
    from_source: '',
    promoText: '',
    email: '',

    signup_type: '',
    team_name: '',
    team_company: '',
    branch_link: ''
  },
  partner_info:{
    partner_id: 0,
    partner_title: '',
    partner_logo: '',
    partner_logo_white: ''
  }
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case UPDATE_MARKETING_USER:
      return{
        ...state,
        user_info:{
          ...state.user_info,
          [action.payload.prop]: action.payload.value
        }
      };
    case UPDATE_MARKETING_PARTNER:
      return{
        ...state,
        partner_info:{
          ...state.partner_info,
          [action.payload.prop]: action.payload.value
        }
      };
    case UPDATE_MARKETING_PARTNER_FROM_PROMO:
      return{
        ...state,
        partner_info:{
          ...state.partner_info,
          partner_id: action.payload.partner_id,
          partner_title: action.payload.partner_title,
          partner_logo: action.payload.partner_logo,
          partner_logo_white: action.payload.partner_logo_white
        }
      }

    default:
      return state;
  }
}
