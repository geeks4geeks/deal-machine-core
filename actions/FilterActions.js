
import {
  TRIGGER_LOGOUT,
  IS_LOADING,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,

  CHANGE_SORT_BY,

  UPDATE_LIST_FILTER,
  EDIT_FILTER_TITLE,
  EDIT_LEAD_FILTER,
  EDIT_DATE_ADDED_FILTER,
  RESET_EDITED_FILTERS,
  APPLY_FILTERS,
  APPLY_HIGHLIGHTS,
  CLEAR_ALL_LEAD_FILTERS,
  CLEAR_EDITED_FILTERS,

  GET_ALL_STATUSES,
  GET_ALL_STATUSES_FAIL,
  GET_ALL_STATUSES_SUCCESS,

  SET_STATUS_MODAL,
  RESET_STATUS_MODAL,

  SET_TAG_MODAL,
  UPDATE_TAG_SEARCH,

  SET_ITEM_SELECTOR_MODAL,

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
import { store } from "app/store";

import {
  appRedirect
} from 'app/NativeActions';

import api from 'app/DealMachineCore/apis/DealMachineAPIV2';
const dm_api = api.create();

export const toggleHighlightFilters = (toggle) => {
  return {
    type: TOGGLE_HIGHLIGHT_FILTERS,
    payload: toggle
  }
}


export const changeSortBy = ({slug, type}) => {
  return {
    type: CHANGE_SORT_BY,
    payload: {slug, type}
  };
};

export const updateListFilter = (list_ids) => {
  return {
    type: UPDATE_LIST_FILTER,
    payload: list_ids
  }
}

export const editLeadFilter = ({prop, value}) => {
  return {
    type: EDIT_LEAD_FILTER,
    payload: {prop, value}
  }
}

export const editFilterTitle = (value) => {
  return {
    type: EDIT_FILTER_TITLE,
    payload: value
  }
}

export const editDateAddedFilter = ({start_date, end_date}) => {
  return {
    type: EDIT_DATE_ADDED_FILTER,
    payload: {start_date, end_date}
  }
}

export const resetEditedFilters = () => {
  return{
    type: RESET_EDITED_FILTERS
  }
}

export const applyFilters = ({filters, preset, preset_object}) => {
  return{
    type: APPLY_FILTERS,
    payload: {filters, preset, preset_object}
  }
}

export const applyHighlights = ({filters, preset, preset_object}) => {
  return{
    type: APPLY_HIGHLIGHTS,
    payload: {filters, preset, preset_object}

  }
}

export const setFilters = (filters) => {
  return{
    type: SET_FILTERS,
    payload: filters
  }
}

export const clearAllLeadFilters = () => {
  return{
    type: CLEAR_ALL_LEAD_FILTERS
  }
}


export const clearEditedFilters = () => {
  return{
    type: CLEAR_EDITED_FILTERS
  }
}
export const selectTeamFilter = (filter) => {
  return{
    type: SELECT_TEAM_FILTER,
    payload: filter
  }
}



export const resetStatusModal = () => {
  return{
    type: RESET_STATUS_MODAL
  }
}

export const setStatusModal = ({
  title, description, type, selected_leads, selected_status,
  modalAction = null, cancelAction = null, fieldsUpdated=null,
  popoverTarget = null, popoverPlacement = null
}) => {
  return{
    type: SET_STATUS_MODAL,
    payload: {
      title,
      description,
      type,
      selected_leads,
      selected_status,
      modalAction,
      cancelAction,
      fieldsUpdated,
      popoverTarget,
      popoverPlacement
    }
  }
}


export const setItemSelectorModal = ({
  title,
  description,
  type,
  selected_items,
  items,
  item_limit,
  slug,
  modalAction = null
}) => {
  return{
    type: SET_ITEM_SELECTOR_MODAL,
    payload: {
      title,
      description,
      type,
      selected_items,
      items,
      item_limit,
      slug,
      modalAction
    }
  }
}




export const getAllStatuses = ({token}) => {
  return (dispatch) => {
    dispatch({ type: GET_ALL_STATUSES });
    dm_api.getAllStatuses({token})
      .then(response => {

        if(response.problem != null){
          dispatch({ type: GET_ALL_STATUSES_FAIL, payload: response.problem });
        }else if(response.data.error != false){
          dispatch({ type: GET_ALL_STATUSES_FAIL, payload: response.data.error });
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          dispatch({ type: GET_ALL_STATUSES_SUCCESS, payload: response.data.results });
        }
      });

  }
}

export const setTagModal = ({title, description, type, selected_leads, selected_tags, modalAction = null, cancelAction = null, fieldsUpdated = null, popoverTarget = null, popoverPlacement = "right"}) => {
  return{
    type: SET_TAG_MODAL,
    payload: {
      title,
      description,
      type,
      selected_leads,
      selected_tags,
      modalAction,
      cancelAction,
      fieldsUpdated,
      popoverTarget,
      popoverPlacement
    }
  }
}


export const updateTagSearch = (search) => {
  return{
    type: UPDATE_TAG_SEARCH,
    payload: search
  }
}

export const setPresetModal = ({type, preset_id, preset_title, use_for_dealfinders, filters}) => {
  return{
    type: SET_PRESET_MODAL,
    payload: {
      type, preset_id, preset_title, use_for_dealfinders, filters
    }
  }
}

export const getTeamFilters = ({ token, load_type, search = "", begin = 0, limit = 25 }) => {
  return (dispatch) => {

    switch(load_type){
      default:
        dispatch({ type: GET_TEAM_FILTERS });
      break;

      case "refresh":
        dispatch({ type: REFRESH_TEAM_FILTERS });
      break;
    }
    dm_api.getFilters({
      token,
      search,
      begin,
      limit
    })
      .then(response => {
        if(response.problem != null){
          dispatch({ type: GET_TEAM_FILTERS_FAIL });
        }else if(response.data.error != false){
          dispatch({ type: GET_TEAM_FILTERS_FAIL });

          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          dispatch({ type: GET_TEAM_FILTERS_SUCCESS, payload: response.data.results });
        }
      });
    };

};


export const createTeamFilter = ({ token, title, description, use_for_dealfinders, filters, new_filter = false }) => {

  return (dispatch) => {

    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: CREATE_TEAM_FILTER });

    const filter_json = JSON.stringify(filters);

    dm_api.updateFilter({
      token,
      type: "create_filter",
      title,
      description,
      use_for_dealfinders,
      filter_json
    })
      .then(response => {
        if(response.problem != null){
          dispatch({ type: CREATE_TEAM_FILTER_FAIL });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.problem , title: "Error"}
          });
        }else if(response.data.error != false){
          dispatch({ type: CREATE_TEAM_FILTER_FAIL });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.data.error , title: "Error"}
          });

          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          dispatch({ type: CREATE_TEAM_FILTER_SUCCESS, payload: response.data.results });

          appRedirect({dispatch, redirect: "goBack", payload: {remove: "preset"}});


          dispatch({
            type: SUCCESS_MESSAGE,
            payload: {message: "You've successfully created a new filter", title: "Success!"}
          });

        }
      });
    };
};


export const updateTeamFilter = ({ token, title, description, use_for_dealfinders, filters, filter_id }) => {

  return (dispatch) => {

    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: UPDATE_TEAM_FILTER, payload: {use_for_dealfinders} });

    const filter_json = JSON.stringify(filters);

    dm_api.updateFilter({
      token,
      type: "update_filter",
      title,
      description,
      use_for_dealfinders,
      filter_json,
      filter_id
    })
      .then(response => {
        if(response.problem != null){
          dispatch({ type: UPDATE_TEAM_FILTER_FAIL });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.problem , title: "Error"}
          });
        }else if(response.data.error != false){
          dispatch({ type: UPDATE_TEAM_FILTER_FAIL });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.data.error , title: "Error"}
          });

          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          dispatch({ type: UPDATE_TEAM_FILTER_SUCCESS, payload: response.data.results });

          dispatch({
            type: SUCCESS_MESSAGE,
            payload: {message: "You've successfully updated your filter", title: "Success!"}
          });

          appRedirect({dispatch, redirect: "goBack", payload: {remove: "preset"}});

        }
      });
    };
};


export const removeTeamFilter = ({ token, filter_id }) => {

  return (dispatch) => {

    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: REMOVE_TEAM_FILTER});

    dm_api.updateFilter({
      token,
      type: "remove_filter",
      filter_id
    })
      .then(response => {
        if(response.problem != null){
          dispatch({ type: REMOVE_TEAM_FILTER_FAIL });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.problem , title: "Error"}
          });
        }else if(response.data.error != false){
          dispatch({ type: REMOVE_TEAM_FILTER_FAIL });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.data.error , title: "Error"}
          });

          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          dispatch({ type: REMOVE_TEAM_FILTER_SUCCESS, payload: {filter_id} });

          dispatch({
            type: SUCCESS_MESSAGE,
            payload: {message: "You've successfully updated your filter", title: "Success!"}
          });
        }
      });
    };
};

export const getDealStatusTitle = (status_id) => {

  const all_statuses = store.getState().filter.all_statuses;
  for(let i = 0; i<all_statuses.length; i++){
    if(parseInt(all_statuses[i].id) === parseInt(status_id)){
      return all_statuses[i].title;
    }
  }

  return "";
}


export const getDealStatusSlug = (status_id) => {

  const all_statuses = store.getState().filter.all_statuses;
  for(let i = 0; i<all_statuses.length; i++){
    if(parseInt(all_statuses[i].id) === parseInt(status_id)){
      return all_statuses[i].slug;
    }
  }

  return "";
}

export const getCustomFilterText = (filters, is_highlighting = false) => {

  let filter_text = "";
  if(filters.list_ids && filters.list_ids !== ""){
    filter_text += ", lists"
  }
  if(filters.deal_status_ids && filters.deal_status_ids !== ""){
    filter_text += ", lead status"
  }
  if(filters.mail_template_ids && filters.mail_template_ids !== ""){
    filter_text += ", mail templates"
  }
  if(filters.campaign_ids && filters.campaign_ids !== ""){
    filter_text += ", campaigns"
  }
  if(filters.added_by_ids && filters.added_by_ids !== ""){
    filter_text += ", lead originator"
  }

  if(filters.added_type && filters.added_type !== ""){
    filter_text += ", lead origination source"
  }

  if((filters.min_date_added && filters.min_date_added !== "") || (filters.max_date_added && filters.max_date_added !== "") || (filters.date_added_dropdown && filters.date_added_dropdown !== "") ){
    filter_text += ", date added"
  }

  if(filters.tag_ids && filters.tag_ids !== ""){
    filter_text += ", tags"
  }

  if((filters.times_mailed_min && filters.times_mailed_min !== "") || (filters.times_mailed_max && filters.times_mailed_max !== "")){
    filter_text += ", total times mailed"
  }

  if(filters.did_skip_trace && filters.did_skip_trace !== ""){
    filter_text += ", skip trace status"
  }

  if(filters.skip_traced_by && filters.skip_traced_by !== ""){
    filter_text += ", skip tracer"
  }

  if((filters.min_date_skip_traced && filters.min_date_skip_traced !== "") || (filters.max_date_skip_traced && filters.max_date_skip_traced !== "")){
    filter_text += ", date skip traced"
  }

  if(filters.owner_status && filters.owner_status !== ""){
    filter_text += ", owner type"
  }

  if((filters.min_saleprice && filters.min_saleprice !== "") || (filters.max_saleprice && filters.max_saleprice !== "")){
    filter_text += ", sale price"
  }

  if((filters.min_saleprice && filters.min_saleprice !== "") || (filters.max_saleprice && filters.max_saleprice !== "")){
    filter_text += ", sale price";
  }

  if((filters.min_saledate && filters.min_saledate !== "") || (filters.max_saledate && filters.max_saledate !== "")
  || (filters.saledate_dropdown && filters.saledate_dropdown !== "")
  ){
    filter_text += ", sale date";
  }

  if((filters.min_total_value && filters.min_total_value !== "") || (filters.max_total_value && filters.max_total_value !== "")){
    filter_text += ", assessed value";
  }

  if((filters.min_mortgage_amount && filters.min_mortgage_amount !== "") || (filters.max_mortgage_amount && filters.max_mortgage_amount !== "")){
    filter_text += ", mortgage amount";
  }

  if((filters.min_building_size && filters.min_building_size !== "") || (filters.max_building_size && filters.max_building_size !== "")){
    filter_text += ", building size";
  }

  if((filters.min_lot_acreage && filters.min_lot_acreage !== "") || (filters.max_lot_acreage && filters.max_lot_acreage !== "")){
    filter_text += ", lot acreage";
  }

  if((filters.min_units_count && filters.min_units_count !== "") || (filters.max_units_count && filters.max_units_count !== "")){
    filter_text += ", units";
  }

  if((filters.min_year_built && filters.min_year_built !== "") || (filters.max_year_built && filters.max_year_built !== "")){
    filter_text += ", year built";
  }

  if((filters.min_bedrooms && filters.min_bedrooms !== "") || (filters.max_bedrooms && filters.max_bedrooms !== "")){
    filter_text += ", total bedrooms";
  }

  if((filters.min_bathrooms && filters.min_bathrooms !== "") || (filters.max_bathrooms && filters.max_bathrooms !== "")){
    filter_text += ", total bathrooms";
  }

  if((filters.min_equity_percent && filters.min_equity_percent !== "") || (filters.max_equity_percent && filters.max_equity_percent !== "")){
    filter_text += ", equity percent";
  }

  if((filters.vacancy_type && filters.vacancy_type !== "")){
    filter_text += ", vacancy"
  }

  if((filters.tax_delinquency && filters.tax_delinquency !== "")){
    filter_text += ", tax delinquency"
  }

  if((filters.preforeclosure_type && filters.preforeclosure_type !== "")){
    filter_text += ", preforeclosure status"
  }

  if(filters.include_image && filters.include_image !== ""){
    filter_text += ", property image"
  }

  if(filters.sending_queue && filters.sending_queue !== ""){
    filter_text += ", sending queue"
  }

  if(filters.filter_property_address && filters.filter_property_address !== ""){
    filter_text += ", property address"
  }

  if(filters.filter_property_city && filters.filter_property_city !== ""){
    filter_text += ", property address city"
  }

  if(filters.filter_property_state && filters.filter_property_state !== ""){
    filter_text += ", property address state"
  }

  if(filters.filter_property_zip && filters.filter_property_zip !== ""){
    filter_text += ", property address zipcode"
  }

  if(filters.filter_owner_name && filters.filter_owner_name !== ""){
    filter_text += ", owner name"
  }

  if(filters.filter_owner_address && filters.filter_owner_address !== ""){
    filter_text += ", owner address"
  }

  if(filters.filter_owner_city && filters.filter_owner_city !== ""){
    filter_text += ", owner address city"
  }

  if(filters.filter_owner_state && filters.filter_owner_state !== ""){
    filter_text += ", owner address state"
  }

  if(filters.filter_owner_zip && filters.filter_owner_zip !== ""){
    filter_text += ", owner address zipcode"
  }

  if(filter_text.length > 0){
    filter_text = filter_text.substring(1);
    if(is_highlighting){
      filter_text = "Highlighting by"+filter_text+".";
    }else{
      filter_text = "Filtering by"+filter_text+".";
    }
  }

  return filter_text;
}

export const checkIfFilterChanged = (filter1, filter2) =>{
  if(filter1 && filter2){
    if(
      filter1.list_ids !== filter2.list_ids ||
      filter1.deal_status_ids !== filter2.deal_status_ids ||
      filter1.added_by_ids !== filter2.added_by_ids ||
      filter1.added_type !== filter2.added_type ||
      filter1.tag_ids !== filter2.tag_ids ||
      filter1.mail_template_ids !== filter2.mail_template_ids ||
      filter1.campaign_ids !== filter2.campaign_ids ||
      filter1.times_mailed_min !== filter2.times_mailed_min ||
      filter1.times_mailed_max !== filter2.times_mailed_max ||
      filter1.include_image !== filter2.include_image ||
      filter1.sending_queue !== filter2.sending_queue ||
      filter1.did_skip_trace !== filter2.did_skip_trace ||
      filter1.skip_traced_by !== filter2.skip_traced_by ||
      filter1.min_date_skip_traced !== filter2.min_date_skip_traced ||
      filter1.max_date_skip_traced !== filter2.max_date_skip_traced ||
      filter1.min_date_added !== filter2.min_date_added ||
      filter1.max_date_added !== filter2.max_date_added ||
      filter1.date_added_dropdown !== filter2.date_added_dropdown ||

      filter1.owner_status !== filter2.owner_status ||

      filter1.filter_property_address !== filter2.filter_property_address ||
      filter1.filter_property_city !== filter2.filter_property_city ||
      filter1.filter_property_state !== filter2.filter_property_state ||
      filter1.filter_property_zip !== filter2.filter_property_zip ||

      filter1.filter_owner_name !== filter2.filter_owner_name ||
      filter1.filter_owner_address !== filter2.filter_owner_address ||
      filter1.filter_owner_city !== filter2.filter_owner_city ||
      filter1.filter_owner_state !== filter2.filter_owner_state ||
      filter1.filter_owner_zip !== filter2.filter_owner_zip ||

      filter1.min_saleprice !== filter2.min_saleprice ||
      filter1.max_saleprice !== filter2.max_saleprice ||
      filter1.saleprice_empty !== filter2.saleprice_empty ||
      filter1.min_saledate !== filter2.min_saledate ||
      filter1.max_saledate !== filter2.max_saledate ||
      filter1.saledate_empty !== filter2.saledate_empty ||
      filter1.saledate_dropdown !== filter2.saledate_dropdown ||
      filter1.saledate_dropdown_empty !== filter2.saledate_dropdown_empty ||

      filter1.min_total_value !== filter2.min_total_value ||
      filter1.max_total_value !== filter2.max_total_value ||
      filter1.total_value_empty !== filter2.total_value_empty ||
      filter1.min_mortgage_amount !== filter2.min_mortgage_amount ||
      filter1.max_mortgage_amount !== filter2.max_mortgage_amount ||
      filter1.mortgage_amount_empty !== filter2.mortgage_amount_empty ||
      filter1.min_building_size !== filter2.min_building_size ||
      filter1.max_building_size !== filter2.max_building_size ||
      filter1.building_size_empty !== filter2.building_size_empty ||
      filter1.min_lot_acreage !== filter2.min_lot_acreage ||
      filter1.max_lot_acreage !== filter2.max_lot_acreage ||
      filter1.lot_acreage_empty !== filter2.lot_acreage_empty ||
      filter1.min_units_count !== filter2.min_units_count ||
      filter1.max_units_count !== filter2.max_units_count ||
      filter1.units_count_empty !== filter2.units_count_empty ||
      filter1.min_year_built !== filter2.min_year_built ||
      filter1.max_year_built !== filter2.max_year_built ||
      filter1.year_built_empty !== filter2.year_built_empty ||
      filter1.min_bedrooms !== filter2.min_bedrooms ||
      filter1.max_bedrooms !== filter2.max_bedrooms ||
      filter1.bedrooms_empty !== filter2.bedrooms_empty ||
      filter1.min_bathrooms !== filter2.min_bathrooms ||
      filter1.max_bathrooms !== filter2.max_bathrooms ||
      filter1.bathrooms_empty !== filter2.bathrooms_empty ||
      filter1.min_equity_percent !== filter2.min_equity_percent ||
      filter1.max_equity_percent !== filter2.max_equity_percent ||
      filter1.equity_percent_empty !== filter2.equity_percent_empty ||
      filter1.vacancy_type !== filter2.vacancy_type ||
      filter1.tax_delinquency !== filter2.tax_delinquency ||
      filter1.preforeclosure_type !== filter2.preforeclosure_type

    ){
      return true;
    }
  }

  return false;
}
