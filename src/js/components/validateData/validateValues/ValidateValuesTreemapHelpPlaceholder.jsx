/**
  * ValidateValuesTreemapHelpPlaceholder.jsx
  * Created by Kevin Li 6/20/16
  **/

import React from 'react';

const defaultProps = {
	type: 'error'
};

export default class ValidateValuesTreemapHelpPlaceholder extends React.Component {
	render() {
		return (
			<div className="usa-da-treemap-help-wrap">
				Click on a block for more information about the {this.props.type}.
			</div>
		)
	}
}

ValidateValuesTreemapHelpPlaceholder.defaultProps = defaultProps;