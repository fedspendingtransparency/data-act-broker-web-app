/**
* ErrorMessage.jsx
* Created by Martin Press 3/4/16
**/

import React, { PropTypes } from 'react';
import ErrorMessageListItem from './ErrorMessageListItem.jsx';

const propTypes = {
    errorMessages: PropTypes.array.isRequired
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
            <div className="col-md-12 usa-alert usa-alert-error" role="alert">
                <div className="usa-alert-body">
                    <h3 className="usa-alert-heading">Error</h3>
                    <ul>{errorListItems}</ul>
                </div>
            </div>
        );
    }
}
ErrorMessageList.defaultProps = defaultProps;
ErrorMessageList.propTypes = propTypes;
