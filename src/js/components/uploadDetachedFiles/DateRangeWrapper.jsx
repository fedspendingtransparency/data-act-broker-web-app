/**
* DateRangeWrapper.jsx
* Created by Michael Hess
**/

import React from 'react';
import DatePicker from '../generateFiles/components/DatePicker.jsx'

export default class DateRangeWrapper extends React.Component {
	handleDateChange(file, date, dateType) {
		this.props.handleDateChange(file, date, dateType);
	}

	showError(file, header, description) {
		this.props.showError(file, header, description);
	}

	hideError(file) {
		this.props.hideError(file);
	}

	render() {
		return (
			<div className="usa-da-date-select dashed-border-top">
				<div className="usa-da-generate-item-wrap">
					<div className="usa-da-generate-item">
						<div className="file-full-name">
							{this.props.value.label}
						</div>
						<div className="date-range-wrapper">
							<DatePicker type="startDate" 
										title={this.props.value.datePlaceholder + " Start Date"} 
										tabIndex={this.props.startingTab} 
										onDateChange={this.props.handleDateChange} 
										value={this.props.value.startDate} 
										opposite={this.props.value.endDate}  
										showError={this.props.showError} 
										hideError={this.props.hideError} />
							<div className="through-text">
								through
							</div>
							<DatePicker type="endDate" 
										title={this.props.value.datePlaceholder + " End Date"} 
										tabIndex={this.props.startingTab + 4} 
										onDateChange={this.props.handleDateChange} 
										value={this.props.value.endDate} 
										opposite={this.props.value.startDate} 
										showError={this.props.showError} 
										hideError={this.props.hideError} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}