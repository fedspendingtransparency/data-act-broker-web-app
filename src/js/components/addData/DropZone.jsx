/**
* DropZone.jsx
* Created by Kyle Fox 2/19/16
**/

import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import DOMPurify from 'dompurify';

import DropZoneDisplay from './DropZoneDisplay.jsx';

const propTypes = {
    onDrop: PropTypes.func,
    resetSubmission: PropTypes.func,
    submission: PropTypes.object,
    fileTitle: PropTypes.string,
    requestName: PropTypes.string.isRequired
};

export default class DropZone extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.resetSubmission();
    }

    render() {
        let dropzoneString = "Drag and drop or click here to upload your <b>" + this.props.fileTitle + "</b>.";
        let displayMode = "pending";
        let progress = 0;
        let dropped = '';

        if (this.props.submission.files.hasOwnProperty(this.props.requestName)) {
            const submissionItem = this.props.submission.files[this.props.requestName];
            dropped = ' dropped';

            if (submissionItem.state === 'ready' && submissionItem.file) {
                dropzoneString = '<b>' + submissionItem.file.name + '</b> file selected';
                displayMode = 'file';
            }
            else if (submissionItem.state === 'success') {
                dropzoneString = '<b>' + submissionItem.file.name + '</b> was uploaded successfully';
                displayMode = 'success';
            }
            else if (submissionItem.state === 'failed') {
                dropzoneString = '<b>' + submissionItem.file.name + '</b> failed to upload';
                displayMode = 'failure';
            }

            else if (submissionItem.state === 'uploading') {
                displayMode = 'uploading';
                progress = submissionItem.progress;
                dropzoneString = '<b>' + submissionItem.file.name + '</b>';
            }
        }

        // sanitize the dropzone string to prevent XSS attacks
        dropzoneString = DOMPurify.sanitize(dropzoneString, { ALLOWED_TAGS: ['b'] });

        return (
            <Dropzone className={"usa-da-dropzone text-center" + dropped} activeClassName="active" multiple={false}
                onDrop={this.props.onDrop} data-testid={"upload-" + this.props.requestName}>
                <DropZoneDisplay displayMode={displayMode} string={dropzoneString} progress={progress} />
            </Dropzone>
        );
    }
}

DropZone.propTypes = propTypes;
