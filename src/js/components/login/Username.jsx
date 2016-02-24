/**
* Username.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';

export default class Username extends React.Component {
    render() {
        return (
            <div className="usa-da-input-container">
                <label className="sr-only" htmlFor="username">Username or email address</label>
                <input id="username" name="username" type="text"placeholder="Username" aria-describedby="username" />
                <div className="usa-da-icon usa-da-icon-user"></div>
            </div>
        );
    }
}
