import './App.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'src/components/Header/Header';
import MappedLayout from 'src/components/Core/MappedLayout/MappedLayout';
import { authenticate } from 'src/actions/login';
import { getConfiguration } from 'src/actions/configuration';
import { getMenus } from 'src/actions/menu';
import { getLayoutInfo } from 'src/actions/layout';

export class App extends Component {
    componentDidMount () {
        const { getConfiguration, getMenus, getLayoutInfo } = this.props;

        getConfiguration();
        getMenus();
        getLayoutInfo();
    }

    render() {
        const { immLogin, immConfiguration, immMenus, immLayouts, authenticate } = this.props;

        return (
            <section className="app">
                <Header
                    immLogin={immLogin}
                    immConfiguration={immConfiguration}
                    immMenus={immMenus}
                    authenticate={authenticate}
                />
                <section className="container">
                    <MappedLayout immLayouts={immLayouts} location={location} />
                </section>
            </section>
        );
    }
}

App.propTypes = {
    immLogin: PropTypes.object,
    immConfiguration: PropTypes.object,
    immMenus: PropTypes.object,
    immLayouts: PropTypes.object,
    authenticate: PropTypes.func,
    getConfiguration: PropTypes.func,
    getMenus: PropTypes.func,
    getLayoutInfo: PropTypes.func,
    location: PropTypes.object
}

export default connect(state => ({
    immLogin: state.loginReducer,
    immConfiguration: state.configurationReducer,
    immMenus: state.menuReducer,
    immLayouts: state.layoutReducer
}), {
    authenticate,
    getConfiguration,
    getMenus,
    getLayoutInfo
})(App);