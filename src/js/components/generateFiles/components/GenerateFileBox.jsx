/**
  * GenerateFileBox.jsx
  * Created by Kevin Li 7/25/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';
import DatePicker from './DatePicker.jsx';

const defaultProps = {
	startingTab: 1
};

export default class GenerateFileBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showError: false,
			errorHeader: '',
			errorDescription: ''
		};
	}

	showError(header, description) {
		this.setState({
			showError: true,
			errorHeader: header,
			errorDescription: description
		});
	}

	hideError() {
		this.setState({
			showError: false
		});
	}

	render() {
		let errorClass = ' hide';
		if (this.state.showError) {
			errorClass = '';
		}

		return (
			<div>
				<div className="usa-da-generate-item">
	                <div className="file-full-name">
	                	{this.props.label}
	                </div>
	                <div className="date-range-wrapper">
	                	<DatePicker type="startDate" title={this.props.datePlaceholder + " Start Date"} tabIndex={this.props.startingTab} onDateChange={this.props.onDateChange} value={this.props.value.startDate} opposite={this.props.value.endDate} />
	                	<div className="through-text">
	                		through
	                	</div>
	                	<DatePicker type="endDate" title={this.props.datePlaceholder + " End Date"} tabIndex={this.props.startingTab + 4} onDateChange={this.props.onDateChange} value={this.props.value.endDate} opposite={this.props.value.startDate} />
	                </div>
	            </div>

                <div className={"alert alert-error text-left" + errorClass} role="alert">
	                <span className="usa-da-icon error-icon"><Icons.ExclamationCircle /></span>
					<div className="alert-header-text">{this.state.errorHeader}</div>
					<p>{this.state.errorDescription}</p>
				</div>
            </div>
		)
	}
}

GenerateFileBox.defaultProps = defaultProps;