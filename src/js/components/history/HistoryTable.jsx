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
            activeType: 'publication',
            publications: null,
            certifications: null,
            warning: {
                active: false,
                type: 'warning',
                header: '',
                body: ''
            }
        };
        this.getSignedUrl = this.getSignedUrl.bind(this);
        this.handlePublishedSelect = this.handlePublishedSelect.bind(this);
        this.handleCertifiedSelect = this.handleCertifiedSelect.bind(this);
        this.setActiveSubmission = this.setActiveSubmission.bind(this);
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

    getSignedUrl(index) {
        let urlFile = null;
        if (this.state.activeType === 'certification') {
            urlFile = this.state.certifications[this.state.active].certified_files[index];
        }
        else {
            urlFile = this.state.publications[this.state.active].published_files[index];
        }
        this.setState({
            warning: {
                active: true,
                type: 'warning',
                header: 'Opening File. Please Wait',
                body: 'Retreiving file from server. Please wait.'
            }
        });
        SubmissionListHelper.getSubmissionFile(this.props.submissionID, urlFile.published_files_history_id,
            urlFile.is_warning)
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

    setActiveSubmission(index, type) {
        this.setState({
            active: index,
            activeType: type
        });
    }

    handlePublishedSelect(e) {
        e.preventDefault();
        const activeIndex = parseInt(e.target.value, 10);
        this.setActiveSubmission(activeIndex, 'publication');
    }

    handleCertifiedSelect(e) {
        e.preventDefault();
        const activeIndex = parseInt(e.target.value, 10);
        this.setActiveSubmission(activeIndex, 'certification');
    }

    activeList() {
        let activeSubmissionsFiles = null;
        if (this.state.activeType === 'certification') {
            activeSubmissionsFiles = this.state.certifications[this.state.active].certified_files;
        }
        else {
            activeSubmissionsFiles = this.state.publications[this.state.active].published_files;
        }
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

    publicationList() {
        const list = [];
        const publications = this.state.publications;
        for (let i = 0; i < publications.length; i++) {
            if (this.state.active === i && this.state.activeType === 'publication') {
                list.push(
                    <li key={i}>
                        <span className="active-submission">
                            Published by {publications[i].publishing_user.name} on&nbsp;
                            {UtilHelper.convertToLocalDate(publications[i].publish_date)}
                        </span>
                    </li>);
            }
            else {
                const onKeyDownHandler = UtilHelper.createOnKeyDownHandler(this.setActiveSubmission,
                    [i, 'publication']);
                list.push(
                    <button
                        className="submission"
                        tabIndex={0}
                        onKeyDown={onKeyDownHandler}
                        onClick={this.handlePublishedSelect}
                        value={i}
                        key={i}>
                        Published by {publications[i].publishing_user.name} on&nbsp;
                        {UtilHelper.convertToLocalDate(publications[i].publish_date)}
                    </button>);
            }
        }
        return list;
    }

    certificationList() {
        const list = [];
        const certifications = this.state.certifications;
        for (let i = 0; i < certifications.length; i++) {
            if (this.state.active === i && this.state.activeType === 'certification') {
                list.push(
                    <li key={i}>
                        <span className="active-submission">
                            Certified by {certifications[i].certifying_user.name} on&nbsp;
                            {UtilHelper.convertToLocalDate(certifications[i].certify_date)}
                        </span>
                    </li>);
            }
            else {
                const onKeyDownHandler = UtilHelper.createOnKeyDownHandler(this.setActiveSubmission,
                    [i, 'certification']);
                list.push(
                    <button
                        className="submission"
                        tabIndex={0}
                        onKeyDown={onKeyDownHandler}
                        onClick={this.handleCertifiedSelect}
                        value={i}
                        key={i}>
                        Certified by {certifications[i].certifying_user.name} on&nbsp;
                        {UtilHelper.convertToLocalDate(certifications[i].certify_date)}
                    </button>);
            }
        }
        return list;
    }

    render() {
        let publications = null;
        let certifications = null;
        let fileList = null;
        let warning = null;
        let current = null;
        if (this.state.active !== -1) {
            current = UtilHelper.convertToLocalDate(this.state.certifications[this.state.active].certify_date);
            publications = this.publicationList();
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
                        <h2>Publish History</h2>
                        <p className="cert-desc">
                            Select a publication date to download the submission and warning files.
                        </p>
                        <ul className="submission-list">
                            {publications}
                        </ul>
                        <h2>Certify History</h2>
                        <p className="cert-desc">
                            Select a certification date to download the submission and warning files.
                        </p>
                        <ul className="submission-list">
                            {certifications}
                        </ul>
                    </div>
                    <div className="col-md-6 download-box">
                        <h2>Download Files: {current}</h2>
                        {fileList}
                    </div>
                </div>
            </div>
        );
    }
}

HistoryTable.propTypes = propTypes;
