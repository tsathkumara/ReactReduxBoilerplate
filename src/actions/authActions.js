import axios from 'axios';
import { push } from 'react-router-redux';
import crypto from 'crypto-js';

import { API_URL, errorHandler, queryString, SALT_A, SALT_B } from './index';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FORGOT_PASSWORD_REQUEST } from '../constants/ActionTypes';

import SessionHelper from '../components/Helper/SessionHelper';

//= ===============================
// Authentication actions
//= ===============================

export function emailLogin({ email, password, remember_me }) {
  return function(dispatch) {
    axios.post(`${API_URL}/email-login.php`,
                        queryString.stringify({
                            user_email: email,
                            user_password: password
                        }))
    .then((response) => {
      dispatch({
        type: AUTH_USER,
        payload: response.data,
      });
      dispatch(push('/dashboard'));
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function register(props) {
  return function(dispatch) {
    axios.post(`${API_URL}/email-signup.php`,
                          queryString.stringify({
                            first_name: props.first_name,
                            last_name: props.last_name,
                            email: props.email,
                            password: props.password,
                          }))
    .then((response) => {
      dispatch({
        type: AUTH_USER,
        payload: response.data,
      });
      dispatch(push('/dashboard'));
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}


export function facebookLogin(props) {
  return function(dispatch) {
    axios.post(`${API_URL}/login-with-facebook.php`,
                        queryString.stringify({
                            user_fb_id: props.id,
                            user_email: props.email,
                            security_check: crypto.SHA256(SALT_A + props.id + SALT_B)
                        }))
    .then((response) => {
      SessionHelper.userDict(response.data);
      dispatch({
        type: AUTH_USER,
        payload: response.data,
      });
      dispatch(push('/dashboard'));
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function logoutUser(error) {
  return function (dispatch) {
    dispatch({
      type: UNAUTH_USER,
      payload: 'You have been logged out',
    });
    dispatch(push('/login'));
  };
}

export function sendForgotPasswordEmail(props) {
  return function (dispatch) {
    axios.post(`${API_URL}/send-forgot-password-email.php`,
                          queryString.stringify({
                            email: props.email
                          }))
    .then((response) => {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
        payload: response.data,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, UNAUTH_USER);
    });
  };
}
