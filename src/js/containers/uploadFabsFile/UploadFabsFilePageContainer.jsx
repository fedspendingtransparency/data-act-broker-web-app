/**
* UploadFabsFilePageContainer.jsx
* Created by Mike Hess
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions';
import UploadFabsFilePage from '../../components/uploadFabsFile/UploadFabsFilePage';

class UploadFabsFilePageContainer extends React.Component {
    render() {
        return (
            <UploadFabsFilePage {...this.props} />
        );
    }
}

export default connect(
    (state) => ({ submission: state.submission }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(UploadFabsFilePageContainer);
