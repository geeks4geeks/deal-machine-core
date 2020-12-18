import apisauce from 'apisauce'

const googleJS = (baseURL = 'https://maps.googleapis.com/maps/api/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
    },
    timeout: 10000
  })

  const reverseGeocode = (key, latlng) => api.get('geocode/json',{
	  key:key,
	  latlng:latlng
  })

  const placeAutoComplete = (key, input, location) => api.get('place/autocomplete/json',{
	  key:key,
	  input:input,
    location: location,
    language: "en",
    limit: 3
  })

  const getPlaceDetails = (key, placeid) => api.get('place/details/json', {
    key: key,
    placeid: placeid
  });

  const searchPlace = (key, text) => api.get('place/textsearch/json', {
    key: key,
    query: text
  });


  return {
    reverseGeocode,
    getPlaceDetails,
    placeAutoComplete,
    searchPlace
  }
}


const ipAPI = (baseURL = 'https://ipapi.co/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
    },
    timeout: 10000
  })

  const ipLocation = () => api.get('json');

  return {
    ipLocation
  }
}

export default {
  googleJS, ipAPI
}
