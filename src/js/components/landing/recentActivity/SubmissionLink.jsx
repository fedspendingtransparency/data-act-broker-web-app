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
			page: '/'
		}
	}

	componentDidMount() {	
		SubmissionHelper.getSubmissionPage(this.props.submissionId)
			.then((res) => {
				if(!this.isUnmounted){
					this.setState({page: res.url})
				}
			})
			.catch((err) => {
				if(!this.isUnmounted){
					this.setState({page: '/404'})
				}
			});			
	}

	componentWillUnmount() {
		this.isUnmounted = true;
	}
	render() {
		if(this.props.value){
			return (
				<div className="usa-da-recent-activity-link">
					<a href={"#" + this.state.page} className='date-link'>
						{this.props.value}
					</a>
				</div>
			);	
		}
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