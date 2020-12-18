import {
  TRIGGER_LOGOUT,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  IS_LOADING,
  SET_LOCATION,
  REGION_CHANGE,
  ADDRESS_SEARCH_CHANGED,
  TOGGLE_ADDRESS_SEARCH,
  GET_LOCATIONS,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAIL,
  REVERSE_GEOCODE,
  REVERSE_GEOCODE_SUCCESS,
  REVERSE_GEOCODE_FAIL,
  GET_PLACE_DETAILS,
  GET_PLACE_DETAILS_SUCCESS,
  GET_PLACE_DETAILS_FAIL,
  RESET_LOCATION,
  TOGGLE_IS_SEARCHED,
  SEARCH_PLACE,
  SEARCH_PLACE_FAIL,
  SEARCH_PLACE_SUCCESS,
  MANUAL_ADDRESS_FIELD_CHANGE,
  ENTER_MANUAL_ADDRESS,
  ENTER_MANUAL_ADDRESS_SUCCESS,
  ENTER_MANUAL_ADDRESS_FAIL,
  NEW_DEAL,
  NEW_DEAL_FAIL,
  NEW_DEAL_SUCCESS,
  UPDATE_HOUSE,
  UPDATE_HOUSE_SUCCESS,
  UPDATE_HOUSE_FAIL,
  TOGGLE_MAP_TYPE,
  TOGGLE_REGION_CHANGE,
  TOGGLE_INVALID_ADDRESS,
  TOGGLE_INVALID_REVERSE,
  INIT_MAP_EDIT,
  RESET_MAP_EDIT,
  INIT_HOUSE,
  RELOAD_PREVIEWS,

  SET_TRACKING_EVENT,
  SET_ACTIVE_DEAL,
  TRIGGER_LOOKUP,
  SET_PIN,
  REMOVE_PIN,

  LOCK_LOCATION_TRACKING,
  CENTER_LOCATION,

  REDRAW_MARKERS,

  SET_LOCATION_ALLOWED
} from 'app/DealMachineCore/types';

import GoogleAPI from 'app/DealMachineCore/apis/GoogleMapsAPI';
import API from 'app/DealMachineCore/apis/DealMachineAPI';
import PrivateAPI from 'app/DealMachineCore/apis/DealMachinePrivateAPI';

import moment from 'moment';

import { appRedirect, AppConfig } from 'app/NativeActions';
import { newDeal } from 'app/NativeActions';

const dm_private_api = PrivateAPI.create();
const api = GoogleAPI.googleJS();
const dm_api = API.create();


export const redrawMarkers = (marker_ids) => {
  return {
    type: REDRAW_MARKERS,
    payload: marker_ids
  };
}

export const initMapEdit = ({mapEdit}) => {
  return {
    type: INIT_MAP_EDIT,
    payload: { mapEdit }
  };
}

export const resetMapEdit = () => {
  return {
    type: RESET_MAP_EDIT
  };
}

export const manualAddressFieldChanged = ({ prop, value }) => {
  return {
    type: MANUAL_ADDRESS_FIELD_CHANGE,
    payload: { prop, value }
  };
};

export const toggleRegionChange = (toggle) => {
  return {
    type: TOGGLE_REGION_CHANGE,
    payload: toggle
  };
}

export const toggleInvalidAddress = (toggle) => {
  return {
    type: TOGGLE_INVALID_ADDRESS,
    payload: toggle
  };
}


export const toggleMapType = (map_type) => {
  return {
    type: TOGGLE_MAP_TYPE,
    payload: map_type
  };
};


export const setPin = ({latitude, longitude}) => {
  return {
    type: SET_PIN,
    payload: {latitude, longitude}
  };
}

export const removePin = () => {
  return {
    type: REMOVE_PIN
  };
}

export const lockLocationTracking = (toggle) => {
  return{
    type: LOCK_LOCATION_TRACKING,
    payload: toggle
  }
}

export const centerLocation = (toggle, coords) => {
  return{
    type: CENTER_LOCATION,
    payload: {toggle, coords}
  }
}


export const resetLocation = () => {
  return {
    type: RESET_LOCATION
  };
};

export const setLocation = ({lat, long, heading, address}) => {

  return {
    type: SET_LOCATION,
    payload: {lat, long, heading, address}
  };
};

export const regionChange = (region) => {
  return {
    type: REGION_CHANGE,
    payload: region
  };
};

export const toggleIsSearched = (toggle) => {
  return {
    type: TOGGLE_IS_SEARCHED,
    payload: toggle
  };
};

export const addressSearchChanged = (search) => {
  return {
    type: ADDRESS_SEARCH_CHANGED,
    payload: search
  };
};
export const toggleAddressSearch = (toggle) => {
  return {
    type: TOGGLE_ADDRESS_SEARCH,
    payload: toggle
  };
};


export const getLocations = ({ token, input = "", location = null, latitude, longitude }) => {
  return (dispatch) => {

    dispatch({ type: GET_LOCATIONS });

    dm_private_api.mapsAutoComplete(token, input, location, latitude, longitude)
    .then(response => {

      if(response.problem != null){
        getLocationsFail(dispatch, response.problem);

      }else if(response.data.error != false){
        //getLocationsFail(dispatch, response.problem);

      }else{
        getLocationsSuccess(dispatch, response.data.results);
      }
    });

  }
};


const getLocationsFail = (dispatch, error) => {
  dispatch({ type: GET_LOCATIONS_FAIL, payload: error });
}

const getLocationsSuccess = (dispatch, locations) => {
  dispatch({
    type: GET_LOCATIONS_SUCCESS,
    payload: {locations}
  });
}


export const reverseGeocode = ({ token, latitude, longitude }) => {
  return (dispatch) => {

    dispatch({ type: REVERSE_GEOCODE });

    dm_private_api.mapsReverseGeocode(token, latitude, longitude)
      .then(response => {

        if(response.problem != null){
          reverseGeocodeFail(dispatch, response.problem);
        }else if(response.data.results.status){
          if(response.data.results.status != "OK"){
            //reverseGeocodeFail(dispatch, response.data.error);
          }else{
            if(response.data.results.location_type != "RANGE_INTERPOLATED"){

              if(response.data.results.address_data.address && response.data.results.address_data.address != "" && response.data.results.address_data.address != " "){
                dispatch({ type: TOGGLE_INVALID_REVERSE, payload: false });
                reverseGeocodeSuccess(
                  dispatch,
                  response.data.results.full_address,
                  response.data.results.address_data,
                  response.data.results.bounds,
                  response.data.results.location,
                  response.data.results.property,

                );

              }else{
                dispatch({ type: TOGGLE_INVALID_REVERSE, payload: true });
              }
            }else{
              dispatch({ type: TOGGLE_INVALID_REVERSE, payload: true });
            }

          }
        }
      })
  };
};

const extractFromAddress = (components, type) =>{
    for (var i=0; i<components.length; i++){
        for (var j=0; j<components[i].types.length; j++){
          if (components[i].types[j]==type && type != "administrative_area_level_1"){
            return components[i].long_name
          }else if(components[i].types[j]==type && type == "administrative_area_level_1"){
            return components[i].short_name
          }
        }
    }
    return "";
}

export const addressData = ({address}) => {
  let address_data = {
    address: extractFromAddress(address, "street_number")+" "+extractFromAddress(address, "route"),
    address2: '',
    city: extractFromAddress(address, "locality"),
    state: extractFromAddress(address, "administrative_area_level_1"),
    zipcode: extractFromAddress(address, "postal_code")
  }
  return address_data;
}


const reverseGeocodeFail = (dispatch, error) => {
  dispatch({ type: REVERSE_GEOCODE_FAIL, payload: error });
}

const reverseGeocodeSuccess = (dispatch, address, address_data, bounds, location, property) => {

  var adrs = removeLastInstance(", USA", address);

  dispatch({
    type: REVERSE_GEOCODE_SUCCESS,
    payload: {address: adrs, address_data, bounds, location, property}
  });
}

/*
export const getPlaceDetails = ({ token, placeid }) => {
  return (dispatch) => {
    dispatch({ type: GET_PLACE_DETAILS });

    dm_private_api.mapsPlaceDetails(token, placeid)
    .then(response => {

      if(response.problem != null){
        getPlaceDetailsFail(dispatch, response.problem);
      }else if(response.data.error != false){
        //getPlaceDetailsFail(dispatch, response.data.error);
      }else{
        let address_data = addressData({address: response.data.results.address_components});
        getPlaceDetailsSuccess(dispatch, {address: response.data.results.formatted_address, lat: response.data.results.geometry.location.lat, long: response.data.results.geometry.location.lng, address_data});
      }
    });

  }
};
*/

export const getPlaceDetails = ({ token, placeid, is_google, address_data, description, lat, lng, property }) => {
  return (dispatch) => {
    if(is_google){
      dispatch({ type: GET_PLACE_DETAILS });

      dm_private_api.mapsPlaceDetails(token, placeid)
      .then(response => {
        if(response.problem != null){
          getPlaceDetailsFail(dispatch, response.problem);
        }else if(response.data.error != false){
          //getPlaceDetailsFail(dispatch, response.data.error);
        }else{
          getPlaceDetailsSuccess(dispatch, {
            address: response.data.results.full_address,
            lat: response.data.results.location.lat,
            long: response.data.results.location.lng,
            address_data: response.data.results.address_data,

          });
        }
      });

    }else{
      dispatch({ type: GET_PLACE_DETAILS });


      getPlaceDetailsSuccess(dispatch, {address: description, lat: lat, long: lng, address_data, property});

    }

  }



};




const getPlaceDetailsFail = (dispatch, error) => {
  dispatch({ type: GET_PLACE_DETAILS_FAIL, payload: error });
}

const getPlaceDetailsSuccess = (dispatch, {address, lat, long, address_data, property}) => {

  var adrs = removeLastInstance(", USA", address);

  dispatch({
    type: GET_PLACE_DETAILS_SUCCESS,
    payload: {address: adrs, lat, long, address_data, property}
  });
}




export const searchPlace = ({ text }) => {
  return (dispatch) => {

    dispatch({ type: SEARCH_PLACE });

    const key = AppConfig().google_api;
    api.searchPlace(key, text)
      .then(response => {

        if(response.problem != null){
          searchPlaceFail(dispatch, response.problem);
        }else if(response.data.status){
          if(response.data.status != "OK"){
            //searchPlaceFail(dispatch, response.data.error);
          }else{

            if(response.data.results){
              if(response.data.results.length > 0){
                let address_data = addressData({address: response.data.results[0].address_components});
                searchPlaceSuccess(dispatch, {address: text, lat: response.data.results[0].geometry.location.lat, long: response.data.results[0].geometry.location.lng, address_data});
              }else{
                searchPlaceFail(dispatch, 'No results found.');
              }
            }else{
              searchPlaceFail(dispatch, 'No results found.');
            }
          }
        }
      })
  };
};


const searchPlaceFail = (dispatch, error) => {
  dispatch({ type: SEARCH_PLACE_FAIL, payload: error });
}

const searchPlaceSuccess = (dispatch, {address, lat, long, address_data}) => {

    var adrs = removeLastInstance(", USA", address);

  dispatch({
    type: SEARCH_PLACE_SUCCESS,
    payload: {address: adrs, lat, long, address_data}
  });
}



export const enterManualAddress = ({ token, manual_address, image, deal_id }) => {
  return (dispatch) => {
    dispatch({type: IS_LOADING, payload: true});
    dispatch({ type: ENTER_MANUAL_ADDRESS });

    const key = AppConfig().google_api;

    if(manual_address.address != ''){
      if(manual_address.city != ''){
        if(manual_address.state != ''){
          if(manual_address.zipcode != ''){

            var address;
            if(manual_address.address2.trim() != ""){
              address = manual_address.address+" "+manual_address.address2+", "+manual_address.city+", "+manual_address.state+" "+manual_address.zipcode+", USA";
            }else{
              address = manual_address.address+", "+manual_address.city+", "+manual_address.state+" "+manual_address.zipcode+", USA";
            }


            dm_private_api.mapsSearchPlace(token, address)
            .then(response => {

              if(response.problem != null){
                enterManualAddressFail(dispatch, response.problem);

              }else if(response.data.error != false){
                enterManualAddressFail(dispatch, 'Cannot find this address.');
                if(response.data.valid == "invalid"){
                  dispatch({ type: TRIGGER_LOGOUT, payload: true });
                }
              }else{
                if(response.data.results){
                  enterManualAddressSuccess(dispatch, {address, lat: response.data.results.lat, long: response.data.results.lng});

                  if(deal_id){
                    updateHouse({dispatch, token, deal_id, type: "property_address", payload:{address, address1: manual_address.address, address2: manual_address.address2, city: manual_address.city, state: manual_address.state, zip: manual_address.zipcode, lat: response.data.results.lat, long: response.data.results.lng }})
                  }else{
                    /*
                    if(image){
                      newDeal({dispatch, token, image, lat: response.data.results.geometry.location.lat, long: response.data.results.geometry.location.lng, address, address1: manual_address.address, address2: manual_address.address2, city: manual_address.city, state: manual_address.state, zip: manual_address.zipcode});
                    }else{
                    */

                    dispatch({
                      type: REVERSE_GEOCODE_SUCCESS,
                      payload: {
                        location: {
                          lat: response.data.results.lat,
                          lng: response.data.results.lng,
                        }
                      }
                    });



                    newDeal({
                      dispatch,
                      token,
                      type: "manual",
                      lat: response.data.results.lat,
                      long: response.data.results.lng,
                      address,
                      address1: manual_address.address,
                      address2: manual_address.address2,
                      city: manual_address.city,
                      state: manual_address.state,
                      zip: manual_address.zipcode
                    });
                    //}
                  }

                }else{
                  enterManualAddressFail(dispatch, 'Cannot find this address.');
                }
              }
            })



          }else{
            enterManualAddressFail(dispatch, 'Please enter a zipcode.');

          }
        }else{
          enterManualAddressFail(dispatch, 'Please select a state.');

        }
      }else{
        enterManualAddressFail(dispatch, 'Please enter an city.');

      }
    }else{
      enterManualAddressFail(dispatch, 'Please enter an address.');

    }

  }
}

const enterManualAddressFail = (dispatch, error) => {
  dispatch({ type: ENTER_MANUAL_ADDRESS_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
}

const enterManualAddressSuccess = (dispatch, {address, lat, long}) => {


  dispatch({type: IS_LOADING, payload: false});

  dispatch({
    type: ENTER_MANUAL_ADDRESS_SUCCESS,
    payload: {address, lat, long}
  });
}


const updateHouse = ({dispatch, token, deal_id, type, payload }) => {
  dispatch({type: IS_LOADING, payload: true});
  dispatch({type: UPDATE_HOUSE});


  dm_api.editDeal(token, deal_id, type, payload)
    .then(response => {
      if(response.problem != null){
        updateHouseFail(dispatch, response.problem);
      }else if(response.data.error != false){
        updateHouseFail(dispatch, response.data.error);
        if(response.data.valid == "invalid"){
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        updateHouseSuccess(dispatch, response.data.results.deals, response.data.results.change_log, response.data.results.billing, response.data.results.badges, type);
      }
    });
};

const removeLastInstance = (badtext, str) => {
    var charpos = str.lastIndexOf(badtext);
    if (charpos<0) return str;
    var ptone = str.substring(0,charpos);
    var pttwo = str.substring(charpos+(badtext.length));
    return (ptone+pttwo);
}


const updateHouseFail = (dispatch, error) => {
  dispatch({ type: UPDATE_HOUSE_FAIL, payload: error });
}

const updateHouseSuccess = (dispatch, deals, change_log, billing, badges, type) => {

  dispatch({type: IS_LOADING, payload: false});

  var deal = null;
  if(deals.length > 0){
    deal = deals[0];
  }

  appRedirect({dispatch, redirect: "goBack", payload: {type: "deal_double", id: deal.id}});


  dispatch({
    type: UPDATE_HOUSE_SUCCESS,
    payload: {
      deal:deal,
      info: deal,
      owner: {
        owner_name: deal.owner_name,
        owner_address: deal.owner_address,
        owner_address2: deal.owner_address2,
        owner_address_city: deal.owner_address_city,
        owner_address_state: deal.owner_address_state,
        owner_address_zip: deal.owner_address_zip,
        use_owner_address: deal.use_owner_address
      },
      more_info: deal.more_info ? deal.more_info : null,
      other_possible_matches: deal.other_possible_matches,
      tags: deal.tags,
      billing: billing,
      badges: badges
    }
  });

  dispatch({
    type: RELOAD_PREVIEWS,
    payload:{
      date: moment().format("X"),
      reload: true,
      reloadId: [deal.id]
    }
  })


  dispatch({ type: TRIGGER_LOOKUP, payload: true });


  switch(type){

    case "property_address":

      dispatch({
        type: SUCCESS_MESSAGE,
        payload: {message: "You've successfully updated the property address.", title: "Success!", change_log: change_log}
      });

    break;

  }
}

export const setLocationAllowed = (toggle) => {
  return{
    type: SET_LOCATION_ALLOWED,
    payload: toggle
  }
}
/*
const newDeal = ({ dispatch, token, type, image = "", lat, long, address, address1, address2, city, state, zip }) => {

  dispatch({type: IS_LOADING, payload: true});
  dispatch({ type: NEW_DEAL });
  dispatch({ type: SET_TRACKING_EVENT, payload: "mapNewDeal" });

  dm_api.newDeal(token, image, lat, long, address, address1, address2, city, state, zip)
    .then(response => {
      if(response.problem != null){
        newDealFail(dispatch, response.problem);
      }else if(response.data.error != false){
        newDealFail(dispatch, response.data.error);
        if(response.data.valid == "invalid"){
          dispatch({ type: TRIGGER_LOGOUT, payload: true });
        }
      } else {
        newDealSuccess(dispatch, response.data.results.deal, response.data.results.all_tags, type);
      }
    });
};


const newDealFail = (dispatch, error) => {
  dispatch({ type: NEW_DEAL_FAIL, payload: error });
  dispatch({
    type: ERROR_MESSAGE,
    payload: {message: error, title: "Error"}
  });
  dispatch({ type: SET_TRACKING_EVENT, payload: "mapNewDealFail" });

}

const newDealSuccess = (dispatch, deal, all_tags, type) => {
  dispatch({type: IS_LOADING, payload: false});
  dispatch({
    type: NEW_DEAL_SUCCESS,
    payload: {deal, all_tags}
  });

  dispatch({
    type: INIT_HOUSE,
    payload: {
      info: deal,
      owner: {
        owner_name: deal.owner_name,
        owner_address: deal.owner_address,
        owner_address2: deal.owner_address2,
        owner_address_city: deal.owner_address_city,
        owner_address_state: deal.owner_address_state,
        owner_address_zip: deal.owner_address_zip,
        use_owner_address: deal.use_owner_address
      },
      tags: deal.tags,
      more_info: deal.more_info ? deal.more_info : null,
      other_possible_matches: deal.other_possible_matches
    }
  });



  switch(type){
    case "manual":

      dispatch({ type: SET_TRACKING_EVENT, payload: "mapManualNewDealSuccess" });
      appRedirect({dispatch, redirect: "goBack", payload:{type: "deals"}});

      //look up owner
      dispatch({
        type: SET_ACTIVE_DEAL,
        payload: {deal}
      })
      dispatch({
        type: TRIGGER_LOOKUP,
        payload: true
      });
      dispatch({
        type: TOGGLE_REGION_CHANGE,
        payload: true
      });



    break;

    default:
    case "map":

      dispatch({ type: SET_TRACKING_EVENT, payload: "mapNewDealSuccess" });
      dispatch({ type: TRIGGER_LOOKUP, payload: true });

    break;
  }


}
*/
