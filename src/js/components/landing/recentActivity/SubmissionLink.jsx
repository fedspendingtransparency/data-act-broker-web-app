/**
  * SubmissionLink.jsx
  * Created by Kevin Li 05/16/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

const propTypes = {
	submissionId: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
	]).isRequired
}

const defaultProps = {
	submissionId: ''
}

export default class SubmissionLink extends React.Component {
	render() {
		return (
			<div className="usa-da-recent-activity-link">
				<a href={"#/validateData/" + this.props.submissionId}>
					<Icons.Eye alt="View" />
				</a>
			</div>
		);
	}
}

SubmissionLink.propTypes = propTypes;
SubmissionLink.defaultProps = defaultProps;