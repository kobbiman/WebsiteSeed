import React, { Component, PropTypes } from 'react';
import * as Components from 'src/components/Common';

export default class MappedComponent extends Component {
    render () {
        const {type, props} = this.props;
        const Component = Components[type];

        return Component && <Component {...props} />;
    }
}

MappedComponent.propTypes = {
    type: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired
}
