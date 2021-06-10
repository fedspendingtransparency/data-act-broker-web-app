/**
 * PeriodButton.jsx
 * Created by Lizzie Salita 3/4/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as utils from '../../helpers/util';
import PeriodButtonWithTooltip from './PeriodButtonWithTooltip';

const propTypes = {
    disabledReason: PropTypes.oneOf(['', 'firstYear', 'notOpen']),
    active: PropTypes.bool,
    period: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    hoveredPeriod: PropTypes.func,
    endHover: PropTypes.func,
    pickedPeriod: PropTypes.func,
    type: PropTypes.oneOf(['fileA', 'historicDashboard'])
};

const defaultProps = {
    disabledReason: '',
    active: false,
    period: 1,
    hoveredPeriod: null,
    endHover: null,
    pickedPeriod: null,
    type: 'fileA'
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

    let buttonText = null;
    let paddingCSS = '';
    if (props.type === 'fileA') {
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
        buttonText = <React.Fragment>{utils.getPeriodTextFromValue(props.period)}{quarterIndicator}</React.Fragment>
    }
    else {
        if (typeof props.period === 'string') {
            buttonText = props.period;
        }
        else {
            buttonText = props.period === 2 ? 'P01/P02' : `P${props.period.toString().padStart(2, '0')}`;
            paddingCSS = ' padded-item';
        }
    }

    let button = (
        <li className={`period-picker__list-item`}>
            <button
                className={`period-picker__list-button ${activeClass}${paddingCSS}`}
                onMouseOver={hoveredPeriod}
                onFocus={hoveredPeriod}
                onMouseLeave={props.endHover}
                onBlur={props.endHover}
                onClick={clickedPeriod}>
                {buttonText}
            </button>
        </li>
    );

    if (props.period === 1 && props.type === 'fileA') {
        button = (
            <PeriodButtonWithTooltip active={props.active} hoveredPeriod={props.hoveredPeriod} />
        );
    }
    else if (props.type === 'historicDashboard' && props.disabledReason !== '') {
        button = (
            <PeriodButtonWithTooltip
                active={props.active}
                hoveredPeriod={props.hoveredPeriod}
                buttonText={buttonText}
                firstYear={props.disabledReason === 'firstYear'}
                type="historicDashboard"
                paddingCSS={paddingCSS} />
        );
    }

    return button;
};


PeriodButton.propTypes = propTypes;
PeriodButton.defaultProps = defaultProps;
export default PeriodButton;
