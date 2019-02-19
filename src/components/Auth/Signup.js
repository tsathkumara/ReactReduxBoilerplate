import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/globalActions';
import { loadModal, hideModal } from '../../actions/modalActions';
import { LOGIN_MODAL } from '../../constants/ModalTypes';
import Modal from '../Modal/Modal';

import Facebook from './Facebook';
import ReqenderField from '../Utility/RenderField';

import './style.css'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText:"Sign Up with Facebook"
    };
    this.onClose = this.onClose.bind(this);
    this.showLoginModal = this.showLoginModal.bind(this);
  }

  onClose() {
    this.props.hideModal();
  }

  checkErrorAlert() {
    this.props.clearErrors();
  }

  handleFormSubmit(formProps) {
    this.props.register(formProps);
  }

  showLoginModal() {
    this.props.loadModal(LOGIN_MODAL);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger" role="alert">
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }

    if(this.props.warningMessage) {
      return (
        <div className="alert alert-warning" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>{this.props.warningMessage}</strong>
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
          <button type="button" className="close" onClick={this.onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
          <h3 className="modal-title">Sign Up</h3>
        </div>
        <div className="modal-body">
          <div className="control-group">
            <Facebook btnText={this.state.btnText} />
          </div>
          <div className="control-group text-center spacer-20">
            <h5>OR</h5>
          </div>
          <form id="signup" className="spacer-40" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Field name="first_name"
              type="text"
              component={ReqenderField}
              label="First Name*"
              tabindex="1"
            />
            <Field name="last_name"
              type="text"
              component={ReqenderField}
              label="Last Name*"
              tabindex="2"
            />
            <Field name="email"
              type="email"
              component={ReqenderField}
              label="Email*"
              tabindex="3"
            />
            <Field name="password"
              type="password"
              component={ReqenderField}
              label="Password"
              tabindex="4"
            />
            <div className="control-group spacer-20">
              <button type="submit"
                className="btn btn-primary btn-block">
                Sign Up
              </button>
            </div>
          </form>
        </div>
          <div className="modal-footer">
            <p className="text-center">Already have an account?   <a className="modal-link" onClick={this.showLoginModal}>Log In</a></p>
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
  } else if(formProps.password && formProps.password.length < 8) {
    errors.password = 'Password must contain at least 8 characters';
  } else if(formProps.password && !/[0-9]/.test(formProps.password)) {
    errors.password = 'Password must contain at least one number (0-9)';
  } else if(formProps.password && !/[a-z]/.test(formProps.password)) {
    errors.password = 'Password must contain at least one lowercase letter (a-z)';
  } else if(formProps.password && !/[A-Z]/.test(formProps.password)) {
    errors.password = 'Password must contain at least one uppercase letter (A-Z)';
  }
  // else if(formProps.password && !/^.*?\W/.test(formProps.password)) {
  //   errors.password = 'Password must contain at least one special character (!@#$%,.-)';
  // }
  return errors;
}

const form = reduxForm({
  form: 'signup',
  fields: [
    'first_name',
    'last_name',
    'email',
    'password',
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

export default connect(mapStateToProps, { hideModal, loadModal, register, clearErrors })(form(Signup));
