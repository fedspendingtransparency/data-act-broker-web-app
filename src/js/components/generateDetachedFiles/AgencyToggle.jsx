/**
 * AgencyToggle.jsx
 * Created by Lizzie Salita 10/9/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    funding: PropTypes.bool,
    toggleAgencyType: PropTypes.func
};

const defaultProps = {
    funding: false,
    toggleAgencyType: null
};

export default class AgencyToggle extends React.Component {
    render() {
        const awardingActive = this.props.funding ? '' : 'agency-toggle__label_active';
        const fundingActive = this.props.funding ? 'agency-toggle__label_active' : '';
        const switchPosition = this.props.funding ? 'translate(30 0)' : 'translate(9 0)';
        const currentSelection = this.props.funding ? 'Funding Agency' : 'Awarding Agency';
        return (
            <button
                className="agency-toggle__button"
                onClick={this.props.toggleAgencyType}
                role="switch"
                aria-checked={!this.props.funding}
                aria-label={`
                    Toggle between Awarding Agency and Funding Agency.
                    Currently selected: ${currentSelection}
                    `}>
                <div className={`agency-toggle__label ${awardingActive}`}>
                    Awarding Agency
                </div>
                <svg
                    className="agency-toggle__switch"
                    width="45"
                    height="24">
                    <filter id="agency-toggle__filters">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                        <feOffset dx="0" dy="0" />
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <g
                        className="agency-switch__graphic"
                        transform="translate(4 2)">
                        <rect
                            className="agency-switch__track"
                            width="40"
                            height="20"
                            rx="10"
                            ry="10" />
                        <g
                            className="agency-switch__switch"
                            transform={switchPosition}>
                            <circle
                                className="agency-switch__switch-fill"
                                cy="10"
                                r="10"
                                stroke="#d6d7d9"
                                strokeWidth="1"
                                filter="url(#agency-toggle__filters)" />
                        </g>
                    </g>
                </svg>
                <div className={`agency-toggle__label ${fundingActive}`}>
                    Funding Agency
                </div>
            </button>
        );
    }
}

AgencyToggle.propTypes = propTypes;
AgencyToggle.defaultProps = defaultProps;
