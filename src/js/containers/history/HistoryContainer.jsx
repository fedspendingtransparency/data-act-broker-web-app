/**
* HistoryContainer.jsx
* Created by Minahm Kim 6/7/17
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HistoryPage from 'components/history/HistoryPage';

const propTypes = {
    type: PropTypes.oneOf(['dabs', 'fabs'])
};

class HistoryContainer extends React.Component {
    render() {
        return (
            <HistoryPage type={this.props.type} />
        );
    }
}

HistoryContainer.propTypes = propTypes;

export default connect(
    (state) => ({ session: state.session })
)(HistoryContainer);
