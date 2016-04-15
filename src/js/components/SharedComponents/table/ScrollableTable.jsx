/**
  * ScrollableTable.jsx
  * Created by Kevin Li 4/5/2016
  */

import React, { PropTypes } from 'react';
import TableRow from './TableRow.jsx';
import TableHeaders from './TableHeaders.jsx';

const propTypes = {
    data: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    sortable: PropTypes.bool,
    onSort: PropTypes.func
};

const defaultProps = {
    data: [['Error']],
    headers: ['Table Data Missing'],
    sortable: false
};

export default class ScrollableTable extends React.Component {
	render() {
		const tableRows = [];
        for (let i = 0; i < this.props.data.length; i++) {
            tableRows.push(<TableRow key={i} data={this.props.data[i]} />);
        }
		return (
			<div className="usa-da-scrollable-table">
				<div className="usa-da-scrollable-table-header">
					<table className="usa-da-table table-bordered">
						<thead>
		                    <TableHeaders data={this.props.headers} sortable={this.props.sortable} onSort={this.props.onSort} />
		                </thead>
		            </table>
	            </div>
	           	<div className="usa-da-scrollable-table-content">
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
