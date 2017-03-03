// @vendors
import React, { Component } from 'react';
// @components
import AppBar from 'material-ui/AppBar';
import NavigationMenu from '../NavigationMenu/NavigationMenu';

export default class Header extends Component {
    constructor (props) {
        super(props);

        this.state = {
            menuOpen: false
        }

        this.handleToggleMenu = this.handleToggleMenu.bind(this);
    }

    handleTouchTitle () {
        //Go to root
    }

    handleToggleMenu () {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }

    render () {
        const { menuOpen } = this.state;
        const title = 'Website Seed';

        return (
            <header>
                <NavigationMenu
                    isOpen={menuOpen}
                    onClose={this.handleToggleMenu}
                />
                <AppBar
                    title={title}
                    onTitleTouchTap={this.handleTouchTitle}
                    onLeftIconButtonTouchTap={this.handleToggleMenu}
                />
            </header>
        );
    }
}