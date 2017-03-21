import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Layout from 'src/routes/Layout/Layout';
import { getLayoutInfo } from 'src/actions/layout';
import Button from 'src/components/Common/Button/Button';
import Table from 'src/components/Common/Table/Table';

export class AdminLayout extends Component {
    componentDidMount() {
        this.props.getLayoutInfo();
    }

    render() {
        const { immLayouts } = this.props;
        const items = immLayouts.get('layouts').map(immLayout => ({
            id: immLayout.get('id'),
            name: immLayout.get('name'),
            columns: immLayout.get('columns'),
            place: immLayouts.getIn(['layoutPlaces', 'byId', immLayout.get('layoutPlaceId').toString(), 'path'])
        })).toArray();

        return (
            <Layout>
                <section className="admin-layout">
                    <h1>
                        <small>
                            <FontAwesome name="window-restore" />
                        </small>
                        Layout administration
                        <Button
                            to="/admin/layout/new"
                            icon="plus"
                            label="New Layout"
                            position="right"
                        />
                    </h1>
                    <Table
                        items={items}
                    />
                </section>
            </Layout>
        );
    }
}

AdminLayout.propTypes = {
    immLayouts: PropTypes.object,
    getLayoutInfo: PropTypes.func,
    location: PropTypes.object
}

export default connect(state => ({
    immLayouts: state.layoutReducer
}), {
    getLayoutInfo
})(AdminLayout);