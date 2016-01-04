/**
 * ProgressComponent.jsx
 * Created by Mike Bray 12/31/15
 **/


import React, { PropTypes } from 'react';

const propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    stepNames: PropTypes.array.isRequired
};

const defaultProps = {
    currentStep: 2,
    totalSteps: 3,
    stepNames: ['Upload .csv Files', 'Validate .csv Data', 'Review and Publish']
};

export default class Progress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var progress = [];

        for (var i = 1; i <= this.props.totalSteps; i++) {
            if (i <= this.props.currentStep){
                progress.push(<li key={i} className="usa-da-progress-bar-step-current"><div>{i}</div></li>);
            } else {
                progress.push(<li key={i} className="usa-da-progress-bar-step"><div>{i}</div></li>);
            }
        }

        return (
            <div className="row">
                <div className="col-md-12 usa-da-progress-bar">
                    <ul className="usa-da-progress-bar-step-holder">
                        {progress}
                    </ul>
                </div>
            </div>
        );
    }
}

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;