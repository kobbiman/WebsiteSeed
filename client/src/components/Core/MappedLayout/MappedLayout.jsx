import React, { Component, PropTypes } from 'react';
import MappedComponent from 'src/components/Core/MappedComponent/MappedComponent';

export default class MappedLayout extends Component {
    constructor (props) {
        super(props);

        this.buildBlocks = this.buildBlocks.bind(this);
    }

    buildBlocks (containerId, immBlocks) {
        const { immLayouts } = this.props;

        return immBlocks
            .filter(immBlock => immBlock.get('layoutContainerId') == containerId)
            .toArray()
            .map((immBlock, index) => {
                const hasContent = !!immBlock.get('contentId');
                const hasComponent = !!immBlock.get('componentId');
                let content;

                if (hasComponent) {
                    const immComponent = immLayouts.getIn(['components', immBlock.get('componentId').toString()]);
                    const immComponentType = immLayouts.getIn(['componentTypes', immComponent.get('componentTypeId').toString()]);

                    content = <MappedComponent type={immComponentType.get('name')} props={immComponent.get('props')} />;
                } else if (hasContent) {
                    // @todo
                }

                return (
                    <div key={index} className={`col-xs-12 col-md-${immBlock.get('columns')}`}>
                        {content}
                    </div>
                );
            });
    }

    buildContainers (immLayoutContainers, immBlocks) {
        return immLayoutContainers.toArray().map((immLayoutContainer, index) => {
            const blocks = this.buildBlocks(immLayoutContainer.get('id'), immBlocks);

            return (
                <div key={index} className="row">
                    {blocks}
                </div>
            );
        });
    }

    render () {
        const { immLayouts, location } = this.props;
        const immLayoutPlaces = immLayouts.getIn(['layoutPlaces', 'byPath']);
        const immLayoutContainers = immLayouts.get('layoutContainers');
        const immBlocks = immLayouts.get('blocks');
        let immLayoutPlace = immLayoutPlaces.get(location.pathname);
        let content;

        if(!immLayoutPlace) {
            immLayoutPlace = immLayoutPlaces.find(immLayoutPlace => {
                return immLayoutPlace.get('path').test(location.pathname);
            });
        }

        if (immLayoutPlace) {
            const immLayout = immLayouts.get('layouts').find(immLayout => immLayoutPlace.get('id') === immLayout.get('layoutPlaceId'));

            if (immLayout) {
                const containers = this.buildContainers(
                    immLayoutContainers.filter(immLayoutContainer => immLayoutContainer.get('layoutId') === immLayout.get('id')),
                    immBlocks
                );

                content = (
                    <section>
                        {containers}
                    </section>
                );
            }
        } else {
            content = <h1>Sección no encontrada</h1>;
        }

        return content;
    }
}

MappedLayout.propTypes = {
    immLayouts: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}