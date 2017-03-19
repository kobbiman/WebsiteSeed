import React, { Component, PropTypes } from 'react';

import CleverForm from 'src/components/CleverForm';
import { initialize } from 'src/utils/Auth';

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
        const loginSchema = [
            {
                name: 'username',
                type: 'string',
                label: 'Username',
                placeholder: 'juan@perez.com',
                errorMessage: 'Provided username is invalid',
                validation (value) {
                    return value.length > 3 && value.length < 10
                },
                onChange: this.handleChangeUsername
            },
            {
                name: 'password',
                type: 'password',
                label: 'Password',
                placeholder: '*********',
                errorMessage: 'Provided password is invalid',
                validation (value) {
                    return value.length > 4 && value.length < 20
                },
                onChange: this.handleChangePassword
            },
            {
                name: 'rememberme',
                type: 'checkbox',
                label: 'Remember me',
                value: true,
                checked: true,
                onChange: this.handleChangeRememberMe
            }
        ];

        return (
            <CleverForm
                schema={loginSchema}
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