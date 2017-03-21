import './Button.scss';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

export default class Button extends Component {
    render() {
        const { icon, label, onClick, to, modifier, type, position } = this.props;
        const positionClass = position && `button--position-${position}`;
        const className = `button button--${modifier} ${positionClass}`;
        let buttonElement, iconElement;

        if (icon) {
            iconElement = <FontAwesome name={icon} />;
        }

        if (onClick) {
            buttonElement = (
                <button className={className} onClick={onClick} type={type}>
                    {iconElement} {label}
                </button>
            );
        } else {
            buttonElement = (
                <Link className={className} to={to}>
                    {iconElement} {label}
                </Link>
            );
        }

        return buttonElement;
    }
}

Button.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    modifier: PropTypes.oneOf([
        'default',
        'inverse'
    ]),
    position: PropTypes.string,
    type: PropTypes.string,
    to: PropTypes.string,
}

Button.defaultProps = {
    modifier: 'default',
    type: 'button'
}