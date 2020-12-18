import {
  LOGOUT,
  SET_LOCATION,
  REGION_CHANGE,
  ADDRESS_SEARCH_CHANGED,
  TOGGLE_ADDRESS_SEARCH,
  GET_LOCATIONS,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAIL,
  REVERSE_GEOCODE,
  REVERSE_GEOCODE_FAIL,
  REVERSE_GEOCODE_SUCCESS,
  GET_PLACE_DETAILS,
  GET_PLACE_DETAILS_FAIL,
  GET_PLACE_DETAILS_SUCCESS,
  RESET_LOCATION,
  TOGGLE_IS_SEARCHED,
  SEARCH_PLACE,
  SEARCH_PLACE_FAIL,
  SEARCH_PLACE_SUCCESS,
  MANUAL_ADDRESS_FIELD_CHANGE,
  SELECT_STATE,
  ENTER_MANUAL_ADDRESS,
  ENTER_MANUAL_ADDRESS_SUCCESS,
  ENTER_MANUAL_ADDRESS_FAIL,
  TOGGLE_MAP_TYPE,
  TOGGLE_REGION_CHANGE,
  TOGGLE_INVALID_ADDRESS,
  TOGGLE_INVALID_REVERSE,
  INIT_MAP_EDIT,
  RESET_MAP_EDIT,

  SET_ACTIVE_DEAL,
  SET_PIN,
  REMOVE_PIN,
  NEW_DEAL_SUCCESS,
  NEW_DEAL_FAIL,

  CENTER_LOCATION,
  LOCK_LOCATION_TRACKING,

  REDRAW_MARKERS,

  SET_LOCATION_ALLOWED,
  SET_ACTIVE_PROPERTY
} from 'app/DealMachineCore/types';

const INITIAL_STATE = {
  region: {
    latitude: null,
    longitude: null,
    center: {
     latitude: null,
     longitude: null,
    },
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
    altitude: 0,
    heading: 0,
    pitch: 0,
    zoom: 17.5
  },
  region_toggle: false,
  invalid_address: false,
  invalid_reverse: false,
  address:'',
  is_searched: false,
  toggle_search: false,
  map_loading: false,
  zoomIndex: null,
  map_error: '',
  locations: [],
  map_type: 'standard',
  manual_address:{
    address: '',
    address2: '',
    city: '',
    state: '',
    zipcode: ''
  },
  manual_location:{
    lat: null,
    lng: null
  },

  mapEdit:{
    editing: false,
    deal_id: null,
    address: '',
    lat: null,
    long: null
  },
  pin_dropped: false,
  pin: {
    lat: null,
    lng: null
  },

  lock_location_tracking: false,
  is_center: false,
  current_location:{
    lat: null,
    lng: null
  },
  redraw_marker_ids: null,
  locationAllowed: false

}

export default (state = INITIAL_STATE, action) => {

  switch(action.type){
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };
    case SET_PIN:
      return {
        ...state,
        pin_dropped: true,
        pin: {
          lat: action.payload.latitude,
          lng: action.payload.longitude
        }
      };
    break;

    case CENTER_LOCATION:
      return{
        ...state,
        is_center: action.payload.toggle,
        current_location: {
          lat: action.payload.toggle && action.payload.coords ? action.payload.coords.latitude : state.current_location.lat,
          lng: action.payload.toggle && action.payload.coords ? action.payload.coords.longitude : state.current_location.lng
        }
      }
    case LOCK_LOCATION_TRACKING:
      return{
        ...state,
        lock_location_tracking: action.payload,
        is_center: true
      }

    case REMOVE_PIN:
    case NEW_DEAL_SUCCESS:
    case NEW_DEAL_FAIL:

      return {
        ...state,
        pin_dropped: false,
        pin: {
          lat: null,
          lng: null
        }
      };
    break;

    case RESET_LOCATION:
      return{
        ...state,
        address: '',
        search: '',
        region: {
          latitude: null,
          longitude: null,
          center: {
           latitude: null,
           longitude: null,
          },
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
          heading: 0,
          pitch: 0,
          zoom: 16
        },
        region_toggle: false,
        invalid_address: false,
        map_error: ''
      };
    case SET_LOCATION:


      return {
        ...state,
        address: action.payload.address ? action.payload.address : state.address,
        search: action.payload.address ? action.payload.address : state.address,
        region:{
          ...state.region,
          latitude: action.payload.lat ? parseFloat(action.payload.lat) : state.region.latitude,
          longitude: action.payload.long ? parseFloat(action.payload.long) : state.region.longitude,
          center: {
            latitude: action.payload.lat ? parseFloat(action.payload.lat) : state.region.latitude,
            longitude: action.payload.long ? parseFloat(action.payload.long) : state.region.longitude
          },
          latitudeDelta: state.region.latitudeDelta,
          longitudeDelta: state.region.longitudeDelta,
          heading: action.payload.heading ? parseFloat(action.payload.heading) : state.region.heading,
          pitch: state.region.pitch,
          zoom: state.region.zoom
        }
      }
    case SET_ACTIVE_DEAL:
      return{
        ...state,
        address: action.payload.deal ? action.payload.deal.address : state.address,
        search: action.payload.deal ? action.payload.deal.address : state.address,
        region:{
          ...state.region,
          latitude: action.payload.deal && !state.lock_location_tracking ? parseFloat(action.payload.deal.lat) : state.region.latitude,
          longitude: action.payload.deal && !state.lock_location_tracking ? parseFloat(action.payload.deal.long) : state.region.longitude,
          center: {
            latitude: action.payload.deal && !state.lock_location_tracking ? parseFloat(action.payload.deal.lat) : state.region.latitude,
            longitude: action.payload.deal && !state.lock_location_tracking ? parseFloat(action.payload.deal.long) : state.region.longitude
          },
          latitudeDelta: state.region.latitudeDelta,
          longitudeDelta: state.region.longitudeDelta,
          heading: state.region.heading,
          pitch: state.region.pitch,
          zoom: state.region.zoom
        }
      };
    case REGION_CHANGE:
      return {
        ...state,
        region:action.payload
      }
    case TOGGLE_ADDRESS_SEARCH:
      return {
        ...state,
        toggle_search: action.payload,
        search: action.payload ? state.address : state.search,
        locations: [],
        map_error: !action.payload ? '' : state.error,
        map_loading: !action.payload ? false : state.map_loading
      }
    case ADDRESS_SEARCH_CHANGED:

      return {
        ...state,
        search: action.payload
      }
    case GET_LOCATIONS:
      return {
        ...state,
        locations: [],
        //map_loading: true,
        map_error: ''
      }
    case GET_LOCATIONS_FAIL:
      return {
        ...state,
        //map_loading: false,
        map_error: action.payload
      }
    case GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        //map_loading: false,
        locations: action.payload.locations
      }
    case TOGGLE_IS_SEARCHED:
      return {
        ...state,
        is_searched: action.payload
      }

    case REVERSE_GEOCODE:
      return {
        ...state,
        map_loading: true,
        map_error: ''
      }
    case REVERSE_GEOCODE_FAIL:
      return {
        ...state,
        map_loading: false,
        map_error: action.payload,
        manual_location:{
          lat: null,
          lng: null
        }
      }
    case REVERSE_GEOCODE_SUCCESS:
      return {
        ...state,
        map_loading: false,
        address: action.payload.address ? action.payload.address : state.address,
        manual_location:{
          lat: action.payload.location.lat,
          lng: action.payload.location.lng
        },
        search: action.payload.address ? action.payload.address : state.search,
        manual_address: action.payload.address_data ? action.payload.address_data : state.manual_address
      }

    case SEARCH_PLACE:
      return {
        ...state,
        //map_loading: true,
        map_error: ''
      }
    case SEARCH_PLACE_FAIL:
      return {
        ...state,
        //map_loading: false,
        map_error: action.payload
      }
    case SEARCH_PLACE_SUCCESS:

      return {
        ...state,
        //map_loading: false,
        toggle_search: false,
        address: action.payload.address,

        search: action.payload.address,
        is_searched: true,
        region:{
          ...state.region,
          latitude: action.payload.lat,
          longitude: action.payload.long,
          center: {
            latitude: action.payload.lat,
            longitude: action.payload.long
          },
          latitudeDelta: 0.002,
          longitudeDelta: 0.002
        },
        manual_address: action.payload.address_data
      }

    case GET_PLACE_DETAILS:
      return {
        ...state,
        //map_loading: true,
        map_error: ''
      }
    case GET_PLACE_DETAILS_FAIL:
      return {
        ...state,
      //  map_loading: false,
        map_error: action.payload
      }
    case GET_PLACE_DETAILS_SUCCESS:

      return {
        ...state,
        address: action.payload.address,
        search: action.payload.address,
        is_searched: true,
        region:{
          ...state.region,
          latitude: action.payload.lat,
          longitude: action.payload.long,
          center: {
            latitude: action.payload.lat,
            longitude: action.payload.long
          },
          latitudeDelta: state.region.latitudeDelta,
          longitudeDelta: state.region.longitudeDelta,
          heading: state.region.heading,
          pitch: state.region.pitch,
          zoom: state.region.zoom
        },
        pin_dropped: true,
        pin: {
          lat: action.payload.lat,
          lng: action.payload.long
        },
        region_toggle: true
      }
    case MANUAL_ADDRESS_FIELD_CHANGE:
      return {
        ...state,
        manual_address:{
          ...state.manual_address,
          [action.payload.prop]: action.payload.value
        }
      };
    case SELECT_STATE:
      return {
        ...state,
        manual_address:{
          ...state.manual_address,
          state: action.payload.state
        }
      };
    case ENTER_MANUAL_ADDRESS:
      return {
        ...state,
        map_loading: true,
        map_error: ''
      };
    case ENTER_MANUAL_ADDRESS_FAIL:
      return {
        ...state,
        map_loading: false,
        map_error: action.payload
      };

    case ENTER_MANUAL_ADDRESS_SUCCESS:
      return {
        ...state,
        map_loading: false,
        toggle_search: false,
        address: action.payload.address,
        search: action.payload.address,
        is_searched: true,
        region:{
          ...state.region,
          latitude: action.payload.lat,
          longitude: action.payload.long,
          center: {
            latitude: action.payload.lat,
            longitude: action.payload.long
          },
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
          heading: 0,
          pitch: 0,
          zoom: 16
        }
      };
    case TOGGLE_MAP_TYPE:
      return {
        ...state,
        map_type: action.payload
      };
    case TOGGLE_REGION_CHANGE:
      return {
        ...state,
        search: action.payload == true ? "" : state.search,
        region_toggle: action.payload
      };
    case TOGGLE_INVALID_ADDRESS:
      return{
        ...state,
        invalid_address: action.payload
      };

    case TOGGLE_INVALID_REVERSE:
      return{
        ...state,
        search: action.payload == true ? "" : state.search,
        invalid_reverse: action.payload,
        map_loading: false
      };

    case INIT_MAP_EDIT:
      return{
        ...state,
        mapEdit: action.payload.mapEdit
      };
    case RESET_MAP_EDIT:
      return{
        ...state,
        mapEdit: INITIAL_STATE.mapEdit
      };

    case REDRAW_MARKERS:
      return{
        ...state,
        redraw_marker_ids: action.payload
      };

    case SET_LOCATION_ALLOWED:
      return{
        ...state,
        locationAllowed: action.payload
      };
    case SET_ACTIVE_PROPERTY:
      return{
        ...state,
        manual_address: action.payload.property ? {
          address: action.payload.property.property_address,
          address2: action.payload.property.property_address2,
          city: action.payload.property.property_address_city,
          state: action.payload.property.property_address_state,
          zipcode: action.payload.property.property_address_zip
        } : state.manual_address
      }

    default:
      return state;
  }
}
