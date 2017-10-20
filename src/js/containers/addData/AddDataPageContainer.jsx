/**
* AddDataPageContainer.jsx
* Created by Kevin Li
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions.js';

import AddDataPage from '../../components/addData/AddDataPage.jsx';

class AddDataPageContainer extends React.Component {
    componentDidMount() {
        this.props.resetSubmission();
    }

    render() {
        return (
            <AddDataPage {...this.props} updateMetaData={this.props.setMeta} />
        );
    }
}

export default connect(
    (state) => ({ submission: state.submission }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(AddDataPageContainer);
