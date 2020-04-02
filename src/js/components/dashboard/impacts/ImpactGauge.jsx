/**
 * ImpactGauge.jsx
 * Created by Daniel Boos 4/1/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    submissionData: PropTypes.object,
    openModal: PropTypes.func.isRequired,
    level: PropTypes.string
};

const defaultProps = {
    submissionData: {},
    level: 'high'
};

export default class ImpactGauge extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.props.submissionData.rules) {
            this.props.openModal(this.props.submissionData.rules, this.props.level);
        }
    }

    render() {
        return (
            <div
                className="impact-section"
                onClick={this.onClick}
                onKeyDown={this.onClick}
                role="button"
                aria-hidden="true">
                {/* eslint-disable import/no-dynamic-require, global-require */}
                <img
                    src={require(`../../../../graphics/gauges/chart-${this.props.level}.png`)}
                    alt={this.props.level} />
                {/* eslint-enable import/no-dynamic-require, global-require */}
                <div className="impact-stats">
                    {this.props.submissionData ?
                        <p className="impact-count">{this.props.submissionData.total}</p> : ''
                    }
                    <p className="impact-level">{this.props.level}</p>
                </div>
            </div>
        );
    }
}

ImpactGauge.defaultProps = defaultProps;
ImpactGauge.propTypes = propTypes;
