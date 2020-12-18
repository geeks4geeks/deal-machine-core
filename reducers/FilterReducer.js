import {
  LOGOUT,

  CHANGE_SORT_BY,

  UPDATE_LIST_FILTER,
  EDIT_LEAD_FILTER,
  EDIT_FILTER_TITLE,
  EDIT_DATE_ADDED_FILTER,
  RESET_EDITED_FILTERS,
  APPLY_FILTERS,
  APPLY_HIGHLIGHTS,
  CLEAR_ALL_LEAD_FILTERS,
  CLEAR_EDITED_FILTERS,

  SET_STATUS_MODAL,
  RESET_STATUS_MODAL,
  SET_ITEM_SELECTOR_MODAL,
  SET_TAG_MODAL,
  UPDATE_TAG_SEARCH,


  GET_ALL_STATUSES,
  GET_ALL_STATUSES_FAIL,
  GET_ALL_STATUSES_SUCCESS,

  GET_LIST_PROPERTIES_SUCCESS,
  GET_MAP_PROPERTIES_SUCCESS,
  GET_ACTIVITY_PROPERTIES_SUCCESS,
  UPDATE_USER_LIST_SETTINGS,
  UPDATE_USER_LIST_SETTINGS_FAIL,
  UPDATE_USER_LIST_SETTINGS_SUCCESS,

  GET_TEAM_FILTERS,
  REFRESH_TEAM_FILTERS,
  GET_TEAM_FILTERS_FAIL,
  GET_TEAM_FILTERS_SUCCESS,

  CREATE_TEAM_FILTER,
  CREATE_TEAM_FILTER_FAIL,
  CREATE_TEAM_FILTER_SUCCESS,

  UPDATE_TEAM_FILTER,
  UPDATE_TEAM_FILTER_FAIL,
  UPDATE_TEAM_FILTER_SUCCESS,

  REMOVE_TEAM_FILTER,
  REMOVE_TEAM_FILTER_FAIL,
  REMOVE_TEAM_FILTER_SUCCESS,

  SELECT_TEAM_FILTER,

  TOGGLE_HIGHLIGHT_FILTERS,
  SET_FILTERS,
  SET_PRESET_MODAL

} from 'app/DealMachineCore/types';

const original_filters = {
  deal_status_ids: null,
  list_ids: null,
  mail_template_ids: null,
  campaign_ids: null,
  added_by_ids: null,
  added_type: null,
  tag_ids: null,
  times_mailed_min: null,
  times_mailed_max: null,
  include_image: null,
  sending_queue: null,
  did_skip_trace: null,
  skip_traced_by: null,
  min_date_skip_traced: null,
  max_date_skip_traced: null,
  min_date_added: null,
  max_date_added: null,
  date_added_dropdown: null,
  owner_status: null,
  filter_property_address: null,
  filter_property_city: null,
  filter_property_state: null,
  filter_property_zip: null,
  filter_owner_name: null,
  filter_owner_address: null,
  filter_owner_city: null,
  filter_owner_state: null,
  filter_owner_zip: null,
  min_saleprice: null,
  max_saleprice: null,
  saleprice_empty:null,
  min_saledate: null,
  max_saledate: null,
  saledate_empty: null,
  saledate_dropdown: null,
  saledate_dropdown_empty: null,
  min_total_value: null,
  max_total_value: null,
  total_value_empty: null,
  min_mortgage_amount: null,
  max_mortgage_amount: null,
  mortgage_amount_empty: null,
  min_building_size: null,
  max_building_size: null,
  building_size_empty:null,
  min_lot_acreage: null,
  max_lot_acreage: null,
  lot_acreage_empty: null,
  min_units_count: null,
  max_units_count: null,
  units_count_empty: null,
  min_year_built: null,
  max_year_built: null,
  year_built_empty: null,
  min_bedrooms: null,
  max_bedrooms: null,
  bedrooms_empty: null,
  min_bathrooms: null,
  max_bathrooms: null,
  bathrooms_empty: null,
  min_equity_percent: null,
  max_equity_percent: null,
  equity_percent_empty: null,
  vacancy_type: null,
  tax_delinquency: null,
  preforeclosure_type: null
}

const INITIAL_STATE = {
  sort_by: {
    slug: "date_created",
    type: "desc"
  },
  list_settings: null,
  list_settings_loading: false,
  filter_lists: [],

  original_filters:original_filters,
  filters: original_filters,
  applied_filters: original_filters,
  applied_filters_preset: null,
  applied_filters_preset_object: null,

  applied_highlights: original_filters,

  applied_highlights_preset: null,
  applied_highlights_preset_object: null,


  status_modal:null,
  tag_modal: null,
  tag_search: "",
  all_statuses_loading: false,
  all_statuses: [],

  item_selector_modal: null,

  team_filters: [],
  system_default_presets:[],

  team_filters_loading: false,
  team_filters_refreshing: false,
  team_filters_error: "",
  team_filters_begin: 0,
  team_filters_loaded_all: false,
  team_filters_limit: 25,
  edit_filter_title: "",
  selected_team_filter: null,
  applied_team_filter: null,

  toggle_highlight_filters: false,

  preset_modal:null
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };

    case CHANGE_SORT_BY:
      return{
        ...state,
        sort_by: {
          slug: action.payload.slug,
          type: action.payload.type
        }
      }
    case UPDATE_LIST_FILTER:
      return{
        ...state,
        filter_lists: action.payload,
        applied_filters: {
          ...state.filters,
          list_ids: action.payload
        }
      }
    case EDIT_LEAD_FILTER:
      return{
        ...state,
        filters:{
          ...state.filters,
          [action.payload.prop]: action.payload.value
        }
      }

    case EDIT_FILTER_TITLE:
      return{
        ...state,
        edit_filter_title:action.payload
      };

    case EDIT_DATE_ADDED_FILTER:
      return{
        ...state,
        filters:{
          ...state.filters,
          min_date_added: action.payload.start_date,
          max_date_added: action.payload.end_date
        }
      }
    case APPLY_FILTERS:
      return{
        ...state,
        applied_filters: action.payload.filters ? {
          ...state.original_filters,
          ...action.payload.filters
        } : state.applied_filters,
        filter_lists: action.payload.filters ? action.payload.filters.list_ids ? action.payload.filters.list_ids : state.filter_lists : state.filter_lists,
        applied_filters_preset: action.payload.preset,
        applied_filters_preset_object: action.payload.preset_object,

      }
    case APPLY_HIGHLIGHTS:
      return{
        ...state,
        applied_highlights: action.payload.filters ? {
          ...state.original_filters,
          ...action.payload.filters
        } : state.applied_highlights,
        applied_highlights_preset: action.payload.preset,
        applied_highlights_preset_object: action.payload.preset_object,
      }


    case RESET_EDITED_FILTERS:
      return{
        ...state,
        filters: state.applied_filters,
        applied_filters: state.applied_filters

      }
    case CLEAR_EDITED_FILTERS:
      return{
        ...state,
        filters: INITIAL_STATE.original_filters
      }

    case CLEAR_ALL_LEAD_FILTERS:
      return{
        ...state,
        filter_lists: INITIAL_STATE.filter_lists,
        applied_filters: INITIAL_STATE.original_filters,
        applied_filters_preset: null,
        applied_filters_preset_object: null,
      }
    case GET_LIST_PROPERTIES_SUCCESS:
    case GET_MAP_PROPERTIES_SUCCESS:
    case GET_ACTIVITY_PROPERTIES_SUCCESS:
      return {
        ...state,
        list_settings: action.payload.list_settings ? action.payload.list_settings : state.list_settings
      };
    case UPDATE_USER_LIST_SETTINGS:
      return {
        ...state,
        list_settings_loading: true
      };
    case UPDATE_USER_LIST_SETTINGS_FAIL:
      return {
        ...state,
        list_settings_loading: false
      };
    case UPDATE_USER_LIST_SETTINGS_SUCCESS:
      return {
        ...state,
        list_settings_loading: false,
        list_settings: action.payload.list_settings ? action.payload.list_settings : state.list_settings
      };


    case GET_ALL_STATUSES:
      return{
        ...state,
        all_statuses_loading: true,
      }
    case GET_ALL_STATUSES_FAIL:
      return{
        ...state,
        all_statuses_loading: false
      }
    case GET_ALL_STATUSES_SUCCESS:
      return {
        ...state,
        all_statuses_loading: false,
        all_statuses: action.payload.statuses
      };

    case RESET_STATUS_MODAL:
      return{
        ...state,
        status_modal: INITIAL_STATE.status_modal,
      }

    case SET_STATUS_MODAL:
      return{
        ...state,
        status_modal: action.payload
      }

    case SET_TAG_MODAL:
      return{
        ...state,
        tag_modal: action.payload
      }
    case UPDATE_TAG_SEARCH:
      return{
        ...state,
        tag_search: action.payload
      }

    case SET_ITEM_SELECTOR_MODAL:
      return{
        ...state,
        item_selector_modal: action.payload
      }

    case GET_TEAM_FILTERS:
      return {
        ...state,
        team_filters_error: '',
        team_filters_loading: true,
        team_filters_refreshing: true
      };
    case REFRESH_TEAM_FILTERS:
      return {
        ...state,
        team_filters_error: '',
        team_filters_loading: true,
        team_filters_refreshing: true,
        team_filters_begin: 0,
        team_filters_loaded_all: false,
        team_filters: []
      };
    case GET_TEAM_FILTERS_FAIL:
      return{
        ...state,
        team_filters_loading: false,
        team_filters_refreshing: false
      }
    case GET_TEAM_FILTERS_SUCCESS:

      return{
        ...state,
        team_filters_refreshing: false,
        team_filters_loading: false,
        system_default_presets: action.payload.system_default_presets ? action.payload.system_default_presets : state.system_default_presets,
        team_filters: action.payload.filters,
        team_filters_begin: state.team_filters_begin + action.payload.filters.length,
        team_filters_loaded_all: action.payload.filters.length < state.team_filters_limit
      }

    case CREATE_TEAM_FILTER:
      return{
        ...state,
        //team_filters_loading: true
      }
    case CREATE_TEAM_FILTER_FAIL:
      return{
        ...state,
        //team_filters_loading: false
      }
    case CREATE_TEAM_FILTER_SUCCESS:
      return{
        ...state,
        //team_filters_loading: false,
        team_filters: action.payload.filters.length > 0 ? [action.payload.filters[0], ...state.team_filters] : state.team_filters,
        filters: action.payload.filters.length > 0 ? action.payload.filters[0].filter_json ? action.payload.filters[0].filter_json : state.filters : state.filters,
      }

    case UPDATE_TEAM_FILTER:
      return{
        ...state,
        team_filters: action.payload.use_for_dealfinders == 1 ? state.team_filters.map((team_filter)=>{
          return{
            ...team_filter,
            use_for_dealfinders: 0
          }
        }) : state.team_filters
        //team_filters_loading: true
      }
    case UPDATE_TEAM_FILTER_FAIL:
      return{
        ...state,
        //team_filters_loading: false
      }
    case UPDATE_TEAM_FILTER_SUCCESS:
      return{
        ...state,
        //team_filters_loading: false,
        team_filters: action.payload.filters.length > 0 ? state.team_filters.map((team_filter)=>{
          if(team_filter.id === action.payload.filters[0].id){
            return action.payload.filters[0]
          }
          return team_filter
        }) : state.team_filters,
        selected_team_filter: action.payload.filters.length > 0 ? action.payload.filters[0] : state.selected_team_filter,
        filters: action.payload.filters.length > 0 ? action.payload.filters[0].filter_json : state.filters

      }

    case REMOVE_TEAM_FILTER:
      return{
        ...state,
        //team_filters_loading: true
      }
    case REMOVE_TEAM_FILTER_FAIL:
      return{
        ...state,
        //team_filters_loading: false
      }
    case REMOVE_TEAM_FILTER_SUCCESS:
      return{
        ...state,
        //team_filters_loading: false,
        team_filters: state.team_filters.filter(({id}) => id != action.payload.filter_id),
        selected_team_filter: state.selected_team_filter ? state.selected_team_filter.id == action.payload.filter_id ? null : state.selected_team_filter : state.selected_team_filter,
        applied_team_filter: state.applied_team_filter ? state.applied_team_filter.id == action.payload.filter_id ? null : state.applied_team_filter : state.applied_team_filter
      }
    case SELECT_TEAM_FILTER:
      return{
        ...state,
        selected_team_filter: action.payload,
        applied_team_filter: action.payload,
        filters: action.payload ? action.payload.filter_json : state.filters,
        applied_filters: action.payload ? action.payload.filter_json : state.applied_filters,

      }

    case TOGGLE_HIGHLIGHT_FILTERS:
      return{
        ...state,
        toggle_highlight_filters: action.payload
      }

    case SET_FILTERS:
      return{
        ...state,
        filters: action.payload ? {
          ...state.original_filters,
          ...action.payload
        } : state.original_filters

      }

    case SET_PRESET_MODAL:
      return{
        ...state,
        preset_modal: {
          type: action.payload.type,
          preset_id: action.payload.preset_id,
          preset_title: action.payload.preset_title,
          use_for_dealfinders: action.payload.use_for_dealfinders,
          filters: {
            ...state.original_filters,
            ...action.payload.filters
          },
        }

      }

    default:
      return state;
  }
}
