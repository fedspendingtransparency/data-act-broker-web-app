/**
  * TableSorter.jsx
  * Created by Kevin Li 3/31/16
  */

import React from 'react';
import * as Icons from '../icons/Icons.jsx';

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
				<div className="usa-da-icon sort-icon usa-da-icon-angle-up" onClick={this.sortAsc.bind(this)}><Icons.AngleUp /></div>
				<div className="usa-da-icon sort-icon usa-da-icon-angle-down" onClick={this.sortDesc.bind(this)}><Icons.AngleDown /></div>
			</div>
		);
	}
}

TableSorter.propTypes = propTypes;
