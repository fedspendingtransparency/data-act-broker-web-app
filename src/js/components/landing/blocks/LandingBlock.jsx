/**
  * LandingBlock.jsx
  * Created by Kevin Li 5/17/16
  */

import React from 'react';
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

const defaultProps = {
    children: null,
    icon: null,
    text: '',
    buttonText: '',
    url: '/',
    externalUrl: false,
    disabled: false,
    comingSoon: '',
    type: 'dabs'
};

export default class LandingBlock extends React.Component {
    render() {
        const size = this.props.type === 'dabs' ? ' col-md-3' : ' col-md-6';
        let buttonLink = (
            <Link
                className="usa-da-button btn-primary btn-lg btn-full"
                to={this.props.url}
                disabled={false}>
                {this.props.buttonText}
            </Link>
        );
        if (this.props.externalUrl) {
            buttonLink = (
                <a
                    className="usa-da-button btn-primary btn-lg btn-full"
                    href={this.props.url}>
                    {this.props.buttonText}
                </a>
            );
        }
        if (this.props.disabled) {
            buttonLink = (
                <span
                    className="usa-da-button btn-primary btn-lg btn-full"
                    disabled>
                    {this.props.buttonText}
                </span>
            );
        }

        return (
            <div className={`usa-da-landing-block-wrap${size}`} >
                <div className={`usa-da-landing-block ${this.props.comingSoon}`}>
                    <div className="usa-da-landing-block-icon text-center">
                        {this.props.icon}
                    </div>
                    <div className="usa-da-landing-block-text text-center">
                        {this.props.text}
                    </div>
                    <div className="usa-da-landing-block-bottom">
                        <div className="usa-da-landing-block-button">
                            {buttonLink}
                        </div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

LandingBlock.propTypes = propTypes;
LandingBlock.defaultProps = defaultProps;
