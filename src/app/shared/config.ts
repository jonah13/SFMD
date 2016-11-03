/**
 * @type {string}
 */
const API_TOKEN = 'wHQgTE2hulzUHubY0WTZTNXHU';
const GEOCODING_API_TOKEN = 'AIzaSyCvbIi4gZ_iXJHLKziAelDbvyrEo2tpeu4';
const MAP_API_TOKEN = 'AIzaSyCtY0AbZQl3PF27ouucS_Dp76cieNHVR3M';


/**
 * Endpoint url.
 * @enum {string}
 */
const URI = {
  BASE: 'https://data.sfgov.org/resource/wwmu-gmzc.json',
  GOOGLE_GEOCODING: 'https://maps.googleapis.com/maps/api/geocode/json?key='+GEOCODING_API_TOKEN,
  OMDB: 'http://www.omdbapi.com'
};

/**
 * Number of items per page in pagination
 * @type {number}
 */
const PAGINATION = {
  ITEMS: 50
};

/**
 * Freezes the object.
 * @const {Object}
 */
export const CONFIG = Object.freeze({
  API_TOKEN: Object.freeze(API_TOKEN),
  GEOCODING_API_TOKEN: Object.freeze(GEOCODING_API_TOKEN),
  MAP_API_TOKEN: Object.freeze(MAP_API_TOKEN),
  URI: Object.freeze(URI),
  PAGINATION: Object.freeze(PAGINATION)
});
