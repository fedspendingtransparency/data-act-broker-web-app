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

    constructor(props) {
        super(props);

        this.state = {
            submissionID: 0
        };
    }

    addFileToHolder(files) {
        this.props.addFile({ requestName: this.props.requestName, file: files[0] });
    }

    render() {
        let icon;
        if (this.state.progress > 0) {
            icon = <FileProgress fileStatus={this.state.progress} />;
        } else {
            icon = <DropZone addFileToHolder={this.addFileToHolder.bind(this)}/>;
        }

        // TODO: Remove this when this is eventually tied to user accounts
        let subID = null;
        if (this.state.submissionID !== 0) {
            subID = 'Submission ID: ' + this.state.submissionID;
        }

        return (
            <div className="col-md-3 text-center usa-da-submission-item">
                <h4>{this.props.fileTitle}</h4>
                <img src="/graphics/file_icon.png"/>
                <p>{this.props.fileTemplateName}</p>
                <a href="https://github.com/fedspendingtransparency/data-act-validator/blob/development/tests/appropriationsFields.csv">Click here to see the required fields</a>
                <div className="center-block">
                    {icon}
                </div>
                <h3>
                    {subID}
                </h3>
            </div>
        );
    }
}

class DropZone extends React.Component {

    onDrop(files) {
        this.props.addFileToHolder(files);
    }

    render() {
        return (
            <Dropzone className="text-center" multiple={false} onDrop={this.onDrop.bind(this)}>
                <div className="center-block usa-da-dropzone">Drop your file here, or click to select file to upload.</div>
            </Dropzone>
        );
    }
}

class FileProgress extends React.Component {

    render() {
        const style = {
            width: this.props.fileStatus + '%'
        };

        return (
            <div>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow={this.props.fileStatus} aria-valuemin="0" aria-valuemax="100" style={style}></div>
                </div>
                <div>
                    <span>{this.props.fileStatus}%</span>
                </div>
            </div>
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
