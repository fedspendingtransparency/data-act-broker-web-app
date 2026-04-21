/**
  * LandingBlockBottomLink.jsx
  * Created by Kevin Li 5/17/16
  */

import PropTypes from 'prop-types';

const propTypes = {
    onClick: PropTypes.func
};

const LandingBlockBottomLink = ({onClick = null}) => {
    return (
        <div className="usa-da-landing-block-bottom-link text-center">
            <button onClick={onClick}>What you will need to submit</button>
        </div>
    );
};

LandingBlockBottomLink.propTypes = propTypes;
export default LandingBlockBottomLink;
