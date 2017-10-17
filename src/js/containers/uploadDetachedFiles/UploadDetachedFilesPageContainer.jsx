/**
* UploadDetachedFilesPageContainer.jsx
* Created by Mike Hess
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions.js';
import UploadDetachedFilesPage from '../../components/uploadDetachedFiles/UploadDetachedFilesPage.jsx';

import Moment from 'moment';

class UploadDetachedFilesPageContainer extends React.Component {
    render() {
        return (
            <UploadDetachedFilesPage {...this.props} />
        );
    }
}

export default connect(
    state => ({ submission: state.submission }),
    dispatch => bindActionCreators(uploadActions, dispatch)
)(UploadDetachedFilesPageContainer);
