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

import DashboardPaginator from '../dashboard/DashboardPaginator.jsx';


export default class HistoryTable extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)

        this.isUnmounted = true;

        this.state = {
            active: 0,
            submission: {
                // "submission_id": 7,
                // "certifications": [{
                //     "certify_date": "2017-05-11 18:10:18.366988",
                //     "certify_history_id": 4,
                //     "certifying_user": {
                //         "name": "User Name",
                //         "user_id": 1
                //     },
                //     "certified_files": [{
                //         "certified_files_history_id": 1,
                //         "filename": "1492041855_file_c.csv",
                //         "is_warning": false,
                //         "narrative": "Comment on the file"
                //         },
                //         {"certified_files_history_id": 1,
                //         "filename": "submission_7_award_financial_warning_report.csv",
                //         "is_warning": true,
                //         "narrative": null}
                //     ]},
                //     {"certify_date": "2017-05-08 12:07:18.366988",
                //     "certify_history_id": 3,
                //     "certifying_user": {
                //         "name": "Admin User Name",
                //         "user_id": 2
                //     },
                //     "certified_files": [{
                //         "certified_files_history_id": 3,
                //         "filename": "1492041855_file_a.csv",
                //         "is_warning": false,
                //         "narrative": "This is also a comment"
                //         },
                //         {"certified_files_history_id": 6,
                //         "filename": "submission_280_cross_warning_appropriations_program_activity.csv",
                //         "is_warning": true,
                //         "narrative": null}
                //     ]}
                // ]
            }
        }

    };

    componentDidMount() {
        SubmissionListHelper.loadSubmissionHistory(this.props.submissionID)
            .then((response)=>{
                this.setState({submission: response})
            })
            .catch((err)=>{
                console.log(err)
            })
        this.isUnmounted = false;
    }

    componentDidUpdate(prevProps, prevState) {

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

    submissionList(){ 
        if(this.isUnmounted){
            return null;
        }
        let list = [];
        let certifications = this.state.submission.certifications;
        for(let i = 0; i < certifications.length; i++) {
            if(this.state.active == i) {
                list.push(<li className='active' onClick={this.setActiveSubmission.bind(this, i)}>Submission: {this.convertToLocalDate(certifications[i].certify_date)}</li>);
            } else {
                list.push(<li onClick={this.setActiveSubmission.bind(this, i)}>Submission: {certifications[i].certify_date}</li>);    
            }
            
        }
        return list;
    }

    activeList(){
        if(this.isUnmounted){
            return null;
        }
        console.log(this.state)
        let activeSubmissionsFiles = this.state.submission.certifications[this.state.active].certified_files
        let list = [];
        for(let i = 0; i < activeSubmissionsFiles.length; i++) {
            list.push(<li onClick={this.getSignedUrl.bind(this, i)}>{activeSubmissionsFiles[i].filename}</li>);  
        }
        return list;
    }

    getSignedUrl(index){
        let cert_file = this.state.submission.certifications[this.state.active].certified_files[index]
        SubmissionListHelper.getSignedUrl(this.props.submissionID, cert_file.certified_files_history_id, cert_file.is_warning)
            .then((response)=>{
                console.log(response)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    setActiveSubmission(index){
        this.setState({
            active: index
        })
    }

    render() {

        let submissions = this.submissionList();
        let fileList = this.activeList();

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h3>Submissions</h3>
                        <ul>
                            {submissions}
                        </ul>
                    </div>
                    <div className='col-md-6'>
                        <h3>Download Files</h3>
                        <ul>
                            {fileList}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}