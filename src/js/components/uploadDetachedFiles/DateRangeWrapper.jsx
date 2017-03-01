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

	updateError(file, header, description) {
		console.log('wrapper', file)
		this.props.updateError(file, header, description);
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
										updateError={this.props.updateError} 
										disabled={this.props.disabled} />
							<div className="through-text">
								through
							</div>
							<DatePicker type="endDate" 
										title={this.props.value.datePlaceholder + " End Date"} 
										tabIndex={this.props.startingTab + 4} 
										onDateChange={this.props.handleDateChange} 
										value={this.props.value.endDate} 
										opposite={this.props.value.startDate} 
										updateError={this.props.updateError} 
										disabled={this.props.disabled} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}