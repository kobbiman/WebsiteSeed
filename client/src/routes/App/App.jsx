import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Layout from 'src/routes/Layout/Layout';
import MappedLayout from 'src/components/Core/MappedLayout/MappedLayout';
import { getLayoutInfo } from 'src/actions/layout';

export class App extends Component {
    componentDidMount () {
        const { getLayoutInfo } = this.props;

        getLayoutInfo();
    }

    render() {
        const { immLayouts, location } = this.props;

        return (
            <Layout>
                <section className="app">
                    <MappedLayout immLayouts={immLayouts} location={location} />
                </section>
            </Layout>
        );
    }
}

App.propTypes = {
    immLayouts: PropTypes.object,
    getLayoutInfo: PropTypes.func,
    location: PropTypes.object
}

export default connect(state => ({
    immLayouts: state.layoutReducer
}), {
    getLayoutInfo
})(App);