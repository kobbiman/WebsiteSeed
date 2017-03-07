import React, { Component, PropTypes } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Login from 'src/components/Login/Login';
import Dropdown from 'src/components/Common/Dropdown/Dropdown';
import { reset, getUserId } from 'src/utils/Auth';

export default class Header extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loginDropdownOpen: false
        }

        this.buildLoginButtons = this.buildLoginButtons.bind(this);
        this.buildNavbar = this.buildNavbar.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleCloseSession = this.handleCloseSession.bind(this);
    }

    handleCloseSession () {
        reset();
        this.forceUpdate();
    }

    handleLoginSuccess () {
        this.setState({
            loginDropdownOpen: false
        });
    }

    buildLoginButtons () {
        const { immLogin, authenticate } = this.props;
        const isAuthenticated = !!getUserId();
        let content;

        if (isAuthenticated) {
            content = (
                <NavItem eventKey={1} href="#" onClick={this.handleCloseSession}>
                    Sign Out
                </NavItem>
            );
        } else {
            content = (
                <Dropdown label={'Sign In'} isOpen={this.state.loginDropdownOpen}>
                    <Login immLogin={immLogin} authenticate={authenticate} onSuccess={this.handleLoginSuccess} />
                </Dropdown>
            );
        }

        return content;
    }

    buildNavbar () {
        const title = 'Website Seed';
        const loginButtons = this.buildLoginButtons();

        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">{title}</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    {loginButtons}
                </Nav>
            </Navbar>
        );
    }

    render() {
        const navbar = this.buildNavbar();

        return (
            <header className="header">
                {navbar}
            </header>
        );
    }
}

Header.propTypes = {
    immLogin: PropTypes.object,
    authenticate: PropTypes.func
}