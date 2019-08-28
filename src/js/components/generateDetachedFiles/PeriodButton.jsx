/**
 * PeriodButton.jsx
 * Created by Lizzie Salita 3/4/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as utils from '../../helpers/util';
import PeriodButtonWithTooltip from './PeriodButtonWithTooltip';

const propTypes = {
    active: PropTypes.bool,
    period: PropTypes.number,
    hoveredPeriod: PropTypes.func,
    endHover: PropTypes.func,
    pickedPeriod: PropTypes.func
};

const defaultProps = {
    disabled: true,
    active: false,
    period: 1,
    hoveredPeriod: null,
    endHover: null,
    pickedPeriod: null
};

const PeriodButton = (props) => {
    const hoveredPeriod = () => {
        props.hoveredPeriod(props.period);
    };

    const clickedPeriod = (e) => {
        e.preventDefault();
        props.pickedPeriod(props.period);
    };

    const activeClass = props.active ? 'period-picker__list-button_active' : '';

    let quarterIndicator = null;
    if ((props.period) % 3 === 0) {
        // Every 3rd period corresponds to the end of a fiscal quarter
        let quarterText = 'Quarter 1';
        const quarter = props.period / 3;
        if (quarter > 1) {
            quarterText = `Quarters 1 - ${quarter}`;
        }
        quarterIndicator = (
            <span className="period-picker__quarter">
                {quarterText}
            </span>
        );
    }

    let button = (
        <li className="period-picker__list-item">
            <button
                className={`period-picker__list-button ${activeClass}`}
                onMouseOver={hoveredPeriod}
                onFocus={hoveredPeriod}
                onMouseLeave={props.endHover}
                onBlur={props.endHover}
                onClick={clickedPeriod}>
                {utils.getPeriodTextFromValue(props.period)}{quarterIndicator}
            </button>
        </li>
    );

    if (props.period === 1) {
        button = (
            <PeriodButtonWithTooltip active={props.active} />
        );
    }

    return button;
};


PeriodButton.propTypes = propTypes;
PeriodButton.defaultProps = defaultProps;
export default PeriodButton;
