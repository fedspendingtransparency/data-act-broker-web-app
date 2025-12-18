/**
  * ValidateNotYours.jsx
  * Created by Kevin Li 4/25/2016
  */

import PropTypes from 'prop-types';

const propTypes = {
    message: PropTypes.string
};

const ValidateNotYours = ({message = ''}) => {
    return (
        <div className="alert alert-danger text-center" role="alert">
            {message}
        </div>
    );
};

ValidateNotYours.propTypes = propTypes;
export default ValidateNotYours;
