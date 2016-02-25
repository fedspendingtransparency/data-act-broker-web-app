/**
* Password.jsx
* Created by Kyle Fox 12/4/15
**/

import React, { PropTypes } from 'react';

const propTypes = {
    handleChange: PropTypes.func.isRequired
};

export default class Password extends React.Component {
    render() {
        return (
            <div className="usa-da-input-container">
                <label className="sr-only" htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  aria-describedby="password"
                  onChange={this.props.handleChange}
                />
                <div className="usa-da-icon usa-da-icon-lock"></div>
            </div>
        );
    }
}

Password.propTypes = propTypes;
