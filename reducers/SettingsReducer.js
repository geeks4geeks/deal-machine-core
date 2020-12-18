import {
  LOGOUT,
  ADDRESS_INIT,
  ADDRESS_FIELD_CHANGE,
  UPDATE_RETURN_ADDRESS,
  UPDATE_RETURN_ADDRESS_FAIL,
  UPDATE_RETURN_ADDRESS_SUCCESS,
  RESET_SETTINGS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_PHOTO_TYPE,
  INIT_UPDATE_USER,
  UPDATE_USER_FIELD_CHANGE,
  SELECT_STATE,
  SELECT_PROFILE_PHOTO,
  UPLOAD_PROFILE_PHOTO,
  UPLOAD_PROFILE_PHOTO_SUCCESS,
  UPLOAD_PROFILE_PHOTO_FAIL,
  UPLOAD_PROFILE_PROGRESS,
  UPLOAD_PROFILE_ANIMATION,

  SELECT_SIGNATURE_PHOTO,
  UPLOAD_SIGNATURE_PHOTO,
  UPLOAD_SIGNATURE_PHOTO_SUCCESS,
  UPLOAD_SIGNATURE_PHOTO_FAIL,
  UPLOAD_SIGNATURE_PROGRESS,
  UPLOAD_SIGNATURE_ANIMATION,

  SELECT_DEFAULT_SENDING_OPTIONS,
  SET_EDIT_RETURN_LOCATION,

  CREATE_TEMPLATE_SUCCESS,

  SIGNATURE_INIT,
  SET_DARK_MODE,
  SET_PHOTO_CAMERAROLL,

  UPLOAD_LIST_SUCCESS,
  UPLOAD_LIST_MAPPING_SUCCESS,
  EDIT_BULK_UPLOAD_INFO


} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  return_address:{
    address: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
  },
  loading: false,
  photoCameraRoll: false,
  map_style: null,
  error: '',
  photo_type: "camera",
  editUser: {},
  upload_list_info: null,
  upload_photo:{
    source: null,
    location: "",
    uploading: false,
    uploaded: false,
    uploaded_animation: false,
    progress: 0,
    error: "",
    use_full: false,
    did_upload: false
  },
  edit_return_location: null,
  states:[
    {
        "name": "Alabama",
        "abbr": "AL"
    },
    {
        "name": "Alaska",
        "abbr": "AK"
    },
    {
        "name": "American Samoa",
        "abbr": "AS"
    },
    {
        "name": "Arizona",
        "abbr": "AZ"
    },
    {
        "name": "Arkansas",
        "abbr": "AR"
    },
    {
        "name": "California",
        "abbr": "CA"
    },
    {
        "name": "Colorado",
        "abbr": "CO"
    },
    {
        "name": "Connecticut",
        "abbr": "CT"
    },
    {
        "name": "Delaware",
        "abbr": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbr": "DC"
    },
    {
        "name": "Florida",
        "abbr": "FL"
    },
    {
        "name": "Georgia",
        "abbr": "GA"
    },
    {
        "name": "Guam",
        "abbr": "GU"
    },
    {
        "name": "Hawaii",
        "abbr": "HI"
    },
    {
        "name": "Idaho",
        "abbr": "ID"
    },
    {
        "name": "Illinois",
        "abbr": "IL"
    },
    {
        "name": "Indiana",
        "abbr": "IN"
    },
    {
        "name": "Iowa",
        "abbr": "IA"
    },
    {
        "name": "Kansas",
        "abbr": "KS"
    },
    {
        "name": "Kentucky",
        "abbr": "KY"
    },
    {
        "name": "Louisiana",
        "abbr": "LA"
    },
    {
        "name": "Maine",
        "abbr": "ME"
    },
    {
        "name": "Maryland",
        "abbr": "MD"
    },
    {
        "name": "Massachusetts",
        "abbr": "MA"
    },
    {
        "name": "Michigan",
        "abbr": "MI"
    },
    {
        "name": "Minnesota",
        "abbr": "MN"
    },
    {
        "name": "Mississippi",
        "abbr": "MS"
    },
    {
        "name": "Missouri",
        "abbr": "MO"
    },
    {
        "name": "Montana",
        "abbr": "MT"
    },
    {
        "name": "Nebraska",
        "abbr": "NE"
    },
    {
        "name": "Nevada",
        "abbr": "NV"
    },
    {
        "name": "New Hampshire",
        "abbr": "NH"
    },
    {
        "name": "New Jersey",
        "abbr": "NJ"
    },
    {
        "name": "New Mexico",
        "abbr": "NM"
    },
    {
        "name": "New York",
        "abbr": "NY"
    },
    {
        "name": "North Carolina",
        "abbr": "NC"
    },
    {
        "name": "North Dakota",
        "abbr": "ND"
    },
    {
        "name": "Ohio",
        "abbr": "OH"
    },
    {
        "name": "Oklahoma",
        "abbr": "OK"
    },
    {
        "name": "Oregon",
        "abbr": "OR"
    },
    {
        "name": "Pennsylvania",
        "abbr": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbr": "PR"
    },
    {
        "name": "Rhode Island",
        "abbr": "RI"
    },
    {
        "name": "South Carolina",
        "abbr": "SC"
    },
    {
        "name": "South Dakota",
        "abbr": "SD"
    },
    {
        "name": "Tennessee",
        "abbr": "TN"
    },
    {
        "name": "Texas",
        "abbr": "TX"
    },
    {
        "name": "Utah",
        "abbr": "UT"
    },
    {
        "name": "Vermont",
        "abbr": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbr": "VI"
    },
    {
        "name": "Virginia",
        "abbr": "VA"
    },
    {
        "name": "Washington",
        "abbr": "WA"
    },
    {
        "name": "West Virginia",
        "abbr": "WV"
    },
    {
        "name": "Wisconsin",
        "abbr": "WI"
    },
    {
        "name": "Wyoming",
        "abbr": "WY"
    },
    {
        "name": "Armed Forces",
        "abbr": "AE"
    },
    {
        "name": "Armed Forces America",
        "abbr": "AA"
    },
    {
        "name": "Armed Forces Pacific",
        "abbr": "AP"
    }
  ],
  select_default_sending_options: false,
  notification: [],

  dark_mode: "dark_mode_off",
  dark_mode_colors: {
    white_color: "rgba(255, 255, 255, 0.87)",
    card_color: "#323F4B",
    card_button_color: "#bdbdbd",

    white_text_color: "rgba(255, 255, 255, 0.6)",


    text_color: "rgba(255, 255, 255, 0.6)",
    text_button_color: "#323F4B",
    light_text_color: "rgba(255, 255, 255, 0.37)",

    title_color: "rgba(255, 255, 255, 0.87)",

    dot_color:"#192129",

    active_color: "#028FA3",

    gradient_color_1: "#323F4B",
    gradient_color_2: "#323F4B",
    gradient_button_color_1: "#028FA3",
    gradient_button_color_2: "#00A9A9",

    gradient_color_1_opacity: "rgba(30, 30, 30, 0.85)",
    gradient_color_2_opacity: "rgba(30, 30, 30, 0.85)",

    side_gradient_color_1: "#192129",
    side_gradient_color_2: "#192129",

    success_color: "#00897B",
    success_card_color: "#00897B",
    error_color: "#B24C63",
    error_card_color: "#B24C63",

    yellow_color: "#ff8f00",
    yellow_card_color: "#ff8f00",

    border_color: "#192129",

    background_color: "#1F2933",
    light_grey_color: "#192129",
    light_gray_color: "#192129",
    grey_color: "#192129",
    gray_color: "#192129"

  },
  regular_colors:{
    white_color: "#ffffff",
    card_color: "#ffffff",
    card_button_color: "#ffffff",

    white_text_color: "#ffffff",


    text_color: "#627C81",
    text_button_color: "#627C81",

    light_text_color: "#b1b1b1",

    title_color: "#324B50",
    dot_color: "#324B50",

    active_color: "#31cce5",

    gradient_color_1: "#31CCE5",
    gradient_color_2: "#4EE8C3",
    gradient_button_color_1: "#31CCE5",
    gradient_button_color_2: "#4EE8C3",

    gradient_color_1_opacity: "rgba(49, 204, 229, 0.85)",
    gradient_color_2_opacity: "rgba(29, 219, 217, 0.85)",

    side_gradient_color_1: "#324b50",
    side_gradient_color_2: "#30706e",

    success_color: "#4EE8C3",
    success_card_color: "#4EE8C3",
    error_color: "#B24C63",
    error_card_color: "#B24C63",

    yellow_color: "#ff8f00",
    yellow_card_color: "#ff8f00",

    border_color: "#eeeeee",

    background_color: "#f7f7f7",
    light_grey_color: "#eeeeee",
    light_gray_color: "#eeeeee",
    grey_color: "#eeeeee",
    gray_color: "#eeeeee"
  },
  colors: {
    white_color: "#ffffff",
    card_color: "#ffffff",
    card_button_color: "#ffffff",

    white_text_color: "#ffffff",


    text_color: "#627C81",
    text_button_color: "#627C81",

    light_text_color: "#b1b1b1",

    title_color: "#324B50",
    dot_color: "#324B50",

    active_color: "#31cce5",

    gradient_color_1: "#31CCE5",
    gradient_color_2: "#4EE8C3",
    gradient_button_color_1: "#31CCE5",
    gradient_button_color_2: "#4EE8C3",

    gradient_color_1_opacity: "rgba(49, 204, 229, 0.85)",
    gradient_color_2_opacity: "rgba(29, 219, 217, 0.85)",

    side_gradient_color_1: "#324b50",
    side_gradient_color_2: "#30706e",

    success_color: "#4EE8C3",
    success_card_color: "#4EE8C3",
    error_color: "#B24C63",
    error_card_color: "#B24C63",

    yellow_color: "#ff8f00",
    yellow_card_color: "#ff8f00",

    border_color: "#eeeeee",

    background_color: "#f7f7f7",
    light_grey_color: "#eeeeee",
    light_gray_color: "#eeeeee",
    grey_color: "#eeeeee",
    gray_color: "#eeeeee"

  }
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case RESET_SETTINGS:
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      }
    break;
    case ADDRESS_FIELD_CHANGE:
      return {
        ...state,
        return_address:{
          ...state.return_address,
          [action.payload.prop]: action.payload.value
        }
      };
    case ADDRESS_INIT:
      return {
        ...state,
        return_address: action.payload.return_address,
      }
    case UPDATE_RETURN_ADDRESS:
      return {
        ...state,
        error: '',
        loading: true
      };
    case UPDATE_RETURN_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_RETURN_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        return_address:{
          ...state.return_address,
          address: action.payload.address,
          address2: action.payload.address2,
          city: action.payload.address_city,
          state: action.payload.address_state,
          zipcode: action.payload.address_zip,
          phone: action.payload.phone
        }
      };
    case SELECT_STATE:
      return {
        ...state,
        return_address:{
          ...state.return_address,
          state: action.payload.state
        }
      };
    case UPDATE_USER:
      return {
        ...state,
        error: '',
        loading: true,
        error: ''
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        editUser: {
          ...state.editUser,
          password: ''
        }
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications:action.payload.notifications
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        editUser: {
          ...state.editUser,
          password: '',
          new_password: '',
          new_password_confirm: ''
        },
        notifications:action.payload.notifications
      };
    case UPDATE_PHOTO_TYPE:
      return{
        ...state,
        photo_type: action.payload
      }
    case INIT_UPDATE_USER:
      return{
        ...state,
        editUser: action.payload.user,
        upload_photo: INITIAL_STATE.upload_photo
      }
    case SIGNATURE_INIT:
      return{
        ...state,
        upload_photo: INITIAL_STATE.upload_photo
      }
    case UPDATE_USER_FIELD_CHANGE:
      return {
        ...state,
        editUser:{
          ...state.editUser,
          [action.payload.prop]: action.payload.value
        }
      };
    case SELECT_PROFILE_PHOTO:
      return {
        ...state,
        upload_photo:{
          ...state.upload_photo,
          source: action.payload
        },
        editUser:{
          ...state.editUser,
          image: action.payload.uri
        }
      };
    case SELECT_SIGNATURE_PHOTO:
      return {
        ...state,
        upload_photo:{
          ...state.upload_photo,
          source: action.payload
        }
      }
    case UPLOAD_PROFILE_PHOTO:
    case UPLOAD_SIGNATURE_PHOTO:
      return {
        ...state,
        upload_photo:{
          ...state.upload_photo,
          uploading: true,
          error: ''
        }

      }

    case UPLOAD_PROFILE_PHOTO_SUCCESS:
      return {
        ...state,
        upload_photo:{
          ...state.upload_photo,
          uploading: false,
          uploaded: true,
          did_upload: true,
          use_full: true,
          location: action.payload
        },
        editUser:{
          ...state.editUser,
          image: action.payload
        }
      }
    case UPLOAD_SIGNATURE_PHOTO_SUCCESS:

      return {
        ...state,
        upload_photo:{
          ...state.upload_photo,
          uploading: false,
          uploaded: true,
          did_upload: true,
          use_full: true,
          location: action.payload
        }
      }
    case UPLOAD_PROFILE_PHOTO_FAIL:
    case UPLOAD_SIGNATURE_PHOTO_FAIL:
      return {
        ...state,
        upload_photo:{
          ...state.upload_photo,
          uploading: false,
          progress: 0,
          error: action.payload
        }

      };
    case UPLOAD_PROFILE_PROGRESS:
    case UPLOAD_SIGNATURE_PROGRESS:
      return {
        ...state,
        upload_photo:{
          ...state.upload_photo,
          progress: action.payload
        }
      };
    case UPLOAD_PROFILE_ANIMATION:
    case UPLOAD_SIGNATURE_ANIMATION:
      return{
        ...state,
        upload_photo:{
          ...state.upload_photo,
          uploaded_animation: true
        }
      };
    case SELECT_DEFAULT_SENDING_OPTIONS:
      return{
        ...state,
        select_default_sending_options: action.payload
      };
    case SET_EDIT_RETURN_LOCATION:
      return{
        ...state,
        edit_return_location: action.payload
      }

    case SET_DARK_MODE:
      return {
        ...state,
        dark_mode: action.payload,
        colors: action.payload == "dark_mode" ? state.dark_mode_colors : state.regular_colors
      };

    case SET_PHOTO_CAMERAROLL:

      return{
        ...state,
        photoCameraRoll: action.payload,
      }

    case CREATE_TEMPLATE_SUCCESS:

      return{
        ...state,
        editUser:{
          ...state.editUser,
          default_template_id: action.payload.new_template_id,
          default_template_name: action.payload.new_template_title,
        }

      }

    case UPLOAD_LIST_SUCCESS:

      return{
        ...state,
        upload_list_info: action.payload
      }
    case UPLOAD_LIST_MAPPING_SUCCESS:
      return{
        ...state,
        upload_list_info: null
      }
    case EDIT_BULK_UPLOAD_INFO:
      return{
        ...state,
        upload_list_info: {
          ...state.upload_list_info,
          [action.payload.prop]: action.payload.value
        }
      }
    default:
      return state;
  }
}
