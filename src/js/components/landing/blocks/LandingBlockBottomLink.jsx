/**
  * LandingBlockBottomLink.jsx
  * Created by Kevin Li 5/17/16
  */

import React, { PropTypes } from 'react';

const propTypes = {
    onClick: PropTypes.func
};

const defaultProps = {
    onClick: null
};

export default class LandingBlockBottomLink extends React.Component {
    render() {
        return (
            <div className="usa-da-landing-block-bottom-link text-center">
                <a href="#" onClick={this.props.onClick}>What you will need to submit</a>
            </div>
        );
    }
}

LandingBlockBottomLink.propTypes = propTypes;
LandingBlockBottomLink.defaultProps = defaultProps;
