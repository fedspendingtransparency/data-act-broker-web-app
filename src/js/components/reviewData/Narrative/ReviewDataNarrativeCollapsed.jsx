/**
 * ReviewDataNarrativeCollapsed.jsx
 * Created by Alisa Burdeyny 01/19/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    toggleCommentBox: PropTypes.func,
    initialNarrative: PropTypes.object
};

const defaultProps = {
    initialNarrative: {}
};

export default class ReviewDataNarrativeCollapsed extends React.Component {
    render() {
        const fileKeys = ['submission_comment', 'A', 'B', 'C', 'D1', 'D2', 'E', 'F'];
        let displayText = 'No comments have been added to this submission';
        let fileList = null;
        const commentKeys = [];
        for (const key of fileKeys) {
            if (this.props.initialNarrative[key]) {
                if (key === 'submission_comment') {
                    commentKeys.push('Submission Comment');
                }
                else {
                    commentKeys.push(`File ${key}`);
                }
            }
        }

        if (commentKeys.length > 0) {
            displayText = 'Comments have been added for: ';
            let fileNames = `${commentKeys.join(', ')}`;
            // adding the "and" to the list where appropriate
            if (commentKeys.length > 2) {
                fileNames = fileNames.replace(/,([^,]*)$/, ', and$1');
            }
            else if (commentKeys.length === 2) {
                fileNames = fileNames.replace(', ', ' and ');
            }
            // figure out if there's an "and" in the string and, if it is, make it non-bolded
            fileNames = fileNames.split('and');
            if (fileNames.length > 1) {
                fileNames.splice(1, 0, <span key="and-text" className="regular-weight">and</span>);
            }
            fileList = <span className="file-labels">{fileNames}</span>;
        }
        return (
            <div className="narrative-wrapper collapsed">
                <button
                    className="collapse-button"
                    onClick={this.props.toggleCommentBox}
                    aria-label="Toggle collapsed comment box state">
                    Add comments <FontAwesomeIcon icon="chevron-down" />
                </button>
                <p className="collapsed-text">{displayText}{fileList}</p>
            </div>
        );
    }
}

ReviewDataNarrativeCollapsed.propTypes = propTypes;
ReviewDataNarrativeCollapsed.defaultProps = defaultProps;
