import './Popover.scss';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Popover extends Component {
    render () {
        const { children, position, isOpen, onToggle } = this.props;
        const contentClassName = classnames(
            'popover__inner-content',
            {
                'popover__inner-content--open': isOpen
            },
            `popover__inner-content--${position}`
        );
        const overlayClassName = classnames(
            'popover__overlay',
            {
                'popover__overlay--shown': isOpen
            }
        );

        return (
            <article>
                <section id="popoverContent" className={contentClassName}>
                    {children}
                </section>
                <div id="popoverOverlay" className={overlayClassName} onClick={onToggle} />
            </article>
        );
    }
}

Popover.propTypes = {
    position: PropTypes.oneOf([
        'left', 'right'
    ]),
    children: PropTypes.element.isRequired,
    isOpen: PropTypes.bool,
    onToggle: PropTypes.func
}

Popover.defaultProps = {
    isOpen: false,
    position: 'right',
    onToggle: () => {}
}