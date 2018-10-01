import React, { PropTypes } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';

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
    };

    this.onDropdownChange = this.onDropdownChange.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  onDropdownChange() {
    const currentState = this.state.dropdownopen;
    this.setState({
      dropdownopen: !currentState,
    });
  }

  sendToFilters() {
    if (this.dateValues.to) {
      console.log(this.dateValues, 'the date');
      this.props.onSelect({
        startDate: this.dateValues.from,
        endDate: this.dateValues.to,
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
    this.dateValues.from = from;
    this.dateValues.to = to;
    this.sendToFilters();
    return (
      <div className="dropdown filterdropdown">
        <button onClick={this.onDropdownChange} className={this.state.dropdownopen ? 'btn btn-default dropdown-toggle active' : 'btn btn-default dropdown-toggle'} type="button" id="createdbydropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Last Modified
          <span className="caret" />
        </button>
        <ul className="dropdown-menu" style={this.state.dropdownopen ? { display: 'block' } : { display: 'none' }} aria-labelledby="createdbydropdown">
          <li>
            <div className="RangeCalendarRangeDatePicker">
              <p>
                {!from && !to && 'Please select the first day.'}
                {from && !to && 'Please select the last day.'}
                {from && to && `Selected from ${from.toLocaleDateString()} to
                  ${to.toLocaleDateString()}`}
              </p>
              <DayPicker
                className="Selectable"
                numberOfMonths={this.props.numberOfMonths}
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}
              />
            </div>
          </li>
        </ul>
      </div>

    );
  }
}

CalendarRangeDatePicker.propTypes = propTypes;
CalendarRangeDatePicker.defaultProps = defaultProps;
