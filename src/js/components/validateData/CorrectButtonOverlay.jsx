/**
 * CorrectButtonOverlay.jsx
 * Created by Mike Bray 6/21/16
 **/

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions.js';
import { kGlobalConstants } from '../../GlobalConstants.js';
import * as UploadHelper from '../../helpers/uploadHelper.js';

import ValidateDataUploadButton from './ValidateDataUploadButton.jsx';
import CorrectButtonCornerOverlay from './CorrectButtonCornerOverlay.jsx';
import CorrectButtonFullOverlay from './CorrectButtonFullOverlay.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

const defaultProps = {
    fullName: '',
    type: ''
};

class CorrectButtonOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showOverlay: false
        };
    }

    isFileStaged() {
        if (this.props.submission.files.hasOwnProperty(this.props.fileKey)) {
            return true;
        }
        return false;
    }

    buttonClicked() {
        this.setState({showOverlay: !this.state.showOverlay});
    }

    render() {
        let displayText = 'Choose a New File';

        if (this.isFileStaged()){
            displayText = 'File: ' + this.props.fileName;
        }

        let chooseFileOverlay = null;
        if (this.state.showOverlay){
            chooseFileOverlay = <CorrectButtonFullOverlay text={displayText} optional={true} onDrop={this.props.onDrop} buttonClicked={this.buttonClicked.bind(this)} />;
        }

        return (
            <div>
                <CorrectButtonCornerOverlay buttonClicked={this.buttonClicked.bind(this)} />
                {chooseFileOverlay}
            </div>
        );
    }
}

CorrectButtonOverlay.defaultProps = defaultProps;

export default connect(
    state => ({ submission: state.submission }),
    dispatch => bindActionCreators(uploadActions, dispatch)
)(CorrectButtonOverlay)