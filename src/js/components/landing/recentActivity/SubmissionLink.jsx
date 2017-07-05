/**
  * SubmissionLink.jsx
  * Created by Kevin Li 05/16/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';
import * as SubmissionHelper from '../../../helpers/submissionGuideHelper.js';

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
	constructor(props) {
		super(props);
	}


	render() {
		if(this.props.value){
			return (
				<div className="usa-da-recent-activity-link">
					<a href={"#/submission/" + this.props.submissionId} className='date-link'>
						{this.props.value}
					</a>
				</div>
			);	
		}
		return (
			<div className="usa-da-recent-activity-link">
				<a href={"#/submission/" + this.props.submissionId}>
					<Icons.Eye alt="View" />
				</a>
			</div>
		);
	}
}

SubmissionLink.propTypes = propTypes;
SubmissionLink.defaultProps = defaultProps;