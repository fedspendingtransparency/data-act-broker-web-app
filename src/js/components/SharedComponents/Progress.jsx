/**
 * ProgressComponent.jsx
 * Created by Mike Bray 12/31/15
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { stepNames, classes } from 'dataMapping/dabs/progress';
import { routes } from 'dataMapping/dabs/submission';

const propTypes = {
    stepNames: PropTypes.array,
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
    barClasses: PropTypes.object,
    id: PropTypes.string.isRequired
};

const defaultProps = {
    currentStep: 1,
    totalSteps: 5,
    stepNames,
    barClasses: classes
};

export default class Progress extends React.Component {
    // get appropriate class name for step
    // same for bar and labels
    className(index) {
        const { barClasses, currentStep } = this.props;
        let className = barClasses.step;
        if (index < currentStep) className = barClasses.done;
        if (index === currentStep) className = barClasses.current;
        return className;
    }
    // should a button be disabled
    // users can click on steps that have been completed
    isDisabled(index) {
        const { currentStep } = this.props;
        if (index < currentStep) return false;
        return true;
    }
    // bar button
    bar(index) {
        const isDisabled = this.isDisabled(index + 1);

        const button = isDisabled ?
            (
                <button
                    disabled
                    className="stepLink">
                    {index + 1}
                </button>
            ) :
            (
                <Link to={`/submission/${this.props.id}/${routes[index]}`}>{index + 1}</Link>
            );
        return button;
    }
    // label button
    label(index) {
        const isDisabled = this.isDisabled(index + 1);
        const button = isDisabled ?
            (
                <button
                    disabled={isDisabled}>
                    {this.props.stepNames[index]}
                </button>
            ) :
            (
                <Link to={`/submission/${this.props.id}/${routes[index]}`}>{this.props.stepNames[index]}</Link>
            );
        return button;
    }
    // list that creates the horizontal progress bar
    // or list that creates the horizontal progress label
    progress(type) {
        const spanClass = (type === 'bar') ? 'step' : 'name';
        return this.props.stepNames.map((step, index) => {
            const className = this.className(index + 1);
            return (
                <li key={`${index + 1}-${spanClass}`} className={className}>
                    <span className={spanClass}>
                        {this[type](index)}
                    </span>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 usa-da-progress-bar">
                    <ul className="usa-da-progress-bar-holder" data-steps={this.props.totalSteps}>
                        {this.progress('bar')}
                    </ul>
                    <ul className="usa-da-progress-bar-holder" data-steps={this.props.totalSteps}>
                        {this.progress('label')}
                    </ul>
                </div>
            </div>
        );
    }
}

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;
