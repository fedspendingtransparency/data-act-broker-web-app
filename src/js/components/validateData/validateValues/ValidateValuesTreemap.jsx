/**
  * ValidateValuesTreemap.jsx
  * Created by Kevin Li 4/11/2016
  */

import React from 'react';
import Dimensions from 'react-dimensions';
import Treemap from '../treemap/Treemap.jsx';

class ValidateValuesTreemap extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			hoverText: ''
		};
	}

	formatData() {
		const data = [];

		this.props.data.forEach((item) => {
			let value = '<b>' + item.field_name + '</b><br />';
			let description = '';
			if (item.error_name == 'type_error') {
				value += 'type error (' + item.occurrences + ')';
				description = 'There is a type error in the \"' + item.field_name + '\" field. ' + item.error_description;
			}
			else if (item.error_name == 'rule_error') {
				value += 'rule error (' + item.occurrences + ')';
				description = 'There is a rule error in the \"' + item.field_name + '\" field. ' + item.rule_failed;
			}

			data.push({
				label: value,
				value: item.occurrences,
				description: description
			});
		});

		// sort by descending value
		return _.sortBy(data, (o) => {
			return -1 * o.value;
		});
	}

	clickedItem(description) {
		this.setState({
			hoverText: description
		});
	}

	render() {

		let hoverText = this.state.hoverText;
		let hoverTextClass = '';
		if (this.state.hoverText == '') {
			hoverText = 'Click on a block for more information about the ' + this.props.type + '.';
			hoverTextClass = ' default';
		}

		return (
			<div className="row">
				<div className="col-md-9">
					<Treemap data={this.formatData()} width={this.props.containerWidth * 0.75} clickedItem={this.clickedItem.bind(this)} />
				</div>
				<div className="col-md-3">
					<div className={"usa-da-treemap-help-wrap" + hoverTextClass}>
						{hoverText}
					</div>
				</div>
			</div>
		);
	}
}

export default Dimensions()(ValidateValuesTreemap)