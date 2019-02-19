import React from 'react';
import { connect } from 'react-redux';

/** Modal Components */
import LoginModal from '../Auth/Login';
import SignupModal from '../Auth/Signup';
import ForgotPasswordModal from '../Auth/ForgotPassword';

/** Modal Type Constants */
import {
  LOGIN_MODAL,
  SIGNUP_MODAL,
  FORGOT_PASSWORD_MODAL } from '../../constants/ModalTypes';

const MODAL_COMPONENTS = {
  [LOGIN_MODAL]: LoginModal,
  [SIGNUP_MODAL]: SignupModal,
  [FORGOT_PASSWORD_MODAL]: ForgotPasswordModal,
}

const ModalContainer = (props) => {
  if (!props.modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[props.modalType];

  return <SpecificModal />;
}

const mapStateToProps = state => {
  return {
    modalType: state.modal.modalType
  }
}

export default connect(mapStateToProps)(ModalContainer);
