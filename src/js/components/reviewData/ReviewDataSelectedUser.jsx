/**
 * ReviewDataNotifyModal.jsx
 * Created by Mike Bray 6/5/16
 */

import React from 'react';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

export default class ReviewDataSelectedUser extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="usa-da-review-data-user-row">
                <a className="usa-da-icon usa-da-icon-trash-o" onClick={this.props.deselectUser}><Icons.Trash /></a>
                <span>
                    {this.props.user.displayName}
                </span>
            </div>
        );
    }
}