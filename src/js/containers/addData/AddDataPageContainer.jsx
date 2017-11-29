/**
* AddDataPageContainer.jsx
* Created by Kevin Li
*/

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions';

import AddDataPage from '../../components/addData/AddDataPage';

const propTypes = {
    resetSubmission: PropTypes.func,
    setMeta: PropTypes.func
};

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

AddDataPageContainer.propTypes = propTypes;

export default connect(
    (state) => ({ submission: state.submission }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(AddDataPageContainer);
