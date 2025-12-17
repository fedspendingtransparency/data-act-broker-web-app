/**
  * ValidateDataFileContainer.jsx
  * Created by Kevin Li 4/1/2016
  */

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

const ValidateDataFileContainer = ({
    updateItem = () => {},
    setUploadItem = () => {},
    removeUploadItem = () => {},
    data = {},
    type = {},
    progress = 0,
    fileName = '',
    ...props
}) => {
    const selectedFile = (file) => {
        setUploadItem({
            name: type.requestName,
            state: 'ready',
            file
        });
        if (updateItem) {
            updateItem(file);
        }
    };

    const removeFile = () => {
        removeUploadItem({ name: type.requestName });
    };

    return (
        <ValidateDataFileComponent
            {...props}
            progress={progress}
            fileName={fileName}
            type={type}
            item={data[type.requestName]}
            onFileChange={selectedFile}
            removeFile={removeFile} />
    );
};

ValidateDataFileContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        submission: state.submission,
        session: state.session
    }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(ValidateDataFileContainer);
