/**
 * RedirectContainer.jsx
 * Created by Alisa Burdeyny 4/29/24
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router';

const propTypes = {
    redirectPath: PropTypes.string.isRequired
};

export default class RedirectContainer extends React.Component {
    render() {
        return <Navigate to={`${this.props.redirectPath}`} />;
    }
}

RedirectContainer.propTypes = propTypes;
