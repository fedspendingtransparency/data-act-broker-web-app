/**
* HistoryContainer.jsx
* Created by Minahm Kim 6/7/17
*/

import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { connect } from 'react-redux';

import HistoryPage from 'components/history/HistoryPage';

const propTypes = {
    type: PropTypes.oneOf(['dabs', 'fabs'])
};

const HistoryContainer = (props) => {
    const params = useParams();
    return (
        <HistoryPage submissionID={params.submissionID} type={props.type} />
    );
}

HistoryContainer.propTypes = propTypes;

export default connect(
    (state) => ({ session: state.session })
)(HistoryContainer);
