import React, { Component, PropTypes } from 'react';
import { initialize } from 'src/utils/Auth';

export default class Login extends Component {
    constructor (props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            usernameValid: null,
            passwordValid: null
        }

        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername ({target:{value}}) {
        this.setState({
            username: value,
            usernameValid: value.length > 0 ? 'success' : 'error'
        });
    }

    handleChangePassword ({target:{value}}) {
        this.setState({
            password: value,
            passwordValid:  value.length > 0 ? 'success' : 'error'
        });
    }

    handleSubmit (e) {
        e.preventDefault();
        const { onSuccess, authenticate } = this.props;
        const { username, password, passwordValid, usernameValid } = this.state;

        if (usernameValid && passwordValid) {
            authenticate({ username, password })
            .then(({ payload: { data: {id: token, userId }}}) => {
                initialize(token, userId);
                onSuccess();
            })
            .catch(error => window.console.log(error));
        }
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.handleChangeUsername}
                    />
                    <span>Username can't be empty.</span>
                </div>
                <div>
                    <label>Password</label>
                    <input
                        id="password"
                        type="password"
                        value={this.state.password}
                        placeholder="*********"
                        onChange={this.handleChangePassword}
                    />
                    <span>Password can't be empty.</span>
                </div>
                <button type="submit">Sign In</button>
            </form>
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