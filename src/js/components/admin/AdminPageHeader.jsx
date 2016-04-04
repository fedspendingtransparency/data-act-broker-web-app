/**
 * AdminPageHeader.jsx
 * Created by Mike Bray 2/24/16
 **/

import React from 'react';

export default class AdminPageHeader extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="display-2">Administration</div>
                    <p>The following user(s) has requested access to the DATA Act Broker.</p>
                    <ul>
                        <li>Click "Approve" to grant access. This will generate an email to the user with a link to complete registration.</li>
                        <li>Click "Deny" to prevent access. This will generate an email notifying the user that they have been denied access.</li>
                    </ul>
                </div>
            </div>
        );
    }
}
