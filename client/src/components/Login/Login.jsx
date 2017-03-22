import React, { Component, PropTypes } from 'react';

import CleverForm from 'src/components/CleverForm';
import { initialize } from 'src/utils/Auth';
import LoginSchema from 'src/schemas/LoginSchema';

export default class Login extends Component {
    constructor (props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (fields) {
        const { onSuccess, authenticate } = this.props;
        const { username, password } = fields;

        authenticate({ username, password })
            .then(({ payload: { data: {id: token, userId }}}) => {
                initialize(token, userId);
                onSuccess();
            })
            .catch(error => window.console.error(error));
    }

    render () {
        return (
            <CleverForm
                schema={LoginSchema.getPlainSchema()}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

Login.propTypes = {
    immLogin: PropTypes.object,
    authenticate: PropTypes.func,
    onSuccess: PropTypes.func
}

Login.defaultProps = {
    onSuccess: () => {}
}