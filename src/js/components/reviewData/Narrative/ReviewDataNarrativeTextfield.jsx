/**
 * ReviewDataNarrativeTextfield.jsx
 * Created by Alisa Burdeyny 11/21/16
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    textChanged: PropTypes.func,
    currentContent: PropTypes.string,
    fileType: PropTypes.string
};

const defaultProps = {
    textChanged: null,
    currentContent: '',
    fileType: ''
};

export default class ReviewDataNarrativeTextfield extends React.Component {
    textChanged(e) {
        this.props.textChanged(e.target.value, this.props.fileType);
    }

    render() {
        const placeholderType = this.props.fileType === 'submission_comment' ? 'submission' : 'file';
        return (
            <div className="narrative-box">
                <textarea
                    rows="1"
                    id={`submission-review-narrative-${this.props.fileType}`}
                    value={this.props.currentContent}
                    onChange={this.textChanged.bind(this)}
                    placeholder={`Enter a comment to describe this ${placeholderType}...`} />
            </div>
        );
    }
}

ReviewDataNarrativeTextfield.propTypes = propTypes;
ReviewDataNarrativeTextfield.defaultProps = defaultProps;
