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
    pickedQuarter: PropTypes.func
};

const QuarterButton = (props) => {
    const clickedQuarter = (e) => {
        e.preventDefault();
        props.pickedQuarter(props.quarter);
    };

    let additionalClasses = '';
    if (props.quarter === 1) {
        additionalClasses += 'quarter-picker__quarter_first';
    }
    else if (props.quarter === 4) {
        additionalClasses += 'quarter-picker__quarter_last';
    }

    if (!props.disabled && props.active) {
        additionalClasses += ' quarter-picker__quarter_active';
    }

    return (
        <button
            className={`quarter-picker__quarter ${additionalClasses}`}
            disabled={props.disabled}
            onClick={clickedQuarter}>
            Q{props.quarter}
        </button>
    );
};


QuarterButton.propTypes = propTypes;
export default QuarterButton;
