import {
  LOGOUT,
TOGGLE_GRID_COLUMNS,
TOGGLE_GRID_FILTERS,
TOGGLE_GRID_OPTIONS,
HANDLE_PAGE_DATA
} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  grid_columns:{

    address: true,
    property_address: false,
    property_address2: false,
    property_address_city: false,
    property_address_state: false,
    property_address_zip: false,


    owner_name: true,
    owner_firstname: false,
    owner_lastname: false,
    owner_status: true,

    owner_address_full: true,
    owner_address: false,
    owner_address_2: false,
    owner_address_city: false,
    owner_address_state: false,
    owner_address_zip: false,

    creator_name: true,
    deal_status_title: true,
    date_created: true,
    campaign_title: false,
    mail_template_name: false,

    property_tags: false,
    sale_date: false,
    sale_price: false,
    calculated_improvement_value: false,
    calculated_land_value: false,
    calculated_total_value: false,
    mortgage_amount: false,
    lender_name: false,
    second_mortgage_amount: false,
    year_built: false,
    square_footage: false,
    acreage: false,
    bedrooms: false,
    bathrooms: false,
    school_district: false,
    times_mailed: false,

  },
  toggle_grid_filters: false,
  toggle_grid_options: false,
  page: 1,
  slice_position: 0
}


export default (state = INITIAL_STATE, action) => {

  switch(action.type){

    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      }

    case TOGGLE_GRID_COLUMNS:
    return {
      ...state,
      grid_columns:{
        ...state.grid_columns,
        [action.payload.prop]: action.payload.value
      }
    };

    case TOGGLE_GRID_FILTERS:

    return {
      ...state,
      toggle_grid_filters: action.payload
    };

    case TOGGLE_GRID_OPTIONS:

    return {
      ...state,
      toggle_grid_options: action.payload
    };

    case HANDLE_PAGE_DATA:
    return {
      ...state,
      page: action.payload.page,
      slice_position: action.payload.slice_position
    };

    default:
        return state;
    }
  }
