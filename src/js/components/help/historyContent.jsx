/**
 * HistoryContent.jsx
 * Created by Emily Gullo 9/27/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const propTypes = {
    history: PropTypes.string,
    title: PropTypes.string
};

const defaultProps = {
    history: '',
    title: ''
};

export default class HistoryContent extends React.Component {
    render() {
        return (
            <div className="usa-da-help-content">
                <h2>{this.props.title}</h2>
                <p><b>Note</b>: Links in the archive are not kept up to date and may no longer work.</p>
                <ReactMarkdown source={this.props.history} />
            </div>
        );
    }
}

HistoryContent.propTypes = propTypes;
HistoryContent.defaultProps = defaultProps;
