/**
* Password.jsx
* Created by Kyle Fox 12/4/15
**/

import React from 'react';

export default class Password extends React.Component {
    render() {
        return (
            <div className="usa-da-input-container">
                <label className="sr-only" htmlFor="password">Password</label>
                <input id="password" name="password" type="password" placeholder="Password" aria-describedby="password" />
                <div className="usa-da-icon usa-da-icon-lock"></div>
            </div>
        );
    }
}
