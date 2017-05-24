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
		this.state = {
			page: '/'
		}
	}

	componentDidMount() {
		SubmissionHelper.getSubmissionPage(this.props.submissionId)
			.then((res) => {
				this.setState({page: res.url})
			});
	}
	render() {
		return (
			<div className="usa-da-recent-activity-link">
				<a href={"#" + this.state.page}>
					<Icons.Eye alt="View" />
				</a>
			</div>
		);
	}
}

SubmissionLink.propTypes = propTypes;
SubmissionLink.defaultProps = defaultProps;