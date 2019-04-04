/**
 * AgencyToggle.jsx
 * Created by Lizzie Salita 10/9/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import AgencyToggleTooltip from '../generateDetachedFiles/AgencyToggleTooltip';
import { InfoCircle } from '../SharedComponents/icons/Icons';

const propTypes = {
    funding: PropTypes.bool,
    toggleAgencyType: PropTypes.func,
    fileName: PropTypes.string,
    fileType: PropTypes.string
};

const defaultProps = {
    funding: false,
    toggleAgencyType: null,
    fileName: '',
    fileType: ''
};

export default class AgencyToggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfoTooltip: false
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
    }

    showTooltip() {
        this.setState({
            showInfoTooltip: !this.state.showInfoTooltip
        });
    }

    closeTooltip() {
        this.setState({
            showInfoTooltip: !this.state.showInfoTooltip
        });
    }

    render() {
        const { funding, fileName, fileType } = this.props;
        const awardingActive = funding ? '' : 'agency-toggle__label_active';
        const fundingActive = funding ? 'agency-toggle__label_active' : '';
        const switchPosition = funding ? 'translate(30 0)' : 'translate(9 0)';
        const currentSelection = funding ? 'Funding Agency' : 'Awarding Agency';
        let toolTip = null;
        if (this.state.showInfoTooltip) {
            const style = {
                top: this.ReferenceDiv.offsetTop - 180,
                right: -30
            };
            toolTip = (
                <div
                    className="agency-toggle__tooltip-spacer"
                    style={style}>
                    <AgencyToggleTooltip />
                </div>
            );
        }

        return (
            <div className="agency-toggle">
                <div className="agency-toggle__text">
                    Generate File {fileName} from records where my agency is the:
                </div>
                <button
                    className="agency-toggle__button"
                    onClick={this.props.toggleAgencyType}
                    role="switch"
                    aria-checked={!funding}
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
                <span className="agency-toggle__info-icon-holder">
                    <div ref={(div) => {
                        this.ReferenceDiv = div;
                    }}>
                        {toolTip}
                        <button
                            id="agency-toggle__info-icon"
                            className="agency-toggle__info-icon"
                            onFocus={this.showTooltip.bind(this, fileType)}
                            onBlur={this.closeTooltip.bind(this, fileType)}
                            onMouseLeave={this.closeTooltip.bind(this, fileType)}
                            onMouseEnter={this.showTooltip.bind(this, fileType)} >
                            <InfoCircle />
                        </button>
                    </div>
                </span>
            </div>
        );
    }
}

AgencyToggle.propTypes = propTypes;
AgencyToggle.defaultProps = defaultProps;
