import {
  LOGOUT,
  OWNER_LOOKUP,
  OWNER_LOOKUP_FAIL,
  OWNER_LOOKUP_SUCCESS,
  HOUSE_RESET,
  SOFT_HOUSE_RESET,
  TOGGLE_HOUSE_ACTION_SHEET,
  INIT_HOUSE,
  UPDATE_HOUSE,
  UPDATE_HOUSE_FAIL,
  UPDATE_HOUSE_SUCCESS,
  UPDATE_HOUSE_LOCAL,
  CHANGE_HOUSE_TAB,
  OTHER_POSSIBLE_MATCHES_TOGGLE,
  OTHER_OWNER_LOOKUP,
  OTHER_OWNER_LOOKUP_FAIL,
  OTHER_OWNER_LOOKUP_SUCCESS,
  SELECT_EDIT_PHOTO,
  UPLOAD_EDIT_PHOTO,
  UPLOAD_EDIT_PHOTO_SUCCESS,
  UPLOAD_EDIT_PHOTO_FAIL,
  UPLOAD_EDIT_PROGRESS,
  UPLOAD_EDIT_ANIMATION,
  TRIGGER_LOOKUP,
  INIT_EDIT_HOUSE,
  EDIT_HOUSE_FIELD_CHANGE,
  SELECT_STATE,
  EDIT_OPM,
  EDIT_OPM_FAIL,
  EDIT_OPM_SUCCESS,
  HIDE_CTA,
  TOGGLE_EDIT_TAGS,
  EDIT_PROPERTY_TAGS,
  DELETE_DEAL,
  TOGGLE_ALL_ADDRESSES_SUCCESS,
  GET_SINGLE_DEAL,
  GET_SINGLE_DEAL_FAIL,
  GET_SINGLE_DEAL_SUCCESS,

  GENERATE_PREVIEW_IMAGES,
  GENERATE_PREVIEW_IMAGES_SUCCESS,

  CREATE_TEMPLATE_SUCCESS,

  GOOGLE_STREET_VIEW_SUCCESS
} from 'app/DealMachineCore/types';

import {
  numberFormat
} from 'app/NativeActions';

import moment from 'moment';

const INITIAL_STATE = {
  owner: {},
  info:{
    id: 0,
    image: '',
    from_google_street_view: 0,
    closed: 0,
    closed_date: null,
    archived: 0,
    approved: 0,
    address: '',
    status: 0,
    deal_status_id: 0,
    deal_status_title: "",
    deal_status_description: "",
    resend_freq: 0,
    resend_limit: 0,
    times_mailed: 0,
    mail_template_id: 0,
    mail_template_name: "Default",
    creator_firstname: "",
    creator_lastname: "",
    creator_email: "",
    team_id: "",
    team_name: "",
    team_company: "",
    lat: null,
    long: null,
    removed: 0,
    creator_id: 0,
    creator_firstname: '',
    creator_lastname:'',
    creator_email: '',
    team_id: 0,
    team_name: '',
    team_company: '',
    team_clearance_level: 0,
    corp_owner: 0,
    other_possible_matches_tried: 0,
    approval_date: null,
    opm_date: null,
    hide_cta: 0,
    paused: 0,
    paused_by: 0,
    paused_date: null,
    template_preview: null,
    template_preview_back: null
  },
  more_info:{
    UnifiedSchoolDistrictName: "",
    building_bedrooms: "",
    building_totalbaths: "",
    building_yearbuilt:"",
    calculated_equity_percent: "",
    currentdeed_lendername: "",
    currentdeed_mortgageamount:"",
    currentdeed_mortgagedate:"",
    currentdeed_mortgageduedate:"",
    currentdeed_mortgageloantypecode:"",
    currentdeed_mortgageterm:"",
    currentdeed_secondmortgageamount:"",
    currentdeed_secondmortgageloantypecode:"",
    currentsale_recordingdate:"",
    currentsale_saledate:"",
    currentsale_saleprice:"",
    currentsale_sellername:"",
    currentsale_transactionid:"",
    deal:"",
    log_id:"",
    lot_acreage:"",
    owner_corporateowner:"",
    owner_name:"",
    owneraddress_address:"",
    owneraddress_city:"",
    owneraddress_state:"",
    owneraddress_zip:"",
    priorsale_transactionid:"",
    propertyaddress_address:"",
    propertyaddress_addresskey:"",
    propertyaddress_city:"",
    propertyaddress_state:"",
    propertyaddress_zip:"",
    squarefootage_garageorparking:"",
    squarefootage_universalbuilding:"",
    values_calculatedimprovementvalue:"",
    values_calculatedlandvalue:"",
    values_calculatedtotalvalue: "",
  },
  other_possible_matches:{
    phones:null,
    emails:null,
    addresses:null,
    images:null,
    match: null,
    gender: null,
  },
  property_tags:[],
  edit_property_tags:[],
  other_possible_matches_toggle:false,
  error: '',
  lookup_fail: false,
  trigger_lookup: false,
  looking: false,
  loading: false,
  actionSheet: null,
  tab: "",
  other_looking: false,
  other_lookup_error: '',
  upload_photo:{
    source: null,
    uploading: false,
    uploaded: false,
    uploaded_animation: false,
    use_full: false,
    progress: 0,
    error: ""
  },
  newAddress: false,
  newEmail: false,
  newPhone: false,
  originalEmail: {},
  originalPhone: {},
  originalAddress: {},
  editHouse: {},
  toggle_tags: false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOGOUT:
    case DELETE_DEAL:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case INIT_EDIT_HOUSE:
      return {
        ...state,
        originalAddress: action.payload.originalAddress ? action.payload.originalAddress : INITIAL_STATE.originalAddress,
        originalEmail: action.payload.originalEmail ? action.payload.originalEmail : INITIAL_STATE.originalEmail,
        originalPhone: action.payload.originalPhone ? action.payload.originalPhone : INITIAL_STATE.originalPhone,
        newAddress: action.payload.newAddress ? action.payload.newAddress : false,
        newEmail: action.payload.newEmail ? action.payload.newEmail : false,
        newPhone: action.payload.newPhone ? action.payload.newPhone : false,
        editHouse: action.payload.deal
      };
    case EDIT_HOUSE_FIELD_CHANGE:
      return {
        ...state,
        editHouse: {
          ...state.editHouse,
          [action.payload.prop]: action.payload.value
        }
      };
    case GENERATE_PREVIEW_IMAGES:
      return{
        ...state,
        info:{
          ...state.info,
          template_preview: null,
          template_preview_back: null
        }

      }
    case GENERATE_PREVIEW_IMAGES_SUCCESS:
      return{
        ...state,
        info:{
          ...state.info,
          template_preview: action.payload.image,
          template_preview_back: action.payload.image_back
        }

      }

    case INIT_HOUSE:
      return {
        ...state,
        info: action.payload.info,
        owner: action.payload.owner,
        more_info: action.payload.more_info ? action.payload.more_info : INITIAL_STATE.more_info,
        property_tags: action.payload.tags,
        edit_property_tags: action.payload.tags,
        toggle_tags: false,
        other_possible_matches_toggle: false,
        other_possible_matches: action.payload.other_possible_matches,
        tab: INITIAL_STATE.tab,
        upload_photo:{
          ...state.upload_photo,
          use_full: false
        }
      };
    case CHANGE_HOUSE_TAB:
      return {
        ...state,
        tab: action.payload == state.tab ? "" : action.payload
      };
    case OWNER_LOOKUP:
      return {
        ...state,
        trigger_lookup: false,
        looking: true,
        lookup_fail: false,
        error: ''
      };
    case OWNER_LOOKUP_FAIL:
      return {
        ...state,
        lookup_fail: true,
        looking: false,
        info: {
          ...state.info,
          status: 2
        }
      };
    case OWNER_LOOKUP_SUCCESS:
      return {
        ...state,
        looking: false,
        owner: action.payload.owner,
        more_info: action.payload.more_info ? action.payload.more_info : INITIAL_STATE.more_info,
        other_possible_matches: action.payload.other_possible_matches,
        info:{
          ...state.info,
          owner_status_info: action.payload.owner_status_info,
          other_possible_matches_tried: action.payload.other_possible_matches_tried,
          corp_owner: action.payload.corp_owner
        }
      };

    case OTHER_OWNER_LOOKUP:
      return {
        ...state,
        trigger_lookup: false,
        other_looking: true,
        other_lookup_error: ''
      };
    case OTHER_OWNER_LOOKUP_FAIL:
      return {
        ...state,
        other_looking: false,
        other_lookup_error: action.payload.error,
        other_possible_matches: INITIAL_STATE.other_possible_matches,
        info:{
          ...state.info,
          hide_cta: 0,
          opm_date: moment().add(1, "day").utc().format("YYYY-MM-DD HH:mm:ss"),
          other_possible_matches_tried: 1
        },
        other_possible_matches_toggle: false
      };
    case OTHER_OWNER_LOOKUP_SUCCESS:
      return {
        ...state,
        other_looking: false,
        other_possible_matches: action.payload.other_possible_matches,
        info:{
          ...state.info,
          hide_cta: 0,
          opm_date: moment().add(1, "day").utc().format("YYYY-MM-DD HH:mm:ss"),
          other_possible_matches_tried: action.payload.other_possible_matches_tried,
          corp_owner: action.payload.cop_owner
        }
      };
    case HOUSE_RESET:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case SOFT_HOUSE_RESET:
      return {
        ...state,
        error: '',
        other_possible_matches_toggle: false
      }
    case TOGGLE_HOUSE_ACTION_SHEET:
      return {
        ...state,
        actionSheet: action.payload
      };
    case EDIT_OPM:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case EDIT_OPM_SUCCESS:
      return {
        ...state,
        loading: false,
        other_possible_matches: action.payload.other_possible_matches
      };

    case EDIT_OPM_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case GET_SINGLE_DEAL:
      return {
        ...state,
        ...INITIAL_STATE,
        loading: true,
        error: ''
      };
    case GET_SINGLE_DEAL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case GET_SINGLE_DEAL_SUCCESS:
      return {
        ...state,
        loading: false,
        info: {
          ...action.payload.info,
          image: state.info.image != "" ? state.info.image : action.payload.info.image
        },
        owner: action.payload.owner,
        more_info: action.payload.more_info ? action.payload.more_info : INITIAL_STATE.more_info,
        other_possible_matches: action.payload.other_possible_matches,
        property_tags: action.payload.tags,
        edit_property_tags: action.payload.tags,
        toggle_tags: false,
        all_statuses: action.payload.all_statuses,
        purchase_price: action.payload.purchase_price,
        purchase_exit_strategy: action.payload.purchase_exit_strategy,
        purchase_profit: action.payload.purchase_profit,
        purchase_notes: action.payload.purchase_notes
      };
    case UPDATE_HOUSE:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case UPDATE_HOUSE_LOCAL:
      return {
        ...state,
        info:{
          ...state.info,
          [action.payload.prop]: action.payload.value
        }
      };
    case UPDATE_HOUSE_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.payload.info.id == state.info.id ? {
          ...action.payload.info,
          image: state.info.image != "" ? state.info.image : action.payload.info.image
        } : state.info,
        owner: action.payload.info.id == state.info.id ? action.payload.owner : state.owner,
        more_info: action.payload.info.id == state.info.id ? action.payload.more_info ? action.payload.more_info : INITIAL_STATE.more_info : state.more_info,
        other_possible_matches: action.payload.info.id == state.info.id ? action.payload.other_possible_matches : state.other_possible_matches,
        property_tags: action.payload.info.id == state.info.id ? action.payload.tags : state.property_tags,
        edit_property_tags: action.payload.info.id == state.info.id ? action.payload.tags : state.edit_property_tags,
        toggle_tags: false
      };

    case GOOGLE_STREET_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.payload.deal_id == state.info.id ? {
          ...state.info,
          image: action.payload.image,
          from_google_street_view: 1
        } : state.info
      };

    case UPDATE_HOUSE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case OTHER_POSSIBLE_MATCHES_TOGGLE:
      return {
        ...state,
        other_possible_matches_toggle: action.payload
      };
    case SELECT_EDIT_PHOTO:
      return {
        ...state,
        upload_photo:{
          ...state.upload_photo,
          source: action.payload
        },
        info:{
          ...state.info,
          image: action.payload.uri
        }
      }
    case UPLOAD_EDIT_PHOTO:
      return {
        ...state,
        upload_photo:{
          ...state.upload_photo,
          uploading: true,
          error: ''
        }

      }
    case UPLOAD_EDIT_PHOTO_SUCCESS:
      return {
        ...state,
        upload_photo:{
          ...state.upload_photo,
          uploading: false,
          uploaded: true,
          use_full: true
        },
        info:{
          ...state.info,
          image: action.payload.image
        }
      }
    case UPLOAD_EDIT_PHOTO_FAIL:
      return {
        ...state,
        upload_photo:{
          ...state.upload_photo,
          uploading: false,
          progress: 0,
          error: action.payload
        }

      }
    case UPLOAD_EDIT_PROGRESS:
      return {
        ...state,
        upload_photo:{
          ...state.upload_photo,
          progress: action.payload.progress
        }
      }
    case UPLOAD_EDIT_ANIMATION:
      return{
        ...state,
        upload_photo:{
          ...state.upload_photo,
          uploaded_animation: true
        }
      }
    case TRIGGER_LOOKUP:
      return {
        ...state,
        trigger_lookup: action.payload
      };
    case SELECT_STATE:
      return {
        ...state,
        editHouse:{
          ...state.editHouse,
          owner_address_state: action.payload.state
        }
      };
    case HIDE_CTA:

      return {
        ...state,
        info:{
          ...state.info,
          hide_cta: 1
        }
      };
    case TOGGLE_EDIT_TAGS:
      return {
        ...state,
        toggle_tags: action.payload,
        edit_property_tags: state.property_tags
      };
    case EDIT_PROPERTY_TAGS:
      return {
        ...state,
        edit_property_tags: action.payload
      };
    case TOGGLE_ALL_ADDRESSES_SUCCESS:
      return {
        ...state,
        owner:{
          ...state.owner,
          use_owner_address: 1
        }
      };

    case CREATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        editHouse:{
          ...state.editHouse,
          mail_template_id: action.payload.new_template_id,
          mail_template_name: action.payload.new_template_title,
        }
      };


    default:
      return state;
  }
}
