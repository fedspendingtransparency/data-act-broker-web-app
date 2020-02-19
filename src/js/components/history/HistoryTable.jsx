/**
  * HistoryTable.jsx
  * Created by Minahm Kim 06/05/17
  */

import React from 'react';
import PropTypes from 'prop-types';

import * as SubmissionListHelper from 'helpers/submissionListHelper';
import * as UtilHelper from 'helpers/util';
import * as Icons from 'components/SharedComponents/icons/Icons';

const propTypes = {
    submissionID: PropTypes.string.isRequired
};

export default class HistoryTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: -1,
            certifications: null,
            warning: {
                active: false,
                type: 'warning',
                header: '',
                body: ''
            }
        };
        this.getSignedUrl = this.getSignedUrl.bind(this);
    }

    componentDidMount() {
        SubmissionListHelper.loadSubmissionHistory(parseInt(this.props.submissionID, 10))
            .then((response) => {
                const tmpResponse = response;
                tmpResponse.active = 0;
                this.setState(tmpResponse);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    setActiveSubmission(index) {
        this.setState({
            active: index
        });
    }

    getSignedUrl(index) {
        const certFile = this.state.certifications[this.state.active].certified_files[index];
        this.setState({
            warning: {
                active: true,
                type: 'warning',
                header: 'Opening File. Please Wait',
                body: 'Retreiving file from server. Please wait.'
            }
        });
        SubmissionListHelper.getSubmissionFile(this.props.submissionID, certFile.certified_files_history_id,
            certFile.is_warning)
            .then((response) => {
                window.open(response.url);
                this.setState({
                    warning: {
                        active: false
                    }
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    warning: {
                        active: true,
                        type: 'danger',
                        header: 'History Error',
                        body: err.message
                    }
                });
            });
    }

    activeList() {
        const activeSubmissionsFiles = this.state.certifications[this.state.active].certified_files;
        const list = [];
        for (let i = 0; i < activeSubmissionsFiles.length; i++) {
            const onKeyDownHandler = UtilHelper.createOnKeyDownHandler(this.getSignedUrl, [i]);
            list.push(
                <div
                    role="button"
                    tabIndex={0}
                    className="file-link"
                    onKeyDown={onKeyDownHandler}
                    onClick={this.getSignedUrl.bind(this, i)}
                    key={i}>
                    {activeSubmissionsFiles[i].filename}
                </div>);
        }
        return list;
    }

    certificationList() {
        const list = [];
        const certifications = this.state.certifications;
        for (let i = 0; i < certifications.length; i++) {
            if (this.state.active === i) {
                list.push(
                    <li key={i}>
                        <span className="active-submission">
                            Certified by {certifications[i].certifying_user.name} on
                            {UtilHelper.convertToLocalDate(certifications[i].certify_date)}
                        </span>
                    </li>);
            }
            else {
                list.push(
                    <div
                        role="button"
                        tabIndex={0}
                        onKeyDown={this.setActiveSubmission.bind(this, i)}
                        onClick={this.setActiveSubmission.bind(this, i)}
                        key={i}>
                        <span className="submission">
                            Certified by {certifications[i].certifying_user.name} on
                            {UtilHelper.convertToLocalDate(certifications[i].certify_date)}
                        </span>
                    </div>);
            }
        }
        return list;
    }

    render() {
        let certifications = null;
        let fileList = null;
        let warning = null;
        let current = null;
        if (this.state.active !== -1) {
            current = UtilHelper.convertToLocalDate(this.state.certifications[this.state.active].certify_date);
            certifications = this.certificationList();
            fileList = this.activeList();
        }
        if (this.state.warning.active) {
            warning = (
                <div className={`alert alert-${this.state.warning.type}`}>
                    <span className="usa-da-icon error-icon"><Icons.ExclamationCircle /></span>
                    <h3>{this.state.warning.header}</h3>
                    <div>{this.state.warning.body}</div>
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {warning}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="header cert-header">Certifications</div>
                        <p className="cert-desc">
                            Select a certification date to download the submission and warning files.
                        </p>
                        <ul className="submission-list">
                            {certifications}
                        </ul>
                    </div>
                    <div className="col-md-6 download-box">
                        <div className="header download-header">Download Files: {current}</div>
                        {fileList}
                    </div>
                </div>
            </div>
        );
    }
}

HistoryTable.propTypes = propTypes;
