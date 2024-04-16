/**
  * DateDropdown.jsx
  * Created by Kevin Li 5/19/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as UtilHelper from '../../../helpers/util';

const propTypes = {
    onChange: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string,
    hasError: PropTypes.bool
};

const defaultProps = {
    onChange: null,
    type: '',
    value: '',
    hasError: false
};

export default class DateDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            month: moment().format('MM/YYYY'),
            quarter: '07/2021-09/2021'
        };
    }

    componentDidMount() {
        this.setValue();
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type || this.props.value !== prevProps.value) {
            this.setValue();
        }
    }

    setValue() {
        if (this.props.type === "quarter") {
            this.setState({
                quarter: this.props.value
            });
        }
        else {
            this.setState({
                month: this.props.value
            });
        }
    }

    generateDates() {
        const months = [];
        const years = [];

        for (let i = 0; i < 12; i++) {
            // skipping period 2
            if (i !== 10) {
                months.push({
                    string: moment().month(i).format('MMMM'),
                    value: moment().month(i).format('MM'),
                    period: moment().month(i + 3).format('MM'),
                    nextMonString: moment().month(i + 1).format('MMMM'),
                    nextMonValue: moment().month(i + 1).format('MM'),
                    nextMonPeriod: moment().month(i + 4).format('MM')
                });
            }
        }

        for (let i = -2; i <= 1; i++) {
            years.push(moment().add(i, 'years').format('YYYY'));
        }

        const dates = [];
        years.forEach((year) => {
            months.forEach((month) => {
                const fy = parseInt(month.value, 10) > 9 ? parseInt(year, 10) + 1 : year;
                let monthString = `FY${fy} P${month.period} - ${month.string} ${year}`;
                let monthValue = `${month.value}/${year}-${month.value}/${year}`;
                // converting period 1 to include 2
                if (month.value === '10') {
                    monthString = `FY${fy} P${month.period}/P${month.nextMonPeriod} - ` +
                        `${month.string}/${month.nextMonString} ${year}`;
                    monthValue = `${month.value}/${year}-${month.nextMonValue}/${year}`;
                }
                dates.push({
                    string: monthString,
                    value: monthValue
                });
            });
        });

        return dates;
    }

    generateQuarters() {
        // since we are past the start of FY22 from now on all quarters will be hardcoded
        const years = ['2017', '2018', '2019', '2020', '2021'];
        const quarters = [];
        years.forEach((year) => {
            for (let i = 1; i <= 4; i++) {
                quarters.push({
                    string: `Quarter ${i} - ${year}`,
                    value: `${UtilHelper.quarterToMonth(i, year, 'start')}-${UtilHelper.quarterToMonth(i, year, 'end')}`
                });
            }
        });

        return quarters;
    }

    dateChanged(e) {
        e.preventDefault();
        this.props.onChange(e.target.value);
    }

    render() {
        let value;
        let dates;
        if (this.props.type === "quarter") {
            dates = this.generateQuarters().map((date) =>
                (
                    <option
                        key={date.value}
                        value={date.value}>{date.string}
                    </option>));
            value = this.state.quarter;
        }
        else {
            dates = this.generateDates().map((date) =>
                (
                    <option
                        key={date.value}
                        value={date.value}>{date.string}
                    </option>));
            value = this.state.month;
        }

        let errorClass = '';
        if (this.props.hasError) {
            errorClass = ' error';
        }

        return (
            <select
                className={`usa-da-date-dropdown${errorClass}`}
                aria-label={`Select date: ${this.props.label}`}
                onChange={this.dateChanged.bind(this)}
                value={value}>
                {dates}
            </select>
        );
    }
}

DateDropdown.propTypes = propTypes;
DateDropdown.defaultProps = defaultProps;
