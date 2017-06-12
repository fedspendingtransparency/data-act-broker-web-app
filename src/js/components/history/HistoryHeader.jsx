/**
  * HistoryTable.jsx
  * Created by Kevin Li 10/28/16
  **/

import React from 'react';
import Reactable from 'reactable';
import _ from 'lodash';

import FormattedTable from '../SharedComponents/table/FormattedTable.jsx';
import * as Status from '../landing/recentActivity//SubmissionStatus.jsx';
import * as LoginHelper from '../../helpers/loginHelper.js';
import * as PermissionsHelper from '../../helpers/permissionsHelper.js';
import * as SubmissionListHelper from '../../helpers/submissionListHelper.js';
import * as FileHelper from '../../helpers/generateFilesHelper.js';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

import DashboardPaginator from '../dashboard/DashboardPaginator.jsx';


export default class HistoryTable extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            metadata: null
        }

    };

    componentDidMount() {
        FileHelper.fetchSubmissionMetadata(this.props.submissionID)
            .then((response) => {
                this.setState({metadata: response})
            }).catch((err) =>{
                console.log(err)
            })
        this.isUnmounted = false;
    }

    componentWillUnmount() {
        this.isUnmounted = false;
    }

    loadUser(){
        LoginHelper.fetchActiveUser().then((user)=>{
            this.setState({account: user});
        })
    }

    convertToLocalDate(dateToConvert) {
        // convert date to local date, need to replace the space with a T for Date() formatting
		// Add a Z to the end to imply the date is in UTC
		dateToConvert = dateToConvert.replace(" ", "T") + "Z";
		const tmpDate = new Date(dateToConvert);
        
		// format date as YYYY-MM-DD
		const year = tmpDate.getFullYear()
		let month = tmpDate.getMonth() + 1;
		if(month < 10){
			month = "0" + month;
		}
		let day = tmpDate.getDate();
		if (day < 10){
			day = "0" + day;
		}
		return year + "-" + month + "-" + day;
    }


    render() {
        if(!this.state.metadata){
            return null;
        }
        return (
            <div className='container'>
                <div className='row header'>
                    <div className='col-xs-6'>
                        <p className='metadata'>Agency: {this.state.metadata.agency_name}</p>
                        <p className='metadata'>Reporting Period Start: {this.state.metadata.reporting_period_start_date}</p>
                        <p className='metadata'>Reporting Period End: {this.state.metadata.reporting_period_end_date}</p>
                    </div>
                    <div className='col-xs-6'>
                        <p className='metadata'>Created: {this.state.metadata.created_on}</p>
                        <p className='metadata'>Last Validated: {this.state.metadata.agency_name}</p>
                    </div>
                    <div className='col-xs-12'>
                        <hr/>
                    </div>
                </div>
            </div>
        );
    }
}