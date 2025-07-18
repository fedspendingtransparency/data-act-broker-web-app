/**
 * NextButton.jsx
 * Created by Lizzie Salita 3/2/20
 */

import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { routes } from 'dataMapping/dabs/submission';

const propTypes = {
    disabled: PropTypes.bool.isRequired,
    nextButtonClass: PropTypes.string.isRequired,
    step: PropTypes.oneOf(routes).isRequired,
    label: PropTypes.string,
    submissionID: PropTypes.string.isRequired
};

const defaultProps = {
    label: 'Next'
};

const NextButton = ({
    disabled, nextButtonClass, step, label='Next', submissionID
}) => (
    disabled ? (
        <button
            className={`usa-da-validation-overlay-review usa-da-button${nextButtonClass}`}
            disabled >
            {label}
        </button>
    ) : (
        <Link
            className={`usa-da-validation-overlay-review usa-da-button${nextButtonClass}`}
            to={`/submission/${submissionID}/${step}`} >
            {label}
        </Link>
    )
);

NextButton.propTypes = propTypes;
NextButton.defaultProps = defaultProps;

export default NextButton;
