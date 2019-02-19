import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { hideModal } from '../../actions/modalActions';
import Modal from '../Modal/Modal';

import { clearErrors } from '../../actions/globalActions';

import ReqenderField from '../Utility/RenderField';
import { sendForgotPasswordEmail } from '../../actions/authActions';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.checkErrorAlert();
    this.props.hideModal();
  }

  handleFormSubmit(formProps) {
    this.props.sendForgotPasswordEmail(formProps);
  }

  checkErrorAlert() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.successMessage) {
      this.onClose();
    }
  }

  renderAlert() {
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
    const { handleSubmit } = this.props;
    const dialogStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    };
    return (
      <Modal
        onClose={this.onClose}
        dialogStyle={dialogStyle}
      >
      <div className="modal-body col-xs-10 col-xs-offset-1">
        <form id="forgotPassword" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="modal-sm-body">
            {this.renderAlert()}
            <div className="control-group">
              <h4>Forgot your password?</h4>
            </div>
            <div className="spacer-10"></div>
            <div className="control-group">
              <p className="no-padding text-left">Enter the email address associated with your account, and we’ll email you a link to reset your password.</p>
            </div>
            <div className="spacer-10"></div>
            <Field name="email"
              type="email"
              component={ReqenderField}
              label="Email"
              tabindex="1"
            />
          </div>
          <div className="spacer-20"></div>
          <div className="control-group">
            <button type="submit"
              className="btn btn-primary btn-block">
              Reset Password
            </button>
          </div>
        </form>
      </div>
      </Modal>
    );
  }
}

const validate = (formProps) => {
  const errors = {};
  if(!formProps.email) {
    errors.email = 'Please enter your email address';
  } else if(formProps.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

const form = reduxForm({
  form: 'forgotPassword',
  fields: [
    'email'
  ],
  validate
});

function mapStateToProps(state) {
  return {
    warningMessage: state.auth.warning,
    successMessage: state.auth.success,
  };
}

export default connect(mapStateToProps, { hideModal, sendForgotPasswordEmail, clearErrors })(form(ForgotPassword));
