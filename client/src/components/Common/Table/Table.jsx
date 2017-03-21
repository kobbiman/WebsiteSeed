import './Table.scss';

import React, { Component, PropTypes } from 'react';

export default class Table extends Component {
    constructor (props) {
        super(props);

        this.buildBodyRows = this.buildBodyRows.bind(this);
        this.buildHeaderColumns = this.buildHeaderColumns.bind(this);
    }
    buildHeaderColumns () {
        const { items, excludeFields, fieldLabels } = this.props;
        let labels = [];

        if (fieldLabels) {
            labels = fieldLabels;
        } else if(items[0]) {
            labels = Object.keys(items[0]).filter(label => excludeFields.indexOf(label) === -1);
        }

        return labels.map((label, index) => (
            <th key={index} className="table__column--header">
                {label}
            </th>
        ));
    }

    buildBodyRows () {
        const { items, excludeFields } = this.props;

        return items.map((item, index) => {
            const rowColumns = Object.keys(item)
                .filter(itemKey => excludeFields.indexOf(itemKey) === -1)
                .map((itemKey, index) => (
                    <td key={index} className="table__column">
                        {item[itemKey]}
                    </td>
                ));

            return (
                <tr key={index} className="table__row">
                    {rowColumns}
                </tr>
            );
        });
    }

    render () {
        const headerColumns = this.buildHeaderColumns();
        const bodyRows = this.buildBodyRows();

        return (
            <table className="table">
                <thead>
                    <tr className="table__row--header">
                        {headerColumns}
                    </tr>
                </thead>
                <tbody>
                    {bodyRows}
                </tbody>
            </table>
        );
    }
}

Table.propTypes = {
    excludeFields: PropTypes.array,
    fieldLabels: PropTypes.arrayOf(PropTypes.string),
    items: PropTypes.array,
}

Table.defaultProps = {
    excludeFields: [],
    items: [],
}