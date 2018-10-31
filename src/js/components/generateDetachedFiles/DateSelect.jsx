/**
* DateSelect.jsx
* Created by Alisa Burdeyny
*/

import React, { PropTypes } from 'react';
import GenerateFileBox from '../generateFiles/components/GenerateFileBox';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';
import AgencyToggle from './AgencyToggle';
import AgencyToggleTooltip from './AgencyToggleTooltip';
import { InfoCircle } from '../SharedComponents/icons/Icons';

const propTypes = {
    generateFile: PropTypes.func,
    handleDateChange: PropTypes.func,
    updateError: PropTypes.func,
    d1: PropTypes.object,
    d2: PropTypes.object,
    fundingAgency: PropTypes.bool,
    toggleAgencyType: PropTypes.func
};

const defaultProps = {
    generateFile: null,
    handleDateChange: null,
    updateError: null,
    d1: null,
    d2: null,
    fundingAgency: false,
    toggleAgencyType: null
};

export default class DateSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfoTooltip: false
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
    }

    handleDateChange(file, date, dateType) {
        this.props.handleDateChange(file, date, dateType);
    }

    updateError(file, header = '', description = '') {
        this.props.updateError(file, header, description);
    }

    showTooltip() {
        this.setState({
            showInfoTooltip: true
        });
    }

    closeTooltip() {
        this.setState({
            showInfoTooltip: false
        });
    }

    render() {
        let d1Text = "Generate D1 File";
        let loadingD1 = null;
        if (this.props.d1.status === "generating") {
            d1Text = "Generating";
            loadingD1 = <LoadingBauble />;
        }
        else if (this.props.d1.status === "done") {
            d1Text = "Regenerate D1 File";
        }

        let d2Text = "Generate D2 File";
        let loadingD2 = null;
        if (this.props.d2.status === "generating") {
            d2Text = "Generating";
            loadingD2 = <LoadingBauble />;
        }
        else if (this.props.d2.status === "done") {
            d2Text = "Regenerate D2 File";
        }

        let tooltip = null;
        if (this.state.showInfoTooltip) {
            const style = {
                top: this.referenceDiv.offsetTop - 180,
                right: -30
            };

            tooltip = (
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
                        Generate File D1 and D2 from records where my agency is the:
                    </div>
                    <AgencyToggle
                        funding={this.props.fundingAgency}
                        toggleAgencyType={this.props.toggleAgencyType} />
                    <span className="agency-toggle__info-icon-holder">
                        <div ref={(div) => {
                            this.referenceDiv = div;
                        }}>
                            {tooltip}
                            <button
                                id="agency-toggle__info-icon"
                                className="agency-toggle__info-icon"
                                onFocus={this.showTooltip}
                                onBlur={this.closeTooltip}
                                onMouseLeave={this.closeTooltip}
                                onMouseEnter={this.showTooltip} >
                                <InfoCircle />
                            </button>
                        </div>
                    </span>
                </div>
                <GenerateFileBox
                    label="File D1: Procurement Awards (FPDS data)"
                    datePlaceholder="Sign"
                    startingTab={1}
                    value={this.props.d1}
                    error={this.props.d1.error}
                    download={this.props.d1.download}
                    onDateChange={this.handleDateChange.bind(this, "d1")}
                    updateError={this.updateError.bind(this, "d1")} />

                <div className="right-align-box">
                    <button
                        className="usa-da-button btn-default"
                        disabled={!this.props.d1.valid || this.props.d1.status === "generating"}
                        onClick={this.props.generateFile.bind(this, "d1")}>
                        {loadingD1}{d1Text}
                    </button>
                </div>

                <GenerateFileBox
                    label="File D2: Financial Assistance"
                    datePlaceholder="Action"
                    startingTab={9}
                    value={this.props.d2}
                    error={this.props.d2.error}
                    download={this.props.d2.download}
                    onDateChange={this.handleDateChange.bind(this, "d2")}
                    updateError={this.updateError.bind(this, "d2")} />

                <div className="right-align-box">
                    <button
                        className="usa-da-button btn-default"
                        disabled={!this.props.d2.valid || this.props.d2.status === "generating"}
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
