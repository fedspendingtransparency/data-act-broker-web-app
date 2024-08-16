/**
 * LastDateModifiedContainer.jsx
 * Created by Kwadwo Opoku-Debrah 9/30/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as lastDateModifiedActions from '../../redux/actions/lastDateModifiedActions';

import CalendarDateRangePicker from '../../components/SharedComponents/CalendarDateRangePicker';

const propTypes = {
    setLastDateModifiedList: PropTypes.func,
    lastDateModifiedList: PropTypes.object,
    detached: PropTypes.bool,
    selectedFilters: PropTypes.object,
    type: PropTypes.string,
    table: PropTypes.string,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func,
    minDateLastModified: PropTypes.string
};

const defaultProps = {
    setLastDateModifiedList: () => {},
    lastDateModifiedList: {},
    detached: true,
    selectedFilters: [],
    table: '',
    type: '',
    placeholder: '',
    onSelect: () => {},
    minDateLastModified: ''
};

class LastDateModifiedContainer extends React.Component {
    render() {
        // Safari Does not accept our date returned
        const minDate = moment(this.props.minDateLastModified, 'YYYY-MM-DDTHH:mm:ss.SSSSSS').toDate();
        const finalPayload = {
            minDate,
            maxDate: new Date()
        };

        return (
            <CalendarDateRangePicker minmaxDates={finalPayload} {...this.props} />
        );
    }
}

LastDateModifiedContainer.propTypes = propTypes;
LastDateModifiedContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        lastDateModifiedList: state.lastDateModifiedList,
        selectedFilters: state.submissionsTableFilters
    }),
    (dispatch) => bindActionCreators(lastDateModifiedActions, dispatch)
)(LastDateModifiedContainer);
