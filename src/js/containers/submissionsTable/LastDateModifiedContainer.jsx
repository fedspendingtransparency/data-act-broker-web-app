/**
 * LastDateModifiedContainer.jsx
 * Created by Kwadwo Opoku-Debrah 9/30/18
 */

import PropTypes from 'prop-types';
import moment from 'moment';

import CalendarDateRangePicker from '../../components/SharedComponents/CalendarDateRangePicker';

const propTypes = {
    onSelect: PropTypes.func,
    minDateLastModified: PropTypes.string
};

const LastDateModifiedContainer = ({
    onSelect = () => {},
    minDateLastModified = ''
}) => {
    // Safari Does not accept our date returned
    const minDate = moment(minDateLastModified, 'YYYY-MM-DDTHH:mm:ss.SSSSSS').toDate();
    const finalPayload = {
        minDate,
        maxDate: new Date()
    };

    return (
        <CalendarDateRangePicker minmaxDates={finalPayload} onSelect={onSelect} />
    );
};

LastDateModifiedContainer.propTypes = propTypes;
export default LastDateModifiedContainer;
