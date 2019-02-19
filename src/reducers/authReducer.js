import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, API_ERROR} from '../constants/ActionTypes'

const INITIAL_STATE = { error: '', warning: '', success:'', content: '', authenticated: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', success:'', warning: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, warning: action.payload, authenticated: false  };
    case AUTH_ERROR:
      return { ...state, error: action.payload.data.message, success:'', warning: '' };
    case API_ERROR:
        return { ...state, error: action.payload.data.message, success:'', warning: '' };
    default:
      return state;
  }
}
