import React, { Component, PropTypes } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Login from 'src/components/Login/Login';
import Popover from 'src/components/Common/Popover/Popover';
import { reset, getUserId } from 'src/utils/Auth';

export default class Header extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loginPopoverOpen: false
        }

        this.buildLoginButtons = this.buildLoginButtons.bind(this);
        this.buildNavbar = this.buildNavbar.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleCloseSession = this.handleCloseSession.bind(this);
        this.handleToggleLoginPopover = this.handleToggleLoginPopover.bind(this);
    }

    handleToggleLoginPopover (e) {
        e.preventDefault();
        this.setState({
            loginPopoverOpen: !this.state.loginPopoverOpen
        });
    }

    handleCloseSession (e) {
        e.preventDefault();
        reset();
        this.forceUpdate();
    }

    handleLoginSuccess () {
        this.setState({
            loginPopoverOpen: false
        });
    }

    buildLoginButtons () {
        const isAuthenticated = !!getUserId();
        let content;

        if (isAuthenticated) {
            content = (
                <NavItem eventKey={1} href="#" onClick={this.handleCloseSession}>
                    <span id="signOutButton">Sign Out</span>
                </NavItem>
            );
        } else if (!this.state.loginPopoverOpen) {
            content = (
                <NavItem eventKey={1} href="#" onClick={this.handleToggleLoginPopover}>
                    <span id="signInButton">Sign In</span>
                </NavItem>
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
        const { immLogin, authenticate } = this.props;
        const navbar = this.buildNavbar();

        return (
            <header className="header">
                <section className="container">
                    <Popover isOpen={this.state.loginPopoverOpen} onToggle={this.handleToggleLoginPopover}>
                        <Login immLogin={immLogin} authenticate={authenticate} onSuccess={this.handleLoginSuccess} />
                    </Popover>
                </section>
                {navbar}
            </header>
        );
    }
}

Header.propTypes = {
    immLogin: PropTypes.object,
    authenticate: PropTypes.func
}