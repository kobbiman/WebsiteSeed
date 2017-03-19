import './LoginPopover.scss';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class LoginPopover extends Component {
    render () {
        const { children, isOpen, onToggle } = this.props;
        const contentClassName = classnames(
            'login-popover__inner-content',
            {
                'login-popover__inner-content--open': isOpen
            }
        );
        const overlayClassName = classnames(
            'login-popover__overlay',
            {
                'login-popover__overlay--shown': isOpen
            }
        );

        return (
            <article className="login-popover">
                <section id="loginPopoverContent" className={contentClassName}>
                    {children}
                </section>
                <div id="loginPopoverOverlay" className={overlayClassName} onClick={onToggle} />
            </article>
        );
    }
}

LoginPopover.propTypes = {
    children: PropTypes.element.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
}

LoginPopover.defaultProps = {
    isOpen: false,
    onToggle: () => {}
}