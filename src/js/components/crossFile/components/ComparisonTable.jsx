/**
  * ComparisonTable.jsx
  * Created by Kevin Li 6/15/16
  **/

import React from 'react';
import ScrollableTable from '../../SharedComponents/table/ScrollableTable.jsx';

export default class CopmarisonTable extends React.Component {
	render() {
		const headers = ['Source File', 'Error Message', 'Help'];
		const data = [];
		for (let i = 0; i < 20; i++) {
			data.push(['award_financial', 'Check that all fain award number and URI pairs in file C are present in file D2', 'help']);
		}

		return (
			<div className="comparison-table">
				<ScrollableTable headers={headers} data={data} />
			</div>
		)
	}
}