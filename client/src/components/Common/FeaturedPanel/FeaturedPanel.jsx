import React, { Component, PropTypes } from 'react';
import Card from 'src/components/Common/Card/Card';
import FontAwesome from 'react-fontawesome';

export default class FeaturedPanel extends Component {
    render() {
        const { title, body, icon } = this.props;
        let iconElem;

        if (icon) {
            iconElem = <FontAwesome name={icon} />;
        }

        return (
            <Card icon={iconElem} title={title} modifier={'primary'}>
                {body}
            </Card>
        );
    }
}

FeaturedPanel.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.any,
    icon: PropTypes.string
}