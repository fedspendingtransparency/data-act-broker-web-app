/**
  * LandingBlock.jsx
  * Created by Kevin Li 5/17/16
  */

import { Link } from 'react-router';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.object,
    icon: PropTypes.element,
    text: PropTypes.string,
    buttonText: PropTypes.string,
    url: PropTypes.string,
    externalUrl: PropTypes.bool,
    disabled: PropTypes.bool,
    comingSoon: PropTypes.string,
    type: PropTypes.string
};

const LandingBlock = ({
    children = null,
    icon = null,
    text = '',
    buttonText = '',
    url = '/',
    externalUrl = false,
    disabled = false,
    comingSoon = '',
    type = 'dabs'
}) => {
    const size = type === 'dabs' ? ' col-md-3' : ' col-md-6';
    let buttonLink = (
        <Link
            className="usa-da-button btn-primary btn-lg btn-full"
            to={url}
            disabled={false}>
            {buttonText}
        </Link>
    );
    if (externalUrl) {
        buttonLink = (
            <a
                className="usa-da-button btn-primary btn-lg btn-full"
                href={url}>
                {buttonText}
            </a>
        );
    }
    if (disabled) {
        buttonLink = (
            <span
                className="usa-da-button btn-primary btn-lg btn-full"
                disabled>
                {buttonText}
            </span>
        );
    }

    return (
        <div className={`usa-da-landing-block-wrap${size}`} >
            <div className={`usa-da-landing-block ${comingSoon}`}>
                <div className="usa-da-landing-block-icon text-center">
                    {icon}
                </div>
                <div className="usa-da-landing-block-text text-center">
                    {text}
                </div>
                <div className="usa-da-landing-block-bottom">
                    <div className="usa-da-landing-block-button">
                        {buttonLink}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

LandingBlock.propTypes = propTypes;
export default LandingBlock;
