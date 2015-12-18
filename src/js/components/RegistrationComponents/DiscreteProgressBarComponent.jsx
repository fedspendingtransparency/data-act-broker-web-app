/**
* DiscreteProgressBarComponent.jsx
* Created by Katie Rose 12/17/15
**/


import React, { PropTypes } from 'react';

const propTypes = {
    progressCurrentStep: PropTypes.Number, 
    progressTotalSteps: PropTypes.Number
};

// to do: complete implementation of inputLength prop
const defaultProps = {
    progressCurrentStep: 1, 
    progressTotalSteps: 4
};

// A standard text input for submission that we can further turn into a sharable component
export default class DiscreteProgressBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex-layout usa-grid-full usa-color-text-white">
                <div className="usa-da-progress-step usa-da-progress-one-fourth">
                    <div className="usa-da-progress-spacer spacer-start usa-color-gray"></div>
                    <div className="progress-circle"><span>1</span></div>
                </div>
                <div className="usa-da-progress-step usa-da-progress-one-fourth">
                    <div className="usa-da-progress-spacer spacer-middle"></div>
                    <div className="progress-circle"><span>2</span></div>
                </div>
                <div className="usa-da-progress-step usa-da-progress-one-fourth">
                    <div className="usa-da-progress-spacer spacer-middle"></div>
                    <div className="progress-circle"><span>3</span></div>
                </div>
                <div className="usa-da-progress-step usa-da-progress-one-fourth">
                    <div className="usa-da-progress-spacer spacer-end"></div>
                    <div className="progress-circle"><span>4</span></div>
                </div>
            </div>
        );
    }
}

DiscreteProgressBar.propTypes = propTypes;
DiscreteProgressBar.defaultProps = defaultProps;