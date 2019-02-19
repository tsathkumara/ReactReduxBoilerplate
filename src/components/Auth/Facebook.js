import React, { Component } from 'react';
import { connect } from 'react-redux';

import FacebookLogin from 'react-facebook-login';
import { facebookLogin } from '../../actions/authActions';

import './style.css'

class Facebook extends Component {
  constructor(props) {
    super(props);
    this.btnClick = this.btnClick.bind(this);
  }

  btnClick(response) {
    if(response.id) {
      this.props.facebookLogin(response);
    }
  }

  render() {
    return (
      <FacebookLogin
        appId = "1769704249910130"
        autoLoad = {true}
        fields ="name,email,picture"
        scope ="public_profile,user_friends,user_actions.books"
        cssClass = "btn btn-primary btn-block loginBtn--facebook"
        textButton = { this.props.btnText }
        onClick={this.btnClick}
        size = "medium"
      >
      </FacebookLogin>
    )
  }
}

export default connect(null, { facebookLogin })(Facebook);
