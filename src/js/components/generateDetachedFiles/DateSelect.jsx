/**
* DateSelect.jsx
* Created by Alisa Burdeyny
*/

import React, { PropTypes } from 'react';
import { assign } from 'lodash';

import GenerateFileBox from '../generateFiles/components/GenerateFileBox';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';
import AgencyToggle from './AgencyToggle';
import AgencyToggleTooltip from './AgencyToggleTooltip';
import { InfoCircle } from '../SharedComponents/icons/Icons';

const propTypes = {
    clickedDownload: PropTypes.func,
    generateFile: PropTypes.func,
    handleDateChange: PropTypes.func,
    updateError: PropTypes.func,
    d1: PropTypes.object,
    d2: PropTypes.object,
    toggleAgencyType: PropTypes.func
};

const defaultProps = {
    clickedDownload: null,
    generateFile: null,
    handleDateChange: null,
    updateError: null,
    d1: null,
    d2: null,
    toggleAgencyType: null
};

export default class DateSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfoTooltip: {
                d1: false,
                d2: false
            }
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
    }

    toggleAgencyType(type) {
        this.props.toggleAgencyType(type);
    }

    clickedDownload(fileType) {
        this.props.clickedDownload(fileType);
    }

    handleDateChange(file, date, dateType) {
        this.props.handleDateChange(file, date, dateType);
    }

    updateError(file, header = '', description = '') {
        this.props.updateError(file, header, description);
    }

    showTooltip(type) {
        const toolTipState = assign({}, this.state.showInfoTooltip);
        toolTipState[type] = !toolTipState[type];
        this.setState({
            showInfoTooltip: toolTipState
        });
    }

    closeTooltip(type) {
        const toolTipState = assign({}, this.state.showInfoTooltip);
        toolTipState[type] = !toolTipState[type];
        this.setState({
            showInfoTooltip: toolTipState
        });
    }

    render() {
        const { d1, d2 } = this.props;
        let d1Text = "Generate D1 File";
        let loadingD1 = null;
        if (d1.status === "generating") {
            d1Text = "Generating";
            loadingD1 = <LoadingBauble />;
        }
        else if (d1.status === "done") {
            d1Text = "Regenerate D1 File";
        }

        let d2Text = "Generate D2 File";
        let loadingD2 = null;
        if (d2.status === "generating") {
            d2Text = "Generating";
            loadingD2 = <LoadingBauble />;
        }
        else if (d2.status === "done") {
            d2Text = "Regenerate D2 File";
        }

        let d1Tooltip = null;
        let d2Tooltip = null;
        if (this.state.showInfoTooltip.d1) {
            const style = {
                top: this.d1ReferenceDiv.offsetTop - 180,
                right: -30
            };

            d1Tooltip = (
                <div
                    className="agency-toggle__tooltip-spacer"
                    style={style}>
                    <AgencyToggleTooltip />
                </div>
            );
        }
        if (this.state.showInfoTooltip.d2) {
            const style = {
                top: this.d2ReferenceDiv.offsetTop - 180,
                right: -30
            };

            d2Tooltip = (
                <div
                    className="agency-toggle__tooltip-spacer"
                    style={style}>
                    <AgencyToggleTooltip />
                </div>
            );
        }

        return (
            <div className="usa-da-date-select dashed-border-top">
                <div className="agency-toggle">
                    <div className="agency-toggle__text">
                        Generate File D1 from records where my agency is the:
                    </div>
                    <AgencyToggle
                        funding={d1.fundingAgency}
                        toggleAgencyType={this.toggleAgencyType.bind(this, "d1")} />
                    <span className="agency-toggle__info-icon-holder">
                        <div ref={(div) => {
                            this.d1ReferenceDiv = div;
                        }}>
                            {d1Tooltip}
                            <button
                                id="agency-toggle__info-icon"
                                className="agency-toggle__info-icon"
                                onFocus={this.showTooltip.bind(this, 'd1')}
                                onBlur={this.closeTooltip.bind(this, 'd1')}
                                onMouseLeave={this.closeTooltip.bind(this, 'd1')}
                                onMouseEnter={this.showTooltip.bind(this, 'd1')} >
                                <InfoCircle />
                            </button>
                        </div>
                    </span>
                </div>
                <GenerateFileBox
                    label="File D1: Procurement Awards (FPDS data)"
                    datePlaceholder="Sign"
                    startingTab={1}
                    value={d1}
                    error={d1.error}
                    showDownload={this.props.d1.showDownload}
                    onDateChange={this.handleDateChange.bind(this, "d1")}
                    updateError={this.updateError.bind(this, "d1")}
                    clickedDownload={this.clickedDownload.bind(this, "d1")} />

                <div className="right-align-box">
                    <button
                        className="usa-da-button btn-default"
                        disabled={!d1.valid || d1.status === "generating"}
                        onClick={this.props.generateFile.bind(this, "d1")}>
                        {loadingD1}{d1Text}
                    </button>
                </div>
                <div className="agency-toggle">
                    <div className="agency-toggle__text">
                        Generate File D2 from records where my agency is the:
                    </div>
                    <AgencyToggle
                        funding={d2.fundingAgency}
                        toggleAgencyType={this.toggleAgencyType.bind(this, "d2")} />
                    <span className="agency-toggle__info-icon-holder">
                        <div ref={(div) => {
                            this.d2ReferenceDiv = div;
                        }}>
                            {d2Tooltip}
                            <button
                                id="agency-toggle__info-icon"
                                className="agency-toggle__info-icon"
                                onFocus={this.showTooltip.bind(this, 'd2')}
                                onBlur={this.closeTooltip.bind(this, 'd2')}
                                onMouseLeave={this.closeTooltip.bind(this, 'd2')}
                                onMouseEnter={this.showTooltip.bind(this, 'd2')} >
                                <InfoCircle />
                            </button>
                        </div>
                    </span>
                </div>
                <GenerateFileBox
                    label="File D2: Financial Assistance"
                    datePlaceholder="Action"
                    startingTab={9}
                    value={d2}
                    error={d2.error}
                    showDownload={d2.showDownload}
                    onDateChange={this.handleDateChange.bind(this, "d2")}
                    updateError={this.updateError.bind(this, "d2")}
                    clickedDownload={this.clickedDownload.bind(this, "d2")} />

                <div className="right-align-box">
                    <button
                        className="usa-da-button btn-default"
                        disabled={!d2.valid || d2.status === "generating"}
                        onClick={this.props.generateFile.bind(this, "d2")}>
                        {loadingD2}{d2Text}
                    </button>
                </div>

                <div className="loading-animation">
                    <LoadingBauble />
                </div>
            </div>
        );
    }
}

DateSelect.propTypes = propTypes;
DateSelect.defaultProps = defaultProps;
