import axios from 'axios';
import { API_URL, errorHandler } from './index';
import { FETCH_GENERAL_INFO, API_ERROR, CLEAR_SUCCESS, CLEAR_ERRORS } from '../constants/ActionTypes';

//= ===============================
// Global actions
//= ===============================
export function fetchGeneralInfo() {
  return function (dispatch) {
    axios.post(`${API_URL}/fetch-users.php`)
    .then((response) => {
      dispatch({
        type: FETCH_GENERAL_INFO,
        payload: response,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, API_ERROR)
    });
  };
}

export function clearSuccess() {
  return function(dispatch) {
      dispatch({
        type: CLEAR_SUCCESS,
        payload: null,
      });
  }
}
export function clearErrors() {
  return function(dispatch) {
      dispatch({
        type: CLEAR_ERRORS,
        payload: null,
      });
  }
}
