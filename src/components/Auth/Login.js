import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { emailLogin } from '../../actions/authActions';
import { clearErrors } from '../../actions/globalActions';
import { loadModal, hideModal } from '../../actions/modalActions';
import { SIGNUP_MODAL, FORGOT_PASSWORD_MODAL } from '../../constants/ModalTypes';
import Modal from '../Modal/Modal';

import Facebook from './Facebook';
import ReqenderField from '../Utility/RenderField';

import './style.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText:"Login In with Facebook"
    };
    this.onClose = this.onClose.bind(this);
    this.showSignUpModal = this.showSignUpModal.bind(this);
    this.showForgotPasswordModal = this.showForgotPasswordModal.bind(this);
  }

  onClose() {
    this.props.hideModal();
  }

  checkErrorAlert() {
    this.props.clearErrors();
  }

  showSignUpModal() {
    this.props.loadModal(SIGNUP_MODAL);
  }

  handleFormSubmit(formProps) {
    this.props.emailLogin(formProps);
  }

  showForgotPasswordModal() {
    this.checkErrorAlert();
    this.props.loadModal(FORGOT_PASSWORD_MODAL);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger" role="alert">
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }

    if(this.props.successMessage) {
      return (
        <div className="alert alert-success" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>{this.props.successMessage}</strong>
        </div>
      );
    }
  }

  render() {
    const dialogStyle = {
      backgroundColor: '#fff',
      minWidth: '500px'
    };

    const { handleSubmit } = this.props;

    return (
      <Modal
        onClose={this.onClose}
        dialogStyle={dialogStyle}
        >
        <div className="col-xs-10 col-xs-offset-1">
          <div className="modal-header">
            <h4 className="modal-title">Login</h4>
          </div>
          <div className="modal-body">
            <div className="control-group">
              <Facebook btnText={this.state.btnText} />
            </div>
            <div className="control-group text-center spacer-20">
              <h5>OR</h5>
            </div>
            <form id="login" className="spacer-40" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Field name="email"
                type="email"
                component={ReqenderField}
                label="Email"
                tabindex="1"
              />
              <Field name="password"
                type="password"
                component={ReqenderField}
                label="Password"
                tabindex="2"
              />
              <div className="pull-right">
                <p className="text-right"><a className="modal-sub-link" onClick={this.showForgotPasswordModal}>Forgot Password</a></p>
              </div>
              <div className="control-group spacer-40">
                <button type="submit"
                  className="btn btn-primary btn-block">
                  Log In
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <p className="text-center">Don't have an account?   <a className="modal-link" onClick={this.showSignUpModal}>Sign Up</a></p>
          </div>
        </div>
      </Modal>
    );
  }
}

const validate = (formProps) => {
  const errors = {};
  if(!formProps.email) {
    errors.email = 'Required';
  } else if(formProps.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address';
  }
  if(!formProps.password) {
    errors.password = 'Required';
  }
  return errors;
}

const form = reduxForm({
  form: 'login',
  fields: [
    'email',
    'password'
  ],
  validate
});

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
    successMessage: state.auth.success,
  }
}

export default connect(mapStateToProps, { loadModal, hideModal, emailLogin, clearErrors })(form(Login));
