/**
 * ReviewDataNarrative.jsx
 * Created by Alisa Burdeyny 11/21/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ReviewHelper from 'helpers/reviewHelper';
import ReviewDataNarrativeTextfield from './ReviewDataNarrativeTextfield';
import ReviewDataNarrativeCollapsed from './ReviewDataNarrativeCollapsed';

const propTypes = {
    submissionID: PropTypes.string,
    loadData: PropTypes.func,
    publishStatus: PropTypes.string
};

const defaultProps = {
    submissionID: '',
    publishStatus: ''
};

const blockedStatuses = ['reverting', 'publishing'];

export default class ReviewDataNarrative extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialNarrative: {
                submission_comment: '',
                A: '',
                B: '',
                C: '',
                D1: '',
                D2: '',
                E: '',
                F: ''
            },
            currentNarrative: {
                submission_comment: '',
                A: '',
                B: '',
                C: '',
                D1: '',
                D2: '',
                E: '',
                F: ''
            },
            saveState: '',
            errorMessage: '',
            commentsCollapsed: true
        };

        this.downloadCommentsFile = this.downloadCommentsFile.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.saveNarrative = this.saveNarrative.bind(this);
        this.undoChanges = this.undoChanges.bind(this);
        this.toggleCommentBox = this.toggleCommentBox.bind(this);
    }

    componentDidMount() {
        this.updateState(this.props);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.updateState(this.props);
        }
    }

    saveNarrative() {
        this.setState({ saveState: 'Saving' });
        const tempNarrative = Object.assign({}, this.state.currentNarrative);
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
            initialNarrative: props.narrative,
            currentNarrative: props.narrative,
            saveState: ''
        });
    }

    undoChanges() {
        const originalStatus = Object.assign({}, this.state.initialNarrative);
        this.setState({ currentNarrative: originalStatus });
    }

    textChanged(newContent, fileType) {
        const newNarrative = Object.assign({}, this.state.currentNarrative);
        newNarrative[fileType] = newContent;
        this.setState({ currentNarrative: newNarrative });
    }

    toggleCommentBox() {
        this.setState({ commentsCollapsed: !this.state.commentsCollapsed });
    }

    render() {
        if (this.state.commentsCollapsed) {
            return (
                <ReviewDataNarrativeCollapsed
                    toggleCommentBox={this.toggleCommentBox}
                    initialNarrative={this.state.initialNarrative} />
            );
        }
        const hasSavedComments = Object.values(this.state.initialNarrative).some((x) => x !== '');
        const commentsChanged = !isEqual(this.state.initialNarrative, this.state.currentNarrative);
        let resultSymbol = null;
        let resultText = null;
        let downloadButton = (
            <button
                className="usa-da-download"
                onClick={this.downloadCommentsFile}>
                <FontAwesomeIcon icon="cloud-download-alt" /> Download Comments for All Files (.csv)
            </button>
        );
        if (blockedStatuses.indexOf(this.props.publishStatus) > -1 || !hasSavedComments) {
            downloadButton = null;
        }

        if (this.state.saveState === 'Saved') {
            resultSymbol = <FontAwesomeIcon icon="check-circle" />;
            resultText = 'Saved';
        }
        else if (this.state.saveState === 'Error') {
            resultSymbol = <FontAwesomeIcon icon="times-circle" />;
            resultText = 'An error occurred and your comments were not saved';
        }
        else if (this.state.saveState === 'Saving') {
            resultText = 'Saving...';
        }
        return (
            <div className="narrative-wrapper">
                <button
                    className="collapse-button"
                    onClick={this.toggleCommentBox}
                    aria-label="Toggle collapsed comment box state">
                    <FontAwesomeIcon icon="chevron-up" />
                </button>
                <h4>Submission Comment</h4>
                <ReviewDataNarrativeTextfield
                    currentContent={this.state.currentNarrative.submission_comment}
                    textChanged={this.textChanged}
                    fileType="submission_comment" />
                <h4 className="extra-padding">File Comments</h4>
                <h5>File A</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={this.state.currentNarrative.A}
                    textChanged={this.textChanged}
                    fileType="A" />
                <h5>File B</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={this.state.currentNarrative.B}
                    textChanged={this.textChanged}
                    fileType="B" />
                <h5>File C</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={this.state.currentNarrative.C}
                    textChanged={this.textChanged}
                    fileType="C" />
                <h5>File D1</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={this.state.currentNarrative.D1}
                    textChanged={this.textChanged}
                    fileType="D1" />
                <h5>File D2</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={this.state.currentNarrative.D2}
                    textChanged={this.textChanged}
                    fileType="D2" />
                <h5>File E</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={this.state.currentNarrative.E}
                    textChanged={this.textChanged}
                    fileType="E" />
                <h5>File F</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={this.state.currentNarrative.F}
                    textChanged={this.textChanged}
                    fileType="F" />
                <div className="row comment-buttons">
                    <div className="col-md-4">
                        {downloadButton}
                    </div>
                    <div className="col-md-8 save-buttons">
                        <p className="save-state">
                            {resultSymbol}{resultText}{this.state.errorMessage}
                        </p>
                        <button
                            onClick={this.undoChanges}
                            className="usa-da-button btn-transparent"
                            disabled={blockedStatuses.indexOf(this.props.publishStatus) > -1 || !commentsChanged}>
                            Cancel
                        </button>
                        <button
                            onClick={this.saveNarrative}
                            className="usa-da-button btn-primary"
                            disabled={blockedStatuses.indexOf(this.props.publishStatus) > -1 || !commentsChanged}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

ReviewDataNarrative.propTypes = propTypes;
ReviewDataNarrative.defaultProps = defaultProps;
