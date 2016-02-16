/**
* AddDataComponents.jsx
* Created by Katie Rose 12/8/15
**/

import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

const propTypes = {
    files: PropTypes.array.isRequired
};

const defaultProps = {
    data: [['Error']],
    headers: ['Submission Data Missing']
};

class FileContainer extends React.Component {

    addFileToHolder(files) {
        this.props.addFile({ requestName: this.props.requestName, file: files[0] });
    }

    render() {
        const ruleLink = 'https://github.com/fedspendingtransparency/data-act-validator/tests/' + this.props.requestName + 'Fields.csv';

        return (
            <div className="col-md-3 text-center usa-da-submission-item">
                <h4>{this.props.fileTitle}</h4>
                <img src="/graphics/file_icon.png"/>
                <p>{this.props.fileTemplateName}</p>
                <a href={ruleLink}>Click here to see the required fields</a>
                <div className="center-block">
                   <DropZone addFileToHolder={this.addFileToHolder.bind(this)}/>
                </div>
            </div>
        );
    }
}

class DropZone extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileName: null
        };
    }

    onDrop(files) {
        this.props.addFileToHolder(files);

        this.setState({
            filename: files[0].name
        });
    }

    render() {
        let dropzoneString = 'Drop your file here, or click to select file to upload.';

        if (this.state.filename) {
            dropzoneString = this.state.filename + ' is ready to be uploaded!';
        }

        return (
            <Dropzone className="text-center" multiple={false} onDrop={this.onDrop.bind(this)}>
                <div className="center-block usa-da-dropzone">{dropzoneString}</div>
            </Dropzone>
        );
    }
}

export default class SubmissionContainer extends React.Component {
    render() {
        const submissionItems = [];

        for (let i = 0; i < this.props.files.length; i++) {
            const fileVars = this.props.files[i];
            submissionItems.push(<FileContainer key={i} fileTitle={fileVars.fileTitle} fileTemplateName={fileVars.fileTemplateName} requestName={fileVars.requestName} addFile={this.props.addFile} />);
        }

        return (
            <div>
                <div className="container">
                    <div className="row center-block usa-da-submission-items">{submissionItems}</div>
                </div>
            </div>
        );
    }
}

SubmissionContainer.propTypes = propTypes;
SubmissionContainer.defaultProps = defaultProps;
