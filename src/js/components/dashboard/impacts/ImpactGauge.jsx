/**
 * ImpactGauge.jsx
 * Created by Daniel Boos 4/1/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessageOverlay from 'components/SharedComponents/ErrorMessageOverlay';
import LoadingMessage from 'components/SharedComponents/LoadingMessage';
import { createOnKeyDownHandler } from '../../../helpers/util';

const propTypes = {
    submissionData: PropTypes.shape({ rules: PropTypes.arrayOf(PropTypes.object), total: PropTypes.number }),
    level: PropTypes.string,
    openModal: PropTypes.func.isRequired,
    inFlight: PropTypes.bool,
    hasFailed: PropTypes.bool
};

const defaultProps = {
    submissionData: {},
    level: 'high'
};

export default class ImpactGauge extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayModal: false
        };

        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.setModal();
    }

    componentDidUpdate(prevProps) {
        if (this.props.submissionData !== prevProps.submissionData) {
            this.setModal();
        }
    }

    onClick() {
        if (this.state.displayModal) {
            this.props.openModal(this.props.submissionData.rules, this.props.level);
        }
    }

    setModal() {
        this.setState({
            displayModal: (this.props.submissionData.rules && this.props.submissionData.rules.length > 0)
        });
    }

    render() {
        const onKeyDownHandler = createOnKeyDownHandler(this.onClick);
        let impactCountContent = null;
        if (this.props.submissionData) {
            const impactCount = this.props.submissionData.total || '0';
            impactCountContent = <p>{impactCount}</p>;
        }
        if (this.props.inFlight) {
            impactCountContent = <LoadingMessage loadingMessage="" barWidth={5} barPad={2} />;
        }
        else if (this.props.hasFailed) {
            impactCountContent = <ErrorMessageOverlay errorTitle="" errorMessage="" />;
        }
        return (
            <div
                className="impact-section"
                onClick={this.onClick}
                onKeyDown={onKeyDownHandler}
                role="button"
                tabIndex={0}
                disabled={!this.state.displayModal}>
                <img
                    src={require(`../../../../graphics/gauges/chart-${this.props.level}.png`)}
                    alt={this.props.level} />
                <div className="impact-section__stats">
                    <div className="impact-section__count">
                        {impactCountContent}
                    </div>
                    <p className="impact-section__level">{this.props.level}</p>
                </div>
            </div>
        );
    }
}

ImpactGauge.defaultProps = defaultProps;
ImpactGauge.propTypes = propTypes;
