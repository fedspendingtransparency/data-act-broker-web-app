/**
* UploadFabsFilePageContainer.jsx
* Created by Mike Hess
*/

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from 'redux/actions/uploadActions';
import UploadFabsFilePage from 'components/uploadFabsFile/UploadFabsFilePage';

const propTypes = {
    setSubmissionId: PropTypes.func,
    setSubmissionState: PropTypes.func,
    history: PropTypes.object,
    type: PropTypes.oneOf(['dabs', 'fabs']),
    submission: PropTypes.object
};

const UploadFabsFilePageContainer = (props) => {
    return (
        <UploadFabsFilePage {...props} />
    );
};

UploadFabsFilePageContainer.propTypes = propTypes;

export default connect(
    (state) => ({ submission: state.submission }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(UploadFabsFilePageContainer);
