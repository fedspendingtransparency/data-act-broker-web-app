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
		this.isUnmounted = false;
		this.state = {
			page: '/',
			submissionId: null
		}
	}

	componentDidMount() {	
		this.getPage(this.props.submissionId);
	}

	componentWillUnmount() {
		this.isUnmounted = true;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.submissionId !== this.state.submissionId) {
			this.getPage(nextProps.submissionId);
		}
	}

	getPage(submissionId) {
		SubmissionHelper.getSubmissionPage(submissionId)
			.then((res) => {
				if(!this.isUnmounted){
					this.setState({
						page: res.url,
						submissionId: submissionId
					});
				}
			})
			.catch((err) => {
				if(!this.isUnmounted){
					this.setState({
						page: '/404',
						submissionId: null
					});
				}
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