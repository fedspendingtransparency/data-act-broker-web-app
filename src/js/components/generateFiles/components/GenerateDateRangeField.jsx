/**
  * GenerateDateRangeField.jsx
  * Created by Kevin Li 7/22/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';
import DatePicker from './DatePicker.jsx';

export default class GenerateDateRangeField extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			dateError: false,
		};
	}

	handleDatePick(picker, date) {
		console.log(picker);
	}

	render() {
		let dateClass = '';
        if (this.state.dateError) {
            dateClass = 'error';
        }


		return (
			<div>
				<div className="row usa-da-add-data-meta-label usa-da-range">
                    The generated files include data from...
                </div>
                <div className="row">
                    <div className="col-sm-4 col-md-4 mt-5 usa-da-startDate">
                    	<DatePicker type="startDate" handleDatePick={this.handleDatePick.bind(this, 'startDate')} />
                    </div>
                </div>
            </div>
		)
	}
}
