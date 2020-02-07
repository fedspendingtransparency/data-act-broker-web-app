/**
 * LastModifiedFilterContainer.jsx
 * Created by Lizzie Salita 02/07/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as filterActions from 'redux/actions/dashboard/dashboardFilterActions';
import LastModifiedFilter from 'components/dashboard/filters/LastModifiedFilter';

const propTypes = {
    updateGenericFilter: PropTypes.func,
    selectedFilters: PropTypes.object
};

export class LastModifiedFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.pickedDates = this.pickedDates.bind(this);
        this.isOutsideRange = this.isOutsideRange.bind(this);
    }

    pickedDates(dates) {
        // convert moment objects to strings
        const lastModified = {
            startDate: dates.startDate ? dates.startDate.format('MM/DD/YYYY') : '',
            endDate: dates.endDate ? dates.endDate.format('MM/DD/YYYY') : ''
        };
        this.props.updateGenericFilter('active', 'lastModified', lastModified);
    }

    isOutsideRange(day) {
        const today = moment();
        const minDate = moment('01/01/2017', 'MM/DD/YYYY');

        // disable future dates
        if (day.isAfter(today)) {
            return true;
        }

        // reporting began Q2 of FY 2017
        if (day.isBefore(minDate)) {
            return true;
        }

        return false;
    }

    render() {
        return (
            <LastModifiedFilter
                pickedDates={this.pickedDates}
                selectedDates={this.props.selectedFilters.lastModified}
                isOutsideRange={this.isOutsideRange} />
        );
    }
}

LastModifiedFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFilters: state.dashboardFilters.active
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch),
)(LastModifiedFilterContainer);
