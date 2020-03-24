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

        this.pickedDates = this.pickedDates.bind(this);
    }

    pickedDates(dates) {
        // convert moment objects to strings
        const lastModified = {
            start: dates.startDate ? dates.startDate.format('MM/DD/YYYY') : '',
            end: dates.endDate ? dates.endDate.format('MM/DD/YYYY') : ''
        };
        this.props.updateGenericFilter('active', 'lastModified', lastModified);
    }

    render() {
        return (
            <LastModifiedFilter
                pickedDates={this.pickedDates}
                selectedDates={this.props.selectedFilters.lastModified} />
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
