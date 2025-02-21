/**
 * LastModifiedFilter.jsx
 * Created by Lizzie Salita 2/7/20
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

const propTypes = {
    enteredDate: PropTypes.func,
    pickedDates: PropTypes.func,
    selectedDates: PropTypes.shape({
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date)
    })
};

const LastModifiedFilter = (props) => {

    useEffect(() => {
        const handler = (event) => {
            // if there is no calendar ref, do nothing
            if (!calendarRef.current) {
                return;
            }

            // if click is outside the calendar element, close the calendar
            if (!calendarRef.current.contains(event.target)) {
                setFocusType(null);
                setIsCalendarOpen(false);
            }
        };

        document.addEventListener("click", handler, true);
        return () => {
            document.removeEventListener("click", handler);
        };
    }, []);

    const handleInputChange = (e) => {
        const inputType = e.target.id.substr('last-modified__'.length);
        const inputVal = e.target.value;
        const isValidDate = moment(inputVal, 'MM/DD/YYYY', true).isValid();

        // keep the input value in sync
        if (isValidDate) {
            if (inputType === 'start') {
                // if the new start date is later than the old end date, make it the new end date
                if (props.selectedDates.to && props.selectedDates.to < new Date(inputVal)) {
                    const dateRange = {from: null,
                        to: new Date(inputVal)
                    };
                    setInputValueStart('');
                    setInputValueEnd(inputVal);
                    props.pickedDates(dateRange);
                }
                else {
                    setInputValueStart(inputVal);
                    props.enteredDate(new Date(inputVal), inputType);
                }
            }
            else {
                // if the new end date is earlier than the old start date, make it the new start date
                if (props.selectedDates.from && props.selectedDates.from > new Date(inputVal)) {
                    const dateRange = {from: new Date(inputVal),
                        to: null
                    };
                    setInputValueStart(inputVal);
                    setInputValueEnd('');
                    props.pickedDates(dateRange);
                }
                else {
                    setInputValueEnd(inputVal);
                    props.enteredDate(new Date(inputVal), inputType);
                }
            }
        }
        else {
            if (inputType === 'start') {
                setInputValueStart(inputVal);
            }
            else {
                setInputValueEnd(inputVal);
            }
            // if the input value isn't a valid date, always make it null in the filter
            props.enteredDate(null, inputType);
        }
    }

    // Determines which input is being focused and opens the calendar if one is
    const focusChange = (focusType) => {
        setFocusType(focusType);
        setIsCalendarOpen(true);
    }

    const dateSelected = (dates) => {
        if (dates !== undefined) {
            if (currentFocusType === 'start') {
                // if the dates are the same and the start is being focused, set the end date to null
                if (dates.from === dates.to) {
                    setInputValueEnd('');
                    dates['to'] = null;
                }
                // react-day-picker always moves the "to" date unless the date selected is earlier than the old
                // "from" date, so we have to get a little creative to move the "from" date instead
                // if the new date is earlier than the old latest date, keep the old latest date
                else if (dates.from === props.selectedDates.from && dates.to < props.selectedDates.to) {
                    dates['from'] = dates.to;
                    dates['to'] = props.selectedDates.to;
                    
                }
                // if it's later than the current latest date, make the latest date null
                else if (dates.from === props.selectedDates.from && dates.to > props.selectedDates.to) {
                    dates['from'] = dates.to;
                    dates['to'] = null;
                    setInputValueEnd('');
                }

                setInputValueStart(format(dates.from, 'MM/dd/yyyy'));
                focusEndRef.current.focus();
            }
            else {
                // if the dates are the same and the end is being focused, set the start to null
                if (dates.from === dates.to) {
                    setInputValueStart('');
                    dates['from'] = null;
                }
                // if the end date didn't change but the new start date is earlier than the old one, make the
                // new start date the one listed and set the end date to null
                else if (dates.to === props.selectedDates.to && dates.from < props.selectedDates.from) {
                    setInputValueStart(format(dates.from, 'MM/dd/yyyy'));
                    setInputValueEnd('');
                    dates['to'] = null;
                }

                // if there is still an end date, set the input value to that and close the calendar
                if (dates.to) {
                    setInputValueEnd(format(dates.to, 'MM/dd/yyyy'));
                    setIsCalendarOpen(false);
                }
            }
        }
        // if there are no proper dates being sent, set all inputs to blank and close the calendar
        else {
            setInputValueStart('');
            setInputValueEnd('');
            setIsCalendarOpen(false);
        }

        props.pickedDates(dates);
    }

    const [currentFocusType, setFocusType] = useState(null);
    const focusEndRef = useRef();

    // Hold the calendar visibility in state
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const calendarRef = useRef();

    // Hold the input value in state
    const [inputValueStart, setInputValueStart] = useState("");
    const [inputValueEnd, setInputValueEnd] = useState("");

    // we don't need dates earlier than 2017 because Broker didn't exist then
    const minDate = new Date('2017-01-01');
    // there are no valid submissions past the current month. We can just use today to find that
    const maxDate = new Date();
    // the default month to display should be either the current month or the date of the end date selected
    let endDate = props.selectedDates.to ? moment(props.selectedDates.to) : moment();
    // we subtract one month because otherwise it won't show the second month
    endDate = endDate.subtract(1, 'months').toDate();
    const today = new Date()
    const disabledDays = { after: today };
    const arrowPos = currentFocusType === 'start' ? ' start' : ' end';
    return (
        <div
            className="last-modified-wrapper"
            ref={calendarRef}>
            <div
                className="last-modified-input-wrapper">
                <input
                    type="text"
                    id="last-modified__start"
                    autoComplete="off"
                    className="text-filter__input"
                    placeholder="Start Date"
                    value={inputValueStart}
                    onChange={handleInputChange}
                    onFocus={() => focusChange('start')} />
                -
                <input
                    ref={focusEndRef}
                    type="text"
                    id="last-modified__end"
                    autoComplete="off"
                    className="text-filter__input"
                    placeholder="End Date"
                    value={inputValueEnd}
                    onChange={handleInputChange}
                    onFocus={() => focusChange('end')} />
            </div>
            <div
                style={isCalendarOpen ? { display: 'block' } : { display: 'none' }} >
                <div className={`arrow-up outer${arrowPos}`}></div>
                <div className={`arrow-up${arrowPos}`}></div>
                <div
                    className="dropdown-menu calendar-range-datepicker-wrapper"
                    style={isCalendarOpen ? { display: 'block' } : { display: 'none' }} >
                    <DayPicker
                        fixedWeeks
                        startMonth={minDate}
                        endMonth={maxDate}
                        disabled={[disabledDays]}
                        className="inner-calendar-filter-datepicker"
                        numberOfMonths={2}
                        defaultMonth={endDate}
                        selected={props.selectedDates}
                        mode="range"
                        onSelect={dateSelected} />
                </div>
            </div>
        </div>
    );
};

LastModifiedFilter.propTypes = propTypes;
export default LastModifiedFilter;
