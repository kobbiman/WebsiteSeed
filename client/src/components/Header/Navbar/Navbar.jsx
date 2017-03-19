import './Navbar.scss';

import React, { Component, PropTypes } from 'react';
import SiteMenu from 'src/components/Header/Navbar/SiteMenu/SiteMenu';
import LoginButtons from 'src/components/Header/Navbar/LoginButtons/LoginButtons';

export default class Navbar extends Component {
    render () {
        const { immConfiguration, immLogin, immMenus, authenticate } = this.props;
        const title = immConfiguration && immConfiguration.getIn(['data', 'siteName']);

        return (
            <section className="navbar">
                <a className="navbar__title" href="#">{title}</a>
                <nav className="navbar__login-buttons">
                    <LoginButtons
                        immLogin={immLogin}
                        authenticate={authenticate}
                    />
                </nav>
                <nav className="navbar__menu">
                    <SiteMenu immMenus={immMenus} />
                </nav>
            </section>
        );
    }
}

Navbar.propTypes = {
    immConfiguration: PropTypes.object.isRequired,
    immLogin: PropTypes.object.isRequired,
    immMenus: PropTypes.object.isRequired,
    authenticate: PropTypes.func.isRequired
}