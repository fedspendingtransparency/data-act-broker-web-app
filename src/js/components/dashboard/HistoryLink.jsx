/**
  * HistoryLink.jsx
  * Created by Minahm Kim 06/05/17
  */

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    submissionId: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]).isRequired
};

export default class HistoryLink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="usa-da-recent-activity-link">
                <a href={`#/submissionHistory/${this.props.submissionId}`}>
                    <Icons.Calendar alt="View" />
                </a>
            </div>
        );
    }
}

HistoryLink.propTypes = propTypes;
