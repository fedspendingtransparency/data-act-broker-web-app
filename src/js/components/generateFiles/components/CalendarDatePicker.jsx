/**
  * CalendarDatePicker.jsx
  * Created by Kevin Li 7/25/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { keyCodes } from 'dataMapping/keyMappings';

const propTypes = {
    onDateChange: PropTypes.func,
    updateError: PropTypes.func,
    opposite: PropTypes.object,
    value: PropTypes.object,
    title: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool
};

const defaultProps = {
    type: 'startDate',
    onDateChange: null,
    updateError: null,
    opposite: null,
    value: null,
    title: '',
    disabled: false
};

export default class CalendarDatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.delayedBlur = false;
        this.escapeEvent = null;

        this.state = {
            inputValue: '',
            calendarMonth: moment().toDate(),
            showDatePicker: false
        };

        this.handleDatePick = this.handleDatePick.bind(this);
        this.handleTypedDate = this.handleTypedDate.bind(this);
        this.handleDateBlur = this.handleDateBlur.bind(this);
        this.handleDateFocus = this.handleDateFocus.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
    }

    componentDidMount() {
        this.parseValueForInput();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.parseValueForInput();
        }
    }

    parseValueForInput() {
    // convert the date to something typeable
        if (this.props.value !== null) {
            const inputValue = this.props.value.format('MM/DD/YYYY');
            const calendarMonth = this.props.value.toDate();
            this.setState({
                inputValue,
                calendarMonth
            });
        }
    }

    handleMonthChange(newMonth) {
        this.setState({
            calendarMonth: newMonth
        });
    }

    toggleDatePicker(e) {
        e.preventDefault();

        if (!this.props.disabled || this.state.showDatePicker) {
            this.setState({
                showDatePicker: !this.state.showDatePicker
            }, this.datePickerChangeEvent.bind(this));
        }
    }

    datePickerChangeEvent() {
        if (this.state.showDatePicker) {
            // we want to close the date picker on escape key
            // have to hold a reference to the bound function in order to cancel the listener later
            this.escapeEvent = this.escapeDatePicker.bind(this);
            window.addEventListener('keyup', this.escapeEvent);
        }
        else {
            // date picker is now closed, stop listening for this event
            window.removeEventListener('keyup', this.escapeEvent);
            // return focus to the input field
            this.text.focus();
        }
    }

    escapeDatePicker(e) {
        if (e.keyCode === keyCodes.esc) {
            this.toggleDatePicker(e);
        }
    }

    handleDatePick(day) {
        this.props.onDateChange(day, this.props.type);
        this.props.updateError();
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
                this.handleDatePick(date.toDate());
            }
        });
    }

    handleInputBlur() {
        if (this.state.inputValue.length > 0 && !this.props.value) {
            // if user added input into the input field and no date has been set, then input is invalid
            this.props.updateError('Invalid Date', 'The date entered is not a valid date.');
        }
        else if (this.state.inputValue.length > 0) {
            this.parseValueForInput();
        }
    }

    handleDateBlur() {
    // blur event gets triggered apparently by any child element
    // blur will trigger before focus per W3C, delay the blur logic so that it can be cancelled if focus shifts to
    // a child element
        this.delayedBlur = window.setTimeout(() => {
            this.setState({
                showDatePicker: false
            }, this.datePickerChangeEvent.bind(this));
        }, 20);
    }

    handleDateFocus() {
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

        // handle null dates for the calendar default month and selected date
        let pickedDay = null;
        if (this.props.value) {
            // convert the moment object to a JS date object
            pickedDay = this.props.value.toDate();
        }
        else if (this.props.opposite) {
            // a start/end date was already picked
            pickedDay = this.props.opposite.toDate();
        }

        // handle the cutoff dates (preventing end dates from coming before start dates or vice versa)
        let disabledDays = null;
        if (this.props.type === 'startDate' && this.props.opposite) {
            // the cutoff date represents the latest possible date
            disabledDays = { after: this.props.opposite.toDate() };
        }
        else if (this.props.type === 'endDate' && this.props.opposite) {
            // cutoff date represents the earliest possible date
            disabledDays = { before: this.props.opposite.toDate() };
        }

        let disabledClass = '';
        if (this.props.disabled) {
            disabledClass = ' disabled';
        }

        return (
            <div className="generate-datepicker-wrap">
                <div className={`generate-datepicker${disabledClass}`}>
                    <input
                        type="text"
                        placeholder={this.props.title}
                        value={this.state.inputValue}
                        ref={(c) => {
                            this.text = c;
                        }}
                        onChange={this.handleTypedDate}
                        onBlur={this.handleInputBlur.bind(this)}
                        disabled={this.props.disabled} />
                    <button
                        onClick={this.toggleDatePicker.bind(this)}
                        className="usa-da-icon picker-icon date"
                        aria-haspopup="true"
                        aria-label="date picker">
                        <FontAwesomeIcon icon={['far', 'calendar-alt']} />
                    </button>
                </div>
                <div
                    className={`floating-datepicker${showDatePicker}`}
                    role="dialog"
                    aria-label="floating-date-picker"
                    ref={(c) => {
                        this.datepicker = c;
                    }}>
                    <DayPicker
                        month={this.state.calendarMonth}
                        disabled={disabledDays}
                        selected={pickedDay}
                        mode="single"
                        onDayClick={this.handleDatePick}
                        onMonthChange={this.handleMonthChange}
                        onFocus={this.handleDateFocus}
                        onBlur={this.handleDateBlur} />
                </div>
            </div>
        );
    }
}

CalendarDatePicker.propTypes = propTypes;
CalendarDatePicker.defaultProps = defaultProps;
