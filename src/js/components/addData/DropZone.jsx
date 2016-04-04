/**
* DropZone.jsx
* Created by Kyle Fox 2/19/16
**/

import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

import DropZoneDisplay from './DropZoneDisplay.jsx';

const propTypes = {
    requestName: PropTypes.string.isRequired
};

export default class DropZone extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            dropzoneString: "Drag and drop or click here to upload your (add file name) file."
        };
    }

    render() {

        let dropzoneString = "Drag and drop or click here to upload your (add file name) file.";
        let displayMode = "pending";
        let progress = 0;

        if (this.props.submission.files.hasOwnProperty(this.props.requestName)) {
            const submissionItem = this.props.submission.files[this.props.requestName];

            if (submissionItem.state == 'ready' && submissionItem.file) {
                dropzoneString = submissionItem.file.name;
                displayMode = 'file';
            }
            else if (submissionItem.state == 'success') {
                dropzoneString = submissionItem.file.name + ' was uploaded successfully.';
                displayMode = 'success';
            }
            else if (submissionItem.state == 'failed') {
                dropzoneString = submissionItem.file.name + ' failed to upload.';
                displayMode = 'failure';
            }

            else if (submissionItem.state == 'uploading') {
                displayMode = 'uploading';
                progress = submissionItem.progress;
                dropzoneString = submissionItem.file.name;
            }
        }

        return (
            <Dropzone className="text-center" multiple={false} onDrop={this.props.onDrop}>
                <DropZoneDisplay displayMode={displayMode} string={dropzoneString} progress={progress} />
            </Dropzone>
        );
    }
}

DropZone.propTypes = propTypes;
