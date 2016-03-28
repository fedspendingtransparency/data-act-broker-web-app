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
            dropzoneString: "Drop your file here, or click to select file to upload."
        };
    }

    render() {

        let dropzoneString = "Drop your file here, or click to select file to upload.";
        let showFile = false;
        if (this.props.submission.files.hasOwnProperty(this.props.requestName)) {
            const submissionItem = this.props.submission.files[this.props.requestName];

            if (submissionItem.state == "ready" && submissionItem.file) {
                dropzoneString = submissionItem.file.name;
                showFile = true;
            }
            else if (submissionItem.state == "uploaded") {
                dropzoneString = 'File uploaded successfully.';
            }
        }

        let progress = 0;
        if (this.props.submission.files.hasOwnProperty(this.props.requestName)) {
            progress = this.props.submission.files[this.props.requestName].progress;
        }

        let showProgress = false;
        if (this.props.submission.state == 'uploading') {
            showProgress = true;
        }

        return (
            <Dropzone className="text-center" multiple={false} onDrop={this.props.onDrop}>
                <DropZoneDisplay showFile={showFile} showProgress={showProgress} string={dropzoneString} progress={progress} />
            </Dropzone>
        );
    }
}

DropZone.propTypes = propTypes;
