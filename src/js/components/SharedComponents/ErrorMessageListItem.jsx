/**
* ErrorMessage.jsx
* Created by Martin Press 3/4/16
*/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.string.isRequired
};

export default class ErrorMessageListItem extends React.Component {
    render() {
        return (
            <li>{this.props.data}</li>
        );
    }
}

ErrorMessageListItem.propTypes = propTypes;
