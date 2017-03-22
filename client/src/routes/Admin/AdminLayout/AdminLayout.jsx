import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Layout from 'src/routes/Layout/Layout';
import { getLayoutInfo, insertLayout } from 'src/actions/layout';
import Button from 'src/components/Common/Button/Button';
import Table from 'src/components/Common/Table/Table';
import ModalWindow from 'src/components/Common/ModalWindow/ModalWindow';
import CleverForm from 'src/components/CleverForm';
import LayoutSchema from 'src/schemas/LayoutSchema';

export class AdminLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newLayoutModalOpen: false,
            newLayoutInProgress: false,
            newLayoutSuccess: false
        }

        this.handleToggleNewLayoutModal = this.handleToggleNewLayoutModal.bind(this);
        this.handleSubmitNewLayout = this.handleSubmitNewLayout.bind(this);
    }

    componentDidMount() {
        this.props.getLayoutInfo();
    }

    handleToggleNewLayoutModal() {
        this.setState({
            newLayoutModalOpen: !this.state.newLayoutModalOpen
        });
    }

    handleSubmitNewLayout(layout) {
        this.setState({
            newLayoutInProgress: true
        });

        this.props.insertLayout(layout)
            .then(() => {
                this.setState({
                    newLayoutInProgress: false,
                    newLayoutSuccess: true,
                    newLayoutModalOpen: false
                });
            })
            .catch(() => {
                this.setState({
                    newLayoutInProgress: false,
                    newLayoutSuccess: false
                });
            });
    }

    render() {
        const { immLayouts } = this.props;
        const items = immLayouts.get('layouts').map(immLayout => ({
            id: immLayout.get('id'),
            name: immLayout.get('name'),
            columns: immLayout.get('columns'),
            place: immLayouts.getIn(['layoutPlaces', 'byId', immLayout.get('layoutPlaceId').toString(), 'path'])
        })).toArray();
        let layoutForm;

        LayoutSchema.setFields({
            layoutPlaceId: {
                prop: 'options',
                value: immLayouts.getIn(['layoutPlaces', 'byId']).map(immLayoutPlace => ({
                    label: `${immLayoutPlace.get('name')} (${immLayoutPlace.get('path')})`,
                    value: immLayoutPlace.get('id')
                })).toArray()
            }
        });

        if (this.state.newLayoutModalOpen) {
            layoutForm = (
                <CleverForm
                    schema={LayoutSchema.getPlainSchema()}
                    onSubmit={this.handleSubmitNewLayout}
                />
            );
        } else {
            layoutForm = <div />;
        }

        return (
            <Layout>
                <section className="admin-layout">
                    <ModalWindow
                        isOpen={this.state.newLayoutModalOpen}
                        onClose={this.handleToggleNewLayoutModal}
                        title="New Layout"
                    >
                        {layoutForm}
                    </ModalWindow>
                    <Button
                        onClick={this.handleToggleNewLayoutModal}
                        icon="plus"
                        label="New Layout"
                        position="right"
                    />
                    <h1>
                        <small>
                            <FontAwesome name="window-restore" />
                        </small>
                        Layout administration
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
    getLayoutInfo: PropTypes.func,
    immLayouts: PropTypes.object,
    insertLayout: PropTypes.func,
    location: PropTypes.object
}

export default connect(state => ({
    immLayouts: state.layoutReducer
}), {
    getLayoutInfo,
    insertLayout
})(AdminLayout);