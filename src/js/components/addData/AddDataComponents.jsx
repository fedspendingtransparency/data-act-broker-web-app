/**
* AddDataComponents.jsx
* Created by Katie Rose 12/8/15
**/

import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import Request from 'superagent';
import AWS from 'aws-sdk';

const API_URL = 'http://ec2-54-173-199-34.compute-1.amazonaws.com:80/v1/';

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
            progress: 0,
            submissionID: 0
        };
    }

    // Send file names to backend to get fileID and S3 credentials
    startUpload(files) {
        const req = Request.post(API_URL + 'submit_files/')
                           .withCredentials()
                           .send({ 'appropriations': files[0].name });

        req.end((err, res) => {
            if (err) {
                console.log(err + res);
            } else {
                this.uploadFiles(files, res.body.appropriations_id, res.body);
            }
        });
    }

    // Put the files in S3 bucket using STS for temporary credentials
    uploadFiles(files, fileID, params) {
        const file = files[0];
        const credentials = params.credentials;

        // TODO: Remove this when this is eventually tied to user accounts
        this.setState({
            submissionID: params.submission_id
        });

        // TODO: Handle the rest of the files
        const appropriationsKey = params.appropriations_key;

        AWS.config.update({
            'accessKeyId': credentials.AccessKeyId,
            'secretAccessKey': credentials.SecretAccessKey,
            'sessionToken': credentials.SessionToken
        });

        const s3 = new AWS.S3();
        const s3params = {
            Bucket: 'dev-data-act-submission',
            Key: appropriationsKey,
            Body: file
        };

        s3.upload(s3params)
          .on('httpUploadProgress', evt => {
              this.setState({
                  progress: evt.loaded / evt.total * 100
              });
          })
          .send(error => {
              if (error) {
                  console.log(error);
              } else {
                  this.finalizeUpload(fileID);
              }
          });
    }

    // Alert the server that the files are in S3 and ready for validations
    finalizeUpload(fileID) {
        Request.post(API_URL + 'finalize_job/')
               .withCredentials()
               .send({ 'upload_id': fileID })
               .end((err, res) => {
                   if (err) {
                       console.log(err + JSON.stringify(res.body));
                   } else {
                       console.log(JSON.stringify(res.body));
                   }
               });
    }

    render() {
        let icon;
        if (this.state.progress > 0) {
            icon = <FileProgress fileStatus={this.state.progress} />;
        } else {
            icon = <DropZone startUpload={this.startUpload.bind(this)}/>;
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
        this.props.startUpload(files);
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
            submissionItems.push(<FileContainer key={i} fileTitle={fileVars[0]} fileTemplateName={fileVars[1]} />);
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
