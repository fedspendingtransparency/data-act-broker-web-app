/**
  * DateRangeField.jsx
  * Created by Kevin Li 5/19/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as DashboardHelper from 'helpers/dashboardHelper';
import * as utils from 'helpers/util';
import * as Icons from '../../SharedComponents/icons/Icons';
import DateDropdown from './DateDropdown';

const propTypes = {
    onChange: PropTypes.func,
    type: PropTypes.string
};

const defaultProps = {
    onChange: null,
    type: ''
};

export default class DateRangeField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: moment().format('MM/YYYY'),
            endDate: moment().format('MM/YYYY'),
            dateError: false
        };
    }

    componentDidMount() {
        this.defaultDates();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.type !== this.props.type) {
            // type changed
            this.defaultDates();
        }
    }

    defaultDates() {
        // we hardcode the default dates for quarter because agencies can't create quarter submissions beyond FY21
        if (this.props.type === "quarter") {
            this.setState({
                startDate: '07/2021',
                endDate: '09/2021',
                dateError: false
            }, () => {
                this.props.onChange(this.state.startDate, this.state.endDate);
            });
        }
        else {
            DashboardHelper.fetchLatestPublicationPeriod()
                .then((data) => {
                    const deadline = new Date(`${data.deadline.replace(" ", "T")}Z`);
                    const currDate = moment();
                    // add a year to the given year if it's after the publish deadline and it's the last period
                    let year = currDate.isAfter(deadline) && data.period === 12 ? data.year + 1 : data.year;
                    let period = currDate.isAfter(deadline) ? (data.period % 12) + 1 : data.period;
                    // we have no period 1 so bump it to 2 if it got moved there by the previous line
                    if (period === 1) {
                        period = 2;
                    }
                    // If we're in period 3 or earlier, the fiscal year is going to be one higher than the actual year
                    if (period <= 3) {
                        year -= 1;
                    }
                    // if period is 2 (adjusted or starting out) we want to subtract 1 from it for the start date to
                    // encompass both months
                    const startDate =
                        `${period === 2 ? utils.periodToMonth(period - 1) : utils.periodToMonth(period)}/${year}`;
                    const endDate = `${utils.periodToMonth(period)}/${year}`;
                    this.setState({
                        startDate,
                        endDate,
                        dateError: false
                    }, () => {
                        this.props.onChange(this.state.startDate, this.state.endDate);
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    handleDateChange(date) {
        this.setState({
            startDate: date.split('-')[0],
            endDate: date.split('-')[1]
        }, () => {
            this.props.onChange(this.state.startDate, this.state.endDate);
        });
    }

    render() {
        let dateClass = '';
        let dateIcon = <Icons.Calendar />;
        if (this.state.dateError) {
            dateClass = 'error';
            dateIcon = <Icons.Calendar />;
        }

        return (
            <div>
                <div className="row usa-da-add-data-meta-label usa-da-range">
                    Your submission includes data from...
                </div>
                <div className="row ">
                    <div className="col-sm-12 col-md-12 mt-5 usa-da-endDate">
                        <DateDropdown
                            onChange={this.handleDateChange.bind(this)}
                            value={`${this.state.startDate}-${
                                this.state.endDate}`}
                            hasError={this.state.dateError}
                            type={this.props.type}
                            startEndType="start" />
                        <div className={`usa-da-icon usa-da-form-icon date ${dateClass}`}>
                            {dateIcon}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DateRangeField.propTypes = propTypes;
DateRangeField.defaultProps = defaultProps;
