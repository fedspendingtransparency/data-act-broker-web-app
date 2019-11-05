/**
 * QuarterButton.jsx
 * Created by Lizzie Salita 10/15/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    quarter: PropTypes.number,
    pickedQuarter: PropTypes.func,
    toggleTooltip: PropTypes.func
};

export default class QuarterButton extends React.Component {
    constructor(props) {
        super(props);

        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.clickedQuarter = this.clickedQuarter.bind(this);
    }

    onMouseEnter() {
        if (this.props.disabled) {
            this.props.toggleTooltip(this.props.quarter);
        }
    }

    onMouseLeave() {
        this.props.toggleTooltip(0);
    }

    clickedQuarter(e) {
        e.preventDefault();
        if (!this.props.disabled) {
            this.props.pickedQuarter(this.props.quarter);
        }
    }

    render() {
        let additionalClasses = this.props.disabled ? 'quarter-picker__quarter_disabled ' : '';
        if (this.props.quarter === 1) {
            additionalClasses += 'quarter-picker__quarter_first';
        }
        else if (this.props.quarter === 4) {
            additionalClasses += 'quarter-picker__quarter_last';
        }

        if (!this.props.disabled && this.props.active) {
            additionalClasses += ' quarter-picker__quarter_active';
        }

        return (
            // Use CSS class and aria-disabled rather than disabled html property
            // so that the disabled buttons are still focusable to display
            // the warning tooltip
            <button
                className={`quarter-picker__quarter ${additionalClasses}`}
                onClick={this.clickedQuarter}
                onMouseEnter={this.onMouseEnter}
                onFocus={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onBlur={this.onMouseLeave}
                aria-disabled={this.props.disabled}>
                Q{this.props.quarter}
            </button>
        );
    }
}


QuarterButton.propTypes = propTypes;
