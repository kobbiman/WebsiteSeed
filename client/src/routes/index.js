import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from 'src/routes/App/App';
import AdminLayout from 'src/routes/Admin/AdminLayout/AdminLayout';

export default class CoreRouter extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/admin/layout" component={AdminLayout}/>
                <Route path="/*" component={App} />
            </Router>
        )
    }
}