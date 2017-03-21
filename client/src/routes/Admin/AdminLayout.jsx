import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Layout from 'src/routes/Layout/Layout';
import { getLayoutInfo } from 'src/actions/layout';
import Button from 'src/components/Common/Button/Button';
import Table from 'src/components/Common/Table/Table';
import ModalWindow from 'src/components/Common/ModalWindow/ModalWindow';
import CleverForm from 'src/components/CleverForm';
import LayoutSchema from 'src/schemas/LayoutSchema';

export class AdminLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newLayoutModalOpen: false
        }

        this.handleToggleNewLayoutModal = this.handleToggleNewLayoutModal.bind(this);
    }

    componentDidMount() {
        this.props.getLayoutInfo();
    }

    handleToggleNewLayoutModal() {
        this.setState({
            newLayoutModalOpen: !this.state.newLayoutModalOpen
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

        LayoutSchema.setListeners([
            {
                field: 'name',
                handler: () => window.console.log('changed name'),
            },
            {
                field: 'columns',
                handler: () => window.console.log('changed columns'),
            }
        ]);

        return (
            <Layout>
                <section className="admin-layout">
                    <ModalWindow
                        isOpen={this.state.newLayoutModalOpen}
                        onClose={this.handleToggleNewLayoutModal}
                        title="New Layout"
                    >
                        <CleverForm
                            schema={LayoutSchema.getSchema()}
                            onSubmit={() => true}
                        />
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
    immLayouts: PropTypes.object,
    getLayoutInfo: PropTypes.func,
    location: PropTypes.object
}

export default connect(state => ({
    immLayouts: state.layoutReducer
}), {
    getLayoutInfo
})(AdminLayout);