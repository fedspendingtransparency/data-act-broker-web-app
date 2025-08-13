/**
  * CertifyProgress.jsx
  * Created by Kevin Li 9/7/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileProgress from '../../SharedComponents/FileProgress';

const propTypes = {
    closeModal: PropTypes.func,
    apiTimeCount: PropTypes.number,
    apiTimeTotal: PropTypes.number,
    finished: PropTypes.bool
};

const defaultProps = {
    finished: false,
    apiTimeTotal: 1000,
    apiTimeCount: 1,
    closeModal: null
};

export default class CertifyProgress extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            progress: 0,
            unit: (1 / 6),
            subiteration: 1,
            iteration: 0,
            averageDuration: 0,
            hasError: false,
            errorMessage: ""
        };
    }

    componentDidMount() {
        this.isUnmounted = false;
        this.startProgress();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.finished !== this.props.finished) {
            if (this.props.finished) {
                this.finish();
            }
        }
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    finish() {
        this.setState({
            progress: 100
        });
    }

    startProgress() {
        // calculate the average duration of an API call in ms
        const averageDuration = this.props.apiTimeTotal / this.props.apiTimeCount;
        this.setState({
            progress: 0,
            averageDuration
        }, () => {
            this.predictedProgress();
        });
    }

    predictedProgress() {
        // make an update every 1/6 of the average duration
        window.setTimeout(() => {
            let unit = this.state.unit;
            let subiteration = this.state.subiteration + 1;
            let iteration = this.state.iteration;
            let newProgress = this.state.progress + unit;

            if (newProgress >= 0.96) {
                newProgress = 0.96;
            }

            if (iteration > 4) {
                subiteration = 1;
                unit = (1 - newProgress) / 6;
                iteration += 1;
            }

            if (!this.isUnmounted && this.state.progress < 100) {
                this.setState({
                    progress: newProgress,
                    subiteration,
                    unit,
                    iteration
                }, () => {
                    // just give up after 10 full iterations
                    if (iteration <= 10) {
                        this.predictedProgress();
                    }
                });
            }
        }, this.state.averageDuration / 6);
    }

    render() {
        let hideClass = " hide";
        let hideError = " hide";
        let hideProgress = "";
        if (this.state.hasError) {
            hideError = "";
            hideProgress = " hide";
        }
        else if (this.state.progress === 100) {
            hideClass = "";
            hideProgress = " hide";
        }

        return (
            <div className="certify-progress">
                <div className={hideProgress}>
                    <FileProgress fileStatus={this.state.progress * 100} />
                </div>

                <div className={`completed-content${hideProgress}`}>
                    <div className="success-wrapper">
                        <div className="success-header">
                            Publish in progress...
                        </div>
                    </div>
                </div>

                <div className={`completed-content${hideClass}`}>
                    <div className="success-wrapper">
                        <div className="success-header">
                            Complete!
                        </div>
                        <div className="success-message">
                            Your submission has been published to USAspending.gov and will appear
                            on the site within 24 hours.
                        </div>
                    </div>
                    <button className="usa-da-button close-button" onClick={this.props.closeModal}>
                        Close
                    </button>
                </div>

                <div className={`alert alert-danger${hideError}`}>
                    <div className="usa-da-icon">
                        <FontAwesomeIcon icon="circle-exclamation" />
                    </div>
                    <div className="alert-text">
                        <div className="alert-header-text">Publish Failed</div>
                        <p>An error occurred while attempting to publish this submission.</p>
                        <p>{this.state.errorMessage}</p>
                    </div>
                </div>
            </div>
        );
    }
}

CertifyProgress.propTypes = propTypes;
CertifyProgress.defaultProps = defaultProps;
