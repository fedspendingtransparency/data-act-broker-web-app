/**
 * CorrectButtonOverlay.jsx
 * Created by Mike Bray 6/21/16
 */

import React, { PropTypes } from 'react';

import CorrectButtonCornerOverlay from './CorrectButtonCornerOverlay';
import CorrectButtonFullOverlay from './CorrectButtonFullOverlay';

const propTypes = {
    onDrop: PropTypes.func,
    removeFile: PropTypes.func,
    fileName: PropTypes.string,
    isReplacingFile: PropTypes.bool,
    fullName: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    onDrop: () => {},
    removeFile: () => {},
    fileName: '',
    isReplacingFile: false,
    fullName: '',
    type: ''
};

export default class CorrectButtonOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showOverlay: false
        };
    }

    buttonClicked() {
        this.setState({ showOverlay: !this.state.showOverlay });
    }

    removeFile() {
        this.setState({ showOverlay: !this.state.showOverlay });
        this.props.removeFile();
    }

    render() {
        let displayText = 'Choose a New File';

        if (this.props.isReplacingFile) {
            displayText = `File: ${this.props.fileName}`;
        }

        let chooseFileOverlay = null;
        if (this.state.showOverlay) {
            chooseFileOverlay = (<CorrectButtonFullOverlay
                text={displayText}
                onDrop={this.props.onDrop}
                buttonClicked={this.removeFile.bind(this)} />);
        }

        return (
            <div>
                <CorrectButtonCornerOverlay buttonClicked={this.buttonClicked.bind(this)} />
                {chooseFileOverlay}
            </div>
        );
    }
}

CorrectButtonOverlay.propTypes = propTypes;
CorrectButtonOverlay.defaultProps = defaultProps;
