/**
* Username.jsx
* Created by Kyle Fox 2/19/16
**/

import React, { PropTypes } from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

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
                <span className="usa-da-icon">
                    <Icons.User />
               </span>
            </div>
        );
    }
}

Username.propTypes = propTypes;
