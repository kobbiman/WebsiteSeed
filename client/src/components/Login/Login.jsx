import React, { Component, PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';
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
                <FormGroup
                    controlId="username"
                    validationState={this.state.usernameValid}
                >
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.handleChangeUsername}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Username can't be empty.</HelpBlock>
                </FormGroup>
                <FormGroup
                    controlId="password"
                    validationState={this.state.passwordValid}
                >
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={this.state.password}
                        placeholder="*********"
                        onChange={this.handleChangePassword}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Password can't be empty.</HelpBlock>
                </FormGroup>
                <Button bsStyle="primary" type="submit" className="pull-right">Sign In</Button>
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