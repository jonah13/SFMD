/**
 * @type {string}
 */
const API_TOKEN = 'wHQgTE2hulzUHubY0WTZTNXHU';

/**
 * Endpoint url.
 * @enum {string}
 */
const URI = {
  BASE: 'https://data.sfgov.org/resource/wwmu-gmzc.json'
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
  URI: Object.freeze(URI),
  PAGINATION: Object.freeze(PAGINATION)
});
