import './SiteMenu.scss';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class SiteMenu extends Component {
    render () {
        const { immMenus } = this.props;
        let siteMenu;

        if (immMenus) {
            const immMenu = immMenus.get('data').find(immMenu => immMenu.get('machineName') === 'main-menu');

            if(immMenu) {
                siteMenu = immMenu.get('links') && immMenu.get('links').map((immLink, index) => (
                    <Link key={index} to={immLink.get('url')} className="site-menu__link">
                        {immLink.get('label')}
                    </Link>
                ));
            }
        }

        return (
            <section className="site-menu">
                {siteMenu}
            </section>
        );
    }
}

SiteMenu.propTypes = {
    immMenus: PropTypes.object.isRequired
}