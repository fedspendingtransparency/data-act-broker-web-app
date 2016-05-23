/**
  * DateTypeField.jsx
  * Created by Kevin Li 5/19/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';
import moment from 'moment';

import DateDropdown from './DateDropdown.jsx';

const currentQuarter = () => {
	const month = parseInt(moment().format("M"));
	let quarter = 'Q4';

	if (month >= 10) {
		quarter = 'Q1';
	}
	else if (month <= 3) {
		quarter = 'Q2';
	}
	else if (month <= 6) {
		quarter = 'Q3';
	}

	return quarter + '/' + moment().format('YYYY');
};


const defaultProps = {
	startDateError: false,
	endDateError: false
};

export default class DateRangeField extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			startDate: moment().format('MM/YYYY'),
			endDate: moment().format('MM/YYYY'),
			dateError: false
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.type != this.props.type) {
			// type changed
			this.defaultDates();
		}
	}

	componentDidMount() {
		this.defaultDates();
	}

	defaultDates() {
		if (this.props.type == "quarter") {
			this.setState({
				startDate: currentQuarter(),
				endDate: currentQuarter(),
				dateError: false
			}, () => {
				this.props.onChange(this.state.startDate, this.state.endDate);
			});
		}
		else {
			this.setState({
				startDate: moment().format('MM/YYYY'),
				endDate: moment().format('MM/YYYY'),
				dateError: false
			}, () => {
				this.props.onChange(this.state.startDate, this.state.endDate);
			});
		}
	}

	handleDateChange(field, date) {
        this.setState({
            [field]: date
        }, () => {

        	this.validateDate(field, () => {
        		// pass up the new date range and error (if applicable)
        		this.props.onChange(this.state.startDate, this.state.endDate, this.state.dateError);
        	});


        	
        });
    }

    validateDate(field, callback) {

        // validate endDate comes after startDate
    	let startMonth = parseInt(this.state.startDate.split('/')[0]);
    	let endMonth = parseInt(this.state.endDate.split('/')[0]);

    	const startYear = parseInt(this.state.startDate.split('/')[1]);
    	const endYear = parseInt(this.state.endDate.split('/')[1]);

    	// validate quarters if necessary
    	if (this.props.type == "quarter") {
    		// just ditch the first "Q"
    		startMonth = parseInt(this.state.startDate.split('/')[0].substring(1));
    		endMonth = parseInt(this.state.endDate.split('/')[0].substring(1));
    	}

        if (endYear < startYear || (endYear == startYear && endMonth < startMonth)) {
            this.setState({
                dateError: true
            }, () => {
            	callback();
            });
        }
        else {
            this.setState({
                dateError: false
            }, () => {
            	callback();
            });
        }

    }

	render() {

		let dateClass = '';
        let dateIcon = <Icons.Calendar />;
        if (this.state.dateError) {
            dateClass = 'error';
            dateIcon = <Icons.Calendar  />;
        }

		return (
			<div>
				<div className="row usa-da-add-data-meta-label">
                    Your submission includes data from...
                </div>
                <div className="row ">
                    <div className="col-xs-8 col-md-5 mt-5 pos-rel usa-da-startDate">
                    	<DateDropdown onChange={this.handleDateChange.bind(this, 'startDate')} value={this.state.startDate} hasError={this.state.dateError} type={this.props.type} />
                        <div className={"usa-da-icon date " + dateClass}>
                            {dateIcon}
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-2 mt-5 usa-da-date-through">
                    	through
                    </div>

                    <div className="col-xs-8 col-md-5 mt-5 usa-da-endDate">
                        <DateDropdown onChange={this.handleDateChange.bind(this, 'endDate')} value={this.state.endDate} hasError={this.state.dateError} type={this.props.type} />
                        <div className={"usa-da-icon date " + dateClass}>
                            {dateIcon}
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

DateRangeField.defaultProps = defaultProps;