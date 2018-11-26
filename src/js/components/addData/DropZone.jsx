/**
* DropZone.jsx
* Created by Kyle Fox 2/19/16
*/

import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import DOMPurify from 'dompurify';

import DropZoneDisplay from './DropZoneDisplay';

import { validUploadFileChecker } from '../../helpers/util';

const propTypes = {
    onDrop: PropTypes.func,
    resetSubmission: PropTypes.func,
    submission: PropTypes.object,
    fileTitle: PropTypes.string,
    requestName: PropTypes.string.isRequired
};

const defaultProps = {
    onDrop: null,
    resetSubmission: null,
    submission: null,
    fileTitle: ''
};

export default class DropZone extends React.Component {
    componentWillUnmount() {
        this.props.resetSubmission();
    }

    render() {
        let dropzoneString = `Drag and drop or click here to upload your <b>${this.props.fileTitle}</b>.`;
        const progress = 0;
        let dropped = '';
        let isFileValid = 'unset';

        if (Object.prototype.hasOwnProperty.call(this.props.submission.files, this.props.requestName)) {
            const submission = this.props.submission;
            const submissionItem = this.props.submission.files[this.props.requestName];
            dropped = ' dropped';

            isFileValid = validUploadFileChecker(submissionItem);

            if (submissionItem.state === 'ready' && isFileValid) {
                dropzoneString = `<b>${submissionItem.file.name}</b> file selected`;
            }
            else if (submissionItem.state === 'ready' && !isFileValid) {
                dropzoneString = `<b>${submissionItem.file.name}</b> must be CSV or TXT format`;
            }

            if (submission.state === 'prepare') {
                dropzoneString = `<b>${submissionItem.file.name}</b> was uploaded successfully`;
            }

            if (submission.state === 'failed' && isFileValid) {
                dropzoneString = `
            <b>${submissionItem.file.name}</b> is the correct file type,
            but the submission upload has failed
        `;
            }
            else if (submissionItem.state === 'failed' && !isFileValid) {
                dropzoneString = `<b>${submissionItem.file.name}</b> must be CSV or TXT format`;
            }

            if (submission.state === 'uploading') {
                dropzoneString = `<b>${submissionItem.file.name}</b>`;
            }
        }

        // sanitize the dropzone string to prevent XSS attacks
        dropzoneString = DOMPurify.sanitize(dropzoneString, { ALLOWED_TAGS: ['b'] });

        return (
            <Dropzone
                className={`usa-da-dropzone text-center${dropped}`}
                activeClassName="active"
                multiple={false}
                onDrop={this.props.onDrop}
                data-testid={`upload-${this.props.requestName}`}>
                <DropZoneDisplay
                    displayMode={isFileValid ? this.props.submission.state : 'invalid'}
                    string={dropzoneString}
                    progress={progress} />
            </Dropzone>
        );
    }
}

DropZone.propTypes = propTypes;
DropZone.defaultProps = defaultProps;
