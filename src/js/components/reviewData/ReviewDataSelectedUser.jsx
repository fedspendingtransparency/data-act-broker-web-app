/**
 * ReviewDataNotifyModal.jsx
 * Created by Mike Bray 6/5/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    deselectUser: PropTypes.func,
    user: PropTypes.object
};

const defaultProps = {
    deselectUser: null,
    user: null
};

export default class ReviewDataSelectedUser extends React.Component {
    render() {
        return (
            <div className="usa-da-review-data-user-row">
                <button className="usa-da-icon usa-da-icon-times-circle" onClick={this.props.deselectUser} alt="Remove">
                    <FontAwesomeIcon icon="circle-xmark" />
                </button>
                <span>
                    {this.props.user.displayName}
                </span>
            </div>
        );
    }
}

ReviewDataSelectedUser.propTypes = propTypes;
ReviewDataSelectedUser.defaultProps = defaultProps;
