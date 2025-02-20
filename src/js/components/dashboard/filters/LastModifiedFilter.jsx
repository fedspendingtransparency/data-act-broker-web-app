/**
 * LastModifiedFilter.jsx
 * Created by Lizzie Salita 2/7/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { isOutsideRange, initialVisibleMonth } from 'helpers/datePickerHelper';
import { DayPicker, addToRange } from 'react-day-picker';

const propTypes = {
    pickedDates: PropTypes.func,
    selectedDates: PropTypes.shape({
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date)
    })
};

export default class LastModifiedFilter extends React.Component {
    constructor(props) {
        super(props);

        this.setCalendarRef = (element) => {
            this.calendarNode = element;
        };

        this.state = {
            startVal: this.props.selectedDates.from ? moment(this.props.selectedDates.from).format('MM/DD/YYYY') : '',
            endVal: this.props.selectedDates.to ? moment(this.props.selectedDates.to).format('MM/DD/YYYY') : '',
            startSelected: false,
            endSelected: false,
            calendarOpen: false
        };

        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.changeStart = this.changeStart.bind(this);
        this.changeEnd = this.changeEnd.bind(this);
        this.focusStart = this.focusStart.bind(this);
        this.focusEnd = this.focusEnd.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick, false);
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedDates.from !== prevProps.selectedDates.from ||
            this.props.selectedDates.to !== prevProps.selectedDates.to) {
            const dates = this.props.selectedDates;
            this.setState({
                startVal: dates.from ? moment(dates.from).format('MM/DD/YYYY') : '',
                endVal: dates.to ? moment(dates.to).format('MM/DD/YYYY') : '',
            });
        }
    }

    handleOutsideClick(e) {
        if (this.calendarNode && this.calendarNode.contains(e.target)) {
            return false;
        }
        this.setState({
            calendarOpen: false
        });
        return true;
    }

    changeStart(e) {
        if (moment(e.target.value, 'MM/DD/YYYY', true).isValid() &&
            (this.props.selectedDates.to === null || new Date(e.target.value) <= this.props.selectedDates.to)) {
                console.log('adding');
            this.props.pickedDates(new Date(e.target.value));
        }
        else {
            this.setState({
                startVal: e.target.value
            });
        }
    }

    changeEnd(e) {
        this.setState({
            endVal: e.target.value
        });
    }

    focusStart() {
        this.setState({
            startSelected: true,
            calendarOpen: true
        })
    }

    focusEnd() {
        this.setState({
            endSelected: true,
            calendarOpen: true
        })
    }

    render() {
        console.log(this.props.selectedDates);
        // const [focusedInput, onFocusChange] = useState(null);
        const startDate = moment().subtract(1, 'months').toDate();
        const endDate = this.props.selectedDates.to ? moment(this.props.selectedDates.to) : new Date();
        const today = new Date()
        // const lastMonth = initialVisibleMonth;
        const disabledDays = { after: today };
        const hiddenClass = this.state.calendarOpen ? '' : ' hidden';
        // return (
        //     <DateRangePicker
        //         startDate={startDate} // momentPropTypes.momentObj or null,
        //         startDateId="last-modified__start"
        //         endDate={endDate} // momentPropTypes.momentObj or null,
        //         endDateId="last-modified__end"
        //         onDatesChange={props.pickedDates}
        //         focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        //         onFocusChange={onFocusChange}
        //         isOutsideRange={isOutsideRange}
        //         initialVisibleMonth={lastMonth}
        //         small />
        // );
        return (
            <React.Fragment>
                <input
                    id="last-modified__start"
                    className="text-filter__input"
                    value={this.state.startVal}
                    onChange={this.changeStart}
                    onFocus={this.focusStart} />
                <input
                    id="last-modified__end"
                    className="text-filter__input"
                    value={this.state.endVal}
                    onChange={this.changeEnd}
                    onFocus={this.focusEnd} />
                <div ref={this.setCalendarRef}>
                <DayPicker
                    
                    showOutsideDays
                    fixedWeeks
                    startMonth={startDate}
                    endMonth={endDate}
                    disabled={[disabledDays]}
                    className={`inner-calendar-filter-datepicker${hiddenClass}`}
                    numberOfMonths={2}
                    defaultMonth={endDate}
                    selected={this.props.selectedDates}
                    mode="range"
                    onDayClick={this.props.pickedDates} />
                    </div>
            </React.Fragment>
        )
    }
};

LastModifiedFilter.propTypes = propTypes;
