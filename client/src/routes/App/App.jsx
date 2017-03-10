import './App.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Header from 'src/components/Header/Header';
import Jumbotron from 'src/components/Common/Jumbotron/Jumbotron';
import FeaturedPanel from 'src/components/Common/FeaturedPanel/FeaturedPanel';
import { authenticate } from 'src/actions/login';
import { getConfiguration } from 'src/actions/configuration';
import { getMenus } from 'src/actions/menu';

export class App extends Component {
    componentDidMount () {
        const { getConfiguration, getMenus } = this.props;

        if (getConfiguration) getConfiguration();
        if (getMenus) getMenus();
    }

    buildFeaturedBlocks () {
        return [
            {
                title: 'Easy',
                body: 'Easy to change',
                icon: 'wrench'
            },
            {
                title: 'Extend',
                body: 'Thought to be reused',
                icon: 'cubes'
            },
            {
                title: 'Clear',
                body: 'Clean coding specs',
                icon: 'leaf'
            },
            {
                title: 'Innovative',
                body: 'Using latest technologies',
                icon: 'rocket'
            }
        ].map((block, index) => (
            <Col key={index} sm={3}>
                <FeaturedPanel {...block} />
            </Col>
        ));
    }

    render() {
        const { immLogin, immConfiguration, immMenus, authenticate } = this.props;
        const welcomeTitle = 'Welcome to Website Seed!';
        const welcomeMessage = 'A website seed using loopback.io and ReactJS';
        const linkLabel = 'See it on Github';
        const githubUrl = 'https://github.com/nicolasepiscopo/WebsiteSeed';
        const featuredBlocks = this.buildFeaturedBlocks();

        return (
            <section className="app">
                <Header
                    immLogin={immLogin}
                    immConfiguration={immConfiguration}
                    immMenus={immMenus}
                    authenticate={authenticate}
                />
                <section className="container">
                    <Jumbotron
                        title={welcomeTitle}
                        message={welcomeMessage}
                        linkLabel={linkLabel}
                        linkHref={githubUrl}
                        linkIcon="github-alt"
                        linkProps={{
                            target: '_blank'
                        }}
                    />
                    <Row>
                        {featuredBlocks}
                    </Row>
                </section>
            </section>
        );
    }
}

App.propTypes = {
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
})(App);