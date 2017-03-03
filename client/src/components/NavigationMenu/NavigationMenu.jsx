import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class NavigationMenu extends Component {
    render() {
        const { isOpen, onClose } = this.props;
        const menuTitle = 'Menu';
        const iconElementLeft = <IconButton><NavigationClose /></IconButton>;

        return (
            <nav>
                <Drawer
                    docked={false}
                    width={250}
                    open={isOpen}
                    onRequestChange={onClose}
                    swipeAreaWidth={250}
                >
                    <AppBar
                        title={menuTitle}
                        iconElementLeft={iconElementLeft}
                        onLeftIconButtonTouchTap={onClose}
                    />
                    <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
                </Drawer>
            </nav>
        );
    }
}

NavigationMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}