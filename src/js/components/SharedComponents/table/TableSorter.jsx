/**
  * TableSorter.jsx
  * Created by Kevin Li 3/31/16
  */

import React from 'react';

const propTypes = {
    onSort: React.PropTypes.func.isRequired
};

export default class TableSorter extends React.Component {

	sortAsc() {
		this.props.onSort('asc', this.props.col);
	}
	sortDesc() {
		this.props.onSort('desc', this.props.col);
	}

	render() {
		return (
			<div className="usa-da-table-sorter">
				<div className="sort-icon usa-da-icon usa-da-icon-angle-up" onClick={this.sortAsc.bind(this)}></div>
				<div className="sort-icon usa-da-icon usa-da-icon-angle-down" onClick={this.sortDesc.bind(this)}></div>
			</div>
		);
	}
}

TableSorter.propTypes = propTypes;
