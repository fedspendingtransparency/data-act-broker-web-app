/**
  * ValidateValuesFileContainer.jsx
  * Created by Kevin Li 4/6/2016
  */

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions';

import ValidateValuesFileComponent from '../../components/validateData/validateValues/ValidateValuesFileComponent';

const propTypes = {
    updateItem: PropTypes.func,
    setUploadItem: PropTypes.func,
    removeUploadItem: PropTypes.func,
    data: PropTypes.object,
    type: PropTypes.object
};

const ValidateValuesFileContainer = ({
    updateItem = () => {}, setUploadItem = () => {}, removeUploadItem = () => {}, data = {}, type = {}, ...props
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
        <ValidateValuesFileComponent
            {...props}
            type={type}
            item={data[type.requestName]}
            onFileChange={selectedFile}
            removeFile={removeFile} />
    );
};

ValidateValuesFileContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        submission: state.submission,
        session: state.session
    }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(ValidateValuesFileContainer);
