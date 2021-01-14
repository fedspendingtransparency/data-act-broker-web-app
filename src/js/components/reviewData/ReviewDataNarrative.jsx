/**
 * ReviewDataNarrative.jsx
 * Created by Alisa Burdeyny 11/21/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { createOnKeyDownHandler } from 'helpers/util';
import * as ReviewHelper from 'helpers/reviewHelper';
import { CloudDownload } from 'components/SharedComponents/icons/Icons';
import ReviewDataNarrativeDropdown from './ReviewDataNarrativeDropdown';
import ReviewDataNarrativeTextfield from './ReviewDataNarrativeTextfield';

const propTypes = {
    submissionID: PropTypes.string,
    loadData: PropTypes.func,
    publishStatus: PropTypes.string
};

const defaultProps = {
    submissionID: '',
    publishStatus: ''
};

export default class ReviewDataNarrative extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: 'A',
            fileNarrative: {},
            currentNarrative: '',
            saveState: '',
            errorMessage: ''
        };

        this.downloadCommentsFile = this.downloadCommentsFile.bind(this);
        this.changeFile = this.changeFile.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.saveNarrative = this.saveNarrative.bind(this);
    }

    componentDidMount() {
        this.updateState(this.props);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.updateState(this.props);
        }
    }

    getNewNarrative() {
        const tempNarrative = this.state.fileNarrative;
        tempNarrative[this.state.currentFile] = this.state.currentNarrative;
        return tempNarrative;
    }

    saveNarrative() {
        this.setState({ saveState: 'Saving' });
        const tempNarrative = this.getNewNarrative();
        tempNarrative.submission_id = this.props.submissionID;

        ReviewHelper.saveNarrative(tempNarrative)
            .then(() => {
                this.setState({
                    saveState: 'Saved',
                    errorMessage: ''
                }, () => this.props.loadData());
            })
            .catch(() => {
                this.setState({
                    saveState: 'Error',
                    errorMessage: ''
                });
            });
    }

    downloadCommentsFile() {
        ReviewHelper.fetchCommentsFile(this.props.submissionID)
            .then((result) => {
                window.open(result.url);
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    saveState: 'Error',
                    errorMessage: `: ${error.message}`
                });
            });
    }

    updateState(props) {
        this.setState({
            currentFile: 'A',
            fileNarrative: props.narrative,
            currentNarrative: props.narrative.A,
            saveState: ''
        });
    }

    changeFile(newFile) {
        const tempNarrative = this.getNewNarrative();

        this.setState({
            fileNarrative: tempNarrative,
            currentFile: newFile,
            currentNarrative: tempNarrative[newFile]
        });
    }

    textChanged(newNarrative) {
        this.setState({ currentNarrative: newNarrative });
    }

    render() {
        const onKeyDownHandler = createOnKeyDownHandler(this.downloadCommentsFile);
        const blockedStatuses = ['reverting', 'publishing'];
        let downloadButton = (
            <div
                role="button"
                tabIndex={0}
                className="usa-da-download pull-right"
                onKeyDown={onKeyDownHandler}
                onClick={this.downloadCommentsFile}>
                <span className="usa-da-icon usa-da-download-report">
                    <CloudDownload />
                </span>Download Comments for All Files (.csv)
            </div>
        );
        if (blockedStatuses.indexOf(this.props.publishStatus) > -1) {
            downloadButton = null;
        }
        return (
            <div className="narrative-wrapper">
                <div className="gray-bg">
                    <h4>Add comments to files</h4>
                    <div className="row">
                        <div className="col-md-7">
                            <ReviewDataNarrativeDropdown
                                changeFile={this.changeFile}
                                currentFile={this.state.currentFile} />
                        </div>
                        <div className="col-md-5 pull-right">
                            {downloadButton}
                        </div>
                    </div>
                    <ReviewDataNarrativeTextfield
                        currentContent={this.state.currentNarrative}
                        textChanged={this.textChanged} />
                    <div className="row">
                        <div className="col-md-12">
                            <button
                                onClick={this.saveNarrative}
                                className="usa-da-button btn-default"
                                disabled={blockedStatuses.indexOf(this.props.publishStatus) > -1}>
                                Save Changes
                            </button>
                            <p className={`save-state ${this.state.saveState}`}>
                                {this.state.saveState}{this.state.errorMessage}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReviewDataNarrative.propTypes = propTypes;
ReviewDataNarrative.defaultProps = defaultProps;
