/**
  * ValidateValuesTreemap.jsx
  * Created by Kevin Li 4/11/2016
  */

import React from 'react';
import Dimensions from 'react-dimensions';
import _ from 'lodash';
import Treemap from '../treemap/Treemap.jsx';
import TreemapHelp from './ValidateValuesTreemapHelp.jsx'
import TreemapHelpPlaceholder from './ValidateValuesTreemapHelpPlaceholder.jsx'

class ValidateValuesTreemap extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selected: null,
			formattedData: {
				data: [],
				max: 0,
				min: 0
			}
		};
	}

	componentDidMount() {
		this.formatData();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(prevProps.data, this.props.data)) {
			this.formatData();
		}
	}

	formatData() {
		const data = [];

		let maxCount = null;
		let minCount = null;

		this.props.data.forEach((item) => {

			let detail = null;
			if (item.error_name == 'rule_failed') {
				detail = item.rule_failed;
			}


			// calculate the max and min occurrences, this will be used by the treemap to determine the color/shade
			if (!maxCount || maxCount < item.occurrences) {
				maxCount = item.occurrences;
			}
			if (!minCount || minCount > item.occurrences) {
				minCount = item.occurrences;
			}


			data.push({
				rule: item.field_name,
				value: item.occurrences,
				field: item.field_name,
				description: item.error_description,
				detail: detail
			});
		});

		// sort by descending value
		this.setState({
			formattedData: {
				data: _.orderBy(data, ['value', 'rule'], 'desc'),
				min: minCount,
				max: maxCount
			}
		});
	}

	clickedItem(item) {
		this.setState({
			selected: item
		});
	}

	render() {

		let help = <TreemapHelpPlaceholder type={this.props.type} />;
		if (this.state.selected) {
			help = <TreemapHelp {...this.state.selected} type={this.props.type} />;
		}

		return (
			<div className="row">
				<div className="col-md-9">
					<Treemap formattedData={this.state.formattedData} width={this.props.containerWidth * 0.75} clickedItem={this.clickedItem.bind(this)} />
				</div>
				<div className="col-md-3">
					{help}
				</div>
			</div>
		);
	}
}

export default Dimensions()(ValidateValuesTreemap)