import React, { PropTypes } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';

import Moment from 'moment';

const propTypes = {
  numberOfMonths: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

const defaultProps = {
  numberOfMonths: 2,
};

export default class CalendarRangeDatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.dateValues = {};

    this.state = {
      dropdownopen: false,
      from: null,
      to: null,
    };

    this.onDropdownChange = this.onDropdownChange.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.sendToFilters = this.sendToFilters.bind(this);
  }

  onDropdownChange() {
    const currentState = this.state.dropdownopen;
    this.setState({
      dropdownopen: !currentState,
    });
  }

  sendToFilters() {
    if (this.dateValues.to) {
      const dates = {
        startDate: Moment(this.dateValues.from).format('MM/DD/YYYY'),
        endDate: Moment(this.dateValues.to).format('MM/DD/YYYY'),
      };
      this.props.onSelect(dates);
      this.setState({
        dropdownopen: false,
        from: '',
        to: '',
      });
    }
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    this.dateValues = this.state;
    return (
      <div className="dropdown filterdropdown">
        <button onClick={this.onDropdownChange} className={this.state.dropdownopen ? 'btn btn-default dropdown-toggle active' : 'btn btn-default dropdown-toggle'} type="button" id="createdbydropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Last Modified
          <span className="caret" />
        </button>
        <ul className="dropdown-menu calendar-range-datepicker" style={this.state.dropdownopen ? { display: 'block' } : { display: 'none' }} aria-labelledby="createdbydropdown">
          <li>
            <div className="RangeCalendarRangeDatePicker">
              <DayPicker
                showOutsideDays
                className="innerCalendarDatePicker"
                numberOfMonths={this.props.numberOfMonths}
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}
              />
            </div>
            <button className="btn btn-primary" onClick={this.sendToFilters}> Send Value</button>
          </li>
        </ul>
      </div>

    );
  }
}

CalendarRangeDatePicker.propTypes = propTypes;
CalendarRangeDatePicker.defaultProps = defaultProps;
