import './AdministrativeNavbar.scss';

import React, { Component } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

const menuLinks = [
    {
        to: '/admin/layout',
        icon: 'window-restore',
        label: 'Layout'
    }
];

export default class AdministrativeNavbar extends Component {
    render () {
        const menuLinkElements = menuLinks.map((link, index) => (
            <li key={index} className="administrative-navbar__menu-item">
                <Link to={link.to}>
                    <FontAwesome name={link.icon} /> {link.label}
                </Link>
            </li>
        ));

        return (
            <nav id="AdministrativeNavbar" className="administrative-navbar">
                <ul className="administrative-navbar__menu">
                    {menuLinkElements}
                </ul>
            </nav>
        );
    }
}