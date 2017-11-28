/**
* GenerateDetachedFilesPageContainer.jsx
* Created by Alisa Burdeyny
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions.js';
import GenerateDetachedFilesPage from '../../components/generateDetachedFiles/GenerateDetachedFilesPage.jsx';

class GenerateDetachedFilesPageContainer extends React.Component {
    render() {
        return (
            <GenerateDetachedFilesPage {...this.props} />
        );
    }
}

export default connect(
    (state) => ({ session: state.session }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(GenerateDetachedFilesPageContainer);
