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
        this.buildSiteMenu = this.buildSiteMenu.bind(this);
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

    buildSiteMenu () {
        const { immMenus } = this.props;
        let siteMenu;

        if (immMenus) {
            const immMenu = immMenus.get('data').find(immMenu => immMenu.get('machineName') === 'main-menu');

            if(immMenu) {
                siteMenu = immMenu.get('links') && immMenu.get('links').map((immLink, index) => (
                    <NavItem key={index} eventKey={index+1} href={immLink.get('url')}>
                        {immLink.get('label')}
                    </NavItem>
                ));
            }
        }

        return siteMenu;
    }

    buildNavbar () {
        const { immConfiguration } = this.props;
        const title = immConfiguration && immConfiguration.getIn(['data', 'siteName']);
        const loginButtons = this.buildLoginButtons();
        const siteMenu = this.buildSiteMenu();

        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">{title}</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    {siteMenu}
                </Nav>
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
    immConfiguration: PropTypes.object,
    immMenus: PropTypes.object,
    authenticate: PropTypes.func
}