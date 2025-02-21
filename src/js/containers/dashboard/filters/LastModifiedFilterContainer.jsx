/**
 * LastModifiedFilterContainer.jsx
 * Created by Lizzie Salita 02/07/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as filterActions from 'redux/actions/dashboard/dashboardFilterActions';
import LastModifiedFilter from 'components/dashboard/filters/LastModifiedFilter';

const propTypes = {
    updateGenericFilter: PropTypes.func,
    selectedFilters: PropTypes.object
};

export class LastModifiedFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.enteredDate = this.enteredDate.bind(this);
        this.pickedDates = this.pickedDates.bind(this);
    }

    enteredDate(enteredDate, datePosition) {
        const filters = this.props.selectedFilters.lastModified;
        if (datePosition === 'start') {
            filters.from = enteredDate;
        }
        else {
            filters.to = enteredDate;
        }

        this.pickedDates(filters);
    }

    pickedDates(datePicks) {
        let dates = datePicks;
        if (dates === undefined) {
            dates = {
                from: null,
                to: null
            };
        }
        this.props.updateGenericFilter('active', 'lastModified', dates);
    }

    render() {
        return (
            <LastModifiedFilter
                pickedDates={this.pickedDates}
                enteredDate={this.enteredDate}
                selectedDates={this.props.selectedFilters.lastModified} />
        );
    }
}

LastModifiedFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFilters: state.dashboardFilters.active
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch)
)(LastModifiedFilterContainer);
