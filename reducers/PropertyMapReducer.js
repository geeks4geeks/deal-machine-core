import {
  LOGOUT,
  GET_MAP_PROPERTIES,
  REFRESH_MAP_PROPERTIES,
  GET_MAP_PROPERTIES_SUCCESS,
  GET_MAP_PROPERTIES_FAIL,

  UPDATE_MAP_LOCATION,

  SELECT_ACTIVE_PROPERTY,

  GET_MAP_REVERSE_GEOCODE,
  GET_MAP_REVERSE_GEOCODE_FAIL,
  GET_MAP_REVERSE_GEOCODE_SUCCESS,

  GET_AUTOCOMPLETE,
  GET_AUTOCOMPLETE_FAIL,
  GET_AUTOCOMPLETE_SUCCESS,
  CLEAR_AUTOCOMPLETE,

  ADD_DEAL,
  ADD_DEAL_FAIL,
  ADD_DEAL_SUCCESS,

  UPDATE_HOUSE_SUCCESS,
  GOOGLE_STREET_VIEW_SUCCESS,
  DELETE_DEAL,
  SELECT_EDIT_PHOTO,
  UPLOAD_EDIT_PROGRESS,
  UPLOAD_EDIT_PHOTO_SUCCESS,

  TOGGLE_TAP_TO_ADD,
  SWITCH_MAP_MODE,

  SET_LAST_LOCATION,
  FOCUS_SEARCH_BAR,

  GET_PROPERTY,
  SOFT_REFRESH_PROPERTY,
  GET_PROPERTY_FAIL,
  GET_PROPERTY_SUCCESS,
  GET_PROPERTY_WITH_ROUTE_INFO_SUCCESS,

  UPDATE_LEAD_SUCCESS,
  UPDATE_OWNER_INFO_SUCCESS,
  SAVE_EDIT_DEALS_SUCCESS,

  HIDE_CTA,
  GENERATE_PREVIEW_IMAGES,
  GENERATE_PREVIEW_IMAGES_SUCCESS,

  HIDE_PROPERTY_LIST,

  TRIGGER_LEADS_RELOAD,

  SET_ACTIVITY_PROPERTIES_TYPE

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
  map_properties_loading: false,
  map_properties_error: '',
  map_properties: [],
  property_count: 0,

  update_map_location: null,
  last_location: null,
  is_search_bar_focused: false,

  active_property: null,
  active_property_loading: false,

  active_address: null,

  reverse_geocode_loading: false,
  reverse_geocode_address: null,

  add_deal_loading: [],
  add_deal_error: '',

  autocomplete_loading: false,
  autocomplete_error: '',
  autocomplete_items: [],

  tap_to_add: false,
  map_mode: "driving",

  all_property_info_options:[
    {
      label: "Sale Price",
      value: "saleprice",
      type: "price"
    },
    {
      label: "Sale Date",
      value: "saledate",
      type: "date"
    },

    {
      label: "Mortgage Amount",
      value: "mortgage_amount",
      type: "price"
    },
    {
      label: "Lender Name",
      value: "mortgage_amount",
      type: "text"
    },
    {
      label: "Mortgage Date",
      value: "mortgage_date",
      type: "date"
    },
    {
      label: "Mortgage Term",
      value: "mortgage_term",
      type: "term"
    },
    {
      label: "Mortgage Due Date",
      value: "mortgage_due_date",
      type: "date"
    },
    {
      label: "Second Mortgage Amount",
      value: "second_mortgage_amount",
      type: "price"
    },
    {
      label: "Assessed Value",
      value: "calculated_total_value",
      type: "price"
    },
    {
      label: "Improvement Value",
      value: "calculated_improvement_value",
      type: "price"
    },
    {
      label: "Land Value",
      value: "calculated_land_value",
      type: "price"
    },
    {
      label: "Equity %",
      value: "calculated_equity_percent",
      type: "percent"
    },
    {
      label: "Year Built",
      value: "year_built",
      type: "number"
    },
    {
      label: "Square Feet",
      value: "building_square_feet",
      type: "feet"
    },
    {
      label: "Lot Acreage",
      value: "lot_acreage",
      type: "acres"
    },
    {
      label: "Bathrooms",
      value: "total_baths",
      type: "number"
    },
    {
      label: "Bedrooms",
      value: "total_baths",
      type: "number"
    },{
      label: "School District",
      value: "school_district",
      type: "text"
    },
    /*
    {
      label: "Parcel ID",
      value: "parcel_id",
      type: "text"
    }
    */
  ], selected_property_info:[
    "saleprice","saledate","calculated_total_value","calculated_equity_percent"
  ],
  hide_property_list: false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){

    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    break;

    case GET_MAP_PROPERTIES:
      return {
        ...state,
        map_properties_error: '',
        map_properties_loading: true
      };
    case REFRESH_MAP_PROPERTIES:
      return {
        ...state,
        map_properties_error: '',
        map_properties_loading: true,
        map_properties: []
      };

    case GET_MAP_PROPERTIES_FAIL:
      return {
        ...state,
        map_properties_error: action.payload,
        map_properties_loading: false,
      };

    case GET_MAP_PROPERTIES_SUCCESS:
      return {
        ...state,
        map_properties_loading: false,
        map_properties: action.payload.properties ? combinePropertyArrays(state.map_properties, action.payload.properties, 100) : [],
        property_count: action.payload.property_count
      };

    case UPDATE_MAP_LOCATION:
      return{
        ...state,
        update_map_location: action.payload.coordinates,
        active_property: action.payload.active_property ? action.payload.active_property : state.active_property
      }
    case SET_LAST_LOCATION:
      return{
        ...state,
        last_location: action.payload
      }
    case FOCUS_SEARCH_BAR:
      return{
        ...state,
        is_search_bar_focused: action.payload
      };
    case SELECT_ACTIVE_PROPERTY:
      return{
        ...state,
        active_property: action.payload,
        active_address: null,
        reverse_geocode_address: null
      }

    case GET_MAP_REVERSE_GEOCODE:
      return{
        ...state,
        active_property: null,
        active_address: null,
        reverse_geocode_loading: true,
        reverse_geocode_address: null
      };
    case GET_MAP_REVERSE_GEOCODE_FAIL:
      return{
        ...state,
        reverse_geocode_loading: false,

      };
    case GET_MAP_REVERSE_GEOCODE_SUCCESS:
      return{
        ...state,
        reverse_geocode_loading: false,
        map_properties: action.payload.properties ? action.payload.properties.length > 0 ? combinePropertyArrays(state.map_properties, action.payload.properties, 0) : state.map_properties : state.map_properties,
        active_property: action.payload.properties ? action.payload.properties.length > 0 ? action.payload.properties[0] : null : null,
        reverse_geocode_address: action.payload.properties ? action.payload.properties.length == 0 ? action.payload.parsed_address : null : null,
        active_address: action.payload.parsed_address,
      };

    case GET_AUTOCOMPLETE:
      return{
        ...state,
        autocomplete_items: [],
        autocomplete_loading: true,
        autocomplete_error: ''
      };
    case CLEAR_AUTOCOMPLETE:
      return{
        ...state,
        autocomplete_items: [],
        autocomplete_error: ""
      };
    case GET_AUTOCOMPLETE_FAIL:
      return{
        ...state,
        autocomplete_loading: false,
        autocomplete_error: action.payload
      };
    case GET_AUTOCOMPLETE_SUCCESS:
      return{
        ...state,
        autocomplete_items: action.payload.properties,
        autocomplete_loading: false
      };

    case ADD_DEAL:
      return{
        ...state,
        add_deal_loading: state.add_deal_loading.concat([action.payload.property]),
        add_deal_error: ''
      };
    case ADD_DEAL_FAIL:
      return{
        ...state,
        add_deal_loading: action.payload.property ? state.add_deal_loading.filter(({property_id}) => property_id != action.payload.property.property_id) : state.add_deal_loading,
        error: action.payload.error
      }
    case ADD_DEAL_SUCCESS:
      return{
        ...state,
        add_deal_loading: state.add_deal_loading.filter(({property_id}) => property_id != action.payload.property.property_id),
        error: '',
        map_properties: combinePropertyArrays(state.map_properties, [action.payload.added_property], 0),
        update_map_location: action.payload.add_type === "manual" ? {
          ...state.update_map_location,
          latitude: parseFloat(action.payload.added_property.location.latitude),
          longitude: parseFloat(action.payload.added_property.location.longitude),
        } : state.update_map_location,
        active_property: action.payload.add_type !== "no_active" ? action.payload.add_type === "manual" ? action.payload.added_property : state.active_property ?
          state.active_property.property_id == action.payload.added_property.property_id ?
          {
            ...action.payload.added_property,
            highlighted: state.active_property.highlighted
          } : state.active_property :
            state.active_property == null && state.map_mode != "tap_to_add" ? action.payload.added_property : state.ative_property : state.ative_property,
        active_address: null
      };

    /* temp reducer items */
    case UPDATE_HOUSE_SUCCESS:

      return {
        ...state,
        active_property: state.active_property ? state.active_property.deal ?
          action.payload.deal.id == state.active_property.deal.id ? {
            ...state.active_property,
            deal: {
              ...action.payload.deal,
              image: state.active_property.deal.image
            }
          } : state.active_property : state.active_property : null,
        map_properties: state.map_properties.map(
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
        map_properties: state.map_properties.map(
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
        map_properties: state.map_properties.map(
           (property, i) => property.deal ? property.deal.id == action.payload.deal_id ? {
               ...property,
               deal: null
             } : property : property
           )
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
        map_properties: state.map_properties.map(
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
        map_properties: state.map_properties.map(
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
        map_properties: state.map_properties.map(
           (property, i) => property.deal ? property.deal.id == action.payload.deal_id ? {
               ...property,
               deal: {
                 ...property.deal,
                 image: action.payload.image
               }
             } : property : property
        )
      };

    case TOGGLE_TAP_TO_ADD:
      return{
        ...state,
        tap_to_add: action.payload
      }
    case SWITCH_MAP_MODE:
      return{
        ...state,
        map_mode: action.payload
      }

    case GET_PROPERTY:
      return{
        ...state,
        active_property:null,
        active_property_loading: true
      }

    case SOFT_REFRESH_PROPERTY:
      return{
        ...state,
        active_property_loading: true
      }
    case GET_PROPERTY_FAIL:
      return{
        ...state,
        active_property_loading: false
      }

    case GET_PROPERTY_SUCCESS:
    case GET_PROPERTY_WITH_ROUTE_INFO_SUCCESS:

      return{
        ...state,
        active_property: action.payload.property,
        active_property_loading: false

      }

    case UPDATE_LEAD_SUCCESS:
      return{
        ...state,
        active_property:
          state.active_property ?
            updateProperty(state.active_property, action.payload.properties) :
          state.active_property,
        map_properties: state.map_properties.map(
           (property, i) => updateProperty(property, action.payload.properties)
        )
      }

    case UPDATE_OWNER_INFO_SUCCESS:

      return{
        ...state,
        active_property:
          action.payload.properties ? state.active_property ?
              updateProperty(state.active_property, action.payload.properties) :
            state.active_property :
          state.active_property,
        map_properties: action.payload.properties ? state.map_properties.map(
           (property, i) => updateProperty(property, action.payload.properties)
        ) : state.map_properties
      }
      return{
        ...state,
        list_properties: action.payload.property ? state.list_properties.map(
           (property, i) => updateProperty(property, [action.payload.property])
        ) : state.list_properties
      }

    case HIDE_CTA:

      return {
        ...state,
        active_property:{
          ...state.active_property,
          deal:{
            ...state.active_property.deal,
            hide_cta: 1
          }
        }
      };

    case GENERATE_PREVIEW_IMAGES:
      return{
        ...state,
        active_property: state.active_property ? {
          ...state.active_property,
          deal:{
            ...state.active_property.deal,
            mailer_preview: null,
            mailer_preview_back: null
          }
        } : state.active_property
      };

    case GENERATE_PREVIEW_IMAGES_SUCCESS:
      return {
        ...state,
        active_property: state.active_property ? state.active_property.deal ? action.payload.deal_id == state.active_property.deal.id ? {
        ...state.active_property,
        deal:{
          ...state.active_property.deal,
          mailer_preview: action.payload.image,
          mailer_preview_back: action.payload.image_back
        }
      } : state.active_property : state.active_property : null,
        map_properties: state.map_properties.map(
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

    case HIDE_PROPERTY_LIST:
      return {
        ...state,
        hide_property_list: action.payload
      }

    case TRIGGER_LEADS_RELOAD:
    case SET_ACTIVITY_PROPERTIES_TYPE:
      return {
        ...state,
        active_property: null
      }

    default:
      return state;
  }
}
