/**
 * SubmissionGuideContainer.jsx
 * Created by Mike Bray 5/23/16
 */

import React from 'react'; 
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import SubmissionGuidePage from '../../components/addData/SubmissionGuidePage';
import * as sessionActions from '../../redux/actions/sessionActions';

import * as SubmissionGuideHelper from '../../helpers/submissionGuideHelper';

const propTypes = {
    setSkipGuide: PropTypes.func,
    location: PropTypes.object,
    session: PropTypes.object
};

const defaultProps = {
    setSkipGuide: () => {},
    location: {},
    session: {}
};

class SubmissionGuideContainer extends React.Component {
    componentWillMount() {
        let forceDisplay = false;
        if (Object.prototype.hasOwnProperty.call(this.props.location.query, 'force') &&
            this.props.location.query.force === 'true') {
            forceDisplay = true;
        }

        if (this.props.session.skipGuide === true && forceDisplay !== true) {
            this.sendToAddData();
        }
    }

    saveSkipGuide(skipGuide) {
        SubmissionGuideHelper.setSkipGuide(skipGuide)
            .then(() => {
                // update the Redux state
                this.props.setSkipGuide(skipGuide);
                this.sendToAddData();
            })
            .catch((err) => {
                // TODO: Figure out how to handle errors
                console.error(err);
            });
    }

    sendToAddData() {
        hashHistory.push('/addData/');
    }

    render() {
        return (
            <SubmissionGuidePage {...this.props} saveSkipGuide={this.saveSkipGuide.bind(this)} />
        );
    }
}

SubmissionGuideContainer.propTypes = propTypes;
SubmissionGuideContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session }),
    (dispatch) => bindActionCreators(sessionActions, dispatch)
)(SubmissionGuideContainer);
