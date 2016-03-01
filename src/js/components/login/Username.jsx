/**
* Username.jsx
* Created by Kyle Fox 2/19/16
**/

import React, { PropTypes } from 'react';

const propTypes = {
    handleChange: PropTypes.func.isRequired
};

export default class Username extends React.Component {
    render() {
        return (
            <div className="usa-da-input-container">
                <label className="sr-only" htmlFor="username">Username or email address</label>
                <input
                  className="usa-da-input-with-icon"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  aria-describedby="username"
                  onChange={this.props.handleChange}
                />
                <div className="usa-da-icon usa-da-icon-user usa-da-icon-nobg"></div>
            </div>
        );
    }
}

Username.propTypes = propTypes;
