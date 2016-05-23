/**
  * DateDropdown.jsx
  * Created by Kevin Li 5/19/16
  **/

import React from 'react';
import moment from 'moment';

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
}

export default class DateDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            month: moment().format('MM/YYYY'),
            quarter: currentQuarter()
        };
    }

    componentDidMount() {
        this.setValue();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.type != prevProps.type || this.props.value != prevProps.value) {
            this.setValue();
        }
    }

    setValue() {
        if (this.props.type == "quarter") {
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
    		months.push({
    			string: moment().month(i).format('MMMM'),
    			value: moment().month(i).format('MM'),
    		});
    	}

    	for (let i = -2; i <= 1; i++) {
    		years.push(moment().add(i, 'years').format('YYYY'));
    	}

    	const dates = [];
    	years.forEach((year) => {
    		months.forEach((month) => {
    			dates.push({
    				string: month.string + ' ' + year,
    				value: month.value + '/' + year
    			});
    		});
    	});

    	return dates;
    }

    generateQuarters() {
        const years = [];
        for (let i = -2; i <= 1; i++) {
            years.push(moment().add(i, 'years').format('YYYY'));
        }

        const quarters = [];
        years.forEach((year) => {
            for (let i = 1; i <= 4; i++) {
                quarters.push({
                    string: 'Quarter ' + i + ' - ' + year,
                    value: 'Q' + i + '/' + year
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
        if (this.props.type == "quarter") {
            dates = this.generateQuarters().map((date, index) => {
                return <option key={index} value={date.value}>{date.string}</option>;
            });
            value = this.state.quarter;
        }
        else {
    		dates = this.generateDates().map((date, index) => {
            	return <option key={index} value={date.value}>{date.string}</option>;
    		});
            value = this.state.month;
        }

		let errorClass = '';
        if (this.props.hasError) {
            errorClass = ' error';
        }

		return (
			<select className={"usa-da-date-dropdown" + errorClass} onChange={this.dateChanged.bind(this)} value={value}>
        		{dates}
        	</select>
		);
	}
}
