/**
  * HistoryLink.jsx
  * Created by Minahm Kim 06/05/17
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                <a href={`#/submissionHistory/${this.props.submissionId}`}>
                    <FontAwesomeIcon icon={['far', 'calendar-alt']} title="View" />
                </a>
            </div>
        );
    }
}

HistoryLink.propTypes = propTypes;
