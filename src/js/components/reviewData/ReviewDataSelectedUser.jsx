/**
 * ReviewDataNotifyModal.jsx
 * Created by Mike Bray 6/5/16
 */

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    deselectUser: PropTypes.func,
    user: PropTypes.object
};

const ReviewDataSelectedUser = ({deselectUser = null, user = null}) => {
    return (
        <div className="usa-da-review-data-user-row">
            <button className="usa-da-icon usa-da-icon-times-circle" onClick={deselectUser} alt="Remove">
                <FontAwesomeIcon icon="circle-xmark" />
            </button>
            <span>
                {user.displayName}
            </span>
        </div>
    );
};

ReviewDataSelectedUser.propTypes = propTypes;
export default ReviewDataSelectedUser;
