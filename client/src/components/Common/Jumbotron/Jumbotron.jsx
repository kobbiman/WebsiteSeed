import './Jumbotron.scss';

import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import FontAwesome from 'react-fontawesome';

export default class Jumbotron extends Component {
    render () {
        const { title, message, linkLabel, linkHref, linkIcon, linkProps } = this.props;
        let link;

        if (linkLabel && linkHref) {
            let icon;

            if (linkIcon) {
                icon = <FontAwesome name={linkIcon} />;
            }

            link = (
                <Button type="primary" href={linkHref} target="_blank" {...linkProps}>
                    {linkLabel} {icon}
                </Button>
            )
        }

        return (
            <section className="jumbotron">
                <h1 className="jumbotron__title">{title}</h1>
                <p className="jumbotron__message">{message}</p>
                <span className="jumbotron__button">{link}</span>
            </section>
        );
    }
}

Jumbotron.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    linkLabel: PropTypes.string,
    linkHref: PropTypes.string,
    linkIcon: PropTypes.string,
    linkProps: PropTypes.object
}