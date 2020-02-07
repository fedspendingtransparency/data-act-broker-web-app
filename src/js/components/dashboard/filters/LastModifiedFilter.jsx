/**
 * LastModifiedFilter.jsx
 * Created by Lizzie Salita 2/7/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';

const propTypes = {
    pickedDates: PropTypes.func,
    selectedDates: PropTypes.shape({
        startDate: PropTypes.string,
        endDate: PropTypes.string
    })
};

const LastModifiedFilter = (props) => {
    const [focusedInput, onFocusChange] = useState(null);
    const startDate = props.selectedDates.startDate ? moment(props.selectedDates.startDate) : null;
    const endDate = props.selectedDates.endDate ? moment(props.selectedDates.endDate) : null;
    return (
        <DateRangePicker
            startDate={startDate} // momentPropTypes.momentObj or null,
            startDateId="last-modified__start"
            endDate={endDate} // momentPropTypes.momentObj or null,
            endDateId="last-modified__end"
            onDatesChange={props.pickedDates}
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={onFocusChange}
            isOutsideRange={() => false} />
    );
};

LastModifiedFilter.propTypes = propTypes;
export default LastModifiedFilter;
