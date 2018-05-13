import React  from 'react';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  Nav,
  NavItem,
}  from 'react-bootstrap';

class Header extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const {
      className,
      auth,
      me,
    } = this.props;

    return (
      <Navbar fixedTop fluid collapseOnSelect className={`${className} header`}>
        <Navbar.Header>
          <Navbar.Brand className="header__brand brand">
            <span className="brand__text">Template</span>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className="header__menu menu">
          <Nav pullRight>
            <LinkContainer to="/template"><NavItem className="menu__item">темплейт</NavItem></LinkContainer>
            <LinkContainer to="/secretTemplate"><NavItem className="menu__item">сикретТемплейт</NavItem></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

const mapStateToProps = ({
}) => ({
});

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
