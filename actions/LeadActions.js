import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,

  GET_LIST_PROPERTIES,
  REFRESH_LIST_PROPERTIES,
  GET_LIST_PROPERTIES_FAIL,
  GET_LIST_PROPERTIES_SUCCESS,
  LOAD_MORE_PROPERTIES,
  LOAD_MORE_PROPERTIES_SUCCESS,

  GET_PROPERTY_COUNT,
  GET_PROPERTY_COUNT_FAIL,
  GET_PROPERTY_COUNT_SUCCESS,

  GET_PROPERTY,
  SOFT_REFRESH_PROPERTY,
  GET_PROPERTY_FAIL,
  GET_PROPERTY_SUCCESS,
  GET_PROPERTY_WITH_ROUTE_INFO,
  GET_PROPERTY_WITH_ROUTE_INFO_FAIL,
  GET_PROPERTY_WITH_ROUTE_INFO_SUCCESS,
  GET_LISTS,
  REFRESH_LISTS,
  GET_LISTS_FAIL,
  GET_LISTS_SUCCESS,

  UPDATE_LEAD,
  UPDATE_LEAD_FAIL,
  UPDATE_LEAD_SUCCESS,

  SET_PROPERTIES_PAGE,
  SET_PROPERTIES_LIMIT,

  TRIGGER_ACTIVITY_UPDATE,

  TRIGGER_DEAL_CREDIT_RELOAD,
  TRIGGER_LEADS_RELOAD,

  TOGGLE_LEAD_IMAGES

} from 'app/DealMachineCore/types';


import { appRedirect, AppConfig } from 'app/NativeActions';

import api from 'app/DealMachineCore/apis/DealMachineAPIV2';
const dm_api = api.create();

export const getListProperties = ({ token, load_type, sort_by, filter_lists, filters, begin, limit }) => {
  return (dispatch) => {

    switch(load_type){
      default:
        dispatch({ type: GET_LIST_PROPERTIES });
      break;

      case "load_more":
        dispatch({type: LOAD_MORE_PROPERTIES});
      break;

      case "refresh":
        dispatch({ type: REFRESH_LIST_PROPERTIES });
      break;
    }
    dm_api.listProperties({
      token,
      sort_by,
      filter_lists,
      filters,
      begin,
      limit
    })
      .then(response => {
        if(response.problem != null){
          getListPropertiesFail({dispatch, error: response.problem});
        }else if(response.data.error != false){
          getListPropertiesFail({dispatch, error: response.data.error});
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          getListPropertiesSuccess({dispatch, results: response.data.results, load_type});
        }
      });
    };

};

const getListPropertiesFail = ({dispatch, error}) => {

  dispatch({ type: GET_LIST_PROPERTIES_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
}

const getListPropertiesSuccess = ({dispatch, results, load_type}) => {
  if(load_type === "load_more"){
    dispatch({ type: LOAD_MORE_PROPERTIES_SUCCESS, payload: results });
  }else{
    dispatch({ type: GET_LIST_PROPERTIES_SUCCESS, payload: results });
  }
}


export const getProperty = ({ token, type, property_id, deal_id }) => {
  return (dispatch) => {

    switch(type){
      case "soft_refresh":
        dispatch({ type: SOFT_REFRESH_PROPERTY });
      break;

      case "route":
        dispatch({ type: GET_PROPERTY_WITH_ROUTE_INFO });
      break;

      default:
        dispatch({ type: GET_PROPERTY });
      break;
    }

    dm_api.getProperty({
      token,
      property_id,
      deal_id,
      type
    })
      .then(response => {
        if(response.problem != null){
          switch(type){
            default:
              dispatch({type: GET_PROPERTY_FAIL, payload: response.problem});
              appRedirect({dispatch, redirect: "goBack", payload: {remove: "property", property_id: property_id}});

            break;

            case "route":
              dispatch({type: GET_PROPERTY_WITH_ROUTE_INFO_FAIL, payload: response.problem})
            break;
          }

          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.problem, title: "Error"}
          });
        }else if(response.data.error != false){
          switch(type){
            default:
              dispatch({type: GET_PROPERTY_FAIL, payload: response.data.error})
            break;

            case "route":
              dispatch({type: GET_PROPERTY_WITH_ROUTE_INFO_FAIL, payload: response.data.error})
            break;
          }


          appRedirect({dispatch, redirect: "goBack", payload: {remove: "property", property_id: property_id}});
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.data.error, title: "Error"}
          });
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          switch(type){
            default:
              dispatch({type: GET_PROPERTY_SUCCESS, payload: response.data.results})
            break;

            case "route":
              dispatch({type: GET_PROPERTY_WITH_ROUTE_INFO_SUCCESS, payload: response.data.results})
            break;
          }
        }
      });
    };

};


export const toggleLeadImages = (toggle) => {
  return {
    type: TOGGLE_LEAD_IMAGES,
    payload: toggle
  }
}

export const updateLead = ({token, type, select_all = 0, total_count = null, filters, filter_lists, deal_ids, deal_status, deal_status_slug, list_ids, tag_ids,
  campaign_id, mail_template_id, resend_freq, resend_limit, start_mailers, new_list_name = null, onSuccess = null}) => {
  return (dispatch) => {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: UPDATE_LEAD });

    dm_api.updateLead({
      token,
      type: type,
      select_all,
      total_count,
      filters,
      filter_lists,
      deal_ids,
      deal_status,
      deal_status_slug,
      list_ids,
      tag_ids,
      start_mailers,
      campaign_id,
      mail_template_id,
      resend_freq,
      resend_limit,
      new_list_name
    }).then(response => {

      if(response.problem != null){
        dispatch({ type: UPDATE_LEAD_FAIL });
        dispatch({
          type: ERROR_MESSAGE,
          payload: {message: response.problem , title: "Error"}
        });
      }else if(response.data.error != false){
        dispatch({ type: UPDATE_LEAD_FAIL });
        dispatch({
          type: ERROR_MESSAGE,
          payload: {message: response.data.error , title: "Error"}
        });

        if(response.data.valid == "invalid"){
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      }else{

        if(onSuccess){
          onSuccess();
        }

        dispatch({
          type: TRIGGER_ACTIVITY_UPDATE,
          payload: true
        });

        switch(type){

          case "edit_status_for_lead":
            appRedirect({dispatch, redirect: "goBack", payload: {remove: "lead-status"}});
          break;

          case "add_leads_to_lists":
          case "edit_lists_for_lead":
            appRedirect({dispatch, redirect: "goBack", payload: {remove: "lists"}});
          break;

          case "edit_tags_for_lead":
            appRedirect({dispatch, redirect: "goBack", payload: {remove: "tags"}});
          break;

          case "edit_mailing_options_for_leads":
            appRedirect({dispatch, redirect: "goBack", payload: {remove: "mailing-options"}});
          break;
        }

        if(!response.data.results.bulk_edit){
          if(type == "permanently_delete"){

            dispatch({
              type: TRIGGER_LEADS_RELOAD,
              payload: true
            });

            dispatch({
              type: SUCCESS_MESSAGE,
              payload: {
                  message: "You've successfully deleted your lead(s).",
                  title: "Success!"
                }
            });
            appRedirect({dispatch, redirect: "leads"});




          }else{
            dispatch({ type: UPDATE_LEAD_SUCCESS, payload: response.data.results });
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: {
                  message: "You've successfully updated your lead(s).",
                  title: "Success!",
                  change_log: response.data.results.change_log ? response.data.results.change_log : null
                }
            });



            if(type == "skip_trace_leads" || type == "start_mailers" || type == "pause_mailers"){
              dispatch({
                type: TRIGGER_DEAL_CREDIT_RELOAD,
                payload: true
              });
            }
          }


        }else if(type == "skip_trace_leads"){
          dispatch({
            type: SUCCESS_MESSAGE,
            payload: {
              message: "Bulk skip trace successful. You'll be emailed when these are complete.",
              title: "Success!"
            }
          });

          dispatch({
            type: TRIGGER_DEAL_CREDIT_RELOAD,
            payload: true
          });
        }else if(type == "start_mailers"){
          dispatch({
            type: SUCCESS_MESSAGE,
            payload: {
              message: "Mailers started. You'll be emailed when these are processed.",
              title: "Success!"
            }
          });

          dispatch({
            type: TRIGGER_DEAL_CREDIT_RELOAD,
            payload: true
          });
        }else if(type == "pause_mailers"){
          dispatch({
            type: SUCCESS_MESSAGE,
            payload: {
              message: "Mailers paused. You'll be emailed when these are processed.",
              title: "Success!"
            }
          });

          dispatch({
            type: TRIGGER_DEAL_CREDIT_RELOAD,
            payload: true
          });
        }else{
          dispatch({
            type: SUCCESS_MESSAGE,
            payload: {
              message: "Bulk edit successful. You'll be emailed when these are complete.",
              title: "Success!"
            }
          });
        }




      }
    });
  }
};

export const setPropertiesPage = (page) => {
  return{
    type: SET_PROPERTIES_PAGE,
    payload: page
  }
}

export const setPropertiesLimit = (page) => {
  return{
    type: SET_PROPERTIES_LIMIT,
    payload: page
  }
}


export const getTotalPropertyCount = ({ token, filter_lists, filters }) => {
  return (dispatch) => {
    dispatch({ type: GET_PROPERTY_COUNT });
    dm_api.listProperties({
      token,
      type: "count",
      filter_lists,
      filters
    })
      .then(response => {
        if(response.problem != null){
          dispatch({ type: GET_PROPERTY_COUNT_FAIL, payload: response.problem });
        }else if(response.data.error != false){
          dispatch({ type: GET_PROPERTY_COUNT_FAIL, payload: response.data.error });
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          dispatch({ type: GET_PROPERTY_COUNT_SUCCESS, payload: response.data.results });
        }
      });
    };

};

export const exportLeads = ({token, deal_ids, select_all, sort_by, filter_lists = [], filters }) => {


  let query_filter = filters;
  for (let [key, value] of Object.entries(query_filter)) {
    if(!value || value === null){
      query_filter[key] = "";
    }
  }

  let get_exact_filter_list = null;
  if(filter_lists.length == 0){
    if(query_filter.list_ids){
      get_exact_filter_list = query_filter.list_ids.map((list)=>{
        return list.id
      }).join(",");
    }
  }else{
    get_exact_filter_list = filter_lists.map((list)=>{
      return list.id
    }).join(",");
  }

  /*TODO add const queryString = require('query-string');
  queryString.stringify({
    ...
    total_value_empty,
    min_mortgage_amount,
    max_mortgage_amount,
    ...
  })
  */

  let export_url = AppConfig().base_url+"v2/list/?token="+token+
  "&sort_by="+sort_by+
  "&select_all="+select_all+
  "&deal_ids="+deal_ids+
  "&type=export"+
  "&filter_list_ids="+get_exact_filter_list+
  "&deal_status_ids="+query_filter.deal_status_ids+
  "&mail_template_ids="+query_filter.mail_template_ids+
  "&campaign_ids="+query_filter.campaign_ids+
  "&added_by_ids="+query_filter.added_by_ids+
  "&added_type="+query_filter.added_type+
  "&filter_tag_ids="+query_filter.tag_ids+
  "&min_date_added="+query_filter.min_date_added+
  "&max_date_added="+query_filter.max_date_added+
  "&date_added_dropdown="+query_filter.date_added_dropdown+
  "&times_mailed_min="+query_filter.times_mailed_min+
  "&times_mailed_max="+query_filter.times_mailed_max+
  "&did_skip_trace="+query_filter.did_skip_trace+
  "&skip_traced_by="+query_filter.skip_traced_by+
  "&min_date_skip_traced="+query_filter.min_date_skip_traced+
  "&max_date_skip_traced="+query_filter.max_date_skip_traced+
  "&include_image="+query_filter.include_image+
  "&owner_status="+query_filter.owner_status+
  "&filter_property_address="+query_filter.filter_property_address+
  "&filter_property_city="+query_filter.filter_property_city+
  "&filter_property_state="+query_filter.filter_property_state+
  "&filter_property_zip="+query_filter.filter_property_zip+
  "&filter_owner_name="+query_filter.filter_owner_name+
  "&filter_owner_address="+query_filter.filter_owner_address+
  "&filter_owner_city="+query_filter.filter_owner_city+
  "&filter_owner_state="+query_filter.filter_owner_state+
  "&filter_owner_zip="+query_filter.filter_owner_zip+
  "&min_saleprice="+query_filter.min_saleprice+
  "&max_saleprice="+query_filter.max_saleprice+
  "&saleprice_empty="+query_filter.saleprice_empty+
  "&min_saledate="+query_filter.min_saledate+
  "&max_saledate="+query_filter.max_saledate+
  "&saledate_empty="+query_filter.saledate_empty+
  "&saledate_dropdown="+query_filter.saledate_dropdown+
   "&saledate_dropdown_empty="+query_filter.saledate_dropdown_empty+
  "&min_total_value="+query_filter.min_total_value+
  "&max_total_value="+query_filter.max_total_value+
  "&total_value_empty="+query_filter.total_value_empty+
  "&min_mortgage_amount="+query_filter.min_mortgage_amount+
  "&max_mortgage_amount="+query_filter.max_mortgage_amount+
  "&mortgage_amount_empty="+query_filter.mortgage_amount_empty+
  "&min_building_size="+query_filter.min_building_size+
  "&max_building_size="+query_filter.max_building_size+
  "&building_size_empty="+query_filter.building_size_empty+
  "&min_lot_acreage="+query_filter.min_lot_acreage+
  "&max_lot_acreage="+query_filter.max_lot_acreage+
  "&lot_acreage_empty="+query_filter.lot_acreage_empty+
  "&min_units_count="+query_filter.min_units_count+
  "&max_units_count="+query_filter.max_units_count+
  "&units_count_empty="+query_filter.units_count_empty+
  "&min_year_built="+query_filter.min_year_built+
  "&max_year_built="+query_filter.max_year_built+
  "&year_built_empty="+query_filter.year_built_empty+
  "&min_bedrooms="+query_filter.min_bedrooms+
  "&max_bedrooms="+query_filter.max_bedrooms+
  "&bedrooms_empty="+query_filter.bedrooms_empty+
  "&min_bathrooms="+query_filter.min_bathrooms+
  "&max_bathrooms="+query_filter.max_bathrooms+
  "&bathrooms_empty="+query_filter.bathrooms_empty+
  "&min_equity_percent="+query_filter.min_equity_percent+
  "&max_equity_percent="+query_filter.max_equity_percent+
  "&equity_percent_empty="+query_filter.equity_percent_empty+
  "&vacancy_type="+query_filter.vacancy_type+
  "&tax_delinquency="+query_filter.tax_delinquency+
  "&preforeclosure_type="+query_filter.preforeclosure_type;

  window.open(export_url, "_blank");
}
