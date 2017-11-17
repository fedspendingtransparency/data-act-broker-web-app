/**
* HistoryContainer.jsx
* Created by Minahm Kim 6/7/17
**/

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import HistoryPage from '../../components/history/HistoryPage.jsx';

const propTypes = {
    params: PropTypes.object,
    route: PropTypes.object
};

class HistoryContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HistoryPage submissionID={this.props.params.submissionID} type={this.props.route.type} />
        );
    }
}

HistoryContainer.propTypes = propTypes;

export default connect(
    (state) => ({ session: state.session })
)(HistoryContainer);
