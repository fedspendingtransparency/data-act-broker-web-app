/**
  * GenerateFileBox.jsx
  * Created by Kevin Li 7/25/16
  **/

import React from 'react';

import DatePicker from './DatePicker.jsx';

export default class GenerateFileBox extends React.Component {

	render() {
		return (
			<div className="usa-da-generate-item">
                <div className="file-full-name">
                	{this.props.label}
                </div>
                <div className="date-range-wrapper">
                	<DatePicker type="startDate" title={this.props.datePlaceholder + " Start Date"} tabIndex={1} onDateChange={this.props.onDateChange} value={this.props.value.startDate} cutoff={this.props.value.endDate} />
                	<div className="through-text">
                		through
                	</div>
                	<DatePicker type="endDate" title={this.props.datePlaceholder + " End Date"} tabIndex={5} onDateChange={this.props.onDateChange} value={this.props.value.endDate} cutoff={this.props.value.startDate} />
                </div>
            </div>
		)
	}
}