/**
  * ComparisonTable.jsx
  * Created by Kevin Li 6/15/16
  **/

import React from 'react';
import _ from 'lodash';
import ScrollableTable from '../../SharedComponents/table/ScrollableTable.jsx';

export default class CopmarisonTable extends React.Component {

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
		for (let i = 0; i < 20; i++) {
			data.push({
				source: 'award_financial',
				error: 'Check that all fain award number and URI pairs in file C are present in file D2',
				help: 'help'
			});
		}


		const sortFields = ['source', 'error', 'help'];

		const sortedData = _.orderBy(_.clone(data), sortFields[this.state.sortColumn], this.state.sortDirection);

		const output = [];
		sortedData.forEach((row) => {
			output.push([row.source, row.error, row.help]);
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
		const headers = ['Source File', 'Error Message', 'Help'];

		const data = this.buildRow();

		return (
			<div className="comparison-table">
				<ScrollableTable headers={headers} data={data} sortable={true} onSort={this.sortTable.bind(this)} />
			</div>
		)
	}
}