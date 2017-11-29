/**
  * ValidateDataFileContainer.jsx
  * Created by Kevin Li 4/1/2016
  */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions';

import ValidateDataFileComponent from '../../components/validateData/ValidateDataFileComponent';

const propTypes = {
    updateItem: PropTypes.func,
    setUploadItem: PropTypes.func,
    removeUploadItem: PropTypes.func,
    data: PropTypes.object,
    type: PropTypes.object
};

class ValidateDataFileContainer extends React.Component {
    constructor(props) {
        super(props);
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
                onFileChange={this.selectedFile.bind(this)}
                removeFile={this.removeFile.bind(this)} />
        );
    }
}

ValidateDataFileContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        submission: state.submission,
        session: state.session
    }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(ValidateDataFileContainer);
