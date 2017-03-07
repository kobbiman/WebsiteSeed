import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from 'src/routes/App/App';

export default class CoreRouter extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App} />
            </Router>
        )
    }
}