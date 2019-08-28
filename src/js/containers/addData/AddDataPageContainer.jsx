/**
* AddDataPageContainer.jsx
* Created by Kevin Li
*/

import React from 'react'; 
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions';

import AddDataPage from '../../components/addData/AddDataPage';

const propTypes = {
    resetSubmission: PropTypes.func,
    setMeta: PropTypes.func
};

const defaultProps = {
    resetSubmission: () => {},
    setMeta: () => {}
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
AddDataPageContainer.defaultProps = defaultProps;


export default connect(
    (state) => ({ submission: state.submission }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(AddDataPageContainer);
