/**
 * ReviewDataNarrativeTextfield.jsx
 * Created by Alisa Burdeyny 11/21/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const asciiRegex = /^[ -~\t\n\r]+$/;

export default class ReviewDataNarrativeTextfield extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validAscii: asciiRegex.test(this.props.currentContent) || this.props.currentContent === ''
        };

        this.textChanged = this.textChanged.bind(this);
        this.validateAscii = this.validateAscii.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentContent !== this.props.currentContent) {
            this.validateAscii();
        }
    }

    validateAscii() {
        this.setState({
            validAscii: asciiRegex.test(this.props.currentContent) || this.props.currentContent === ''
        });
    }

    textChanged(e) {
        this.props.textChanged(e.target.value, this.props.fileType);
    }

    render() {
        const placeholderType = this.props.fileType === 'submission_comment' ? 'submission' : 'file';
        const warningMessage = this.state.validAscii ? null :
            (
                <React.Fragment>
                    <FontAwesomeIcon icon="exclamation-triangle" />
                    Your comment contains non-standard characters that may not display properly.
                </React.Fragment>
            );
        return (
            <div className="narrative-box">
                <textarea
                    rows="1"
                    id={`submission-review-narrative-${this.props.fileType}`}
                    value={this.props.currentContent}
                    onChange={this.textChanged.bind(this)}
                    placeholder={`Enter a comment to describe this ${placeholderType}...`}
                    className={this.state.validAscii ? '' : 'invalid-ascii'} />
                {warningMessage}
            </div>
        );
    }
}

ReviewDataNarrativeTextfield.propTypes = propTypes;
ReviewDataNarrativeTextfield.defaultProps = defaultProps;
