/**
  * LandingBlock.jsx
  * Created by Kevin Li 5/17/16
  */

import React, { PropTypes } from 'react';

const propTypes = {
    children: PropTypes.object,
    icon: PropTypes.element,
    text: PropTypes.string,
    buttonText: PropTypes.string,
    url: PropTypes.string,
    disabled: PropTypes.bool,
    comingSoon: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    children: null,
    icon: null,
    text: '',
    buttonText: '',
    url: '#/',
    disabled: false,
    comingSoon: '',
    type: 'dabs'
};

export default class LandingBlock extends React.Component {
    render() {
        const size = this.props.type === 'dabs' ? ' col-md-4' : ' col-md-6';
        return (
            <div className={"usa-da-landing-block-wrap" + size} >
                <div className={"usa-da-landing-block " + this.props.comingSoon}>
                    <div className="usa-da-landing-block-icon text-center">
                        {this.props.icon}
                    </div>
                    <div className="usa-da-landing-block-text text-center">
                        {this.props.text}
                    </div>
                    <div className="usa-da-landing-block-bottom">
                        <div className="usa-da-landing-block-button">
                            <a
                                className="usa-da-button btn-primary btn-lg btn-full"
                                href={this.props.url}
                                disabled={this.props.disabled}>
                                {this.props.buttonText}
                            </a>
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
