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
            <div className="usa-da-input-container usa-da-input-password">
                <label className="sr-only" htmlFor="password">Password</label>
                <input
                  className="usa-da-input-with-icon"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  aria-describedby="password"
                  onChange={this.props.handleChange}
                />
                <div className="usa-da-icon usa-da-icon-lock usa-da-icon-nobg"></div>
            </div>
        );
    }
}

Password.propTypes = propTypes;
