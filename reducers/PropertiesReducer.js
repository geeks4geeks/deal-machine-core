import {
  LOGOUT,
  GET_PROPERTIES,
  REFRESH_PROPERTIES,
  GET_PROPERTIES_SUCCESS,
  GET_PROPERTIES_FAIL,

  SET_ACTIVE_PROPERTY,
  REVERSE_GEOCODE_SUCCESS,
  GET_PLACE_DETAILS_SUCCESS,

  NEW_DEAL,
  NEW_DEAL_FAIL,
  NEW_DEAL_SUCCESS,

  EDIT_PROPERTY_MAP_OPTIONS

} from 'app/DealMachineCore/types';


import {
  combineArrays
} from 'app/NativeActions';

const INITIAL_STATE = {
  properties_loading: false,
  properties_error: '',
  properties: [],
  activeProperty: null,

  property_map_options:{
    show_property_label: true,
    performance_mode: false,
    property_label: "property_address_range",
    property_label_title: "Property Address Number",

    show_property_highlight: false,

    highlight_option_owner_status: "absentee_owner",
    highlight_option_owner_status_title: "Absentee Owner",

    highlight_option_sale_date: "none",
    highlight_option_sale_date_title: "N/A",

    highlight_option_home_value: "none",
    highlight_option_home_value_title: "N/A",

    highlight_option_home_equity: "none",
    highlight_option_home_equity_title: "N/A",


  }

}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){

    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    break;

    case GET_PROPERTIES:
      return {
        ...state,
        properties_error: '',
        properties_loading: true
      };
    case REFRESH_PROPERTIES:
      return {
        ...state,
        properties_error: '',
        properties_loading: true,
        properties: []
      };

    case GET_PROPERTIES_FAIL:
      return {
        ...state,
        properties_error: action.payload,
        properties_loading: false,
      };

    case GET_PROPERTIES_SUCCESS:
      return {
        ...state,
        properties_loading: false,
        properties: combineArrays(state.properties, action.payload.properties, 300),

      };

    case SET_ACTIVE_PROPERTY:
    case REVERSE_GEOCODE_SUCCESS:
    case GET_PLACE_DETAILS_SUCCESS:
      return{
        ...state,
        activeProperty: action.payload.property
      }

    case NEW_DEAL:
      return{
        ...state,
        activeProperty: action.payload.property ? state.activeProperty ? action.payload.property.id == state.activeProperty.id ? {
          ...state.activeProperty,
          new_deal_loading: true
        } : state.activeProperty : null : state.activeProperty,
        properties: action.payload.property ? state.properties.map(
           (property, i) => property.id == action.payload.property.id ? {
             ...property,
             new_deal_loading: true
           } : property
        ) : state.properties
      }

    case NEW_DEAL_SUCCESS:
    case NEW_DEAL_FAIL:

      return{
        ...state,
        activeProperty:  action.payload.property ? state.activeProperty ? action.payload.property.id == state.activeProperty.id ? {
          ...state.activeProperty,
          new_deal_loading: false
        } : state.activeProperty : null : state.activeProperty,
        properties: action.payload.property ? state.properties.map(
           (property, i) => property.id == action.payload.property.id ? {
             ...property,
             new_deal_loading: false
           } : property
        ) : state.properties
      }



    case EDIT_PROPERTY_MAP_OPTIONS:
      return{
        ...state,
        property_map_options: {
          ...state.property_map_options,
          [action.payload.prop]: action.payload.value
        }
      }


    default:
      return state;
  }
}
