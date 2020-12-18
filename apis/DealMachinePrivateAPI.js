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

  const checkApiVersion = () => api.get('check-api-version/', {
    device: AppConfig().device,
    platform: AppConfig().platform,
    app_version: AppConfig().app_version
  })

  /* maps api query wrappers*/
  const mapsSearchPlace = (token, text) => api.get('private/maps/search-place/', {
    token: token,
    query: text
  });

  const mapsAutoComplete = (token, input, location, latitude, longitude) => api.get('private/maps/auto-complete/', {
    token: token,
    input:input,
    location: location,
    latitude: latitude,
    longitude: longitude
  });


  const mapsPlaceDetails = (token, placeid) => api.get('private/maps/place-details/', {
    token: token,
    placeid: placeid
  });

  const mapsReverseGeocode = (token, latitude, longitude) => api.get('private/maps/reverse-geocode/', {
    token: token,
    latitude: latitude,
    longitude: longitude
  });

  const validateAddress = (token, address1, address2, city, state, zip) => api.get('private/validate-address/', {
    token: token,
    address1: address1,
    address2: address2,
    city: city,
    state: state,
    zip: zip
  });

  const textLink = (token, phone_number) => api.post('private/text-link/', {
    token: token,
    phone_number: phone_number
  });

  const generatePreviewImages = ({token, url, deal_id = 0, template_id = 0, html_template_id = 0, save_info = 0}) => api.get('preview/generate-images/', {
    token: token,
    url: url,
    deal_id: deal_id,
    template_id: template_id,
    html_template_id: html_template_id,
    save_info: save_info
  });

  const generateStreetViewImage = ({token, deal_id}) => api.get('preview-street-view/generate-images/', {
    token: token,
    deal_id: deal_id
  });

  const getPartnerFromPromo = ({promo}) => api.get('private/get-partner-from-promo/', {
    promo
  });

  const properties = ({token, bounds, dont_include}) => api.get('property/map/', {
    token: token,
    type: "bounds",
    westLng: bounds.westLng,
    southLat: bounds.southLat,
    eastLng: bounds.eastLng,
    northLat: bounds.northLat,
    centerLat: bounds.centerLat,
    centerLng: bounds.centerLng,
    dont_include: dont_include
  });

  return {
    checkApiVersion,
    mapsSearchPlace,
    mapsAutoComplete,
    mapsPlaceDetails,
    mapsReverseGeocode,
    textLink,
    validateAddress,
    generatePreviewImages,
    generateStreetViewImage,
    getPartnerFromPromo,
    properties

  }
}


export default {
  create
}
