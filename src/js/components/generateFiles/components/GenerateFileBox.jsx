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
                	File D1: Procurement Awards (FPDS data)
                </div>
                <div className="date-range-wrapper">
                	<DatePicker type="startDate" title="Sign Start Date" tabIndex={1} />
                	<div className="through-text">
                		through
                	</div>
                	<DatePicker type="endDate" title="Sign End Date" tabIndex={4} />
                </div>
            </div>
		)
	}
}