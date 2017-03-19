import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'src/components/Header/Header';
import { authenticate } from 'src/actions/login';
import { getConfiguration } from 'src/actions/configuration';
import { getMenus } from 'src/actions/menu';

export class Layout extends Component {
    componentDidMount () {
        const { getConfiguration, getMenus } = this.props;

        getConfiguration();
        getMenus();
    }

    render() {
        const { immLogin, immConfiguration, immMenus, authenticate } = this.props;

        return (
            <section className="layout">
                <Header
                    immLogin={immLogin}
                    immConfiguration={immConfiguration}
                    immMenus={immMenus}
                    authenticate={authenticate}
                />
                <section className="container">
                    Layout admin area
                </section>
            </section>
        );
    }
}

Layout.propTypes = {
    immLogin: PropTypes.object,
    immConfiguration: PropTypes.object,
    immMenus: PropTypes.object,
    authenticate: PropTypes.func,
    getConfiguration: PropTypes.func,
    getMenus: PropTypes.func,
    location: PropTypes.object
}

export default connect(state => ({
    immLogin: state.loginReducer,
    immConfiguration: state.configurationReducer,
    immMenus: state.menuReducer
}), {
    authenticate,
    getConfiguration,
    getMenus
})(Layout);