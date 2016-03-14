/**
* SubmissionContent.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import FileProgress from '../SharedComponents/FileProgress.jsx';
import TypeSelector from './AddDataTypeSelector.jsx';
import SubmissionContainer from './AddDataComponents.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import Request from 'superagent';
import AWS from 'aws-sdk';

export default class SubmissionContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileHolder: [],
            submissionID: 0,
            progress: 0,
            progressStep: 1
        };
    }

    addFileToHolder(newFile) {
        const newFileHolder = [];

        // Copy over everything except for duplicates
        for (let i = 0; i < this.state.fileHolder.length; i++) {
            const currentObject = this.state.fileHolder[i];
            if (currentObject.requestName !== newFile.requestName) {
                newFileHolder.push(currentObject);
            }
        }

        // Add the new file's info to holder
        newFileHolder.push(newFile);

        this.setState({
            fileHolder: newFileHolder
        });
    }

    // Send file names to backend to get fileID and S3 credentials
    uploadClicked() {
        if (this.state.fileHolder.length > 0) {
            const request = {};
            for (let i = 0; i < this.state.fileHolder.length; i++) {
                const fileContainer = this.state.fileHolder[i];
                request[fileContainer.requestName] = fileContainer.file.name;
            }

            const req = Request.post(kGlobalConstants.API + 'submit_files/')
                            .withCredentials()
                            .send(request);

            req.end((err, res) => {
                if (err) {
                    console.log(err + res);
                } else {
                    // Start an S3 upload for each of the files
                    for (let i = 0; i < this.state.fileHolder.length; i++) {
                        const fileContainer = this.state.fileHolder[i];
                        const fileID = res.body[fileContainer.requestName + '_id'];
                        const fileKey = res.body[fileContainer.requestName + '_key'];

                        if (kGlobalConstants.LOCAL == true){
                            this.finalizeUpload(fileContainer.file.name);
                        } else {
                            this.uploadFiles(fileContainer.file, fileID, fileKey, res.body.credentials, this.state.fileHolder.length);
                        }
                    }

                    // TODO: Remove this when this is eventually tied to user accounts
                    this.setState({
                        submissionID: res.body.submission_id
                    });
                }
            });
        }
    }

    // Put the files in S3 bucket using STS for temporary credentials
    uploadFiles(file, fileID, key, credentials, count) {
        AWS.config.update({
            'accessKeyId': credentials.AccessKeyId,
            'secretAccessKey': credentials.SecretAccessKey,
            'sessionToken': credentials.SessionToken
        });

        const s3 = new AWS.S3();
        const s3params = {
            Bucket: 'dev-data-act-submission',
            Key: key,
            Body: file
        };

        s3.upload(s3params)
          .on('httpUploadProgress', evt => {
              this.setState({
                  progress: this.state.progress + (evt.loaded / evt.total * 100) / count
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
        Request.post(kGlobalConstants.API + 'finalize_job/')
               .withCredentials()
               .send({ 'upload_id': fileID })
               .end((err, res) => {
                   if (err) {
                       console.log(err + JSON.stringify(res.body));
                   } else {
                       this.setState({ progressStep: 2 });
                   }
               });
    }

    render() {
        const files = [
            { fileTitle: 'Appropriation', fileTemplateName: 'appropriation.csv', requestName: 'appropriations', progress: '0' },
            { fileTitle: 'Award', fileTemplateName: 'award.csv', requestName: 'award', progress: '0' },
            { fileTitle: 'Award Financial', fileTemplateName: 'award_financial.csv', requestName: 'award_financial', progress: '0' },
            { fileTitle: 'Program Activity', fileTemplateName: 'programActivity.csv', requestName: 'procurement', progress: '0' }
        ];

        // TODO: Remove this when this is eventually tied to user accounts
        let subID = null;
        let subLink = null;
        if (this.state.submissionID !== 0) {
            subID = 'Review Submission: ' + this.state.submissionID;
            subLink = '#/reviewData/' + this.state.submissionID;
        }

        let actionArea;
        if (this.state.progress > 0) {
            actionArea = <FileProgress fileStatus={this.state.progress} />;
        } else {
            actionArea = <SubmitButton onClick={this.uploadClicked.bind(this)} className="usa-da-button-bigger" buttonText="Upload & Validate CSV files" />;
        }

        return (
            <div>
                <div className="usa-da-content-light-gray">
                    <div className="container center-block">
                        <div className="row">
                            <Progress totalSteps={3} currentStep={this.state.progressStep} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container center-block">
                        <div className="row">
                            <SubmissionContainer
                              files={files}
                              addFile={this.addFileToHolder.bind(this)}
                            />
                        </div>
                        <div className="text-center">
                            <p>
                                <a href={subLink}>{subID}</a>
                            </p>
                            {actionArea}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
