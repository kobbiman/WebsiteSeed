import './Card.scss';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Card extends Component {
    render () {
        const { title, children, modifier, icon } = this.props;
        const titleClassName = classnames(
            'card__title',
            {
                [`card__title--${modifier}`]: !!modifier
            }
        );
        let iconElem;

        if (icon) {
            const iconClassName = classnames(
                'card__icon',
                {
                    [`card__icon--${modifier}`]: !!modifier
                }
            );

            iconElem = (
                <div className={iconClassName}>
                    {icon}
                </div>
            );
        }

        return (
            <section className="card">
                {iconElem}
                <div className={titleClassName}>
                    {title}
                </div>
                <div className="card__body">
                    {children}
                </div>
            </section>
        );
    }
}

Card.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    modifier: PropTypes.string,
    icon: PropTypes.element
}