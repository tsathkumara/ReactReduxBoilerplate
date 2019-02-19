import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { LinkContainer} from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap/lib';

import { loadModal } from '../../actions/modalActions';
import { LOGIN_MODAL, SIGNUP_MODAL } from '../../constants/ModalTypes';

import './style.css';

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.showLoginModal = this.showLoginModal.bind(this);
    this.showSignUpModal = this.showSignUpModal.bind(this);
  }

  showLoginModal() {
    this.props.loadModal(LOGIN_MODAL);
  }

  showSignUpModal() {
    this.props.loadModal(SIGNUP_MODAL);
  }

  render() {
    const NavLink = ({ to, eventKey, children }) =>
      <LinkContainer to={to} eventKey={eventKey}>
        <NavItem>{children}</NavItem>
      </LinkContainer>;

    const NavLinkClick = ({ children }) =>
        <li>{children}</li>;

    return (
      <Navbar fluid collapseOnSelect>
        <div className="container-fluid">
          <Navbar.Header>
            <Navbar.Brand>
              <Link
                to={`/`}
                className="navbar-brand">
                  <code>React Base Project</code>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavLink to="/about" eventKey={1}>
                About
              </NavLink>
              <NavLink to="/contact" eventKey={2}>
                Contact
              </NavLink>
            </Nav>
            <Nav pullRight>
              <NavLinkClick>
                <Button
                  onClick={this.showLoginModal}
                  className="btn btn-primary navbar-btn margin-right"
                >
                  Login
                </Button>
              </NavLinkClick>
              <NavLinkClick>
                <Button
                  onClick={this.showSignUpModal}
                  className="btn btn-primary navbar-btn"
                >
                  SignUp
                </Button>
              </NavLinkClick>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadModal: modelType => dispatch(loadModal(modelType))
});

export default connect(null, mapDispatchToProps)(MainNav);
