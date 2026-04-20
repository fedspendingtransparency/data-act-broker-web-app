/**
 * ReviewDataContentRow.jsx
 * Created by Mike Bray 4/5/16
 */

import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.string,
    label: PropTypes.string
};

const ReviewDataContentRow = ({data = '', label = ''}) => {
    return (
        <div className="row">
            <div className="col-xs-4">{label}</div>
            <div className="col-xs-8 data">{data}</div>
        </div>
    );
};

ReviewDataContentRow.propTypes = propTypes;
export default ReviewDataContentRow;
