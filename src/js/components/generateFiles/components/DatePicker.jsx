/**
  * DatePicker.jsx
  * Created by Kevin Li 7/25/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';

const defaultProps = {
	type: 'startDate',
	tabIndex: 1
};

export default class DatePicker extends React.Component {

	constructor(props) {
		super(props);

		this.delayedBlur = false;
		this.escapeEvent;

		this.state = {
			inputValue: '',
			showDatePicker: false
		};
	}

	componentDidMount() {
		this.parseValueForInput();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.value != this.props.value) {
			this.parseValueForInput();
		}
	}

	parseValueForInput() {
		// convert the date to something typeable
		if (this.props.value != null) {
			let inputValue = this.props.value.format('MM/DD/YYYY');
			this.setState({
				inputValue: inputValue
			});
		}
	}

	toggleDatePicker(e) {
		e.preventDefault();

		this.setState({
			showDatePicker: !this.state.showDatePicker
		}, this.datePickerChangeEvent.bind(this));
	}

	datePickerChangeEvent() {

		if (this.state.showDatePicker) {
			// focus on the date picker
			this.refs.datepicker.refs.dayPicker.querySelector('.DayPicker-Day--selected').focus();

			// we want to close the date picker on escape key
			// have to hold a reference to the bound function in order to cancel the listener later
			this.escapeEvent = this.escapeDatePicker.bind(this);
			window.addEventListener('keyup',this.escapeEvent);
		}
		else {
			// date picker is now closed, stop listening for this event
			window.removeEventListener('keyup', this.escapeEvent);
			// return focus to the input field
			this.refs.text.focus();
		}
	}

	escapeDatePicker(e) {
		if (e.keyCode === 27) {
			this.toggleDatePicker(e);
		}
	}

	handleDatePick(e, day) {
		this.props.onDateChange(day, this.props.type);
		// close the popup if is shown
		if (this.state.showDatePicker) {
			this.setState({
				showDatePicker: false
			}, this.datePickerChangeEvent.bind(this));
		}
	}

	handleTypedDate(e) {
		// update the string state of the input field
		this.setState({
			inputValue: e.target.value
		}, () => {

			// check if this meets the MM/DD/YYYY format requirement
			let format = 'MM/DD/YYYY';
			const primaryFormat = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
			// secretly check for a secondary format
			const secondaryFormat = /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/;

			const matchedFirst = primaryFormat.test(this.state.inputValue);
			const matchedSecond = secondaryFormat.test(this.state.inputValue);

			if (!matchedFirst && !matchedSecond) {
				// doesn't match either format, user may still be typing or just entered invalid data
				return;
			}
			else if (!matchedFirst && matchedSecond) {
				// only matched the second format
				format = 'M/D/YYYY';
			}


			// determine if this is a parseable date
			const date = moment(this.state.inputValue, format);
			if (date.isValid()) {
				// it's a valid date
				this.handleDatePick(null, date.toDate());
			}
		});
	}

	handleDateBlur(e) {
		// blur event gets triggered apparently by any child element
		// blur will trigger before focus per W3C, delay the blur logic so that it can be cancelled if focus shifts to a child element
		this.delayedBlur = window.setTimeout(() => {
			this.setState({
				showDatePicker: false
			}, this.datePickerChangeEvent.bind(this));
		}, 20);
	}

	handleDateFocus(e) {

		// check if we lost focus from the parent element, if so cancel that blur event
		if (this.delayedBlur) {
			window.clearTimeout(this.delayedBlur);
			this.delayedBlur = null;
		}
	}

	render() {

		let showDatePicker = ' hide';
		if (this.state.showDatePicker) {
			showDatePicker = '';
		}

		// handle null dates for the calendar default month and selecte date
		let pickedDay = null;
		if (this.props.value) {
			// convert the moment object to a JS date object
			pickedDay = this.props.value.toDate();
		}
		else if (this.props.opposite) {
			// a start/end date was already picked
			pickedDay = this.props.opposite.toDate();
		}
		else {
			// no dates have been chosen at all, default to the current date
			pickedDay = moment().toDate();
		}

		// handle the cutoff dates (preventing end dates from coming before start dates or vice versa)
		let cutoffFunc = null;
		if (this.props.type == 'startDate' && this.props.opposite) {
			// the cutoff date represents the latest possible date
			cutoffFunc = (day) => {
				return moment(day).isAfter(this.props.opposite);
			};
		}
		else if (this.props.type == 'endDate' && this.props.opposite) {
			// cutoff date represents the earliest possible date
			cutoffFunc = (day) => {
				return moment(day).isBefore(this.props.opposite);
			};
		}

		return (
			<div className="generate-datepicker-wrap">
				<div className="generate-datepicker">
	            	<input type="text" placeholder={this.props.title} value={this.state.inputValue} onChange={this.handleTypedDate.bind(this)} tabIndex={this.props.tabIndex} ref="text" />
	                <a href="#" onClick={this.toggleDatePicker.bind(this)} tabIndex={this.props.tabIndex + 1} className="usa-da-icon picker-icon date">
	                    <Icons.Calendar alt="Date picker" />
	                </a>
	            </div>
	            <div className={"floating-datepicker" + showDatePicker}>
	            	<DayPicker selectedDays={day => DateUtils.isSameDay(pickedDay, day)} initialMonth={pickedDay} disabledDays={cutoffFunc} onDayClick={this.handleDatePick.bind(this)} onFocus={this.handleDateFocus.bind(this)} onBlur={this.handleDateBlur.bind(this)} ref="datepicker" />
	            </div>
            </div>
		)
	}
}

DatePicker.defaultProps = defaultProps;