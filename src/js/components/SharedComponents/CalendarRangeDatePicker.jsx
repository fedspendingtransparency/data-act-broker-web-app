import React from 'react';
import PropTypes from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';

import Moment from 'moment';
import Navbar from './CalendarRangeDatePickerNavbar';

const propTypes = {
    numberOfMonths: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
    minmaxDates: PropTypes.object
};

const defaultProps = {
    numberOfMonths: 2,
    minmaxDates: {
        maxDate: '',
        minDate: ''
    }
};

export default class CalendarRangeDatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownopen: false,
            from: null,
            to: null
        };

        this.dropdownNode = null;

        this.setDropdownNodeRef = (element) => {
            this.dropdownNode = element;
        };

        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.sendToFilters = this.sendToFilters.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick, false);
    }

    onDropdownChange() {
        const currentState = this.state.dropdownopen;
        this.setState({
            dropdownopen: !currentState
        });
    }

    handleOutsideClick(e) {
        if (this.dropdownNode && this.dropdownNode.contains(e.target)) {
            return false;
        }
        this.setState({
            dropdownopen: false
        });
        return true;
    }


    sendToFilters() {
        if (this.state.to) {
            const dates = {
                startDate: Moment(this.state.from).format('MM/DD/YYYY'),
                endDate: Moment(this.state.to).format('MM/DD/YYYY')
            };
            this.props.onSelect(dates);
            this.setState({
                dropdownopen: false,
                from: '',
                to: ''
            });
        }
    }

    handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
    }

    drawDatePicker() {
        const { minDate, maxDate } = this.props.minmaxDates;
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        const disabledDays = { before: minDate, after: maxDate };
        if (this.props.minmaxDates.maxDate && this.props.minmaxDates.minDate) {
            return (<DayPicker
                showOutsideDays
                fixedWeeks
                fromMonth={minDate}
                toMonth={maxDate}
                disabledDays={[disabledDays]}
                navbarElement={<Navbar />}
                className="innerCalendarDatePicker"
                numberOfMonths={this.props.numberOfMonths}
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick} />);
        }
        return <p>Loading Dates...</p>;
    }

    render() {
        return (
            <div className="dropdown filterdropdown" ref={this.setDropdownNodeRef}>
                <button
                    onClick={this.onDropdownChange}
                    className={this.state.dropdownopen ?
                        'btn btn-default dropdown-toggle active' : 'btn btn-default dropdown-toggle'}
                    type="button"
                    id="createdbydropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true">
                    Last Modified
                    <span className="caret" />
                </button>
                <div
                    className="dropdown-menu calendar-range-datepicker"
                    style={this.state.dropdownopen ? { display: 'block' } : { display: 'none' }}
                    aria-labelledby="createdbydropdown">
                    <ul>
                        <li>
                            <div className="RangeCalendarRangeDatePicker">
                                {this.drawDatePicker()}
                            </div>
                            <div className="button-bar">
                                <button
                                    className="btn btn-primary"
                                    disabled={!this.state.to}
                                    onClick={this.sendToFilters}>
                                    Add Filter
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}

CalendarRangeDatePicker.propTypes = propTypes;
CalendarRangeDatePicker.defaultProps = defaultProps;
