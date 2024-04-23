/**
  * ScrollableTable.jsx
  * Created by Kevin Li 4/5/2016
  */

import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import TableHeaders from './TableHeaders';

const propTypes = {
    data: PropTypes.array,
    headers: PropTypes.array,
    sortable: PropTypes.bool,
    onSort: PropTypes.func,
    cellClasses: PropTypes.array,
    headerClasses: PropTypes.array,
    unsortable: PropTypes.array
};

const defaultProps = {
    data: [['Error']],
    headers: ['Table Data Missing'],
    sortable: true,
    cellClasses: [],
    headerClasses: [],
    unsortable: [],
    onSort: () => {}
};

export default class ScrollableTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: {
                direction: '',
                col: -1
            }
        };
        this.sortTable = this.sortTable.bind(this);
    }

    sortTable(direction, col) {
        this.props.onSort(direction, col);
        this.setState({
            sort: {
                direction,
                col
            }
        });
    }

    render() {
        const tableRows = [];
        for (let i = 0; i < this.props.data.length; i++) {
            tableRows.push(<TableRow key={i} data={this.props.data[i]} cellClasses={this.props.cellClasses} />);
        }
        return (
            <div className="usa-da-scrollable-table">
                <div className="usa-da-scrollable-table-header">
                    <table className="usa-da-table table-bordered">
                        <thead>
                            <TableHeaders
                                data={this.props.headers}
                                sortable={this.props.sortable}
                                unsortable={this.props.unsortable}
                                onSort={this.sortTable}
                                currentSort={this.state.sort}
                                headerClasses={this.props.headerClasses} />
                        </thead>
                    </table>
                </div>
                {/* eslint-disable-next-line */}
                <div className="usa-da-scrollable-table-content" tabIndex={0} >
                    <table className="usa-da-table table-bordered">
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

ScrollableTable.propTypes = propTypes;
ScrollableTable.defaultProps = defaultProps;
