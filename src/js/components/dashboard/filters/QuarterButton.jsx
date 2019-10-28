/**
 * QuarterButton.jsx
 * Created by Lizzie Salita 10/15/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'components/SharedComponents/WarningTooltip';

const propTypes = {
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    quarter: PropTypes.number,
    pickedQuarter: PropTypes.func
};

export default class QuarterButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false
        };

        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
    }

    onMouseEnter() {
        if (this.props.disabled) {
            this.setState({
                showTooltip: true
            });
        }
    }

    onMouseLeave() {
        if (this.state.showTooltip) {
            this.setState({
                showTooltip: false
            });
        }
    }

    clickedQuarter(e) {
        e.preventDefault();
        this.props.pickedQuarter(this.props.quarter);
    }

    render() {
        let additionalClasses = '';
        let tooltipMessage = 'The submission period has yet to open. Please search for a submission period that has closed.';
        if (this.props.quarter === 1) {
            additionalClasses += 'quarter-picker__quarter_first';
            tooltipMessage = 'There is no data available for this quarter. We began recording data in Q2 of FY 17.';
        }
        else if (this.props.quarter === 4) {
            additionalClasses += 'quarter-picker__quarter_last';
        }

        if (!this.props.disabled && this.props.active) {
            additionalClasses += ' quarter-picker__quarter_active';
        }

        return (
            <button
                className={`quarter-picker__quarter ${additionalClasses}`}
                disabled={this.props.disabled}
                onClick={this.clickedQuarter}
                onMouseEnter={this.onMouseEnter}
                onFocus={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onBlur={this.onMouseLeave}>
                Q{this.props.quarter}
                {this.state.showTooltip && <Tooltip message={tooltipMessage} />}
            </button>
        );
    }
}


QuarterButton.propTypes = propTypes;
