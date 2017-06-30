/**
  * DetachedHistoryLink.jsx
  * Created by Daniel Boos 6/29/17
  **/

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

const propTypes = {
	submissionId: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
	]).isRequired
}

const defaultProps = {
	submissionId: ''
}

export default class DetachedHistoryLink extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="usa-da-recent-activity-link">
				<a href={"#/submissionHistory/" + this.props.submissionId}>
					<Icons.Calendar alt="View" />
				</a>
			</div>
		);
	}
}

DetachedHistoryLink.propTypes = propTypes;
DetachedHistoryLink.defaultProps = defaultProps;