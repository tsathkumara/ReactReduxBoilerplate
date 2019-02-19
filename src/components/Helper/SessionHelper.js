import { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

class SessionHelper extends Component {

  static currentUser() {
    return SessionHelper.getValueForKey('user');
  }

  static isLoggedIn() {
    return !!SessionHelper.currentUser()
  }

  static userDict(user_data) {
    const dict = {};
    dict.user_id = user_data.user_id;
    dict.user_fb_id = user_data.user_fb_id;
    dict.user_first_name = user_data.user_first_name;
    dict.user_last_name = user_data.user_last_name;
    dict.user_email = user_data.user_email;

    SessionHelper.setDataForKey(dict, 'user');
    SessionHelper.setToken(user_data.user_token);
  }

  static setToken(token) {
    return SessionHelper.setDataForKey(token, 'token');
  }

  static getToken(token) {
    return  SessionHelper.getValueForKey('token');
  }

  static setDataForKey(data, key) {
    cookie.save(key, data, { path: '/' });
    sessionStorage.setItem(key, data);
  }

  static getValueForKey(key) {
    const loadedObject = cookie.load(key);
    if(loadedObject) {
      return loadedObject;
    }
    return sessionStorage.getItem(key);
  }

  static clear() {
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });
    sessionStorage.clear();
  }

  static clearValueForKey(key) {
    cookie.remove(key, { path: '/' });
    sessionStorage.removeItem(key);
  }
}

export default connect()(SessionHelper);
