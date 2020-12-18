import apisauce from 'apisauce';

import { AppConfig } from 'app/NativeActions';

const create = (baseURL = AppConfig().base_url) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      // Here if necessary
    },
    timeout: 30000
  })

  const login = (email, password, device) =>
    api.post("v2/login/", {
      email,
      password,
      device: AppConfig().device, //mobile, desktop
      platform: AppConfig().platform, //desktop //ios //android
      app_version: AppConfig().app_version
    });

  const getUser = (token, device) =>
    api.get("v2/user/", {
      token: token,
      device: AppConfig().device,
      platform: AppConfig().platform, //desktop //ios //android
      app_version: AppConfig().app_version
    });

  const editUser = (token, type, payload) =>
    api.post("v2/user/", {
      token: token,
      type: type,
      payload: payload
    });

  const signup = (
    email,
    password,
    phone,
    check_phone,
    firstname,
    lastname,
    company,
    city,
    accepted_terms,
    affiliate_partner,
    team_id,
    promo,
    from_campaign,
    from_source,
    branch_id,
    device,
    signupKey
  ) =>
    api.post("v2/login/", {
      email: email,
      password: password,
      phone: phone,
      check_phone: check_phone,
      firstname: firstname,
      lastname: lastname,
      company: company,
      city: city,
      team_id: team_id,
      promo: promo,
      from_campaign: from_campaign,
      from_source: from_source,
      signupKey: signupKey,
      branch_id: branch_id,
      accepted_terms: accepted_terms,
      affiliate_partner: affiliate_partner,
      device: AppConfig().device,
      user_version: AppConfig().user_version,
      app_version: AppConfig().app_version
    });



  const listProperties = ({token, type, sort_by, limit, begin, route_id, filter_lists, filters = {}}) => api.get('v2/list/', {
    token,
    sort_by,
    limit,
    begin,
    route_id,
    type,

    filter_list_ids: filter_lists ? filter_lists.map((list)=>{
      return list.id
    }).join(",") : filters.list_ids ? filters.list_ids.map((list)=>{
      return list.id
    }).join(",") : "",

    deal_status_ids: filters.deal_status_ids,
    mail_template_ids: filters.mail_template_ids,
    campaign_ids: filters.campaign_ids,
    added_by_ids: filters.added_by_ids,
    added_type: filters.added_type,
    filter_tag_ids: filters.tag_ids,
    min_date_added: filters.min_date_added,
    max_date_added: filters.max_date_added,
    date_added_dropdown: filters.date_added_dropdown,

    times_mailed_min: filters.times_mailed_min,
    times_mailed_max: filters.times_mailed_max,
    did_skip_trace: filters.did_skip_trace,
    skip_traced_by: filters.skip_traced_by,
    min_date_skip_traced: filters.min_date_skip_traced,
    max_date_skip_traced: filters.max_date_skip_traced,
    include_image: filters.include_image,
    sending_queue: filters.sending_queue,

    owner_status: filters.owner_status,
    filter_property_address: filters.filter_property_address,
    filter_property_city: filters.filter_property_city,
    filter_property_state: filters.filter_property_state,
    filter_property_zip: filters.filter_property_zip,
    filter_owner_name: filters.filter_owner_name,
    filter_owner_address: filters.filter_owner_address,
    filter_owner_city: filters.filter_owner_city,
    filter_owner_state: filters.filter_owner_state,
    filter_owner_zip: filters.filter_owner_zip,
    min_saleprice: filters.min_saleprice,
    max_saleprice: filters.max_saleprice,
    saleprice_empty: filters.saleprice_empty,
    min_saledate: filters.min_saledate,
    max_saledate: filters.max_saledate,
    saledate_empty: filters.saledate_empty,
    saledate_dropdown: filters.saledate_dropdown,
    saledate_dropdown_empty: filters.saledate_dropdown_empty,

    min_total_value: filters.min_total_value,
    max_total_value: filters.max_total_value,
    total_value_empty: filters.total_value_empty,
    min_mortgage_amount: filters.min_mortgage_amount,
    max_mortgage_amount: filters.max_mortgage_amount,
    mortgage_amount_empty: filters.mortgage_amount_empty,

    min_building_size: filters.min_building_size,
    max_building_size: filters.max_building_size,
    building_size_empty: filters.building_size_empty,
    min_lot_acreage: filters.min_lot_acreage,
    max_lot_acreage: filters.max_lot_acreage,
    lot_acreage_empty: filters.lot_acreage_empty,
    min_units_count: filters.min_units_count,
    max_units_count: filters.max_units_count,
    units_count_empty: filters.units_count_empty,
    min_year_built: filters.min_year_built,
    max_year_built: filters.max_year_built,
    year_built_empty: filters.year_built_empty,
    min_bedrooms: filters.min_bedrooms,
    max_bedrooms: filters.max_bedrooms,
    bedrooms_empty: filters.bedrooms_empty,
    min_bathrooms: filters.min_bathrooms,
    max_bathrooms: filters.max_bathrooms,
    bathrooms_empty: filters.bathrooms_empty,

    min_equity_percent: filters.min_equity_percent,
    max_equity_percent: filters.max_equity_percent,
    equity_percent_empty: filters.equity_percent_empty,
    vacancy_type: filters.vacancy_type,
    tax_delinquency: filters.tax_delinquency,
    preforeclosure_type: filters.preforeclosure_type
  });

  const updateListSettings = ({token, type, user_list_columns}) => api.post('v2/list/', {
    token,
    type,
    user_list_columns
  })

  const willHighlight = (filters) => {
    for (let key in filters) {
      if(filters[key] && filters[key] !== ""){
        return "true"
      }
    }

    return "false"
  }

  const mapProperties = ({token, bounds, limit, map_type, dont_include_properties, dont_include_deals, dont_include_route_sections, filters = {}, route_id = null}) => api.get('v2/map/', {
    token: token,
    map_type: map_type,
    limit: limit,
    westLng: bounds.westLng,
    southLat: bounds.southLat,
    eastLng: bounds.eastLng,
    northLat: bounds.northLat,
    centerLat: bounds.centerLat,
    centerLng: bounds.centerLng,

    route_id: route_id,

    highlight: willHighlight(filters),
    owner_status: filters.owner_status,
    filter_property_address: filters.filter_property_address,
    filter_property_city: filters.filter_property_city,
    filter_property_state: filters.filter_property_state,
    filter_property_zip: filters.filter_property_zip,
    filter_owner_name: filters.filter_owner_name,
    filter_owner_address: filters.filter_owner_address,
    filter_owner_city: filters.filter_owner_city,
    filter_owner_state: filters.filter_owner_state,
    filter_owner_zip: filters.filter_owner_zip,
    min_saleprice: filters.min_saleprice,
    max_saleprice: filters.max_saleprice,
    saleprice_empty: filters.saleprice_empty,
    min_saledate: filters.min_saledate,
    max_saledate: filters.max_saledate,
    saledate_empty: filters.saledate_empty,
    saledate_dropdown: filters.saledate_dropdown,
    saledate_dropdown_empty: filters.saledate_dropdown_empty,

    min_total_value: filters.min_total_value,
    max_total_value: filters.max_total_value,
    total_value_empty: filters.total_value_empty,
    min_mortgage_amount: filters.min_mortgage_amount,
    max_mortgage_amount: filters.max_mortgage_amount,
    mortgage_amount_empty: filters.mortgage_amount_empty,

    min_building_size: filters.min_building_size,
    max_building_size: filters.max_building_size,
    building_size_empty: filters.building_size_empty,
    min_lot_acreage: filters.min_lot_acreage,
    max_lot_acreage: filters.max_lot_acreage,
    lot_acreage_empty: filters.lot_acreage_empty,
    min_units_count: filters.min_units_count,
    max_units_count: filters.max_units_count,
    units_count_empty: filters.units_count_empty,
    min_year_built: filters.min_year_built,
    max_year_built: filters.max_year_built,
    year_built_empty: filters.year_built_empty,
    min_bedrooms: filters.min_bedrooms,
    max_bedrooms: filters.max_bedrooms,
    bedrooms_empty: filters.bedrooms_empty,
    min_bathrooms: filters.min_bathrooms,
    max_bathrooms: filters.max_bathrooms,
    bathrooms_empty: filters.bathrooms_empty,
    min_equity_percent: filters.min_equity_percent,
    max_equity_percent: filters.max_equity_percent,
    equity_percent_empty: filters.equity_percent_empty,
    vacancy_type: filters.vacancy_type,
    tax_delinquency: filters.tax_delinquency,
    preforeclosure_type: filters.preforeclosure_type,

    dont_include_properties,
    dont_include_deals,
    dont_include_route_sections
  });

  const getProperty = ({token, property_id, deal_id, type}) => api.get('v2/property/', {
    token: token,
    deal_id: deal_id,
    property_id: property_id,
    type: type
  });

  const reverseGeocode = ({token, coordinate}) => api.get('v2/reverse-geocode/', {
    token: token,
    latitude: coordinate.latitude,
    longitude: coordinate.longitude
  });

  const autocomplete = ({token, search, limit, type}) => api.get('v2/autocomplete/', {
    token: token,
    search: search,
    limit: limit,
    type: type,
    include_external_provider: true
  });

  const addDeal = ({token, property, route_id, address, address2, city, state, zip, devicetype = "mobile"}) => api.post('v2/add-deal/', {
    token: token,
    property: property,
    route_id: route_id,
    address: address,
    address2: address2,
    city: city,
    state: state,
    zip: zip,
    devicetype: devicetype
  });

  const getAllStatuses = ({token}) => api.get('v2/deal-status/', {
    token: token
  });

  /* route tracking */
  const startTrackedRoute = ({token, type="start_route"}) => api.post('v2/routes/', {
    token,
    type
  });

  const getTrackedRoutes = ({token, begin, filters={}}) => api.get('v2/routes/', {
    token,
    begin,
    filter_team_member: filters.route_team_member,
    filter_start_date: filters.start_date,
    filter_end_date: filters.end_date
  });

  const updateTrackedRoute = ({token, type="update_route", route_id, total_miles, coordinates}) => api.post('v2/routes/', {
    token,
    type,
    route_id,
    total_miles,
    coordinates
  });

  const stopTrackedRoute = ({ token, type="stop_route", route_id, total_miles, coordinates }) => api.post('v2/routes/', {
    token,
    type,
    route_id,
    total_miles,
    coordinates
  });

  const removeTrackedRoute = ({token, type="remove_route", route_id, route_type}) => api.post('v2/routes/', {
    token,
    type,
    route_id,
    route_type
  });


  const getPausePlanInfo = ({token, module_type}) => api.get('v2/cancel-module/', {
    token,
    module_type
  })

  const pauseOrCancelPlan = ({token, type, module_type, slug, canceled_reason, sell_leads_price}) => api.post('v2/cancel-module/', {
    token,
    type,
    canceled_reason,
    module_type,
    slug,
    sell_leads_price
  })

  const sellLeads = ({token, type, sell_leads_price, leads_count}) => api.post('v2/cancel-module/', {
    token,
    type,
    sell_leads_price,
    leads_count
  })

  const getTutorial = ({token, tutorial_slug}) => api.get('v2/tutorial/', {
    token,
    tutorial_slug
  });

  const completeTutorial = ({token, tutorial_slug}) => api.post('v2/tutorial/', {
    token,
    type: "complete_tutorial",
    tutorial_slug
  })

  const getLists = ({token, search, list_id, begin, limit}) => api.get('v2/update-list/', {
    token,
    search,
    list_id,
    begin,
    limit
  })


  const updateList = ({token, type, title, list_id, location_type, zip, city, state, drawing_coordinates, filters, list_type,
  smart_list,
  start_marketing,
  list_preset,
  list_filters,
  list_area_type,
  list_area,
  list_area_2,
  list_geo_fence,
  estimated_count
}) => api.post('v2/update-list/', {
    token,
    type,
    title,
    list_id,
    location_type,
    zip,
    city,
    state,
    drawing_coordinates,
    filters,
    list_type,
    smart_list,
    start_marketing,
    list_preset,
    list_filters,
    list_area_type,
    list_area,
    list_area_2,
    list_geo_fence,
    estimated_count
  });

  const updateLead = ({token, type, select_all, total_count, filter_lists, filters = {}, deal_ids, deal_status, deal_status_slug, list_ids, tag_ids,
    campaign_id, mail_template_id, resend_freq, resend_limit, start_mailers, new_list_name = null}) => api.post('v2/update-lead/', {
    token,
    type,

    select_all,
    total_count,
    deal_ids,
    deal_status,
    deal_status_slug,
    list_ids,
    tag_ids,

    campaign_id,
    mail_template_id,
    resend_freq,
    resend_limit,
    start_mailers,

    new_list_name,
    filter_list_ids: filter_lists ? filter_lists.map((list)=>{
      return list.id
    }).join(",") : filters.list_ids ? filters.list_ids : "",
    deal_status_ids: filters.deal_status_ids,
    mail_template_ids: filters.mail_template_ids,
    campaign_ids: filters.campaign_ids,
    added_by_ids: filters.added_by_ids,
    added_type: filters.added_type,

    filter_tag_ids: filters.tag_ids,
    min_date_added: filters.min_date_added,
    max_date_added: filters.max_date_added,
    date_added_dropdown: filters.date_added_dropdown,

    times_mailed_min: filters.times_mailed_min,
    times_mailed_max: filters.times_mailed_max,
    did_skip_trace: filters.did_skip_trace,
    skip_traced_by: filters.skip_traced_by,
    min_date_skip_traced: filters.min_date_skip_traced,
    max_date_skip_traced: filters.max_date_skip_traced,

    include_image: filters.include_image,
    sending_queue: filters.sending_queue,
    owner_status: filters.owner_status,
    filter_property_address: filters.filter_property_address,
    filter_property_city: filters.filter_property_city,
    filter_property_state: filters.filter_property_state,
    filter_property_zip: filters.filter_property_zip,
    filter_owner_name: filters.filter_owner_name,
    filter_owner_address: filters.filter_owner_address,
    filter_owner_city: filters.filter_owner_city,
    filter_owner_state: filters.filter_owner_state,
    filter_owner_zip: filters.filter_owner_zip,
    owner_status: filters.owner_status,
    filter_property_address: filters.filter_property_address,
    filter_property_city: filters.filter_property_city,
    filter_property_state: filters.filter_property_state,
    filter_property_zip: filters.filter_property_zip,
    filter_owner_name: filters.filter_owner_name,
    filter_owner_address: filters.filter_owner_address,
    filter_owner_city: filters.filter_owner_city,
    filter_owner_state: filters.filter_owner_state,
    filter_owner_zip: filters.filter_owner_zip,
    min_saleprice: filters.min_saleprice,
    max_saleprice: filters.max_saleprice,
    saleprice_empty: filters.saleprice_empty,
    min_saledate: filters.min_saledate,
    max_saledate: filters.max_saledate,
    saledate_empty: filters.saledate_empty,
    saledate_dropdown: filters.saledate_dropdown,
    saledate_dropdown_empty: filters.saledate_dropdown_empty,

    min_total_value: filters.min_total_value,
    max_total_value: filters.max_total_value,
    total_value_empty: filters.total_value_empty,
    min_mortgage_amount: filters.min_mortgage_amount,
    max_mortgage_amount: filters.max_mortgage_amount,
    mortgage_amount_empty: filters.mortgage_amount_empty,

    min_building_size: filters.min_building_size,
    max_building_size: filters.max_building_size,
    building_size_empty: filters.building_size_empty,
    min_lot_acreage: filters.min_lot_acreage,
    max_lot_acreage: filters.max_lot_acreage,
    lot_acreage_empty: filters.lot_acreage_empty,
    min_units_count: filters.min_units_count,
    max_units_count: filters.max_units_count,
    units_count_empty: filters.units_count_empty,
    min_year_built: filters.min_year_built,
    max_year_built: filters.max_year_built,
    year_built_empty: filters.year_built_empty,
    min_bedrooms: filters.min_bedrooms,
    max_bedrooms: filters.max_bedrooms,
    bedrooms_empty: filters.bedrooms_empty,
    min_bathrooms: filters.min_bathrooms,
    max_bathrooms: filters.max_bathrooms,
    bathrooms_empty: filters.bathrooms_empty,
    min_equity_percent: filters.min_equity_percent,
    max_equity_percent: filters.max_equity_percent,
    equity_percent_empty: filters.equity_percent_empty,
    vacancy_type: filters.vacancy_type,
    tax_delinquency: filters.tax_delinquency,
    preforeclosure_type: filters.preforeclosure_type
  })

  const undoAction = (token, change_group_id) => api.post("v2/undo/", {
    token: token,
    change_group_id: change_group_id
  });

  const getFilters = ({token, search, begin, limit}) => api.get('v2/filters/', {
    token,
    search,
    begin,
    limit
  })


  const updateFilter = ({token, type, title, description, use_for_dealfinders, filter_json, filter_id}) => api.post('v2/filters/', {
    token,
    type,
    title,
    description,
    use_for_dealfinders,
    filter_json,
    filter_id
  })

  const getOwnerInfo = ({token, deal_id}) => api.get('v2/owner/', {
    token,
    deal_id
  })


  const updateOwnerInfo = ({token, type, deal_id, owner_name, address, owner_mailing_address_id, owner_phone_number_id, owner_email_address_id,
  address2, city, state, zip, send_to_address, phone_label, phone_number, bad_phone, email_label, email_address }) => api.post('v2/owner/', {
    token,
    type,
    deal_id,
    owner_mailing_address_id,
    owner_phone_number_id,
    owner_email_address_id,
    owner_name,
    address,
    address2,
    city,
    state,
    zip,
    send_to_address,
    phone_label,
    phone_number,
    bad_phone,
    email_label,
    email_address
  })

  const getBilling = ({token, type, slug, require_tier}) => api.get('v2/billing/', {
    token,
    type,
    slug,
    require_tier
  });

  const getTeamMembers = ({token, type, begin = 0, search = ""}) => api.get('v2/team/', {
    token,
    type,
    begin,
    search
  });

  const updateTeamMembers = ({token, type, team_member_id, member_type, module_type, email, team_clearance_level, can_approve_mail, can_enhanced_search, can_see_all_deals, can_edit_templates, can_export_data}) => api.post('v2/team/', {
    token,
    type,
    team_member_id,
    member_type,
    module_type,
    email,
    team_clearance_level, can_approve_mail, can_enhanced_search, can_see_all_deals, can_edit_templates, can_export_data
  });

  const saveCard = (
    token,
    card_token,
    type,
    last4,
    price,
    plan_id,
    plan_frequency,
    device,
    pause_all_mailing,
    accepted_terms,
    terms_type,
    slug,
    address = null
  ) =>
    api.post("v2/update-plan/", {
      token: token,
      type: type,
      payload: {
        card_token: card_token,
        last4: last4,
        plan_id: plan_id,
        plan_frequency: plan_frequency,
        device: AppConfig().device,
        pause_all_mailing: pause_all_mailing,
        accepted_terms,
        terms_type,
        slug,
        address
      }
    });

  const updateAddon = ({ token, addon_id, type, payload }) =>
    api.post("v2/purchase-addon/", {
      token: token,
      addon_id: addon_id,
      type: type,
      payload: payload
    });
  const editCredits = ({ token, type, payload }) =>
    api.post("v2/credits/", {
      token,
      type,
      payload
    });

  const dashboardActivity = (token, search, begin) =>
    api.get("v2/dashboard-activity/", {
      token: token,
      search: search,
      begin: begin
    });

  const getMailers = ({token, min_date_mailed, max_date_mailed, begin = 0}) => api.get('v2/mailers/', {
    token,
    min_date_mailed,
    max_date_mailed,
    begin
  });

  return {
    login,
    getUser,
    editUser,
    signup,

    listProperties,
    getProperty,
    updateListSettings,
    mapProperties,
    reverseGeocode,
    autocomplete,
    addDeal,
    getAllStatuses,

    getTrackedRoutes,
    startTrackedRoute,
    updateTrackedRoute,
    stopTrackedRoute,
    removeTrackedRoute,

    getPausePlanInfo,
    pauseOrCancelPlan,

    getTutorial,
    completeTutorial,

    getLists,
    updateList,

    updateLead,
    undoAction,

    getFilters,
    updateFilter,

    getOwnerInfo,
    updateOwnerInfo,
    sellLeads,

    getBilling,
    saveCard,

    getTeamMembers,
    updateTeamMembers,

    updateAddon,
    editCredits,

    dashboardActivity,
    getMailers
  }
}

export default {
  create
}
