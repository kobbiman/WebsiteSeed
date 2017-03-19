import './AdministrativeNavbar.scss';

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AdministrativeNavbar extends Component {
    render () {
        return (
            <nav id="AdministrativeNavbar" className="administrative-navbar">
                <ul className="administrative-navbar__menu">
                    <li className="administrative-navbar__menu-item">
                        <Link to="/admin/layout">
                            Layout
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}