import {
  LOGOUT,
  LOGIN_USER_SUCCESS,
  UPDATE_ROUTE_TIMER,
  GET_ROUTES,
  REFRESH_ROUTES,
  LOAD_MORE_ROUTES,
  GET_ROUTES_FAIL,
  GET_ROUTES_SUCCESS,
  LOAD_MORE_ROUTES_SUCCESS,
  TOGGLE_SHOW_ROUTES,
  ACKNOWLEDGE_END_ROUTE,
  REFRESH_MAP_PROPERTIES,
  ADD_DEAL_SUCCESS,
  GET_MAP_PROPERTIES_SUCCESS,
  START_TRACKED_ROUTE,
  START_TRACKED_ROUTE_SUCCESS,
  START_TRACKED_ROUTE_FAIL,
  UPDATE_TRACKED_ROUTE,
  UPDATE_TRACKED_ROUTE_FAIL,
  UPDATE_TRACKED_ROUTE_SUCCESS,
  UPDATE_CURRENT_ROUTE_SECTION,
  END_TRACKED_ROUTE,
  END_TRACKED_ROUTE_FAIL,
  END_TRACKED_ROUTE_SUCCESS,
  REMOVE_TRACKED_ROUTE,
  REMOVE_TRACKED_ROUTE_FAIL,
  REMOVE_TRACKED_ROUTE_SUCCESS,
  INIT_EDIT_ROUTE_FILTERS,
  UPDATE_ROUTE_FILTER,
  UPDATE_SINGLE_ROUTE_FILTER,
  EDIT_ROUTE_FILTER,
  SAVE_ROUTE_FILTERS,

  SELECT_ACTIVE_ROUTE,
  GET_ROUTE_PROPERTIES,
  REFRESH_ROUTE_PROPERTIES,
  GET_ROUTE_PROPERTIES_FAIL,
  GET_ROUTE_PROPERTIES_SUCCESS,

  UPDATE_LEAD_SUCCESS,
  UPDATE_OWNER_INFO_SUCCESS,

  ROUTE_PROPERTIES_TOGGLE_TAB,
  SAVE_CARD_SUCCESS,

  TOGGLE_DRIVING_IMAGES,

  GET_PROPERTY_WITH_ROUTE_INFO,
  GET_PROPERTY_WITH_ROUTE_INFO_FAIL,
  GET_PROPERTY_WITH_ROUTE_INFO_SUCCESS,

} from "app/DealMachineCore/types";

import moment from "moment";

import { combineArrays } from "app/NativeActions";

const checkDrivingBillingAddon = billing => {
  if (billing.plan_modules) {
    const plan_modules = billing.plan_modules;
    for (var i = 0; i < plan_modules.length; i++) {
      if (plan_modules[i].module_type == "driving") {
        if (
          plan_modules[i].tier > 1
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

const updateProperty = (originalProperty, newProperties) => {
  for(var i = 0; i<newProperties.length; i++){
    if(originalProperty.property_id == newProperties[i].property_id){
      return {
        ...newProperties[i],
        highlighted: originalProperty.highlighted,
        deal:{
          ...newProperties[i].deal,
          image: originalProperty.deal ? originalProperty.deal.image : ""
        }
      };
    }
  }
  return originalProperty;
}

const INITIAL_STATE = {
  current_route: null,
  current_route_section: {
    coordinates: [],
    start_time: null
  },
  save_route_loading: false,

  current_route_id: 0,

  end_route_info: null,

  routes: [],
  map_routes: [],
  route_loading: false,
  route_error: "",
  route_refreshing: false,
  route_loaded_all: false,
  route_limit: 25,
  route_begin: 0,
  track_route: false,
  total_time: "0:00:00",
  total_miles: "0.00",
  total_deals_added: 0,

  show_routes: false,
  originalRouteFilters: {
    route_team_member: "none",
    route_team_member_title: "Everyone",
    start_date: null,
    end_date: null
  },
  route_filters: {
    route_team_member: "none",
    route_team_member_title: "Everyone",
    start_date: null,
    end_date: null
  },
  editRouteFilters: {},

  active_route: null,
  route_properties: [],
  route_properties_loading: false,
  route_properties_error: "",
  route_properties_begin: 0,
  route_properties_refreshing: false,
  route_properties_loaded_all: false,
  route_properties_limit: 25,

  route_properties_toggle_tab: "map",

  toggle_driving_images: true,

  prev_and_next_properties_loading: false,
  prev_property_in_route: null,
  next_property_in_route: null

};

const calculateTime = start_time => {
  var utc_time = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  var ms = moment(utc_time, "YYYY-MM-DD HH:mm:ss").diff(
    moment(start_time, "YYYY-MM-DD HH:mm:ss")
  );
  var d = moment.duration(ms);
  var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

  return s;
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE
      };

    case UPDATE_ROUTE_TIMER:
      return {
        ...state,
        total_time: state.current_route
          ? calculateTime(state.current_route.start_time)
          : "0:00:00"
      };

    case ADD_DEAL_SUCCESS:
      return {
        ...state,
        total_deals_added: state.current_route ? state.total_deals_added + 1 : 0
      };

    case ACKNOWLEDGE_END_ROUTE:
      return {
        ...state,
        current_route: null,
        end_route_info: null
      };

    case REMOVE_TRACKED_ROUTE_SUCCESS:
      return {
        ...state,
        active_route: null,
        routes: state.routes.filter(
          ({ route_id, route_type }) =>
            route_id != action.payload.route_id ||
            route_type != action.payload.route_type
        ),
        map_routes: state.map_routes.filter(
          ({ route_id, route_type }) =>
            route_id != action.payload.route_id ||
            route_type != action.payload.route_type
        )
      };

    case GET_ROUTES:
    case REFRESH_ROUTES:
      return {
        ...state,
        routes: [],
        route_loading: true,
        route_refreshing: false,
        route_error: "",
        route_loaded_all: false,
        route_begin: 0
      };
    case LOAD_MORE_ROUTES:
      return {
        ...state,
        route_loading: true,
        route_refreshing: false,
        route_error: "",
        route_loaded_all: true
      };

    case GET_ROUTES_FAIL:
      return {
        ...state,
        route_loading: false,
        route_refreshing: false,
        route_error: action.payload
      };

    case REFRESH_MAP_PROPERTIES:
      return {
        ...state,
        map_routes: []
      };

    case GET_ROUTES_SUCCESS:
      return {
        ...state,
        routes: action.payload.routes,
        route_loading: false,
        route_refreshing: false,
        route_loaded_all: action.payload.routes.length < state.route_limit,
        route_begin: state.route_begin + action.payload.routes.length
      };

    case LOAD_MORE_ROUTES_SUCCESS:
      return {
        ...state,
        routes: state.routes.concat(action.payload.routes),
        route_loading: false,
        route_refreshing: false,
        route_loaded_all: action.payload.routes.length < state.route_limit,
        route_begin: state.route_begin + action.payload.routes.length
      };

    case GET_MAP_PROPERTIES_SUCCESS:
      return {
        ...state,
        map_routes: action.payload.routes ? action.payload.routes : state.map_routes
      };

    case TOGGLE_SHOW_ROUTES:
      return {
        ...state,
        show_routes: action.payload
      };
    case LOGIN_USER_SUCCESS:
    case SAVE_CARD_SUCCESS:
      return {
        ...state,
        show_routes: action.payload.billing
          ? checkDrivingBillingAddon(action.payload.billing)
          : false
      };


    case START_TRACKED_ROUTE:
      return {
        ...state,
        save_route_loading: true
      };

    case UPDATE_TRACKED_ROUTE:
      return {
        ...state,
        save_route_loading: true
      };
    case END_TRACKED_ROUTE:
      return {
        ...state,
        save_route_loading: true
      };

    case START_TRACKED_ROUTE_FAIL:
    case UPDATE_TRACKED_ROUTE_FAIL:
    case END_TRACKED_ROUTE_FAIL:
      return {
        ...state,
        save_route_loading: false,
        track_route: false,
        current_route: null,
        current_route_section: {
          coordinates: [],
          start_time: null
        }
      };

    case START_TRACKED_ROUTE_SUCCESS:
      return {
        ...state,
        save_route_loading: false,
        track_route: true,
        total_deals_added: 0,
        current_route: action.payload.routes
          ? action.payload.routes.length > 0
            ? action.payload.routes[0]
            : null
          : null
      };

    case UPDATE_TRACKED_ROUTE_SUCCESS:
      return {
        ...state,
        save_route_loading: false,
        current_route: action.payload.routes
          ? action.payload.routes.length > 0
            ? action.payload.routes[0]
            : null
          : null,
        current_route_section: {
          coordinates: [],
          start_time: null
        }
      };

    case END_TRACKED_ROUTE_SUCCESS:
      return {
        ...state,
        save_route_loading: false,
        track_route: false,
        current_route: null,
        current_route_section: {
          coordinates: [],
          start_time: null
        },
        end_route_info: action.payload.routes
          ? action.payload.routes.length > 0
            ? action.payload.routes[0]
            : null
          : null,
        total_deals_added: 0
      };

    case UPDATE_CURRENT_ROUTE_SECTION:
      return {
        ...state,
        total_miles: action.payload.total_miles ? action.payload.total_miles : state.total_miles,
        current_route_section: {
          start_time: action.payload.start_time,
          coordinates: action.payload.coordinates
        }
      };

    case INIT_EDIT_ROUTE_FILTERS:
      return {
        ...state,
        editRouteFilters: state.route_filters
      };

    case SAVE_ROUTE_FILTERS:
      return {
        ...state,
        route_filters: state.editRouteFilters
      };

    case INIT_EDIT_ROUTE_FILTERS:
      return {
        ...state,
        editRouteFilters: state.route_filters
      };

    case UPDATE_ROUTE_FILTER:
      return {
        ...state,
        editRouteFilters: {
          ...state.editRouteFilters,
          [action.payload.prop]: action.payload.value
        }
      };

    case UPDATE_SINGLE_ROUTE_FILTER:
      return {
        ...state,
        route_filters: {
          ...state.route_filters,
          [action.payload.prop]: action.payload.value
        }
      };
    case SELECT_ACTIVE_ROUTE:
      return {
        ...state,

        active_route: action.payload,
        route_properties: [],
        route_properties_loading: false,
        route_properties_refreshing: false,
        route_properties_error: "",
        route_properties_loaded_all: false,
        route_properties_begin: 0
      };

    case REFRESH_ROUTE_PROPERTIES:
      return {
        ...state,
        route_properties: [],
        route_properties_loading: true,
        route_properties_refreshing: false,
        route_properties_error: "",
        route_properties_loaded_all: false,
        route_properties_begin: 0
      };
    case GET_ROUTE_PROPERTIES:
      return {
        ...state,
        route_properties_loading: true,
        route_properties_refreshing: false,
        route_properties_error: "",
        route_properties_loaded_all: true
      };

    case GET_ROUTE_PROPERTIES_FAIL:
      return {
        ...state,
        route_properties_loading: false,
        route_properties_refreshing: false,
        route_properties_error: action.payload
      };

    case GET_ROUTE_PROPERTIES_SUCCESS:
      return {
        ...state,
        active_route: action.payload.route ? action.payload.route : state.active_route,

        route_properties: state.route_properties.concat(action.payload.properties),
        route_properties_loading: false,
        route_properties_refreshing: false,
        route_properties_loaded_all: action.payload.properties.length < state.route_properties_limit,
        route_properties_begin: state.route_properties_begin + action.payload.properties.length
      };

    case UPDATE_LEAD_SUCCESS:
      return{
        ...state,
        route_properties: state.route_properties.map(
           (property, i) => updateProperty(property, action.payload.properties)
        )
      }

    case UPDATE_OWNER_INFO_SUCCESS:
      return{
        ...state,
        route_properties: action.payload.properties ? state.route_properties.map(
           (property, i) => updateProperty(property, action.payload.properties)
        ) : state.route_properties
      }

    case ROUTE_PROPERTIES_TOGGLE_TAB:
      return{
        ...state,
        route_properties_toggle_tab: action.payload
      }

    case TOGGLE_DRIVING_IMAGES:
      return{
        ...state,
        toggle_driving_images: action.payload
      }

    case GET_PROPERTY_WITH_ROUTE_INFO:
      return{
        ...state,
        prev_and_next_properties_loading: true,
        prev_property_in_route: null,
        next_property_in_route: null
      }
    case GET_PROPERTY_WITH_ROUTE_INFO_FAIL:
      return{
        ...state,
        prev_and_next_properties_loading: false
      }
    case GET_PROPERTY_WITH_ROUTE_INFO_SUCCESS:
      return{
        ...state,
        prev_and_next_properties_loading: false,
        prev_property_in_route: action.payload.prev_property,
        next_property_in_route: action.payload.next_property
      }

    default:
      return state;
  }
};
