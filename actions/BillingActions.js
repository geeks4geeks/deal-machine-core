import {
  LOGOUT,
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  BILLING_FIELD_CHANGED,
  RESET_BILLING,
  SAVE_CARD,
  SAVE_CARD_SUCCESS,
  SAVE_CARD_FAIL,
  SELECT_PLAN,
  RESET_SELECTED_PLAN,
  CANCEL_PLAN,
  CANCEL_PLAN_SUCCESS,
  CANCEL_PLAN_FAIL,
  TOGGLE_PLAN_FREQUENCY,
  GET_INVOICES,
  LOAD_MORE_INVOICES,
  REFRESH_INVOICES,
  GET_INVOICES_SUCCESS,
  LOAD_INVOICES_SUCCESS,
  GET_INVOICES_FAIL,
  INIT_EDIT_CREDIT_PURCHASE,
  EDIT_CREDIT_PURCHASE,
  EDIT_CREDITS,
  EDIT_CREDITS_FAIL,
  EDIT_CREDITS_SUCCESS,
  TOGGLE_ONBOARDING,
  SELECT_DEFAULT_SENDING_OPTIONS,
  UPDATE_BILLING_ADDON,
  UPDATE_BILLING_ADDON_FAIL,
  UPDATE_BILLING_ADDON_SUCCESS,
  SET_TRACKING_EVENT,

  GET_PAUSE_PLAN_INFO,
  GET_PAUSE_PLAN_INFO_FAIL,
  GET_PAUSE_PLAN_INFO_SUCCESS,
  PAUSE_OR_CANCEL_PLAN,
  PAUSE_OR_CANCEL_PLAN_FAIL,
  PAUSE_OR_CANCEL_PLAN_SUCCESS,
  SELL_LEADS,
  SELL_LEADS_FAIL,
  SELL_LEADS_SUCCESS,

  GET_DEAL_CREDITS,
  GET_BILLING_FAIL,
  GET_DEAL_CREDITS_SUCCESS,
  TRIGGER_DEAL_CREDIT_RELOAD,

  SET_FEATURE_MODAL,
  GET_PLAN_MODUALS,
  GET_PLAN_MODUALS_SUCCESS,

  GET_LEAD_LIMITS,
  GET_LEAD_LIMITS_SUCCESS,

  SET_BILLING_DETAILS
} from 'app/DealMachineCore/types';


import { appRedirect, removeData, getStripeToken, openUrl } from "app/NativeActions";
import { store } from "app/store";

import APIV2 from 'app/DealMachineCore/apis/DealMachineAPIV2';
import API from 'app/DealMachineCore/apis/DealMachineAPI';

const api = API.create();
const apiv2 = APIV2.create();

export const billingFieldChanged = ({ prop, value }) => {
  return {
    type: BILLING_FIELD_CHANGED,
    payload: { prop, value }
  };
};

export const selectPlan = ({ selected_plan, frequency, price }) => {
  return {
    type: SELECT_PLAN,
    payload: { selected_plan, frequency, price }
  };
};

export const togglePlanFrequency = toggle => {
  return {
    type: TOGGLE_PLAN_FREQUENCY,
    payload: toggle
  };
};

export const setBillingDetails = ({title, plan_module_title, slug, plan_module_info, show_limits = false, current_count = 0, current_limit = 0, limit_title =""}) => {
  return {
    type: SET_BILLING_DETAILS,
    payload: {title, plan_module_title, slug, plan_module_info, show_limits, current_count, current_limit, limit_title}
  };
};



export const resetBilling = () => {
  return {
    type: RESET_BILLING
  };
};

export const resetSelectedPlan = ({ plan, frequency, price, plans }) => {
  return {
    type: RESET_SELECTED_PLAN,
    payload: { plan, frequency, price, plans }
  };
};

export const saveCard = ({
  token,
  card_token,
  error,
  number,
  expMonth,
  expYear,
  cvc,
  price,
  plan,
  frequency,
  type,
  device,
  slug,
  pause_all_mailing = null,
  accepted_terms,
  terms_type,
  address = null
}) => {
  return dispatch => {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: SAVE_CARD });
    dispatch({ type: SET_TRACKING_EVENT, payload: "saveCard" });

    if (!card_token && !error) {
      //native
      var int_number;
      if (number) {
        int_number = number.replace(/ /g, "");
      }
      const params = {
        // mandatory
        number: int_number,
        expMonth: parseInt(expMonth),
        expYear: parseInt(expYear),
        cvc: cvc,
        name: address ? address.name : "",
        address_line1: address ? address.address : "",
        address_line2: address ? address.address2 : "",
        address_city: address ? address.city : "",
        address_state: address ? address.state : "",
        address_zip: address ? address.zip : ""
      };

      if (error) {
        dispatch({ type: SAVE_CARD_FAIL, payload: error.message });
        dispatch({
          type: ERROR_MESSAGE,
          payload: { message: error.message, title: "Error" }
        });
        dispatch({ type: SET_TRACKING_EVENT, payload: "saveCardFail" });
      } else {
        if (!number) {
          setTimeout(function() {
            dispatch({
              type: SAVE_CARD_FAIL,
              payload: "Please enter a card number."
            });
            dispatch({
              type: ERROR_MESSAGE,
              payload: {
                message: "Please enter a card number.",
                title: "Error"
              }
            });
            dispatch({ type: SET_TRACKING_EVENT, payload: "saveCardFail" });
          }, 10);
        } else if (!expMonth) {
          setTimeout(function() {
            dispatch({
              type: SAVE_CARD_FAIL,
              payload: "Please enter an expiration month."
            });
            dispatch({
              type: ERROR_MESSAGE,
              payload: {
                message: "Please enter an expiration month.",
                title: "Error"
              }
            });
            dispatch({ type: SET_TRACKING_EVENT, payload: "saveCardFail" });
          }, 10);
        } else if (!expYear) {
          setTimeout(function() {
            dispatch({
              type: SAVE_CARD_FAIL,
              payload: "Please enter a expiration year."
            });
            dispatch({
              type: ERROR_MESSAGE,
              payload: {
                message: "Please enter a expiration year.",
                title: "Error"
              }
            });
            dispatch({ type: SET_TRACKING_EVENT, payload: "saveCardFail" });
          }, 10);
        } else if (!cvc) {
          setTimeout(function() {
            dispatch({
              type: SAVE_CARD_FAIL,
              payload: "Please enter a CVC number."
            });
            dispatch({
              type: ERROR_MESSAGE,
              payload: { message: "Please enter a CVC number.", title: "Error" }
            });
            dispatch({ type: SET_TRACKING_EVENT, payload: "saveCardFail" });
          }, 10);
        } else {
          createToken(
            dispatch,
            token,
            null,
            params,
            type,
            price,
            plan,
            frequency,
            device,
            pause_all_mailing,
            accepted_terms,
            terms_type,
            slug,
            address
          );
        }
      }
    } else {
      //web
      if (error) {
        dispatch({ type: SAVE_CARD_FAIL, payload: error.message });
        dispatch({
          type: ERROR_MESSAGE,
          payload: { message: error.message, title: "Error" }
        });
        dispatch({ type: SET_TRACKING_EVENT, payload: "saveCardFail" });
      } else {
        createToken(
          dispatch,
          token,
          card_token,
          null,
          type,
          price,
          plan,
          frequency,
          null,
          pause_all_mailing,
          accepted_terms,
          terms_type,
          slug,
          address
        );
      }
    }
  };
};

export const cancelPlan = ({ token, canceled_reason }) => {
  return dispatch => {
    dispatch({ type: CANCEL_PLAN });
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: SET_TRACKING_EVENT, payload: "cancelPlan" });

    api.cancelPlan(token, canceled_reason).then(response => {
      if (response.problem != null) {
        cancelPlanFail(dispatch, response.problem);
      } else if (response.data.error != false) {
        cancelPlanFail(dispatch, response.data.error);
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        cancelPlanSuccess(dispatch);
      }
    });
  };
};

const cancelPlanFail = (dispatch, error) => {
  dispatch({ type: CANCEL_PLAN_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "cancelPlanFail" });
};

const cancelPlanSuccess = dispatch => {
  dispatch({ type: IS_LOADING, payload: false });

  dispatch({ type: CANCEL_PLAN_SUCCESS });
  dispatch({ type: SET_TRACKING_EVENT, payload: "cancelPlanSuccess" });

  removeData(dispatch);
};

export const updatePlan = ({
  token,
  plan,
  frequency,
  type,
  pause_all_mailing,
  accepted_terms,
  terms_type,
  slug
}) => {
  return dispatch => {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: SAVE_CARD });
    dispatch({ type: SET_TRACKING_EVENT, payload: "updatePlan" });

    apiv2
      .saveCard(
        token,
        null,
        type,
        null,
        null,
        plan,
        frequency,
        null,
        pause_all_mailing,
        accepted_terms,
        terms_type,
        slug
      )
      .then(response => {
        if (response.problem != null) {
          saveCardFail(dispatch, response.problem, type);
        } else if (response.data.error != false) {
          saveCardFail(dispatch, response.data.error, type);
          if (response.data.valid == "invalid") {
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          saveCardSuccess(
            dispatch,
            response.data.results.billing,
            response.data.results.plans,
            response.data.results.user,
            type
          );
        }
      });
  };
};
const createToken = async (
  dispatch,
  token,
  card_token,
  params,
  type,
  price,
  plan,
  frequency,
  device,
  pause_all_mailing = null,
  accepted_terms = 0,
  terms_type = "user",
  slug = "driving",
  address = null
) => {
  var c_token;
  if (card_token) {
    c_token = await getStripeToken(card_token); //await stripe.createTokenWithCard(params);
  } else {
    c_token = await getStripeToken(params);
  }

  try {
    if (!c_token.error || c_token.error == "") {
      const last4 = c_token.last4;
      const card_token_id = c_token.tokenId;

      apiv2
        .saveCard(
          token,
          card_token_id,
          type,
          last4,
          price,
          plan,
          frequency,
          device,
          pause_all_mailing,
          accepted_terms,
          terms_type,
          slug,
          address
        )
        .then(response => {
          if (response.problem != null) {
            saveCardFail(dispatch, response.problem);
          } else if (response.data.error != false) {
            saveCardFail(dispatch, response.data.error);
            if (response.data.valid == "invalid") {
              dispatch({ type: TRIGGER_LOGOUT, payload: true });
            }
          } else {
            saveCardSuccess(
              dispatch,
              response.data.results.billing,
              response.data.results.plans,
              response.data.results.user,
              type == "onboarding" ? "purchase_onboarding" : type
            );
          }
        });
    } else {
      saveCardFail(dispatch, c_token.error);
    }
  } catch (error) {
    dispatch({ type: SAVE_CARD_FAIL, payload: error.message });
    dispatch({
      type: ERROR_MESSAGE,
      payload: { message: error.message, title: "Error" }
    });
  }
};

const saveCardFail = (dispatch, error) => {
  dispatch({ type: SAVE_CARD_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "saveCardFail" });
};

const saveCardSuccess = (dispatch, billing, plans, user, type) => {
  dispatch({
    type: SAVE_CARD_SUCCESS,
    payload: { billing, user }
  });

  if(type == "onboarding_add_card" ||
    type == "purchase_onboarding"
  ){
    //conversion code for marketing
    const device = store.getState().native.device;
    if (device == "desktop") {

      if (window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-848400355/vnaaCKPos7EBEOOfxpQD",
          transaction_id: ""
        });
      }

      if(window.fbq) {
        window.fbq("track", "Purchase");
      }

    }
  }

  switch (type) {
    default:
      //charge

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: { message: "Thank you for your purchase.", title: "Success!" }
      });
      dispatch({ type: SET_TRACKING_EVENT, payload: "saveCardSuccess" });

    break;

    case "add_or_update_plan_module":

      dispatch({ type: IS_LOADING, payload: false });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: { message: "Sucess! You now have access to these services!", title: "Success!" }
      });
      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { remove: "get-feature" }
      });


    break;

    case "switch_plan":
      dispatch({ type: IS_LOADING, payload: false });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: { message: "Sucess! You have switched your plan!", title: "Success!" }
      });
      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { remove: "billing-details" }
      });
    break;

    case "onboarding":
    case "purchase_onboarding":

      dispatch({ type: SET_TRACKING_EVENT, payload: "entered_cc" });
      dispatch({ type: IS_LOADING, payload: false });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: { message: "Sucess! You now have access to this feature!", title: "Success!" }
      });

      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { remove: "get-feature" }
      });

      dispatch({
        type: SET_TRACKING_EVENT,
        payload: "saveCardOnboardingSuccess"
      });

      dispatch({
        type: SET_TRACKING_EVENT,
        payload: "intercom_added_credit_card"
      });

    break;

    case "update_plan_frequency":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {
          message: "You've successfully updated your payment frequency.",
          title: "Success!"
        }
      });

    break;

    case "reactivate":
    case "reactivate_and_update_card":
      appRedirect({ dispatch, redirect: "dashboard" });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {
          message: "You've successfully reactivated your account.",
          title: "Success!"
        }
      });

      dispatch({
        type: SET_TRACKING_EVENT,
        payload: "saveCardReactivateSuccess"
      });

      break;

    case "change_plan":
      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { type: "billing" }
      });

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {
          message: "You've successfully changed your plan.",
          title: "Success!"
        }
      });
      dispatch({
        type: SET_TRACKING_EVENT,
        payload: "saveCardChangePlanSuccess"
      });

      break;

    case "onboarding_add_card":

      dispatch({ type: SET_TRACKING_EVENT, payload: "entered_cc" });
      dispatch({
        type: SET_TRACKING_EVENT,
        payload: "saveCardOnboardingSuccess"
      });

      dispatch({
        type: SET_TRACKING_EVENT,
        payload: "intercom_added_credit_card"
      });

      dispatch({ type: IS_LOADING, payload: false });
      dispatch({
        type: TOGGLE_ONBOARDING,
        payload: false
      });
      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { remove: "add-card" }
      });

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {
          message: "You've successfully added a card to your account. You can now continue to send mailers and skip trace your leads.",
          title: "Success!"
        }
      });


    break;

    case "reactivate_card":
    case "update_card":

      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { remove: "update-card" }
      });

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {
          message: "You've successfully updated your card.",
          title: "Success!"
        }
      });

      dispatch({
        type: SET_TRACKING_EVENT,
        payload: "saveCardReactivateCardSuccess"
      });

    break;

    case "update_plan":
      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { type: "billing" }
      });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {
          message: "You've successfully updated your plan.",
          title: "Success!"
        }
      });
      dispatch({
        type: SET_TRACKING_EVENT,
        payload: "saveCardUpdatePlanSuccess"
      });

      break;

    case "popup":
      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { type: "billing" }
      });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: { message: "Thank you for your purchase.", title: "Success!" }
      });
      dispatch({ type: SET_TRACKING_EVENT, payload: "saveCardPopupSuccess" });

      break;
  }
};

export const getInvoices = ({
  token,
  type,
  begin,
  team,
  start_date,
  end_date
}) => {
  return dispatch => {
    switch (type) {
      case "onboarding":
      case "invoices":
      default:
        dispatch({ type: GET_INVOICES });
        dispatch({ type: SET_TRACKING_EVENT, payload: "getInvoices" });

        break;

      case "load_more_invoices":
        dispatch({ type: LOAD_MORE_INVOICES });
        dispatch({ type: SET_TRACKING_EVENT, payload: "loadMoreInvoices" });

        break;

      case "refresh_invoices":
        dispatch({ type: REFRESH_INVOICES });
        dispatch({ type: SET_TRACKING_EVENT, payload: "refreshInvoices" });

        break;
    }

    api
      .getInvoices({ token, type, begin, team, start_date, end_date })
      .then(response => {
        if (response.problem != null) {
          getInvoicesFail(dispatch, response.problem);
        } else if (response.data.error != false) {
          getInvoicesFail(dispatch, response.data.error);
          if (response.data.valid == "invalid") {
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        } else {
          getInvoicesSuccess(
            dispatch,
            type,
            response.data.results.invoices,
            response.data.results.billing,
            response.data.results.total_spent,
            start_date,
            end_date
          );
        }
      });
  };
};

const getInvoicesFail = (dispatch, error) => {
  dispatch({ type: GET_INVOICES_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "getInvoicesFail" });
};

const getInvoicesSuccess = (
  dispatch,
  type,
  invoices,
  billing,
  total_spent,
  start_date,
  end_date
) => {
  switch (type) {
    case "onboarding":
    case "refresh_invoices":
    case "invoices":
    default:
      dispatch({
        type: GET_INVOICES_SUCCESS,
        payload: { invoices, billing, total_spent, start_date, end_date }
      });

      break;

    case "load_more_invoices":
      dispatch({
        type: LOAD_INVOICES_SUCCESS,
        payload: { invoices, billing, total_spent, start_date, end_date }
      });
      break;
  }

  dispatch({ type: SET_TRACKING_EVENT, payload: "getInvoicesSuccess" });
};

export const initEditCreditPurchase = editCreditPurchase => {
  return {
    type: INIT_EDIT_CREDIT_PURCHASE,
    payload: editCreditPurchase
  };
};
export const creditPurchaseChanged = ({ prop, value }) => {
  return {
    type: EDIT_CREDIT_PURCHASE,
    payload: { prop, value }
  };
};

export const editCredits = ({ token, type, payload }) => {
  return dispatch => {
    dispatch({ type: EDIT_CREDITS });
    dispatch({ type: IS_LOADING, payload: true });

    dispatch({ type: SET_TRACKING_EVENT, payload: "editCredits" });

    apiv2.editCredits({ token, type, payload }).then(response => {
      if (response.problem != null) {
        editCreditsFail(dispatch, response.problem);
      } else if (response.data.error != false) {
        editCreditsFail(dispatch, response.data.error);
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        editCreditsSuccess(
          dispatch,
          type,
          response.data.results
        );
      }
    });
  };
};

const editCreditsFail = (dispatch, error) => {
  dispatch({ type: EDIT_CREDITS_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });

  dispatch({ type: SET_TRACKING_EVENT, payload: "editCreditsFail" });
};

const editCreditsSuccess = (dispatch, type, results) => {
  dispatch({ type: IS_LOADING, payload: false });

  dispatch({
    type: EDIT_CREDITS_SUCCESS,
    payload: { results }
  });

  switch (type) {
    default:
      break;

    case "purchase_credits":
      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { type: "billing" }
      });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: { message: "Your purchase is complete!.", title: "Success!" }
      });

      dispatch({ type: SET_TRACKING_EVENT, payload: "purchaseCreditsSuccess" });

      break;

    case "set_default_credit_reload":
      appRedirect({
        dispatch,
        redirect: "goBack",
        payload: { type: "billing" }
      });
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {
          message:
            "You've successfully updated your default DealCredit reload amount.",
          title: "Success!"
        }
      });
      dispatch({
        type: SET_TRACKING_EVENT,
        payload: "setDefaultCreditsSuccess"
      });

      break;

    case "set_default_credit_reload_onboarding":
      if (results.user.set_resend_freq == 1) {
        dispatch({
          type: TOGGLE_ONBOARDING,
          payload: false
        });
        appRedirect({ dispatch, redirect: "main" });
        appRedirect({ dispatch, redirect: "dashboard" });
      } else {
        dispatch({ type: SELECT_DEFAULT_SENDING_OPTIONS, payload: true });
        appRedirect({ dispatch, redirect: "mailingOptionsOnboarding" });
      }

      dispatch({
        type: SET_TRACKING_EVENT,
        payload: "setDefaultCreditsOnboardingSuccess"
      });
      dispatch({ type: SET_TRACKING_EVENT, payload: "intercom_set_credits" });

      dispatch({ type: IS_LOADING, payload: false });

      break;
  }
};

export const updateBillingAddon = ({
  token,
  addon_id,
  slug,
  type,
  payload
}) => {
  return dispatch => {
    dispatch({ type: IS_LOADING, payload: true });
    dispatch({ type: UPDATE_BILLING_ADDON });

    apiv2.updateAddon({ token, addon_id, type, payload }).then(response => {

      if (response.problem != null) {
        updateBillingAddonFail(dispatch, response.problem);
      } else if (response.data.error != false) {
        updateBillingAddonFail(dispatch, response.data.error);
        if (response.data.valid == "invalid") {
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        updateBillingAddonSuccess(dispatch, type, slug, response.data.results);
      }
    });
  };
};

const updateBillingAddonFail = (dispatch, error) => {
  dispatch({ type: UPDATE_BILLING_ADDON_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: { message: error, title: "Error" }
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "cancelPlanFail" });
};

const updateBillingAddonSuccess = (dispatch, type, slug, results) => {
  dispatch({
    type: UPDATE_BILLING_ADDON_SUCCESS,
    payload: {
      billing: results.billing,
      plans: results.plans,
      user: results.user,
      slug: slug,
      type: type
    }
  });

  switch (type) {
    case "purchase":
    default:
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {
          message:
            "Thank you for your purchase. You now have access to this feature!",
          title: "Success!"
        }
      });

      break;

    case "cancel":
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {
          message:
            "You've successfully canceled this feature. You will no longer have access to it.",
          title: "Success!"
        }
      });
      break;
  }
};

export const getBillingAddonId = (billing_addons, slug) => {
  for (var i = 0; i < billing_addons.length; i++) {
    if (billing_addons[i].slug == slug) {
      return billing_addons[i].id;
    }
  }
};

export const triggerBillingAddon = ({ props, feature_slug, callback }) => {
  let addon = null;
  let unlocked = false;
  const billing_addons = props.billing_addons;

  for (var i = 0; i < billing_addons.length; i++) {
    if (billing_addons[i].slug == feature_slug) {
      addon = billing_addons[i];

      if (
        billing_addons[i].team_has_addon == 1 ||
        billing_addons[i].included_in_team_plan == 1
      ) {
        unlocked = true;
      }
    }
  }

  if (unlocked == true || addon == null) {
    callback();
  } else {
    if (props.user.team_owner == 1 || props.user.team_clearance_level > 1) {
      if (props.platform == "ios") {
        props.setModal({
          title: 'You need the "' + addon.title + '" product.',
          description:
            'You need the "' +
            addon.title +
            '" product to use this feature. Please go to DealMachine on the web to manage your account.',
          image: addon.image,
          submit: "Dismiss",
          onPress: () => {},
          cancel: "",
          onCancel: () => {}
        });
        props.toggleModal({ show: true, type: "normal" });
      } else {
        //check if user is not an old user to prevent randomness
        if (props.user.user_version >= 2 && props.user.user_mail_version >= 2) {
          props.setModal({
            title: addon.marketing_title,
            description: addon.marketing_text,
            image: addon.image,
            submit: addon.button_text_yes,
            onPress: () => {
              props.updateBillingAddon({
                token: props.token,
                type: "purchase",
                slug: addon.slug,
                addon_id: addon.id
              });
            },
            cancel: addon.button_text_no,
            onCancel: () => {}
          });
          props.toggleModal({ show: true, type: "normal" });
        } else {
          props.setModal({
            title: "You're on an older DealMachine plan",
            description:
              "Please talk to Customer Support about updating your plan. Once you're on a newer plan you can purchase this product.",
            image: "error",
            submit: "Dismiss",
            onPress: () => {},
            cancel: "",
            onCancel: () => {}
          });
          props.toggleModal({ show: true, type: "normal" });
        }
      }
    } else {
      props.setModal({
        title: "This feature is locked.",
        description:
          "You're team leader will need to purchase this feature to unlock it.",
        icon: "lock",
        submit: "Dismiss",
        onPress: () => {},
        cancel: "",
        onCancel: () => {}
      });
      props.toggleModal({ show: true, type: "normal" });
    }
  }
}

export const getPausePlanInfo = ({token, module_type = "driving"}) => {
  return (dispatch) => {

    dispatch({ type: GET_PAUSE_PLAN_INFO });

    apiv2.getPausePlanInfo({
      token,
      module_type: module_type == "driving" ? "driving_v2" : module_type
    })
      .then(response => {
        if(response.problem != null){
          dispatch({ type: GET_PAUSE_PLAN_INFO_FAIL, payload: response.problem });
        }else if(response.data.error != false){
          dispatch({ type: GET_PAUSE_PLAN_INFO_FAIL, payload: response.data.error });
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          dispatch({ type: GET_PAUSE_PLAN_INFO_SUCCESS, payload: response.data.results });
        }
      });

  }
}


export const pauseOrCancelPlan = ({token, type, slug, url, module_type = "driving", canceled_reason}) => {
  return (dispatch) => {
    dispatch({type: IS_LOADING, payload: true});
    dispatch({ type: PAUSE_OR_CANCEL_PLAN });

    apiv2.pauseOrCancelPlan({token, type, module_type, slug, canceled_reason})
      .then(response => {

        if(response.problem != null){
          dispatch({ type: PAUSE_OR_CANCEL_PLAN_FAIL, payload: response.problem });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.problem, title: "Error"}
          });
        }else if(response.data.error != false){
          dispatch({ type: PAUSE_OR_CANCEL_PLAN_FAIL, payload: response.data.error });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.data.error, title: "Error"}
          });
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          dispatch({type: IS_LOADING, payload: false});
          dispatch({ type: PAUSE_OR_CANCEL_PLAN_SUCCESS, payload: response.data.results });

          if(type == "pause"){
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: { message: "You've successfully paused this plan", title: "Success!" }
            });
            appRedirect({dispatch, redirect: "settings"});

          }else if((type == "cancel")){
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: { message: "You've successfully canceled this plan", title: "Success!" }
            });

            appRedirect({dispatch, redirect: "sellLeads"});

          }else if(type == "offer"){
            dispatch({
              type: SUCCESS_MESSAGE,
              payload: { message: "You've signed up for this offer", title: "Success!" }
            });
            appRedirect({dispatch, redirect: "dashboard"});
            openUrl(url);

          }

          // removeData(dispatch);

      }
    });

  }
}

export const sellLeads = ({token, type, sell_leads_price, leads_count}) => {
  return (dispatch) => {
    dispatch({ type: SELL_LEADS });
    dispatch({type: IS_LOADING, payload: true});

    apiv2.sellLeads({token, type, sell_leads_price, leads_count})
      .then(response => {

        if(response.problem != null){
          dispatch({ type: SELL_LEADS_FAIL, payload: response.problem });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.problem, title: "Error"}
          });
        }else if(response.data.error != false){
          dispatch({ type: SELL_LEADS_FAIL, payload: response.data.error });
          dispatch({
            type: ERROR_MESSAGE,
            payload: {message: response.data.error, title: "Error"}
          });
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          dispatch({type: IS_LOADING, payload: false});
          dispatch({ type: SELL_LEADS_SUCCESS, payload: response.data.results });
          dispatch({
            type: SUCCESS_MESSAGE,
            payload: { message: "Check your email for more details.", title: "Success!" }
          });
          //removeData(dispatch);
          appRedirect({dispatch, redirect: "dashboard"});

        }
      });

  }
}

export const cancelSellLeads = () => {
  return (dispatch) => {
    //removeData(dispatch);
  }
};

export const triggerDealCreditReload = (toggle) => {
  return {
    type: TRIGGER_DEAL_CREDIT_RELOAD,
    payload: toggle
  };
};

export const getBilling = ({ token, type, slug, require_tier }) => {
  return (dispatch) => {

    switch(type){
      case "deal_credits":
        dispatch({ type: GET_DEAL_CREDITS });
      break;

      case "plan_module_options":
        dispatch({type: GET_PLAN_MODUALS});
      break;

      case "lead_limits":
        dispatch({type: GET_LEAD_LIMITS});
      break;
    }

    apiv2.getBilling({ token, type, slug, require_tier })
      .then(response => {
        if(response.problem != null){
          dispatch({ type: GET_BILLING_FAIL });
        }else if(response.data.error != false){
          dispatch({ type: GET_BILLING_FAIL });
          if(response.data.valid == "invalid"){
            dispatch({ type: TRIGGER_LOGOUT, payload: true });
          }
        }else{
          switch(type){
            case "deal_credits":
              dispatch({ type: GET_DEAL_CREDITS_SUCCESS, payload: response.data.results });
            break;

            case "plan_module_options":
              dispatch({ type: GET_PLAN_MODUALS_SUCCESS, payload: response.data.results });
            break;

            case "lead_limits":
              dispatch({ type: GET_LEAD_LIMITS_SUCCESS, payload: response.data.results });
            break;
          }
        }
      });

  }
}

export const checkIfUserHasModule = ({plan_modules = [], user, slug}) => {

  for(let i = 0; i<plan_modules.length; i++){
    if(plan_modules[i].module_type === slug){

      let user_has_module = false;
      for(let j = 0; j<user.plan_modules.length; j++){
        if(user.plan_modules[j] == slug){
          user_has_module = true;
        }
      }

      return {
        has_module: plan_modules[i].free_trial_info.is_on_trial == false && plan_modules[i].approved_to_charge == 0 ? false : plan_modules[i].canceled_access == false ? false : user_has_module === true ? true : false,
        team_has_module: plan_modules[i].free_trial_info.is_on_trial == false && plan_modules[i].approved_to_charge == 0 ? false : plan_modules[i].canceled_access == false ? false : true,
        user_has_module: user_has_module,
        approved_to_charge: plan_modules[i].approved_to_charge,
        is_trial_over: !plan_modules[i].free_trial_info.is_on_trial,
        tier: plan_modules[i].tier,
        current_tier: plan_modules[i].current_tier,
        canceled: plan_modules[i].plan_canceled,
        canceled_access: plan_modules[i].canceled_access,
        paused: plan_modules[i].paused,
        date_canceled: plan_modules[i].date_canceled,
        team_member_limit: plan_modules[i].team_member_limit ? plan_modules[i].team_member_limit : 0,
        team_member_count: plan_modules[i].team_member_count ? plan_modules[i].team_member_count : 0,
        dealfinder_limit: plan_modules[i].dealfinder_limit ? plan_modules[i].dealfinder_limit : 0,
        dealfinder_count: plan_modules[i].dealfinder_count ? plan_modules[i].dealfinder_count : 0,
        module_info: plan_modules[i]
      };
    }
  }

  return {
    has_module: false,
    user_has_module: false,
    team_has_module: false,
    tier: 0,
    module_info: null,
    canceled: null,
    canceled_access: false,
    date_canceled: null,
    paused: null,
    is_trial_over: null,

    team_member_limit: 0,
    team_member_count: 0,
    dealfinder_limit: 0,
    dealfinder_count: 0,
  }

}

export const setFeatureModal = ({slug, require_tier}) => {
  return{
    type: SET_FEATURE_MODAL,
    payload: {
      slug,
      require_tier
    }
  }
}


export const checkIfUserHasBillingAddon = ({billing_addons = [], slug}) => {
  for(let i = 0; i<billing_addons.length; i++){
    if(billing_addons[i].slug === slug){


      if(billing_addons[i].team_has_addon == 1 ||
        billing_addons[i].included_in_team_plan == 1
      ){
        return true
      }
    }

  }

  return false;
}
