import React, { Component, PropTypes } from 'react';
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
                <a href="#" onClick={this.handleCloseSession}>
                    <span id="signOutButton">Sign Out</span>
                </a>
            );
        } else if (!this.state.loginPopoverOpen) {
            content = (
                <a href="#" onClick={this.handleToggleLoginPopover}>
                    <span id="signInButton">Sign In</span>
                </a>
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
                    <a key={index} href={immLink.get('url')}>
                        {immLink.get('label')}
                    </a>
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
            <section>
                <div>
                    <a href="#">{title}</a>
                </div>
                <nav>
                    {siteMenu}
                </nav>
                <nav>
                    {loginButtons}
                </nav>
            </section>
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