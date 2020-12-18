import apisauce from "apisauce";

import { AppConfig } from "app/NativeActions";

const create = (baseURL = AppConfig().base_url) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      // Here if necessary
    },
    timeout: 30000
  });

  const login = (email, password, device) =>
    api.post("v1/login/", {
      email,
      password,
      device: AppConfig().device, //mobile, desktop
      platform: AppConfig().platform, //desktop //ios //android
      app_version: AppConfig().app_version
    });

  const forgot = email =>
    api.post("v2/forgot/", {
      email: email
    });

  const resetpassword = (type, payload) =>
    api.post("v1/reset-password/", {
      type: type,
      payload: payload
    });

  const resetpasswordcheck = (email, token, type) =>
    api.get("v1/reset-password/", {
      email: email,
      token: token,
      type: type
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
    api.post("v1/login/", {
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

  const deals = ({
    token,
    search,
    filters = {},
    begin,
    limit,
    deal_id,
    type,
    bounds = {},
    dont_include
  }) =>
    api.get("v1/deals/", {
      token: token,
      search: search,
      filter_status: filters.status,
      filter_team_member: filters.team_member,
      filter_enhanced_search: filters.enhanced_search,
      filter_times_mailed_type: filters.times_mailed_type,
      filter_times_mailed_value: filters.times_mailed_value,
      filter_mail_template: filters.mail_template,
      filter_campaign: filters.campaign,
      filter_property_tag: filters.property_tag,
      filter_routes: filters.routes,
      filter_owner_properties: filters.owner_properties,

      filter_start_date: filters.start_date,
      filter_end_date: filters.end_date,

      type: type,
      begin: begin,
      limit: limit,
      deal_id: deal_id,

      westLng: bounds.westLng,
      southLat: bounds.southLat,
      eastLng: bounds.eastLng,
      northLat: bounds.northLat,
      centerLat: bounds.centerLat,
      centerLng: bounds.centerLng,
      dont_include: dont_include,
      include_dealfinder_view: 1,
      device: AppConfig().device
    });

  const editDeal = (token, deal_id, type, payload) =>
    api.post("v1/deals/", {
      token: token,
      deal_id: deal_id,
      type: type,
      payload: payload
    });

  const stats = token => api.get("v1/stats/", { token });

  const newDeal = (
    token,
    image,
    lat,
    long,
    address,
    address1,
    address2,
    city,
    state,
    zip,
    property = null
  ) =>
    api.post("v1/new-deal/", {
      token: token,
      image: image,
      lat: lat,
      long: long,
      address: address,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip,
      property: property
    });

  const lookup = (token, deal_id, other_possible_matches) =>
    api.post("v1/lookup/", {
      token: token,
      deal_id: deal_id,
      other_possible_matches: other_possible_matches
    });

  const editReturnAddress = (
    token,
    address,
    address2,
    city,
    state,
    zipcode,
    phone
  ) =>
    api.post("v1/return-address/", {
      token: token,
      address: address,
      address2: address2,
      city: city,
      state: state,
      zipcode: zipcode,
      phone: phone
    });

  const editUser = (token, type, payload) =>
    api.post("v1/user/", {
      token: token,
      type: type,
      payload: payload
    });

  const previewMail = (token, house, template) =>
    api.post("v1/create-mail/", {
      token: token,
      deal: house,
      test: "test",
      template: template
    });

  const templates = (token, template, team = null) =>
    api.get("v1/templates/", {
      token: token,
      template_id: template,
      team: team,
      app_version: AppConfig().app_version
    });

  const saveTemplate = (token, template_id, type, payload) =>
    api.post("v1/templates/", {
      token: token,
      template_id: template_id,
      type: type,
      payload: payload,
      app_version: AppConfig().app_version
    });

  const signatures = (token, signature_id) =>
    api.get("v1/signatures/", {
      token: token,
      signature_id: signature_id
    });
  const saveSignature = (token, signature_id, type, payload) =>
    api.post("v1/signatures/", {
      token: token,
      signature_id: signature_id,
      type: type,
      payload: payload
    });

  const campaigns = (token, campaign_id) =>
    api.get("v1/campaigns/", {
      token: token,
      campaign_id: campaign_id
    });
  const saveCampaign = (token, campaign_id, type, payload) =>
    api.post("v1/campaigns/", {
      token: token,
      campaign_id: campaign_id,
      type: type,
      payload: payload
    });

  const settings = token =>
    api.get("v1/settings/", {
      token: token
    });

  const settingUpdate = (token, settingsArray) =>
    api.post("v1/settings/", {
      token: token,
      settings: settingsArray
    });

  const updateAddon = ({ token, addon_id, type, payload }) =>
    api.post("v1/purchase-addon/", {
      token: token,
      addon_id: addon_id,
      type: type,
      payload: payload
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
    terms_type
  ) =>
    api.post("v1/update-plan/", {
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
        terms_type
      }
    });

  const cancelPlan = (token, canceled_reason) =>
    api.post("v1/cancel-plan/", {
      token: token,
      cancel: "cancel",
      canceled_reason: canceled_reason,
      app_version: AppConfig().app_version
    });

  const getUser = (token, device) =>
    api.get("v1/user/", {
      token: token,
      device: AppConfig().device,
      platform: AppConfig().platform, //desktop //ios //android
      app_version: AppConfig().app_version
    });

  const enterPromo = (token, promo) =>
    api.post("v1/promo/", {
      token: token,
      promo: promo
    });

  const team = (token, team, member, invite) =>
    api.get("v1/team/", {
      token: token,
      team: team,
      member: member,
      invite: invite
    });

  const editTeam = (token, team, type, payload) =>
    api.post("v1/team/", {
      token: token,
      team: team,
      type: type,
      payload: payload
    });

  const opm = (token, deal_id, type, payload) =>
    api.post("v1/opm/", {
      token: token,
      deal_id: deal_id,
      type: type,
      payload: payload
    });

  const analytics = ({ token, start_date, end_date, date_option, filters }) =>
    api.get("v1/team-analytics/", {
      token: token,
      start_date: start_date,
      end_date: end_date,
      date_option: date_option,
      filter_team_member: filters.team_member,
      filter_tag: filters.tag,
      filter_template: filters.template,
      filter_campaign: filters.campaign
    });

  const plans = () => api.get("v1/plans/", {});

  const activity = (token, deal_id) =>
    api.get("v2/activity/", {
      token: token,
      deal_id: deal_id
    });
  const teamActivity = (token, search, begin) =>
    api.get("v1/team-activity/", {
      token: token,
      search: search,
      begin: begin
    });

  const note = (token, deal_id, type, payload) =>
    api.post("v2/activity/", {
      token: token,
      deal_id: deal_id,
      type: type,
      payload: payload
    });

  const undo = (token, change_group_id) =>
    api.post("v1/undo/", {
      token: token,
      change_group_id: change_group_id
    });

  const partner = token =>
    api.get("v1/partner/", {
      token: token
    });

  const savePartner = (token, type, payload) =>
    api.post("v1/partner/", {
      token: token,
      type: type,
      payload: payload
    });

  const getInvoices = ({ token, type, begin, team, start_date, end_date }) =>
    api.get("v1/credits/", {
      token: token,
      type: type,
      begin: begin,
      team: team,
      start_date: start_date,
      end_date: end_date
    });

  const editCredits = ({ token, type, payload }) =>
    api.post("v1/credits/", {
      token,
      type,
      payload
    });

  const getTags = (token, search) =>
    api.get("v1/tags/", {
      token: token,
      search: search
    });

  const updateTags = (token, payload, type) =>
    api.post("v1/tags/", {
      token: token,
      payload: payload,
      type: type
    });

  const getRoutes = ({
    token,
    type,
    begin,
    limit = 25,
    bounds,
    dont_include,
    only_include,
    filters = {}
  }) =>
    api.get("v1/driving-routes/", {
      token,
      type,
      begin,
      limit,
      westLng: bounds ? bounds.westLng : 0,
      southLat: bounds ? bounds.southLat : 0,
      eastLng: bounds ? bounds.eastLng : 0,
      northLat: bounds ? bounds.northLat : 0,
      centerLat: bounds ? bounds.centerLat : 0,
      centerLng: bounds ? bounds.centerLng : 0,
      dont_include,
      only_include,
      filter_team_member: filters.route_team_member,
      filter_start_date: filters.start_date,
      filter_end_date: filters.end_date
    });

  const updateRoute = ({ token, type, route_id, payload }) =>
    api.post("v1/driving-routes/", {
      token,
      type,
      route_id,
      payload
    });

  const getAllBadges = ({ token }) =>
    api.get("v1/badges/", {
      token
    });

  const seenBadge = ({ token, payload, type }) =>
    api.post("v1/badges/", {
      token,
      payload,
      type
    });

  const earnBadge = ({ token, badge_slug }) =>
    api.post("v1/badges/", {
      token: token,
      badge_slug: badge_slug
    });

  const teamLink = team_link =>
    api.get("v1/dealfinder-page/", {
      team_link
    });

  const termsOfService = type =>
    api.get("v1/terms-of-service/", {
      type
    });

  return {
    login,
    signup,
    forgot,
    resetpassword,
    resetpasswordcheck,
    deals,
    stats,
    newDeal,
    lookup,
    editReturnAddress,
    editDeal,
    previewMail,
    templates,
    saveTemplate,
    settings,
    settingUpdate,
    getUser,
    editUser,
    updateAddon,
    saveCard,
    enterPromo,
    team,
    editTeam,
    activity,
    teamActivity,
    note,
    opm,
    analytics,
    cancelPlan,
    plans,
    undo,
    partner,
    savePartner,
    getInvoices,
    editCredits,
    signatures,
    saveSignature,
    campaigns,
    saveCampaign,
    getTags,
    updateTags,
    getRoutes,
    updateRoute,
    getAllBadges,
    seenBadge,
    earnBadge,
    teamLink,
    termsOfService
  };
};

export default {
  create
};
