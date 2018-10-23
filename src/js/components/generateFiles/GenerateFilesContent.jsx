/**
  * GenerateFilesPage.jsx
  * Created by Kevin Li 7/22/16
  */

import React, { PropTypes } from 'react';

import GenerateFileBox from './components/GenerateFileBox';
import GenerateFilesOverlay from './GenerateFilesOverlay';
import AgencyToggle from '../generateDetachedFiles/AgencyToggle';
import AgencyToggleTooltip from '../generateDetachedFiles/AgencyToggleTooltip';
import { InfoCircle } from '../SharedComponents/icons/Icons';

const propTypes = {
    handleDateChange: PropTypes.func,
    updateError: PropTypes.func,
    d1: PropTypes.object,
    d2: PropTypes.object,
    fundingAgency: PropTypes.bool,
    toggleAgencyType: PropTypes.func
};

const defaultProps = {
    handleDateChange: null,
    updateError: null,
    d1: null,
    d2: null,
    fundingAgency: false,
    toggleAgencyType: null
};

export default class GenerateFilesContent extends React.Component {
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
        let tooltip = null;
        if (this.state.showInfoTooltip) {
            const style = {
                top: this.referenceDiv.offsetTop - 180,
                right: 115
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

                    <div className="usa-da-generate-content">
                        <GenerateFileBox
                            label="File D1: Procurement Awards (FPDS data)"
                            datePlaceholder="Sign"
                            startingTab={1}
                            value={this.props.d1}
                            error={this.props.d1.error}
                            download={this.props.d1.download}
                            onDateChange={this.handleDateChange.bind(this, "d1")}
                            updateError={this.updateError.bind(this, "d1")} />

                        <GenerateFileBox
                            label="File D2: Financial Assistance"
                            datePlaceholder="Action"
                            startingTab={9}
                            value={this.props.d2}
                            error={this.props.d2.error}
                            download={this.props.d2.download}
                            onDateChange={this.handleDateChange.bind(this, "d2")}
                            updateError={this.updateError.bind(this, "d2")} />
                    </div>
                </div>
                <GenerateFilesOverlay {...this.props} />
            </div>
        );
    }
}

GenerateFilesContent.propTypes = propTypes;
GenerateFilesContent.defaultProps = defaultProps;
