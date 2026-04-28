/**
 * ReviewDataNarrative.jsx
 * Created by Alisa Burdeyny 11/21/16
 */

import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ReviewHelper from 'helpers/reviewHelper';
import * as UtilHelper from 'helpers/util';
import ReviewDataNarrativeTextfield from './ReviewDataNarrativeTextfield';
import ReviewDataNarrativeCollapsed from './ReviewDataNarrativeCollapsed';

const propTypes = {
    submissionID: PropTypes.string,
    loadData: PropTypes.func,
    publishStatus: PropTypes.string,
    saveState: PropTypes.string,
    updateSaving: PropTypes.func
};

const ReviewDataNarrative = ({submissionID = '', publishStatus = '', saveState = '', ...props}) => {
    const blockedStatuses = ['reverting', 'publishing'];

    const [initialNarrative, setInitialNarrative] = useState(props.narrative);
    const [currentNarrative, setCurrentNarrative] = useState(props.narrative);
    const [errorMessage, setErrorMessage] = useState('');
    const [commentsCollapsed, setCommentsCollapsed] = useState(true);
    const [savingState, setSavingState] = useState('');
    const [commentsChanged, setCommentsChanged] = useState(false);

    useEffect(() => {
        if (commentsChanged) {
            window.addEventListener("beforeunload", preventExit);
        }
        return () => {
            window.removeEventListener("beforeunload", preventExit);
        };
    }, [commentsChanged]);

    useEffect(() => {
        setInitialNarrative(props.narrative);
        setCurrentNarrative(props.narrative);
        setCommentsChanged(false);
    }, [props.narrative]);

    useEffect(() => {
        if (savingState) {
            props.updateSaving(savingState);

            if (savingState === 'Saved') {
                props.loadData();
            }
            setSavingState('');
        }
    }, [savingState]);

    const preventExit = (e) => {
        // for this function we want to disable the consistent-return rule because we only want it to return
        // when this condition is met. Otherwise it prevents the user from leaving the page at the wrong time
        e.preventDefault();
        e.returnValue = 'You have unsaved comments.';
        return 'You have unsaved comments.';
    };

    const saveNarrative = () => {
        props.updateSaving('Saving');
        const tempNarrative = Object.assign({}, currentNarrative);
        tempNarrative.submission_id = submissionID;

        ReviewHelper.saveNarrative(tempNarrative)
            .then(() => {
                setErrorMessage('');
                setSavingState('Saved');
            })
            .catch(() => {
                setErrorMessage('');
                setSavingState('Error');
            });
    };

    const downloadCommentsFile = () => {
        ReviewHelper.fetchCommentsFile(submissionID)
            .then((result) => {
                window.open(result.data.url);
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage(`: ${error.response.data.message}`);
                setSavingState('Error');
            });
    };

    const undoChanges = () => {
        const originalStatus = Object.assign({}, initialNarrative);
        setCurrentNarrative(originalStatus);
        setCommentsChanged(false);
    };

    const textChanged = (newContent, fileType) => {
        const newNarrative = Object.assign({}, currentNarrative);
        newNarrative[fileType] = newContent;
        setCurrentNarrative(newNarrative);
        if (!UtilHelper.trimmedObjectEquality(initialNarrative, newNarrative) && !commentsChanged) {
            // if comments weren't different before and now don't match
            setCommentsChanged(true);
        }
        else if (UtilHelper.trimmedObjectEquality(initialNarrative, newNarrative) && commentsChanged) {
            // if comments were already changed but now they match again
            setCommentsChanged(false);
        }
    };

    const toggleCommentBox = () => {
        setCommentsCollapsed(!commentsCollapsed);
    };

    let unsavedCommentsMessage = null;
    let resultSymbol = null;
    let resultText = null;
    if (commentsChanged) {
        unsavedCommentsMessage = (
            <div className="col-md-6 unsaved-comments">
                <FontAwesomeIcon icon="triangle-exclamation" className="exclamation-triangle-icon" /> There are
                unsaved comments
            </div>);
        resultSymbol = <FontAwesomeIcon icon="triangle-exclamation" className="exclamation-triangle-icon" />;
        resultText = 'There are unsaved comments';
    }
    if (saveState === 'Error') {
        unsavedCommentsMessage = (
            <div className="col-md-6 unsaved-comments">
                <FontAwesomeIcon icon="circle-exclamation" className="exclamation-circle-icon" />
                An error occurred and your comments were not saved
            </div>);
    }
    if (commentsCollapsed) {
        return (
            <ReviewDataNarrativeCollapsed
                toggleCommentBox={toggleCommentBox}
                initialNarrative={initialNarrative}
                unsavedCommentsMessage={unsavedCommentsMessage} />
        );
    }
    const hasSavedComments = Object.values(initialNarrative).some((x) => x !== '');
    let downloadButton = (
        <button
            className="usa-da-download"
            onClick={downloadCommentsFile}>
            <FontAwesomeIcon icon="cloud-arrow-down" /> Download Comments for All Files (.csv)
        </button>
    );
    if (blockedStatuses.indexOf(publishStatus) > -1 || !hasSavedComments) {
        downloadButton = null;
    }

    if (saveState === 'Saved') {
        resultSymbol = <FontAwesomeIcon icon="circle-check" className="check-circle-icon" />;
        resultText = 'Saved';
    }
    else if (saveState === 'Error') {
        resultSymbol = <FontAwesomeIcon icon="circle-exclamation" className="exclamation-circle-icon" />;
        resultText = 'An error occurred and your comments were not saved';
    }
    else if (saveState === 'Saving') {
        resultText = 'Saving...';
    }
    return (
        <React.Fragment>
            <div className="row comments-header">
                <div className="col-md-6">
                    <h5>Agency Comments <span className="not-bold">(optional)</span></h5>
                </div>
                {unsavedCommentsMessage}
            </div>
            <div className="narrative-wrapper">
                <button
                    className="collapse-button"
                    onClick={toggleCommentBox}
                    aria-label="Toggle collapsed comment box state">
                    <FontAwesomeIcon icon="chevron-up" />
                </button>
                <h4>Submission Comment</h4>
                <ReviewDataNarrativeTextfield
                    currentContent={currentNarrative.submission_comment}
                    textChanged={textChanged}
                    fileType="submission_comment" />
                <h4 className="extra-padding">File Comments</h4>
                <h5>File A</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={currentNarrative.A}
                    textChanged={textChanged}
                    fileType="A" />
                <h5>File B</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={currentNarrative.B}
                    textChanged={textChanged}
                    fileType="B" />
                <h5>File C</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={currentNarrative.C}
                    textChanged={textChanged}
                    fileType="C" />
                <h5>File D1</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={currentNarrative.D1}
                    textChanged={textChanged}
                    fileType="D1" />
                <h5>File D2</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={currentNarrative.D2}
                    textChanged={textChanged}
                    fileType="D2" />
                <h5>File E</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={currentNarrative.E}
                    textChanged={textChanged}
                    fileType="E" />
                <h5>File F</h5>
                <ReviewDataNarrativeTextfield
                    currentContent={currentNarrative.F}
                    textChanged={textChanged}
                    fileType="F" />
                <div className="row comment-buttons">
                    <div className="col-md-4">
                        {downloadButton}
                    </div>
                    <div className="col-md-8 save-buttons">
                        <p className="save-state">
                            {resultSymbol}{resultText}{errorMessage}
                        </p>
                        <button
                            onClick={undoChanges}
                            className="usa-da-button btn-transparent"
                            disabled={blockedStatuses.indexOf(publishStatus) > -1 || !commentsChanged}>
                            Cancel
                        </button>
                        <button
                            onClick={saveNarrative}
                            className="usa-da-button btn-primary"
                            disabled={blockedStatuses.indexOf(publishStatus) > -1 || !commentsChanged}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

ReviewDataNarrative.propTypes = propTypes;
export default ReviewDataNarrative;
