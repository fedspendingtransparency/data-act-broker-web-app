/**
 * RadioSection.jsx
 * Created by Lizzie Salita 12/9/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AgencyToggleTooltip from '../generateDetachedFiles/AgencyToggleTooltip';
import RadioGroup from '../SharedComponents/RadioGroup';

const agencyOptions = [
    {
        value: 'awarding',
        label: 'Awarding Agency'
    },
    {
        value: 'funding',
        label: 'Funding Agency'
    }
];

const fileFormatOptions = [
    {
        value: 'csv',
        label: 'Comma Separated (.csv)'
    },
    {
        value: 'txt',
        label: 'Pipe Delimited (.txt)'
    }
];

const propTypes = {
    active: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    fileType: PropTypes.string.isRequired,
    sectionType: PropTypes.string.isRequired
};

const defaultProps = {
    active: '',
    label: ''
};

export default class RadioSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfoTooltip: false
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.props.onChange(this.props.fileType, this.props.sectionType, value);
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
        let tooltip = null;
        if (this.state.showInfoTooltip) {
            const style = {
                top: this.ReferenceDiv.offsetTop - 180,
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
        let tooltipTrigger = null;
        if (this.props.sectionType === 'agencyType') {
            tooltipTrigger = (
                <span className="agency-toggle__info-icon-holder">
                    <div ref={(div) => {
                        this.ReferenceDiv = div;
                    }}>
                        {tooltip}
                        <button
                            id="agency-toggle__info-icon"
                            className="agency-toggle__info-icon"
                            onFocus={this.showTooltip}
                            onBlur={this.closeTooltip}
                            onMouseLeave={this.closeTooltip}
                            onMouseEnter={this.showTooltip} >
                            <FontAwesomeIcon icon="info-circle" />
                        </button>
                    </div>
                </span>
            );
        }
        const options = this.props.sectionType === 'agencyType' ? agencyOptions : fileFormatOptions;
        return (
            <div className="detached-radio-section">
                <label className="detached-radio-section__label">
                    {this.props.label}
                </label>
                <RadioGroup
                    columns={[options]}
                    onChange={this.onChange}
                    currentValue={this.props.active}
                    pageSection={`${this.props.fileType}${this.props.sectionType}`} />
                {tooltipTrigger}
            </div>
        );
    }
}

RadioSection.propTypes = propTypes;
RadioSection.defaultProps = defaultProps;
