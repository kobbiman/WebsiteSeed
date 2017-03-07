import './App.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';
import FontAwesome from 'react-fontawesome';
import Header from 'src/components/Header/Header';
import { authenticate } from 'src/actions/login';

export class App extends Component {
    buildFeaturedBlocks () {
        return [
            {
                title: 'Easy',
                body: 'Easy to change',
                style: 'info',
                icon: 'wrench'
            },
            {
                title: 'Extend',
                body: 'Thought to be reused',
                style: 'warning',
                icon: 'cubes'
            },
            {
                title: 'Clear',
                body: 'Clean coding specs',
                style: 'success',
                icon: 'leaf'
            },
            {
                title: 'Innovative',
                body: 'Stack: Loopback + Redux + React',
                style: 'danger',
                icon: 'rocket'
            }
        ].map((block, index) => {
            const { title, body, style, icon } = block;
            const header = (
                <h3>
                    <FontAwesome name={icon} /> {title}
                </h3>
            );

            return (
                <Col key={index} sm={3}>
                    <Panel header={header} bsStyle={style}>
                        {body}
                    </Panel>
                </Col>
            );
        });
    }

    render() {
        const { immLogin, authenticate } = this.props;
        const welcomeTitle = 'Welcome to Website Seed!';
        const welcomeMessage = 'A website seed using loopback.io and ReactJS';
        const linkLabel = 'See it on Github';
        const githubUrl = 'https://github.com/nicolasepiscopo/WebsiteSeed';
        const featuredBlocks = this.buildFeaturedBlocks();

        return (
            <section className="app">
                <Header immLogin={immLogin} authenticate={authenticate} />
                <section className="container">
                    <Jumbotron>
                        <h1>{welcomeTitle}</h1>
                        <p>{welcomeMessage}</p>
                        <p className="text-right">
                            <Button bsStyle="primary" href={githubUrl} target="_blank">
                                {linkLabel} <FontAwesome name="github-alt" />
                            </Button>
                        </p>
                    </Jumbotron>
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
    authenticate: PropTypes.func
}

export default connect(state => ({
    immLogin: state.loginReducer
}), {
    authenticate
})(App);