import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usersReducer from './userReducer';
import authReducer from './authReducer';
import generalInfoReducer from './generalInfoReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  general_info: generalInfoReducer,
  modal: modalReducer,
  form: formReducer,
});

export default rootReducer;
