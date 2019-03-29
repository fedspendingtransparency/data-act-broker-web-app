/**
  * GenerateFilesPage.jsx
  * Created by Kevin Li 7/22/16
  */

import React, { PropTypes } from 'react';
import { assign } from 'lodash';

import GenerateFileBox from './components/GenerateFileBox';
import GenerateFilesOverlay from './GenerateFilesOverlay';
import AgencyToggle from '../generateDetachedFiles/AgencyToggle';
import AgencyToggleTooltip from '../generateDetachedFiles/AgencyToggleTooltip';
import { InfoCircle } from '../SharedComponents/icons/Icons';

const propTypes = {
    clickedDownload: PropTypes.func,
    handleDateChange: PropTypes.func,
    updateError: PropTypes.func,
    d1: PropTypes.object,
    d2: PropTypes.object,
    toggleAgencyType: PropTypes.func
};

const defaultProps = {
    clickedDownload: null,
    handleDateChange: null,
    updateError: null,
    d1: null,
    d2: null,
    toggleAgencyType: null
};

export default class GenerateFilesContent extends React.Component {
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
            <div>
                <div className="container center-block with-overlay">
                    <div className="row usa-da-submission-instructions">
                        <div className="col-md-12">
                            <p>
                                Select the durations for the generated D1 and D2 files. By default, this range is set to
                                the submission date range you selected in step one.
                            </p>
                        </div>
                    </div>

                    <div className="usa-da-generate-content">
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
                            showDownload={d1.showDownload}
                            onDateChange={this.handleDateChange.bind(this, "d1")}
                            updateError={this.updateError.bind(this, "d1")}
                            clickedDownload={this.clickedDownload.bind(this, "D1")} />

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
                            clickedDownload={this.clickedDownload.bind(this, "D2")} />
                    </div>
                </div>
                <GenerateFilesOverlay {...this.props} />
            </div>
        );
    }
}

GenerateFilesContent.propTypes = propTypes;
GenerateFilesContent.defaultProps = defaultProps;
