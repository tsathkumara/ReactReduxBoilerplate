import React, { Component } from 'react';
import MainNav from '../components/Nav/MainNav';
import ModalContainer from '../components/Modal/ModalContainer';

export default class AuthLayout extends Component {
  render() {
    return (
      <div>
        <MainNav />
        {this.props.children}
        <ModalContainer />
      </div>
    );
  }
}
