/**
* UploadFabsFilePageContainer.jsx
* Created by Mike Hess
*/

import React from 'react';
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

class UploadFabsFilePageContainer extends React.Component {
    render() {
        return (
            <UploadFabsFilePage {...this.props} />
        );
    }
}

UploadFabsFilePageContainer.propTypes = propTypes;

export default connect(
    (state) => ({ submission: state.submission }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(UploadFabsFilePageContainer);
