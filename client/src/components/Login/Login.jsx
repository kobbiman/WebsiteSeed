import React, { Component, PropTypes } from 'react';

import CleverForm from 'src/components/CleverForm';
import { initialize } from 'src/utils/Auth';
import LoginSchema from 'src/schemas/LoginSchema';

export default class Login extends Component {
    constructor (props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            rememberMe: false
        }

        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeRememberMe = this.handleChangeRememberMe.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername ({target:{value}}) {
        this.setState({
            username: value
        });
    }

    handleChangePassword ({target:{value}}) {
        this.setState({
            password: value
        });
    }

    handleChangeRememberMe ({target:{value}}) {
        this.setState({
            rememberMe: value
        });
    }

    handleSubmit () {
        const { onSuccess, authenticate } = this.props;
        const { username, password } = this.state;

        authenticate({ username, password })
            .then(({ payload: { data: {id: token, userId }}}) => {
                initialize(token, userId);
                onSuccess();
            })
            .catch(error => window.console.error(error));
    }

    render () {
        LoginSchema.setListeners([
            {
                field: 'username',
                handler: this.handleChangeUsername
            },
            {
                field: 'password',
                handler: this.handleChangePassword
            },
            {
                field: 'rememberme',
                handler: this.handleChangeRememberMe
            }
        ]);

        return (
            <CleverForm
                schema={LoginSchema.getSchema()}
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