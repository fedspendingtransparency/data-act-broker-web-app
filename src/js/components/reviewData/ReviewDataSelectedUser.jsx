/**
 * ReviewDataNotifyModal.jsx
 * Created by Mike Bray 6/5/16
 */

import React, { PropTypes } from 'react';

import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    deselectUser: PropTypes.func,
    user: PropTypes.object
};

const defaultProps = {
    deselectUser: null,
    user: null
};

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

ReviewDataSelectedUser.propTypes = propTypes;
ReviewDataSelectedUser.defaultProps = defaultProps;
