import {environment} from '../../environments/environment';
/**
 * APIs
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
 * how long until we update movies data in LS from OMDB
 * @type {number}
 */
const LS_EXPIRATION = 30*24*60*60; //30 days in seconds

/**
 * assets path, change accordingly for dev/prod
 * @type {string}
 */
const ASSETS_PATH = environment.production ? '/assignment' : '';

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
  LS_EXPIRATION: Object.freeze(LS_EXPIRATION),
  ASSETS_PATH: Object.freeze(ASSETS_PATH),
  PAGINATION: Object.freeze(PAGINATION)
});
