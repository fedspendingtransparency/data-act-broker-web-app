/**
  * CrossFileUploadButtonContainer.jsx
  * Created by Kevin Li 6/16/16
  */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions';

import UploadButton from '../../components/validateData/ValidateDataUploadButton';

const propTypes = {
    setCrossFileStage: PropTypes.func,
    setUploadItem: PropTypes.func,
    file: PropTypes.object,
    submission: PropTypes.object,
    fileKey: PropTypes.string,
    pair: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    file: {
        letter: '',
        name: '',
        key: ''
    },
    fileKey: '',
    pair: '',
    type: ''
};

class CrossFileUploadButtonContainer extends React.Component {
    onDrop(file) {
        this.props.setUploadItem({
            name: this.props.fileKey,
            state: 'ready',
            file
        });

        // update the cross file staging Redux object
        const updatedStage = Object.assign({}, this.props.submission.crossFileStaging, {
            [this.props.fileKey]: this.props.pair
        });

        this.props.setCrossFileStage(updatedStage);
    }

    isFileStaged() {
        if (this.props.submission.files.hasOwnProperty(this.props.fileKey)) {
            return true;
        }
        return false;
    }

    render() {
        let displayText = 'File ' + this.props.file.letter + ': ' + this.props.file.name;
        let additionalClasses = ' btn-danger-outline';
        let isOptional = false;
        if (this.props.type === 'optional') {
            isOptional = true;
            additionalClasses = '';
        }

        if (this.isFileStaged()) {
            displayText = 'File ' + this.props.file.letter + ': ' +
                this.props.submission.files[this.props.fileKey].file.name;
            // technically this is an optional upload, but we are going to pass a different CSS class in instead
            isOptional = false;
            additionalClasses = ' btn-staged-upload';
        }

        return (
            <UploadButton
                text={displayText}
                optional={isOptional}
                additionalClasses={additionalClasses}
                onDrop={this.onDrop.bind(this)} />
        );
    }
}

CrossFileUploadButtonContainer.propTypes = propTypes;
CrossFileUploadButtonContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ submission: state.submission }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(CrossFileUploadButtonContainer);
