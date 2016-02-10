/**
* AddDataPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Navbar from '../SharedComponents/NavigationComponent.jsx';
import TypeSelector from './AddDataTypeSelector.jsx';
import SubmissionContainer from './AddDataComponents.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import Request from 'superagent';
import AWS from 'aws-sdk';

class SubmissionPageHeader extends React.Component {
    render() {
        return (
            <div className="usa-da-content-dark">
                <div className="container">
                    <div className="row usa-da-content-add-data">
                        <div className="col-md-6">
                            <h1>Add New Data</h1>
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                                Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar
                                tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                Nam fermentum, nulla luctus pharetra vulputate, felis</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class SubmissionContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileHolder: [],
            submissionID: 0
        };
    }

    addFileToHolder(newFile) {
        const newFileHolder = this.state.fileHolder;
        newFileHolder.push(newFile);

        this.setState({
            fileHolder: newFileHolder
        });
    }

    // Send file names to backend to get fileID and S3 credentials
    uploadClicked() {
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
                    this.uploadFiles(fileContainer.file, fileID, fileKey, res.body.credentials);
                }

                // TODO: Remove this when this is eventually tied to user accounts
                this.setState({
                    submissionID: res.body.submission_id
                });
            }
        });
    }

    // Put the files in S3 bucket using STS for temporary credentials
    uploadFiles(file, fileID, key, credentials) {
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
        Request.post(kGlobalConstants.API + 'finalize_job/')
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
        const files = [
            { fileTitle: 'Appropriation', fileTemplateName: 'appropriation.csv', requestName: 'appropriations', step: '0' },
            { fileTitle: 'Award', fileTemplateName: 'award.csv', requestName: 'award', step: '0' },
            { fileTitle: 'Award Financial', fileTemplateName: 'award_financial.csv', requestName: 'award_financial', step: '0' },
            { fileTitle: 'Procurement', fileTemplateName: 'procurement.csv', requestName: 'procurement', step: '0' },
        ];

        return (
            <div>
                <div className="usa-da-content-light-gray">
                    <div className="container center-block">
                        <div className="row">
                            <TypeSelector />
                            <Progress totalSteps={3} currentStep={2} />
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
                            <SubmitButton onClick={this.uploadClicked.bind(this)} className="usa-da-button-bigger" buttonText="Upload & Validate CSV files" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default class SubmissionPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar activeTab="addData"/>
                <SubmissionPageHeader />
                <SubmissionContent />

            </div>
        );
    }
}
