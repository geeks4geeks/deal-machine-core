import {
  LOGOUT,
  GET_LIST_PROPERTIES,
  REFRESH_LIST_PROPERTIES,
  GET_LIST_PROPERTIES_FAIL,
  GET_LIST_PROPERTIES_SUCCESS,
  LOAD_MORE_PROPERTIES,
  LOAD_MORE_PROPERTIES_SUCCESS,

  GET_PROPERTY_COUNT,
  GET_PROPERTY_COUNT_FAIL,
  GET_PROPERTY_COUNT_SUCCESS,

  UPDATE_LEAD,
  UPDATE_LEAD_FAIL,

  UPDATE_LEAD_SUCCESS,
  UPDATE_OWNER_INFO_SUCCESS,

  SET_PROPERTIES_PAGE,
  SET_PROPERTIES_LIMIT,

  UPDATE_HOUSE_SUCCESS,
  GOOGLE_STREET_VIEW_SUCCESS,
  DELETE_DEAL,
  SELECT_EDIT_PHOTO,
  UPLOAD_EDIT_PROGRESS,
  UPLOAD_EDIT_PHOTO_SUCCESS,

  GENERATE_PREVIEW_IMAGES_SUCCESS,

  TRIGGER_LEADS_RELOAD,

  ADD_DEAL_SUCCESS,

  TOGGLE_LEAD_IMAGES

} from 'app/DealMachineCore/types';

import {
  combinePropertyArrays
} from 'app/NativeActions';

const updateProperty = (originalProperty, newProperties) => {
  for(var i = 0; i<newProperties.length; i++){
    if(originalProperty.property_id == newProperties[i].property_id){
      return {
        ...newProperties[i],
        highlighted: originalProperty.highlighted,
        deal:{
          ...newProperties[i].deal,
          image: originalProperty.deal ? originalProperty.deal.image : ""
        }
      };
    }
  }
  return originalProperty;
}

const INITIAL_STATE = {
  list_properties_loading: false,
  list_properties_error: '',
  list_properties: [],
  list_properties_begin: 0,
  list_properties_limit: 25,
  list_properties_refreshing: false,
  list_properties_loaded_all: false,

  list_properties_page: 1,

  total_lead_count: 0,
  total_lead_count_loading: false,

  trigger_leads_reload: false,

  toggle_lead_images: true
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){

    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    break;

    case GET_LIST_PROPERTIES:
      return {
        ...state,
        list_properties_error: '',
        list_properties_loading: true
      };
    case LOAD_MORE_PROPERTIES:
      return {
        ...state,
        list_properties_error: '',
        list_properties_loading: true
      };
    case REFRESH_LIST_PROPERTIES:
      return {
        ...state,
        list_properties_error: '',
        list_properties_loading: true,
        list_properties_refreshing: true,
        list_properties: []
      };

    case GET_LIST_PROPERTIES_FAIL:
      return {
        ...state,
        list_properties_error: action.payload,
        list_properties_loading: false,
      };

    case GET_LIST_PROPERTIES_SUCCESS:
      return {
        ...state,
        list_properties_loading: false,
        list_properties_refreshing: false,
        list_properties: action.payload.properties,
        list_properties_begin: state.list_properties_begin + action.payload.properties.length,
        list_properties_loaded_all: action.payload.properties.length < state.list_properties_limit,

        trigger_leads_reload: false
      };

    case LOAD_MORE_PROPERTIES_SUCCESS:
      return {
        ...state,
        list_properties_loading: false,
        list_properties_refreshing: false,
        list_properties: state.list_properties.concat(action.payload.properties),
        list_properties_begin: state.list_properties_begin + action.payload.properties.length,
        list_properties_loaded_all: action.payload.properties.length < state.list_properties_limit,

        trigger_leads_reload: false
      };


    case GET_PROPERTY_COUNT:
      return {
        ...state,
        total_lead_count_loading: true
      };
    case GET_PROPERTY_COUNT_FAIL:
      return {
        ...state,
        total_lead_count_loading: false
      };
    case GET_PROPERTY_COUNT_SUCCESS:
      return {
        ...state,
        total_lead_count: action.payload.total_lead_count,
        total_lead_count_loading: false
      };

    case UPDATE_LEAD_SUCCESS:
      return{
        ...state,
        list_properties: state.list_properties.map(
           (property, i) => updateProperty(property, action.payload.properties)
        )
      }
    case UPDATE_OWNER_INFO_SUCCESS:
      return{
        ...state,
        list_properties: action.payload.properties ? state.list_properties.map(
           (property, i) => updateProperty(property, action.payload.properties)
        ) : state.list_properties
      }
    case SET_PROPERTIES_PAGE:
      return{
        ...state,
        list_properties_page: action.payload
      };

    case SET_PROPERTIES_LIMIT:
      return{
        ...state,
        list_properties_limit: action.payload
      };


    /* temp reducer items */
    case UPDATE_HOUSE_SUCCESS:

      return {
        ...state,
        active_property: state.active_property ? state.active_property.deal ?
          action.payload.deal.id == state.active_property.deal.id ? {
            ...state.active_property,
            deal: action.payload.deal
          } : state.active_property : state.active_property : null,
        list_properties: state.list_properties.map(
           (property, i) => property.deal ? property.deal.id == action.payload.deal.id ? {
             ...property,
             deal: {
               ...property.deal,
               ...action.payload.deal,
               phone_numbers: property.deal.phone_numbers,
               email_addresses: property.deal.email_addresses,
               image: property.deal.image
             }
           } : property : property
        )
      };
    case GOOGLE_STREET_VIEW_SUCCESS:
      return {
        ...state,
        active_property: state.active_property ?
          state.active_property.deal ? action.payload.deal_id == state.active_property.deal.id ? {
          ...state.active_property,
          deal:{
            ...state.active_property.deal,
            image: action.payload.image,
            from_google_street_view: 1
          }
        } : state.active_property : state.active_property : null,
        list_properties: state.list_properties.map(
           (property, i) => property.deal ? property.deal.id == action.payload.deal_id ? {
               ...property,
               deal: {
                 ...property.deal,
                 image: action.payload.image,
                 from_google_street_view: 1
               }
             } : property : property
        )
      };

    case DELETE_DEAL:

      return {
        ...state,
        active_property: state.active_property ? state.active_property.deal ? action.payload.deal_id == state.active_property.deal.id ? null : state.active_property : state.active_property : null,
        list_properties: state.list_properties.filter(({property_id}) => property_id != action.payload.property_id)

      };
    case SELECT_EDIT_PHOTO:

      return {
        ...state,
        active_property: state.active_property ? state.active_property.deal ? action.payload.deal_id == state.active_property.deal.id ? {
        ...state.active_property,
        deal:{
          ...state.active_property.deal,
          image: action.payload.uri
        }
      } : state.active_property : state.active_property : null,
        list_properties: state.list_properties.map(
           (property, i) => property.deal ? property.deal.id == action.payload.deal_id ? {
               ...property,
               deal: {
                 ...property.deal,
                 image: action.payload.uri
               }
             } : property : property
        )
      };


    case UPLOAD_EDIT_PROGRESS:

      return {
        ...state,
        active_property: state.active_property ? state.active_property.deal ?
          action.payload.deal_id == state.active_property.deal.id ? {
        ...state.active_property,
        deal:{
          ...state.active_property.deal,
          progress: action.payload.progress

        }
      } : state.active_property : state.active_property : null,
        list_properties: state.list_properties.map(
           (property, i) => property.deal ? property.deal.id == action.payload.deal_id ? {
               ...property,
               deal: {
                 ...property.deal,
                 progress: action.payload.progress
               }
             } : property : property
        )
      };

    case UPLOAD_EDIT_PHOTO_SUCCESS:
      return {
        ...state,
        active_property: state.active_property ? state.active_property.deal ? action.payload.deal_id == state.active_property.deal.id ? {
        ...state.active_property,
        deal:{
          ...state.active_property.deal,
          image: action.payload.image,
          just_uploaded: true
        }
      } : state.active_property : state.active_property : null,
        list_properties: state.list_properties.map(
           (property, i) => property.deal ? property.deal.id == action.payload.deal_id ? {
               ...property,
               deal: {
                 ...property.deal,
                 image: action.payload.image
               }
             } : property : property
        )
      };

    case GENERATE_PREVIEW_IMAGES_SUCCESS:

      return {
        ...state,
        list_properties: state.list_properties.map(
           (property, i) => property.deal ? property.deal.id == action.payload.deal_id ? {
               ...property,
               deal: {
                 ...property.deal,
                 mailer_preview: action.payload.image,
                 mailer_preview_back: action.payload.image_back
               }
             } : property : property
        )
      };

    case TRIGGER_LEADS_RELOAD:
      return {
        ...state,
        trigger_leads_reload: action.payload
      };

    case ADD_DEAL_SUCCESS:
      return{
        ...state,
        list_properties: action.payload.added_property ? [action.payload.added_property, ...state.list_properties] : state.list_properties
      };

    case TOGGLE_LEAD_IMAGES:
      return{
        ...state,
        toggle_lead_images: action.payload
      }

    default:
      return state;
  }
}
