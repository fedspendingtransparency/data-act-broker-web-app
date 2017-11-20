/**
  * ReplacementBox.jsx
  * Created by Kevin Li 6/30/16
  **/

import React, { PropTypes } from 'react';
import _ from 'lodash';
import FileProgress from '../../SharedComponents/FileProgress.jsx';
import UploadButtonContainer from '../../../containers/crossFile/CrossFileUploadButtonContainer.jsx';
import GeneratedErrorButton from './GeneratedErrorButton.jsx';
import FileWarning from './FileWarning.jsx';

import * as ReviewHelper from '../../../helpers/reviewHelper.js';

const propTypes = {
    forceUpdate: PropTypes.func,
    meta: PropTypes.object,
    submission: PropTypes.object,
    submissionID: PropTypes.string
};

const dFiles = ['d1', 'd2'];

export default class ReplacementBox extends React.Component {
    stagedFiles() {
        let leftFile = this.props.submission.files[this.props.meta.firstKey];
        let rightFile = this.props.submission.files[this.props.meta.secondKey];

        const stagedFiles = [];
        if (leftFile) {
            stagedFiles.push(this.props.meta.firstKey);
        }

        if (rightFile) {
            stagedFiles.push(this.props.meta.secondKey);
        }

        return stagedFiles;
    }

    fileProgress() {
        let leftFile = this.props.submission.files[this.props.meta.firstKey];
        let rightFile = this.props.submission.files[this.props.meta.secondKey];

        let fileCount = 2;

        if (!leftFile) {
            leftFile = {
                progress: 0
            };
            fileCount = 1;
        }
        else if (!rightFile) {
            rightFile = {
                progress: 0
            };
            fileCount = 1;
        }
        return (leftFile.progress + rightFile.progress) / fileCount;
    }

    render() {
        let uploadProgress = null;
        if (this.props.submission.state === 'uploading') {
            uploadProgress = <FileProgress fileStatus={this.fileProgress()} />;
        }

        let warning = null;
        const stagedFiles = this.stagedFiles();
        if (stagedFiles.length > 0) {
            warning = <FileWarning files={stagedFiles} {...this.props} />;
        }

        // only show upload buttons for non-generated files
        let firstButton = (<UploadButtonContainer file={ReviewHelper.globalFileData[this.props.meta.firstKey]}
            fileKey={this.props.meta.firstKey} pair={this.props.meta.key} type="optional" />);
        let secondButton = (<UploadButtonContainer file={ReviewHelper.globalFileData[this.props.meta.secondKey]}
            fileKey={this.props.meta.secondKey} pair={this.props.meta.key} type="optional" />);

        const firstFile = ReviewHelper.globalFileData[this.props.meta.firstKey];
        const secondFile = ReviewHelper.globalFileData[this.props.meta.secondKey];

        if (_.indexOf(dFiles, firstFile.letter.toLowerCase()) > -1) {
            // first file is a D1/D2 file
            firstButton = (<GeneratedErrorButton file={firstFile} fileKey={this.props.meta.firstKey}
                pair={this.props.meta.key} type="optional" submissionID={this.props.submissionID}
                forceUpdate={this.props.forceUpdate} />);
        }

        if (_.indexOf(dFiles, secondFile.letter.toLowerCase()) > -1) {
            // second file is a D1/D2 file
            secondButton = (<GeneratedErrorButton file={secondFile} fileKey={this.props.meta.secondKey}
                pair={this.props.meta.key} type="optional" submissionID={this.props.submissionID}
                forceUpdate={this.props.forceUpdate} />);
        }

        return (
            <div className="error-box">
                <div className="vertical-line" />
                <div className="row">
                    <div className="col-md-6">
                        <h6>Overwrite Files</h6>
                    </div>
                </div>
                <div className="error-content">
                    <div className="overwrite-wrapper">
                        <div className="button-list">
                            <div className="upload-warning">
                                {warning}
                            </div>
                            <div className="upload-progress">
                                {uploadProgress}
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-10">
                                    {firstButton}
                                </div>
                                <div className="col-md-6">
                                    {secondButton}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReplacementBox.propTypes = propTypes;
