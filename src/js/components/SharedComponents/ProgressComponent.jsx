/**
 * ProgressComponent.jsx
 * Created by Mike Bray 12/31/15
 */

import { hashHistory } from 'react-router';
import React, { PropTypes } from 'react';
import * as SubmissionHelper from '../../helpers/submissionGuideHelper';

const propTypes = {
    stepLink: PropTypes.array,
    stepNames: PropTypes.array,
    id: PropTypes.string.isRequired,
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number
};

const defaultProps = {
    currentStep: 1,
    totalSteps: 5,
    stepNames: ['Validate Data', 'Generate D', 'Cross File', 'Generate EF', 'Review & Publish'],
    stepLink: ['#/validateData', '#/generateFiles', '#/validateCrossFile', '#/generateEF', '#/reviewData']
};

export default class Progress extends React.Component {
    componentDidMount() {
        SubmissionHelper.getSubmissionPage(this.props.id)
            .then((res) => {
                if (this.props.currentStep > res.page) {
                    hashHistory.push(res.url);
                }
            }).catch(() => {
                hashHistory.push('/404');
            });
    }

    render() {
        const progressBar = [];
        const progressLabels = [];
        const stepNames = this.props.stepNames;
        const stepLink = this.props.stepLink;

        for (let i = 1; i <= this.props.totalSteps; i++) {
            let bar = i;
            let barClass = 'usa-da-progress-bar-step-step';
            let label = stepNames[i - 1];
            if (i < this.props.currentStep) {
                bar = <a href={`${stepLink[i - 1]}/${this.props.id}`} className="stepLink">{bar}</a>;
                label = <a href={`${stepLink[i - 1]}/${this.props.id}`} >{label}</a>;
                barClass = 'usa-da-progress-bar-step-done';
            }
            else if (i === this.props.currentStep) {
                barClass = 'usa-da-progress-bar-step-current';
            }
            progressBar.push(
                <li key={i} className={barClass}>
                    <span className="step">{bar}</span>
                </li>);
            progressLabels.push(
                <li key={i} className={barClass}>
                    <span className="name">{label}</span>
                </li>);
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
