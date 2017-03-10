import React, { Component, PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import MappedComponent from 'src/components/Core/MappedComponent/MappedComponent';

export default class MappedLayout extends Component {
    buildBlocks (containerId, immBlocks) {
        const immContainerBlocks = immBlocks.filter(immBlock => immBlock.get('containerId') === containerId);

        return immContainerBlocks.map((immBlock, index) => {
            const hasContent = !!immBlock.get('contentId');
            const hasComponent = !!immBlock.get('componentId');
            let content;

            if (hasComponent) {
                content = <MappedComponent type={immBlock.get('type')} props={immBlock.get('props')} />;
            } else if (hasContent) {
                // @todo
            }

            return (
                <Col key={index} sm={12} md={immBlock.get('columns')}>
                    {content}
                </Col>
            );
        });
    }

    render () {
        const { immContainers, immBlocks } = this.props;

        return immContainers.map((immContainer, index) => {
            const blocks = this.buildBlocks(immContainer.get('id'), immBlocks);

            return (
                <Row key={index}>
                    {blocks}
                </Row>
            );
        });
    }
}

MappedLayout.propTypes = {
    immContainers: PropTypes.object.isRequired,
    immBlocks: PropTypes.object.isRequired
}