/**
  * ValidateDataFileContainer.jsx
  * Created by Kevin Li 4/1/2016
  */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from 'redux/actions/uploadActions';
import ValidateDataFileComponent from 'components/validateData/ValidateDataFileComponent';

const propTypes = {
    updateItem: PropTypes.func,
    setUploadItem: PropTypes.func,
    removeUploadItem: PropTypes.func,
    data: PropTypes.object,
    type: PropTypes.object,
    progress: PropTypes.number,
    fileName: PropTypes.string
};

const defaultProps = {
    updateItem: () => {},
    setUploadItem: () => {},
    removeUploadItem: () => {},
    data: {},
    type: {},
    progress: 0,
    fileName: ''
};

class ValidateDataFileContainer extends React.Component {
    constructor(props) {
        super(props);

        this.selectedFile = this.selectedFile.bind(this);
        this.removeFile = this.removeFile.bind(this);
    }

    selectedFile(file) {
        this.props.setUploadItem({
            name: this.props.type.requestName,
            state: 'ready',
            file
        });
        if (this.props.updateItem) {
            this.props.updateItem(file);
        }
    }

    removeFile() {
        this.props.removeUploadItem({ name: this.props.type.requestName });
    }

    render() {
        return (
            <ValidateDataFileComponent
                {...this.props}
                item={this.props.data[this.props.type.requestName]}
                onFileChange={this.selectedFile}
                removeFile={this.removeFile} />
        );
    }
}

ValidateDataFileContainer.propTypes = propTypes;
ValidateDataFileContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        submission: state.submission,
        session: state.session
    }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(ValidateDataFileContainer);
