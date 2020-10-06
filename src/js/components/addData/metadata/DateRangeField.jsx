/**
  * DateRangeField.jsx
  * Created by Kevin Li 5/19/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as Icons from '../../SharedComponents/icons/Icons';
import DateDropdown from './DateDropdown';
import * as UtilHelper from '../../../helpers/util';

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
        if (this.props.type === "quarter") {
            this.setState({
                startDate: UtilHelper.previousQuarterMonth('start'),
                endDate: UtilHelper.previousQuarterMonth('end'),
                dateError: false
            }, () => {
                this.props.onChange(this.state.startDate, this.state.endDate);
            });
        }
        else {
            const currDate = moment();
            // months are 0-indexed in moment so we're checking against 9 for October and 10 for November
            const startDate = currDate.month() === 10 ? `10/${currDate.format('YYYY')}` : currDate.format('MM/YYYY');
            const endDate = currDate.month() === 9 ? `11/${currDate.format('YYYY')}` : currDate.format('MM/YYYY');
            this.setState({
                startDate,
                endDate,
                dateError: false
            }, () => {
                this.props.onChange(this.state.startDate, this.state.endDate);
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
