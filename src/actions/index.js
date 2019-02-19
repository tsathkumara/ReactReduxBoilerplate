//= ===============================
// Server Instance
//= ===============================

//===== Dev ===== //
export const API_URL = 'http://dev3.apppartner.com/Reactors/scripts';
//===== Staging ===== //
// export const API_URL = 'http://dev3.apppartner.com/Reactors/scripts/';
//===== Production ===== //
// export const API_URL = 'http://dev3.apppartner.com/Reactors/scripts/';

export const queryString = require('query-string');
export const SALT_A = "Superior";
export const SALT_B = "Boisterious";

//= ===============================
// Utility actions
//= ===============================

export function createError(message) {
  return { data: {message} }
}

export function errorHandler(dispatch, error, type) {
  console.log("ERROR:" + error);
  console.log("TYPE:" + type);

  error = !!error ? error : createError("UNKNOWN ERROR")

  dispatch({
    type: type,
    payload: error,
  });
}

//= ===============================
// Static Content actions
//= ===============================
