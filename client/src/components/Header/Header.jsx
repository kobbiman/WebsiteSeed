import React, { Component, PropTypes } from 'react';
import Navbar from 'src/components/Header/Navbar/Navbar';
import { getUserId } from 'src/utils/Auth';
import AdministrativeNavbar from 'src/components/Header/AdministrativeNavbar/AdministrativeNavbar';

export default class Header extends Component {
    render() {
        const { immLogin, immConfiguration, immMenus, authenticate } = this.props;
        let administrativeNavbar;

        if (getUserId()) {
            administrativeNavbar = <AdministrativeNavbar />;
        }

        return (
            <header className="header">
                <Navbar
                    immLogin={immLogin}
                    immMenus={immMenus}
                    immConfiguration={immConfiguration}
                    authenticate={authenticate}
                />
                {administrativeNavbar}
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