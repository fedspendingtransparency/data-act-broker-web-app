/**
  * GenerateEFError.jsx
  * Created by Kevin Li 8/24/2016
  */

import PropTypes from 'prop-types';

const propTypes = {
    message: PropTypes.string
};

const GenerateEFError = ({message = ''}) => {
    return (
        <div className="alert alert-danger text-center" role="alert">
            <b>Error:</b> {message}
        </div>
    );
};

GenerateEFError.propTypes = propTypes;
export default GenerateEFError;
