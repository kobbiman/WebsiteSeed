import './SiteMenu.scss';
import React, { Component, PropTypes } from 'react';

export default class SiteMenu extends Component {
    render () {
        const { immMenus } = this.props;
        let siteMenu;

        if (immMenus) {
            const immMenu = immMenus.get('data').find(immMenu => immMenu.get('machineName') === 'main-menu');

            if(immMenu) {
                siteMenu = immMenu.get('links') && immMenu.get('links').map((immLink, index) => (
                    <a key={index} href={immLink.get('url')} className="site-menu__link">
                        {immLink.get('label')}
                    </a>
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