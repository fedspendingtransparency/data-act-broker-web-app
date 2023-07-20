/**
  * HistoryLink.jsx
  * Created by Minahm Kim 06/05/17
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

const propTypes = {
    submissionId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default class HistoryLink extends React.Component {
    render() {
        return (
            <div className="usa-da-recent-activity-link">
                <Link to={`submissionHistory/${this.props.submissionId}`}>
                    <FontAwesomeIcon icon={['far', 'calendar-alt']} title="View" />
                </Link>
            </div>
        );
    }
}

HistoryLink.propTypes = propTypes;
