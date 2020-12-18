import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,

  UPDATE_MARKETING_USER,
  UPDATE_MARKETING_PARTNER,
  UPDATE_MARKETING_PARTNER_FROM_PROMO

} from 'app/DealMachineCore/types';

import { appRedirect, AppConfig } from 'app/NativeActions';

import PrivateAPI from 'app/DealMachineCore/apis/DealMachinePrivateAPI';
const dm_private_api = PrivateAPI.create();


const saveMarketingData = async({ prop, value }) => {
  try {
    window.localStorage.setItem(prop, value);
  } catch (error) {
  }
}

export const updateMarketingUser = ({ prop, value }) => {

  saveMarketingData({ prop, value });

  return{
    type: UPDATE_MARKETING_USER,
    payload: { prop, value }
  };
}

export const updateMarketingPartner = ({ prop, value }) => {

  saveMarketingData({ prop, value });

  return{
    type: UPDATE_MARKETING_PARTNER,
    payload: { prop, value }
  };
}

export const getPartnerFromPromo = (promo) => {


  return (dispatch) => {

    dm_private_api.getPartnerFromPromo({promo})
      .then(response => {

        if(response.problem != null){
        }else if(response.data.error != false){
        }else{
          dispatch({
            type: UPDATE_MARKETING_PARTNER_FROM_PROMO,
            payload: response.data.results
          });
        }
      });

  };
}
