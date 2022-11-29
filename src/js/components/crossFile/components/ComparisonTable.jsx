/**
  * ComparisonTable.jsx
  * Created by Kevin Li 6/15/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ScrollableTable from '../../SharedComponents/table/ScrollableTable';
import * as ReviewHelper from '../../../helpers/reviewHelper';

const propTypes = {
    data: PropTypes.array
};

const defaultProps = {
    data: []
};

export default class ComparisonTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortDirection: 'asc',
            sortColumn: 0,
            data: {}
        };
    }

    buildRow() {
        const data = [];
        this.props.data.forEach((item) => {
            const description = `Rule ${item.original_label}: ${item.rule_failed}`;
            const row = {
                source: ReviewHelper.globalFileData[item.source_file].name,
                description,
                occurrences: item.occurrences
            };

            data.push(row);
        });

        const sortFields = ['source', 'description', 'occurrences'];

        const sortedData = _.orderBy(data, sortFields[this.state.sortColumn], this.state.sortDirection);

        const output = [];
        sortedData.forEach((row) => {
            output.push([row.source, row.description, row.occurrences]);
        });

        return output;
    }

    sortTable(direction, column) {
        this.setState({
            sortColumn: column,
            sortDirection: direction
        });
    }

    render() {
        const headers = ['Source File', 'Rule Message', 'Occurrences'];

        const data = this.buildRow();

        return (
            <div className="comparison-table">
                <ScrollableTable headers={headers} data={data} onSort={this.sortTable.bind(this)} />
            </div>
        );
    }
}

ComparisonTable.propTypes = propTypes;
ComparisonTable.defaultProps = defaultProps;
