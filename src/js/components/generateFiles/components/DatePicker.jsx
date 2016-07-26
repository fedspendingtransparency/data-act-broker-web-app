/**
  * DatePicker.jsx
  * Created by Kevin Li 7/25/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';
import DayPicker from 'react-day-picker';
import moment from 'moment';

const defaultProps = {
	type: 'startDate',
	tabIndex: 1
};

export default class DatePicker extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showDatePicker: false
		};
	}

	toggleDatePicker(e) {
		e.preventDefault();

		this.setState({
			showDatePicker: !this.state.showDatePicker
		}, () => {
			console.log(this.refs.datepicker.focus());
			this.refs.datepicker.focus();
		});
	}

	handleDatePick(e, day) {
		console.log(day);
	}

	render() {

		let showDatePicker = ' hide';
		if (this.state.showDatePicker) {
			showDatePicker = '';
		}

		return (
			<div className="generate-datepicker-wrap">
				<div className="generate-datepicker">
	            	<input type="text" placeholder={this.props.title} tabIndex={this.props.tabIndex} />
	                <a href="#" onClick={this.toggleDatePicker.bind(this)} tabIndex={this.props.tabIndex + 1} className="usa-da-icon picker-icon date">
	                    <Icons.Calendar alt="Date picker" />
	                </a>
	            </div>
	            <div className={"floating-datepicker" + showDatePicker} ref="datepicker">
	            	<DayPicker initialMonth={moment().toDate()} onDayClick={this.handleDatePick.bind(this)} />
	            </div>
            </div>
		)
	}
}

DatePicker.defaultProps = defaultProps;