/**
* ErrorMessage.jsx
* Created by Martin Press 3/4/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessageListItem from './ErrorMessageListItem';

const propTypes = {
    errorMessages: PropTypes.array
};

const defaultProps = {
    errorMessages: ['Error']
};

export default class ErrorMessageList extends React.Component {
    render() {
        const errorListItems = [];
        for (let i = 0; i < this.props.errorMessages.length; i++) {
            errorListItems.push(<ErrorMessageListItem key={i} data={this.props.errorMessages[i]} />);
        }
        return (
            <div className="col-md-12 alert alert-error mt-40 mb-0" role="alert">
                <span className="usa-da-icon usa-da-icon-exclamation-circle" />
                <div className="alert-header-text">Error</div>
                <ul>{errorListItems}</ul>
            </div>
        );
    }
}

ErrorMessageList.defaultProps = defaultProps;
ErrorMessageList.propTypes = propTypes;
