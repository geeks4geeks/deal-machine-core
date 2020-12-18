import {
  LOGOUT,

  GET_CAMPAIGNS,
  REFRESH_CAMPAIGNS,
  GET_CAMPAIGNS_FAIL,
  GET_CAMPAIGNS_SUCCESS,
  GET_CAMPAIGN,
  GET_CAMPAIGN_FAIL,
  GET_CAMPAIGN_SUCCESS,

  CAMPAIGN_INIT,
  CAMPAIGN_RESET,
  CAMPAIGN_FIELD_CHANGED,
  SAVE_CAMPAIGN,
  CREATE_CAMPAIGN_SUCCESS,
  SAVE_CAMPAIGN_SUCCESS,
  SAVE_CAMPAIGN_FAIL,
  DELETE_CAMPAIGN,

  ADD_CAMPAIGN_STEP,
  REMOVE_CAMPAIGN_STEP,
  EDIT_CAMPAIGN_STEP,
  REINDEX_CAMPAIGN_STEPS,

  CREATE_TEMPLATE_SUCCESS,

  UPDATE_BILLING_ADDON_SUCCESS
} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  campaigns: [],
  campaign_error: '',
  campaign_loading: false,
  refreshing: false,

  editCampaign: null,
  originalCampaign: null,

}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case GET_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        refreshing: false,
        campaign_loading: false,
        campaigns: action.payload.campaigns ? action.payload.campaigns : state.campaigns,
      };

    case GET_CAMPAIGN:
      return {
        ...state,
        campaign_loading: true,
        editCampaign: INITIAL_STATE.editCampaign,
        originalCampaign: INITIAL_STATE.originalCampaign,
        campaign_error: ''
      };
    case GET_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaign_loading: false,
        refreshing: false,
        editCampaign: action.payload.campaign,
        originalCampaign: action.payload.campaign
      };
    case GET_CAMPAIGNS:
      return {
        ...state,
        campaign_loading: true,
        campaigns: [],
        campaign_error: ''
      };
    case GET_CAMPAIGNS_FAIL:
    case GET_CAMPAIGN_FAIL:
      return {
        ...state,
        refreshing: false,
        campaign_loading: false,
        campaign_error: action.payload
      };
    case REFRESH_CAMPAIGNS:
      return {
        ...state,
        refreshing: true,
        campaigns: [],
        campaign_error: ''
      };

    case SAVE_CAMPAIGN_FAIL:
      return {
        ...state,
        refreshing: false,
        campaign_error: action.payload
      };
    case SAVE_CAMPAIGN:
      return {
        ...state,
        campaign_error: ''
      };
    case CREATE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        refreshing: false,
        campaigns: action.payload.campaigns ? action.payload.campaigns : state.campaigns
      };
    case SAVE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        refreshing: false,
        campaigns: action.payload.campaign ?
          state.campaigns.map(
             (campaign, i) => campaign.id == action.payload.campaign.id ? action.payload.campaign : campaign
          ) : state.campaigns
      };
    case DELETE_CAMPAIGN:
      return{
        ...state,
        campaigns: state.campaigns.filter(({id}) => id != action.payload.campaign_id)
      }
    case CAMPAIGN_INIT:
      return {
        ...state,
        editCampaign: action.payload.campaign,
        originalCampaign: action.payload.campaign
      };
    case CAMPAIGN_RESET:
      return {
        ...state,
        editCampaign: INITIAL_STATE.editCampaign,
        originalCampaign: INITIAL_STATE.originalCampaign
      };

    case CAMPAIGN_FIELD_CHANGED:
      return {
        ...state,
        editCampaign: {
          ...state.editCampaign,
          [action.payload.prop]: action.payload.value
        }
      };
    case ADD_CAMPAIGN_STEP:
      return{
        ...state,
        editCampaign: {
          ...state.editCampaign,
          steps: [...state.editCampaign.steps, action.payload.step]
        }
      };
    case REMOVE_CAMPAIGN_STEP:
      return{
        ...state,
        editCampaign: {
          ...state.editCampaign,
          steps: state.editCampaign.steps.filter(({id, index}) => id != action.payload.step_id || index != action.payload.step_index)
        }
      };
    case EDIT_CAMPAIGN_STEP:
      return{
        ...state,
        editCampaign: {
          ...state.editCampaign,
          steps: state.editCampaign.steps.map(
             (step, i) => step.index == action.payload.index ? {
               ...step,
               [action.payload.prop]: action.payload.value
             } : step
          )
        }
      };
    case REINDEX_CAMPAIGN_STEPS:
      return{
        ...state,
        editCampaign: {
          ...state.editCampaign,
          current_step: null,
          steps: state.editCampaign.steps.map(
             (step, i) => {
               return {
                 ...step,
                 index: i+2
               }
             }
          )
        }
      };
    case CREATE_TEMPLATE_SUCCESS:

      return {
        ...state,
        editCampaign: state.editCampaign ? {
            ...state.editCampaign,
            original_template_id: state.editCampaign.current_step == 1 ? action.payload.new_template_id : state.editCampaign.original_template_id,
            original_template_title: state.editCampaign.current_step == 1 ? action.payload.new_template_title : state.editCampaign.original_template_title,
            steps:state.editCampaign.steps.map(
               (step, i) => {
                 if(step.index == state.editCampaign.current_step){
                   return {
                     ...step,
                     template_id: action.payload.new_template_id,
                     template_title: action.payload.new_template_title,
                   }
                 }else{
                   return step
                 }
               }
            )
          } : state.editCampaign
      };

     case UPDATE_BILLING_ADDON_SUCCESS:

      return{
        ...state,
        campaigns: action.payload.slug == "campaign" ?
          action.payload.type == "cancel" ? [] : state.campaigns : state.campaigns
      };

    default:
      return state;
  }
}
