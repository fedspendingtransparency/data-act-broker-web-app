/**
  * HistoryTable.jsx
  * Created by Minahm Kim 06/05/17
  **/

import React from 'react';
import Reactable from 'reactable';
import _ from 'lodash';

import FormattedTable from '../SharedComponents/table/FormattedTable.jsx';
import * as SubmissionListHelper from '../../helpers/submissionListHelper.js';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

import DashboardPaginator from '../dashboard/DashboardPaginator.jsx';


export default class HistoryTable extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = true;

        this.state = {
            active: -1,
            "submission_id": this.props.submissionID,
            "certifications": null,
            warning: {
                active: false,
                type:'warning',
                header: '',
                body: ''
            }
        }

    };

    componentDidMount() {
        SubmissionListHelper.loadSubmissionHistory(this.props.submissionID)
            .then((response)=>{
                response.active = 0;
                this.setState(response)
            })
            .catch((err)=>{
                console.log(err)
            })
        this.isUnmounted = false;
    }

    componentWillUnmount() {
        this.isUnmounted = false;
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

    certificationList(){ 
        if(this.isUnmounted) {
            return null;
        }
        let list = [];
        let certifications = this.state.certifications;
        for(let i = 0; i < certifications.length; i++) {
            if(this.state.active == i) {
                list.push(<li>
                        <span className='active-submission'>Certified by {certifications[i].certifying_user.name} on {this.convertToLocalDate(certifications[i].certify_date)}</span>
                    </li>);
            } else {
                list.push(<li onClick={this.setActiveSubmission.bind(this, i)}>
                        <span className='submission'>Certified by {certifications[i].certifying_user.name} on {this.convertToLocalDate(certifications[i].certify_date)}</span>
                    </li>);    
            }
        }
        return list;
    }

    activeList(){
        if(this.isUnmounted && this.state.certifications[this.state.active].certified_files){
            return null;
        }
        let activeSubmissionsFiles = this.state.certifications[this.state.active].certified_files
        let list = [];
        for(let i = 0; i < activeSubmissionsFiles.length; i++) {
            list.push(<li className='file-link' onClick={this.getSignedUrl.bind(this, i)}>{activeSubmissionsFiles[i].filename}</li>);  
        }
        return list;
    }

    getSignedUrl(index){
        let cert_file = this.state.certifications[this.state.active].certified_files[index]
        this.setState({
                    warning: {
                        active: true,
                        type: 'warning', 
                        header: 'Opening File. Please Wait',
                        body: 'Retreiving file from server. Please wait.'
                    }
                })
        SubmissionListHelper.getSubmissionFile(this.props.submissionID, cert_file.certified_files_history_id, cert_file.is_warning)
            .then((response)=>{
                window.open(response.url)
                this.setState({
                    warning: {
                        active: false
                    }
                })
            })
            .catch((err)=>{
                console.log(err)
                this.setState({
                    warning: {
                        active: true,
                        type: 'danger', 
                        header: 'History Error',
                        body: err.message
                    }
                })
            })
    }

    setActiveSubmission(index){
        this.setState({
            active: index
        })
    }

    render() {
        let certifications = null;
        let fileList = null;
        let warning = null;
        let current = null;
        if(this.state.active != -1){
            current = this.convertToLocalDate(this.state.certifications[this.state.active].certify_date)
            certifications = this.certificationList();
            fileList = this.activeList();
        }
        if(this.state.warning.active) {
            warning = <div className={'alert alert-' + this.state.warning.type}>
                        <span className="usa-da-icon error-icon"><Icons.ExclamationCircle /></span>
                        <h3>{this.state.warning.header}</h3>
                        <div>{this.state.warning.body}</div>
                    </div>;
        }

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        {warning}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='header cert-header'>Certifications</div>
                        <p className='cert-desc'>
                            Select a certification date to download the submission and warning files.
                        </p>
                        <ul className='submission-list'>
                            {certifications}
                        </ul>
                    </div>
                    <div className='col-md-6 download-box'>
                        <div className='header download-header'>Download Files: {current}</div>
                        <ul>
                            {fileList}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}