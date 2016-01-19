/**
* AddDataComponents.jsx
* Created by Katie Rose 12/8/15
**/

import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import Request from 'superagent';

const API_URL = 'http://ec2-54-173-199-34.compute-1.amazonaws.com:80/v1/';

const propTypes = {
    files: PropTypes.array.isRequired
};

const defaultProps = {
    data: [['Error']],
    headers: ['Submission Data Missing']
};

class DropZone extends React.Component {

    // Send file names to backend to get fileID and signed S3 URL for upload
    onDrop(files) {
        const self = this;
        const req = Request.post(API_URL + 'submit_files/')
                           .withCredentials()
                           .send({ 'appropriations': files[0].name });

        req.end(function handleResponse(err, res) {
            if (err) {
                console.log(err + res);
            } else {
                self.uploadFilesToURL(files, res.body.appropriations_url, res.body.appropriations_id);
            }
        });
    }

    // Put the files in S3 bucket at received, signed URL
    uploadFilesToURL(files, url, fileID) {
        const self = this;
        const file = files[0];
        const fileName = file.name;
        const req = Request.put(url)
                           .set('Content-Type', 'application/octet-stream')
                           .send({ fileName: file });

        req.end(function handleResponse(err, res) {
            if (err) {
                console.log(err + JSON.stringify(res.body));
            } else {
                self.finalizeUpload(fileID);
            }
        });
    }

    // Alert the server that the files are in S3 and ready for validations
    finalizeUpload(fileID) {
        Request.post(API_URL + 'finalize_job/')
               .withCredentials()
               .send({ 'upload_id': fileID })
               .end(function handleResponse(err, res) {
                   if (err) {
                       console.log(err + JSON.stringify(res.body));
                   } else {
                       console.log(JSON.stringify(res.body));
                   }
               });
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

class FileContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fileCount: 0
        };
    }

    render() {
        let icon;
        if (this.props.fileStatus > 0) {
            icon = <FileProgress fileStatus={this.props.fileStatus} />;
        } else {
            icon = <DropZone />;
        }

        return (
            <div className="col-md-3 text-center usa-da-submission-item">
                <h4>{this.props.fileTitle}</h4>
                <img src="/graphics/file_icon.png"/>
                <p>{this.props.fileTemplateName}</p>
                <div className="center-block">
                    {icon}
                </div>

                {this.state.fileCount > 0 ? <h3>Uploading {this.state.fileCount} files...</h3> : null}
            </div>
        );
    }
}

export default class SubmissionContainer extends React.Component {
    render() {
        const submissionItems = [];

        for (let i = 0; i < this.props.files.length; i++) {
            const fileVars = this.props.files[i];
            submissionItems.push(<FileContainer key={i} fileTitle={fileVars[0]} fileTemplateName={fileVars[1]} fileStatus={fileVars[2]} />);
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
