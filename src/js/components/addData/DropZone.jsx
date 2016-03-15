/**
* DropZone.jsx
* Created by Kyle Fox 2/19/16
**/

import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

const propTypes = {
    addFileToHolder: PropTypes.func.isRequired,
    requestName: PropTypes.string.isRequired
};

export default class DropZone extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropzoneString: "Drop your file here, or click to select file to upload."
        };
    }

    onUpload(){
        this.setState({
            dropzoneString: "File uploaded successfully."
        })
    }

    onDrop(files) {
        this.props.addFileToHolder({ requestName: this.props.requestName, file: files[0] });

        this.setState({
            dropzoneString: files[0].name + ' is ready to be uploaded!'
        });
    }

    render() {
        return (
            <Dropzone className="text-center" multiple={false} onDrop={this.onDrop.bind(this)}>
                <div className="center-block usa-da-dropzone">{this.state.dropzoneString}</div>
            </Dropzone>
        );
    }
}

DropZone.propTypes = propTypes;
