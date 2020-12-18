import {
  LOGOUT,
  GET_DEALS,
  GET_DEALS_FAIL,
  GET_DEALS_SUCCESS,
  GET_DEALS_SUCCESS_REPLACE,
  GET_MAP_DEALS,
  GET_MAP_DEALS_SUCCESS,
  GET_SINGLE_DEAL_SUCCESS,
  SEARCH_CHANGED,
  EDIT_SEARCH_CHANGED,
  TOGGLE_DEALS_OPTIONS,
  FILTER_CHANGED,
  REFRESH_DEALS,
  LOAD_MORE_DEALS,
  NEW_DEAL,
  NEW_DEAL_FAIL,
  NEW_DEAL_SUCCESS,
  OWNER_LOOKUP,
  OWNER_LOOKUP_SUCCESS,
  OWNER_LOOKUP_FAIL,
  OTHER_OWNER_LOOKUP_SUCCESS,
  OTHER_OWNER_LOOKUP_FAIL,
  UPDATE_HOUSE_SUCCESS,
  SELECT_EDIT_PHOTO,
  UPLOAD_EDIT_PHOTO_SUCCESS,
  EDIT_OPM_SUCCESS,
  DELETE_DEAL,
  TOGGLE_ALL_ADDRESSES_SUCCESS,
  INIT_EDIT_FILTERS,
  EDIT_FILTER,
  SAVE_FILTERS,
  CLEAR_FILTER,
  CLEAR_ALL_FILTERS,
  SELECT_DEAL,
  DESELECT_DEAL,
  SELECT_ALL_DEALS,
  DESELECT_ALL_DEALS,
  INIT_EDIT_DEALS,
  EDIT_DEALS,
  SAVE_EDIT_DEALS,
  SAVE_EDIT_DEALS_FAIL,
  SAVE_EDIT_DEALS_SUCCESS,
  SAVE_EDIT_DEALS_SUCCESS_DELETE,
  PHOTO_BUTTON_TOGGLE,
  RELOAD_DEALS,

  SET_ACTIVE_DEAL,
  REVERSE_GEOCODE_SUCCESS,
  UPLOAD_EDIT_PROGRESS,

  SET_DEAL_SCROLL_POSITION,
  TOGGLE_INVALID_MODAL,

  GET_TAGS_SUCCESS,

  CREATE_TAG_SUCCESS,
  REMOVE_TAG_SUCCESS,
  VALID_ADDRESS,
  INVALID_NEW_DEAL_ADDRESS,
  VALID_ADDRESS_FAIL,

  GENERATE_PREVIEW_IMAGES,
  GENERATE_PREVIEW_IMAGES_SUCCESS,

  GOOGLE_STREET_VIEW_SUCCESS,
  GET_TOTAL_PURCHASE_AMOUNT,

  GET_MAP_PROPERTIES_SUCCESS

} from 'app/DealMachineCore/types';
import moment from 'moment';

import {
  combineArrays
} from 'app/NativeActions';

const updateDeal = (originalDeal, newDeals) => {
  for(var i = 0; i<newDeals.length; i++){
    if(originalDeal.id == newDeals[i].id){
      return newDeals[i];
    }
  }
  return originalDeal;
}

const locateActiveDeal = (deals, address, address_data, bounds, activeDeal) =>{

  if(bounds){
    for(var i = 0; i<deals.length; i++){
      if(
        parseFloat(deals[i].lat) > bounds.minlat &&
        parseFloat(deals[i].long) > bounds.minlng &&
        parseFloat(deals[i].lat) < bounds.maxlat &&
        parseFloat(deals[i].long) < bounds.maxlng
      ){
        return deals[i];
      }

    }
  }

  return activeDeal;

}


const checkIfDealInBounds = (deal, bounds) =>{

  if(parseFloat(deal.lat) > parseFloat(bounds.southLat) && parseFloat(deal.lat) < parseFloat(bounds.northLat) &&
    parseFloat(deal.long) > parseFloat(bounds.westLng) && parseFloat(deal.long) < parseFloat(bounds.eastLng)){
      return true;
  }

  return false;

}

const INITIAL_STATE = {
  deals: [],
  deals_count: 0,

  activeDeal: null,

  select_all_deals: false,
  can_select_all: true,
  selected_deals: [],
  search: '',
  editSearch: '',
  toggle_deals_options: "list",
  filter: "all",
  filter_title: "All Open Deals",
  originalFilters:{
    status: "active_deals",
    owner_properties: "all_owners",
    team_member: "all",
    enhanced_search: "all",
    times_mailed_type: "all",
    times_mailed_value: 0,
    campaign: "all",
    mail_template: "all",
    property_tag: "all",
    routes: "all",
    start_date: null,
    end_date: null
  },
  filters:{
    status: "active_deals",
    status_title: "Active Deals",
    owner_properties: "all_owners",
    owner_properties_title: "All Owners",
    team_member: "all",
    team_member_title: "Everyone",
    enhanced_search: "all",
    enhanced_search_title: "N/A",
    times_mailed_type: "all",
    times_mailed_value: "0",
    times_mailed_title: "N/A",
    campaign: "all",
    campaign_title: "All Campaigns",
    mail_template: "all",
    mail_template_title: "All Templates",
    property_tag: "all",
    property_tag_title: "All Property Tags",
    routes: "all",
    routes_title: "All Routes",
    start_date: null,
    end_date: null

  },
  editFilters:{},
  originalDealEdits:{

    mailing_options:{
      toggled: false,
      campaign_id: 0,
      campaign_title: "No Campaign",
      template_id: "none",
      template_title: "N/A",
      resend_freq: 21,
      resend_freq_switch: "on",
      resend_limit: 12,
      resend_limit_switch: "off"
    },

    status: {
      toggled: false,
      status: "none",
      title: "N/A"
    },
    approve: {
      toggled: false
    },
    pause: {
      toggled: false
    },
    enhanced_search: {
      toggled: false
    }
  },
  dealEdits:{},
  begin: 0,
  loaded_all: false,
  limit: 25,
  error: '',
  loading: false,
  refreshing: false,
  reload: false,
  all_tags: [],
  photo_button_toggle: false,

  deal_scroll_id: null,
  toggle_invalid_modal: false,
  formatted_address: null,

  all_badges: [],
  my_badges: [],
  not_earned_badges: [],
  top_badges: [],
  total_purchase_amount: 0,
  grid_columns: [],

  new_deal_loading: false,


  all_statuses: [],
}


export default (state = INITIAL_STATE, action) => {
  switch(action.type){

    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case SEARCH_CHANGED:
      return {
        ...state,
        begin: 0,
        search: action.payload
      };
    case EDIT_SEARCH_CHANGED:
      return {
        ...state,
        editSearch: action.payload
      }
    case TOGGLE_DEALS_OPTIONS:
      return {
        ...state,
        toggle_deals_options: action.payload
      };
    case FILTER_CHANGED:
      return {
        ...state,
        begin: 0,
        filter: action.payload.filter,
        filter_title: action.payload.filter_title
      };
    case RELOAD_DEALS:
      return {
        ...state,
        reload: true
      }
    break;
    case GET_DEALS:
      return {
        ...state,
        deals: [],
        error: '',
        loading: true,
        refreshing: false,
        begin: 0,
        reload: false,
        loaded_all: false,
        can_select_all: true
      }
    case GET_MAP_DEALS:
      return {
        ...state,
        error: '',
        loading: true,
        refreshing: false,
        begin: 0,
        reload: false,
        loaded_all: false,
        can_select_all: true
      }
    case REFRESH_DEALS:
      return {
        ...state,
        error: '',
        deals: [],
        refreshing: true,
        loading: false,
        begin: 0,
        reload: false,
        loaded_all: false,
        can_select_all: true
      }
    case LOAD_MORE_DEALS:
      return {
        ...state,
        error: '',
        reload: false,
        refreshing: false,
        loading: true
      }

    case GET_DEALS_SUCCESS_REPLACE:
      return {
        ...state,
        loading: false,
        refreshing: false,
        deals: action.payload.deals,
        deals_count: action.payload.deals_count,
        begin: action.payload.deals.length,
        loaded_all: action.payload.deals.length < state.limit,
        all_tags: action.payload.all_tags ? action.payload.all_tags : state.all_tags,
        all_statuses: action.payload.all_statuses ? action.payload.all_statuses : state.all_statuses
      };

    case GET_MAP_PROPERTIES_SUCCESS:

      return {
        ...state,
        all_tags: action.payload.all_tags ? action.payload.all_tags : state.all_tags,
        all_statuses: action.payload.all_statuses ? action.payload.all_statuses : state.all_statuses
      };

    case GET_DEALS_SUCCESS:
      return {
        ...state,
        loading: false,
        refreshing: false,
        deals: state.deals.concat(action.payload.deals),
        deals_count: action.payload.deals_count,
        begin: state.begin+action.payload.deals.length,
        loaded_all: action.payload.deals.length < state.limit,
        all_tags: action.payload.all_tags ? action.payload.all_tags : state.all_tags,
        all_statuses: action.payload.all_statuses ? action.payload.all_statuses : state.all_statuses

      };

    case GET_MAP_DEALS_SUCCESS:

      return {
        ...state,
        loading: false,
        refreshing: false,
        deals: combineArrays(state.deals, action.payload.deals, action.payload.bounds),

        deals_count: action.payload.deals_count,
        all_tags: action.payload.all_tags ? action.payload.all_tags : state.all_tags,
        all_statuses: action.payload.all_statuses ? action.payload.all_statuses : state.all_statuses
      };

    case GET_SINGLE_DEAL_SUCCESS:
      return {
        ...state,
        all_tags: action.payload.all_tags ? action.payload.all_tags : state.all_tags,
        all_statuses: action.payload.all_statuses ? action.payload.all_statuses : state.all_statuses

      };

    case GET_DEALS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        refreshing: false
      };
    case NEW_DEAL:
      return {
        ...state,
        error: '',
        loading: true,
        new_deal_loading: true
      };
    case INVALID_NEW_DEAL_ADDRESS:
      return {
        ...state,
        error: '',
        loading: true
      };
    case NEW_DEAL_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
        new_deal_loading: false
      };
    case NEW_DEAL_SUCCESS:
      return {
        ...state,
        deals: [...state.deals, action.payload.deal],
        loading: false,
        all_tags: action.payload.all_tags ? action.payload.all_tags : state.all_tags,
        all_statuses: action.payload.all_statuses ? action.payload.all_statuses : state.all_statuses,
        new_deal_loading: false
      };

    case EDIT_OPM_SUCCESS:
      return {
        ...state,

        activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id ? {
            ...state.activeDeal,
            other_possible_matches: action.payload.other_possible_matches
        } : state.activeDeal : null,
        deals: state.deals.map(
           (deal, i) => deal.id == action.payload.deal_id ? {...deal, other_possible_matches: action.payload.other_possible_matches} : deal
        )
      };


      case GENERATE_PREVIEW_IMAGES:
        return {
          ...state,
          activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id && action.payload.deal_id && action.payload.deal_id != 0 ? {
            ...state.activeDeal,
            template_preview: null,
            template_preview_back: null
          } : state.activeDeal : null,
          deals: action.payload.save_info == 1 && action.payload.deal_id && action.payload.deal_id != 0 ?
            state.deals.map(
               (deal, i) => deal.id == action.payload.deal_id ? {
                 ...deal,
                 template_preview: null,
                 template_preview_back: null
               } : deal
            )
          : state.deals,

        };

    case GENERATE_PREVIEW_IMAGES_SUCCESS:
      return {
        ...state,
        activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id && action.payload.deal_id && action.payload.deal_id != 0 ? {
          ...state.activeDeal,
          template_preview: action.payload.image,
          template_preview_back: action.payload.image_back
        } : state.activeDeal : null,
        deals: action.payload.save_info == 1 && action.payload.deal_id && action.payload.deal_id != 0 ?
          state.deals.map(
             (deal, i) => deal.id == action.payload.deal_id ? {
               ...deal,
               template_preview: action.payload.image,
               template_preview_back: action.payload.image_back
             } : deal
          )
        : state.deals,

      };

    case UPDATE_HOUSE_SUCCESS:

      return {
        ...state,

        activeDeal: state.activeDeal ? action.payload.deal.id == state.activeDeal.id ? action.payload.deal : state.activeDeal : null,
        deals: state.deals.map(
           (deal, i) => deal.id == action.payload.deal.id ? {
             ...action.payload.deal,
             image: deal.image
           } : deal
        )
      };
    case GOOGLE_STREET_VIEW_SUCCESS:
      return {
        ...state,

        activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id ? {
          ...state.activeDeal,
          image: action.payload.image
        } : state.activeDeal : null,
        deals: state.deals.map(
           (deal, i) => deal.id == action.payload.deal_id ? {
             ...deal,
             image: action.payload.image

           } : deal
        )
      };


    case DELETE_DEAL:
      return {
        ...state,
        activeDeal: state.activeDeal ? action.payload == state.activeDeal.id ? null : state.activeDeal : null,
        deals: state.deals.filter(({id}) => id != action.payload)
      };

    case OWNER_LOOKUP:
      return {
        ...state,
        activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id ? {
          ...state.activeDeal,
          owner_loading: true
        } : state.activeDeal : null,
        deals: state.deals.map(
           (deal, i) => deal.id == action.payload.deal_id ? {
             ...deal,
             owner_loading: true
           } : deal
        )
      };

    case OWNER_LOOKUP_FAIL:
      return {
        ...state,
        activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id ? {
          ...state.activeDeal,
          owner_loading: null,
          status: 2,
        } : state.activeDeal : null,
        deals: state.deals.map(
           (deal, i) => deal.id == action.payload.deal_id ? {
             ...deal,
             status: 2,
             owner_loading: null
           } : deal
        )
      };

    case OWNER_LOOKUP_SUCCESS:

      return {
        ...state,
        activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id ? {
          ...state.activeDeal,
          owner_loading: null,
          owner_name: action.payload.owner ? action.payload.owner.owner_name : "",
          owner_address: action.payload.owner ? action.payload.owner.owner_address : "",
          owner_address2: action.payload.owner ? action.payload.owner.owner_address2 : "",
          owner_address_city: action.payload.owner ? action.payload.owner.owner_address_city : "",
          owner_address_state: action.payload.owner ? action.payload.owner.owner_address_state : "",
          owner_address_zip: action.payload.owner ? action.payload.owner.owner_address_zip : "",
          owner_status_info: action.payload.owner_status_info ? action.payload.owner_status_info : {},
          use_owner_address: action.payload.owner ? action.payload.owner.use_owner_address : "",
          other_possible_matches: action.payload.other_possible_matches,
          more_info: action.payload.more_info,
          other_possible_matches_tried: action.payload.other_possible_matches_tried,
          corp_owner: action.payload.corp_owner
        } : state.activeDeal : null,
        deals: state.deals.map(
           (deal, i) => deal.id == action.payload.deal_id ? {
             ...deal,
             owner_loading: null,
             owner_name: action.payload.owner ? action.payload.owner.owner_name : "",
             owner_address: action.payload.owner ? action.payload.owner.owner_address : "",
             owner_address2: action.payload.owner ? action.payload.owner.owner_address2 : "",
             owner_address_city: action.payload.owner ? action.payload.owner.owner_address_city : "",
             owner_address_state: action.payload.owner ? action.payload.owner.owner_address_state : "",
             owner_address_zip: action.payload.owner ? action.payload.owner.owner_address_zip : "",
             owner_status_info: action.payload.owner_status_info ? action.payload.owner_status_info : deal.owner_status_info,
             use_owner_address: action.payload.owner ? action.payload.owner.use_owner_address : "",
             other_possible_matches: action.payload.other_possible_matches,
             more_info: action.payload.more_info,
             other_possible_matches_tried: action.payload.other_possible_matches_tried,
             corp_owner: action.payload.corp_owner
           } : deal
        )
      };


    case OTHER_OWNER_LOOKUP_SUCCESS:
      return {
        ...state,

        activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id ? {
          ...state.activeDeal,
          other_possible_matches: action.payload.other_possible_matches,
          other_possible_matches_tried: 1,
          opm_date: moment().add(1, "day").utc().format("YYYY-MM-DD HH:mm:ss"),
          hide_cta: 0,
          corp_owner: action.payload.corp_owner
        } : state.activeDeal : null,

        deals: state.deals.map(
           (deal, i) => deal.id == action.payload.deal_id ? {
             ...deal,
             other_possible_matches: action.payload.other_possible_matches,
             other_possible_matches_tried: 1,
             opm_date: moment().add(1, "day").utc().format("YYYY-MM-DD HH:mm:ss"),
             hide_cta: 0,
             corp_owner: action.payload.corp_owner
           } : deal
        )
      };
    case OTHER_OWNER_LOOKUP_FAIL:
      return {
        ...state,

        activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id ? {
          ...state.activeDeal,
          other_possible_matches: {
            phones:null,
            emails:null,
            addresses:null,
            images:null,
            match: null,
            gender: null,
          },
          other_possible_matches_tried: 1,
          opm_date: moment().add(1, "day").utc().format("YYYY-MM-DD HH:mm:ss"),
          hide_cta: 0
        } : state.activeDeal : null,

        deals: state.deals.map(
           (deal, i) => deal.id == action.payload.deal_id ? {
             ...deal,
             other_possible_matches: {
               phones:null,
               emails:null,
               addresses:null,
               images:null,
               match: null,
               gender: null,
             },
             other_possible_matches_tried: 1,
             opm_date: moment().add(1, "day").utc().format("YYYY-MM-DD HH:mm:ss"),
             hide_cta: 0
           } : deal
        )
      };

    case SELECT_EDIT_PHOTO:
      return {
        ...state,

        activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id ? {
          ...state.activeDeal,
          image: action.payload.uri
        } : state.activeDeal : null,
        deals: state.deals.map(
           (deal, i) => deal.id == action.payload.deal_id ? {
             ...deal,
             image: action.payload.uri
           } : deal
        )
      };
    case UPLOAD_EDIT_PROGRESS:
      return {
        ...state,

        activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id ? {
          ...state.activeDeal,
          progress: action.payload.progress
        } : state.activeDeal : null,
        deals: state.deals.map(
           (deal, i) => deal.id == action.payload.deal_id ? {
             ...deal,
             progress: action.payload.progress
           } : deal
        )
      };

    case UPLOAD_EDIT_PHOTO_SUCCESS:
      return {
        ...state,
        activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id ? {
          ...state.activeDeal,
          image: action.payload.image,
          just_uploaded: true
        } : state.activeDeal : null,
        deals: state.deals.map(
           (deal, i) => deal.id == action.payload.deal_id ? {
             ...deal,
             image: action.payload.image
           } : deal
        )
      };
    case TOGGLE_ALL_ADDRESSES_SUCCESS:
      return {
        ...state,
        activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id ? {
          ...state.activeDeal,
          use_owner_address: 1
        } : state.activeDeal : null,
        deals: state.deals.map(
           (deal, i) => deal.id == action.payload.deal_id ? {
             ...deal,
             use_owner_address: 1
           } : deal
        )
      };
    case INIT_EDIT_FILTERS:
      return {
        ...state,
        editFilters: state.filters
      };
    case SAVE_FILTERS:
      return {
        ...state,
        filters: state.editFilters
      };
    case EDIT_FILTER:
      return {
        ...state,
        editFilters:{
          ...state.editFilters,
          [action.payload.prop]: action.payload.value
        }
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filters:{
          ...state.filters,
          [action.payload]: INITIAL_STATE.filters[action.payload]
        }
      };
    case CLEAR_ALL_FILTERS:
      return {
        ...state,
        filters:INITIAL_STATE.filters
      };
    case SELECT_DEAL:
      return {
        ...state,
        selected_deals: [...state.selected_deals, action.payload],

      };
    case DESELECT_DEAL:
      return {
        ...state,
        selected_deals: state.selected_deals.filter(({id}) => id != action.payload.id)
      };
    case SELECT_ALL_DEALS:
      return {
        ...state,
        selected_deals: [],
        select_all_deals: true
      };
    case DESELECT_ALL_DEALS:
      return {
        ...state,
        selected_deals: [],
        select_all_deals: false
      };
    case INIT_EDIT_DEALS:
      return {
        ...state,
        dealEdits: INITIAL_STATE.originalDealEdits
      };
    case EDIT_DEALS:
      return {
        ...state,
        dealEdits: {
          ...state.dealEdits,
          [action.payload.prop_group]:{
            ...state.dealEdits[action.payload.prop_group],
            [action.payload.prop]: action.payload.value
          }
        }
      };
    case SAVE_EDIT_DEALS:
      return {
        ...state
      };
    case SAVE_EDIT_DEALS_FAIL:
      return {
        ...state,

        activeDeal: state.activeDeal ? action.payload.deal_id == state.activeDeal.id ? {
          ...state.activeDeal,
          other_possible_matches: {
            phones:null,
            emails:null,
            addresses:null,
            images:null,
            match: null,
            gender: null,
          },
          other_possible_matches_tried: 1,
          opm_date: moment().add(1, "day").utc().format("YYYY-MM-DD HH:mm:ss"),
          hide_cta: 0
        } : state.activeDeal : null,
        deals: state.deals.map(
           (deal, i) => deal.id == action.payload.deal_id ? {
             ...deal,
             other_possible_matches: {
               phones:null,
               emails:null,
               addresses:null,
               images:null,
               match: null,
               gender: null,
             },
             other_possible_matches_tried: 1,
             opm_date: moment().add(1, "day").utc().format("YYYY-MM-DD HH:mm:ss"),
             hide_cta: 0
           } : deal
        )

      };

    case SAVE_EDIT_DEALS_SUCCESS:
      return {
        ...state,
        dealEdits: INITIAL_STATE.originalDealEdits,
        selected_deals: [],
        select_all_deals: false,
        can_select_all: false,
        activeDeal: null,
        deals: state.deals.map(
           (deal, i) => updateDeal(deal, action.payload.deals)
        )
      };

    case SAVE_EDIT_DEALS_SUCCESS_DELETE:

      const deal_id_array = action.payload.deals.map((deal)=>{
        return deal.id
      });

      return {
        ...state,
        dealEdits: INITIAL_STATE.originalDealEdits,
        selected_deals: [],
        select_all_deals: false,
        can_select_all: false,
        activeDeal: null,
        deals: state.deals.filter(({id}) => !deal_id_array.includes(id))
      };
    case PHOTO_BUTTON_TOGGLE:
      return {
        ...state,
        photo_button_toggle: action.payload
      }

    case SET_ACTIVE_DEAL:
      return{
        ...state,
        activeDeal: action.payload.deal ? action.payload.deal : null
      }
    case REVERSE_GEOCODE_SUCCESS:
      return{
        ...state,
        //activeDeal: locateActiveDeal(state.deals, action.payload.address, action.payload.address_data, action.payload.bounds, state.activeDeal)
      }

    case SET_DEAL_SCROLL_POSITION:
      return{
        ...state,
        deal_scroll_id: action.payload
      }

    case GET_TAGS_SUCCESS:
    case CREATE_TAG_SUCCESS:
    case REMOVE_TAG_SUCCESS:
      return{
        ...state,
        all_tags: action.payload.tags ? action.payload.tags : state.all_tags
      }

    case VALID_ADDRESS:
      return{
        ...state,
        formatted_address: action.payload
      }
      case NEW_DEAL_FAIL:
        return {
          ...state,
          error: action.payload.error,
          loading: false
        };
      case GET_TOTAL_PURCHASE_AMOUNT:
        return {
          ...state,
          total_purchase_amount: action.payload
        };

    default:
      return state;
  }
}
