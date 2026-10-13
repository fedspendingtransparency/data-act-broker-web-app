/**
* DropZone.jsx
* Created by Kyle Fox 2/19/16
*/

import React from 'react';
import PropTypes from 'prop-types';
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
        let dropzoneString = `Drag and drop or click here to upload your **${this.props.fileTitle}**.`;
        const progress = 0;
        let dropped = '';
        let isFileValid = 'unset';

        if (Object.prototype.hasOwnProperty.call(this.props.submission.files, this.props.requestName)) {
            const submission = this.props.submission;
            const submissionItem = this.props.submission.files[this.props.requestName];
            const sanitizedFileName = DOMPurify.sanitize(submissionItem.file.name);
            dropped = ' dropped';

            isFileValid = validUploadFileChecker(submissionItem);

            if (submissionItem.state === 'ready' && isFileValid) {
                dropzoneString = `**${sanitizedFileName}** file selected`;
            }
            else if (submissionItem.state === 'ready' && !isFileValid) {
                dropzoneString = `**${sanitizedFileName}** must be CSV or TXT format`;
            }

            if (submission.state === 'prepare') {
                dropzoneString = `**${sanitizedFileName}** was uploaded successfully`;
            }

            if (submission.state === 'failed' && isFileValid) {
                dropzoneString = `**${sanitizedFileName}** is the correct file type,
                but the submission upload has failed`;
            }
            else if (submissionItem.state === 'failed' && !isFileValid) {
                dropzoneString = `**${sanitizedFileName}** must be CSV or TXT format`;
            }

            if (submission.state === 'uploading') {
                dropzoneString = `**${sanitizedFileName}**`;
            }
        }

        return (
            <Dropzone onDrop={this.props.onDrop}>
                {({getRootProps, getInputProps, isDragActive}) => (
                    <section>
                        <div {...getRootProps({
                            className: `usa-da-dropzone text-center${dropped}${isDragActive ? ' active' : ''}`
                        })}>
                            <input {...getInputProps({multiple: false})} />
                            <DropZoneDisplay
                                displayMode={isFileValid ? this.props.submission.state : 'invalid'}
                                displayString={dropzoneString}
                                progress={progress} />
                        </div>
                    </section>
                )}
            </Dropzone>
        );
    }
}

DropZone.propTypes = propTypes;
DropZone.defaultProps = defaultProps;
