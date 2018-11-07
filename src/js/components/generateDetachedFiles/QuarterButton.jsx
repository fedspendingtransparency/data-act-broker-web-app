/**
 * QuarterButton.jsx
 * Created by Lizzie Salita 11/5/18
 */

import React, { PropTypes } from 'react';

const propTypes = {
    first: PropTypes.bool,
    last: PropTypes.bool,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    quarter: PropTypes.number,
    hoveredQuarter: PropTypes.func,
    endHover: PropTypes.func,
    pickedQuarter: PropTypes.func
};

const defaultProps = {
    first: false,
    last: false,
    disabled: false,
    active: false,
    quarter: 1,
    hoveredQuarter: null,
    endHover: null,
    pickedQuarter: null
};

const QuarterButton = (props) => {
    const hoveredQuarter = () => {
        props.hoveredQuarter(props.quarter);
    };

    const clickedQuarter = (e) => {
        e.preventDefault();
        props.pickedQuarter(props.quarter);
    };

    let additionalClasses = '';
    if (props.first) {
        additionalClasses += 'quarter-picker__quarter_first';
    }
    else if (props.last) {
        additionalClasses += 'quarter-picker__quarter_last';
    }

    if (!props.disabled && props.active) {
        additionalClasses += ' quarter-picker__quarter_active';
    }

    return (
        <button
            className={`quarter-picker__quarter ${additionalClasses}`}
            disabled={props.disabled}
            onMouseOver={hoveredQuarter}
            onFocus={hoveredQuarter}
            onMouseLeave={props.endHover}
            onBlur={props.endHover}
            onClick={clickedQuarter}>
            Q{props.quarter}
        </button>
    );
};


QuarterButton.propTypes = propTypes;
QuarterButton.defaultProps = defaultProps;
export default QuarterButton;
