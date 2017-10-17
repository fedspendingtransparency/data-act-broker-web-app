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
                <a className="usa-da-icon usa-da-icon-times-circle" onClick={this.props.deselectUser}>
                    <Icons.TimesCircle />
                </a>
                <span>
                    {this.props.user.displayName}
                </span>
            </div>
        );
    }
}
