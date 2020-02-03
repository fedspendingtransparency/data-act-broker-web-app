/**
* HistoryContainer.jsx
* Created by Minahm Kim 6/7/17
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HistoryPage from 'components/history/HistoryPage';

const propTypes = {
    type: PropTypes.oneOf(['dabs', 'fabs']),
    computedMatch: PropTypes.object
};

class HistoryContainer extends React.Component {
    render() {
        const submissionID = this.props.computedMatch.params.submissionID;
        return (
            <HistoryPage type={this.props.type} submissionID={submissionID} />
        );
    }
}

HistoryContainer.propTypes = propTypes;

export default connect(
    (state) => ({ session: state.session })
)(HistoryContainer);
