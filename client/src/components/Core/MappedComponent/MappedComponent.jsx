import React, { Component, PropTypes } from 'react';
import Components from 'src/components/Common';

export default class MappedComponent extends Component {
    render () {
        const {type, props} = this.props;
        const RequestedComponent = Components[type];

        return RequestedComponent && <RequestedComponent {...props.toJS()} /> || <span />;
    }
}

MappedComponent.propTypes = {
    type: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired
}
