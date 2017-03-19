import './LoginButtons.scss';

import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { reset, getUserId } from 'src/utils/Auth';
import classnames from 'classnames';
import LoginPopover from 'src/components/Header/Navbar/LoginButtons/LoginPopover/LoginPopover';
import Login from 'src/components/Login/Login';

export default class LoginButtons extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loginPopoverOpen: false
        }

        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleCloseSession = this.handleCloseSession.bind(this);
        this.handleToggleLoginPopover = this.handleToggleLoginPopover.bind(this);
    }

    handleToggleLoginPopover (e) {
        e.preventDefault();
        this.setState({
            loginPopoverOpen: !this.state.loginPopoverOpen
        });
    }

    handleCloseSession (e) {
        e.preventDefault();
        reset();
        browserHistory.push('/');
    }

    handleLoginSuccess () {
        this.setState({
            loginPopoverOpen: false
        });
        browserHistory.push('/');
    }

    render () {
        const { immLogin, authenticate } = this.props;
        const isAuthenticated = !!getUserId();
        let content;

        if (isAuthenticated) {
            content = (
                <a href="#" onClick={this.handleCloseSession} className="login-buttons__link">
                    <span id="signOutButton">Sign Out</span>
                </a>
            );
        } else {
            const loginButtonClassName = classnames(
                'login-buttons__link',
                {
                    'login-buttons__link--opened': this.state.loginPopoverOpen
                }
            );
            content = (
                <span>
                    <a href="#" onClick={this.handleToggleLoginPopover} className={loginButtonClassName}>
                        <span id="signInButton">Sign In</span>
                    </a>
                    <LoginPopover
                        isOpen={this.state.loginPopoverOpen}
                        onToggle={this.handleToggleLoginPopover}
                    >
                        <Login immLogin={immLogin} authenticate={authenticate} onSuccess={this.handleLoginSuccess} />
                    </LoginPopover>
                </span>
            );
        }

        return (
            <section className="login-buttons">
                {content}
            </section>
        );
    }
}

LoginButtons.propTypes = {
    immLogin: PropTypes.object.isRequired,
    authenticate: PropTypes.func.isRequired
}