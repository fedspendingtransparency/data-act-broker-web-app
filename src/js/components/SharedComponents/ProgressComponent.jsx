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
    currentStep: 1,
    totalSteps: 5,
    // stepNames: ['Name Submission', 'Upload .CSV Files', 'Validate .CSV Data', 'Review & Publish']
    stepNames: ['Upload Files', 'Generate D', 'Cross File', 'Generate EF', 'Review & Publish'],
    stepLink: ['#/validateData', '#/generateFiles', '#/validateCrossFile', '#/generateEF', '#/reviewData'],
    // upload data (validateData), d file (generateFiles), cross file (validateCrossFile), EF (generateEF), review publish (reviewData)
};

export default class Progress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const progressBar = [];
        const progressLabels = [];
        const stepNames = this.props.stepNames;
        const stepLink = this.props.stepLink;

        for (let i = 1; i <= this.props.totalSteps; i++) {
            if (i < this.props.currentStep) {
                progressBar.push(<li key={i} className="usa-da-progress-bar-step-done"><span className="step">{i}</span></li>);
                progressLabels.push(<li key={i} className="usa-da-progress-bar-step-done"><a href={stepLink[i-1] +"/"+ this.props.id} ><span className="name">{stepNames[i - 1]}</span></a></li>);
            } else if (i === this.props.currentStep) {
                progressBar.push(<li key={i} className="usa-da-progress-bar-step-current"><span className="step">{i}</span></li>);
                progressLabels.push(<li key={i} className="usa-da-progress-bar-step-current"><span className="name">{stepNames[i - 1]}</span></li>);
            } else {
                progressBar.push(<li key={i} className="usa-da-progress-bar-step"><span className="step">{i}</span></li>);
                progressLabels.push(<li key={i} className="usa-da-progress-bar-step"><span className="name">{stepNames[i - 1]}</span></li>);
            }
        }

        return (
            <div className="row">
                <div className="col-md-12 usa-da-progress-bar">
                    <ul className="usa-da-progress-bar-holder" data-steps={this.props.totalSteps}>
                        {progressBar}
                    </ul>
                    <ul className="usa-da-progress-bar-holder" data-steps={this.props.totalSteps}>
                        {progressLabels}
                    </ul>
                </div>
            </div>
        );
    }
}

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;
