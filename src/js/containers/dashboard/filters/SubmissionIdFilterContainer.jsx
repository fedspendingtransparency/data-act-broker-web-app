/**
 * SubmissionIdFilterContainer.jsx
 * Created by Lizzie Salita 02/11/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as filterActions from 'redux/actions/dashboard/dashboardFilterActions';
import SubmissionIdFilter from 'components/dashboard/filters/SubmissionIdFilter';

const propTypes = {
    updateGenericFilter: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
    selectedFilters: PropTypes.object.isRequired
};


export class SubmissionIdFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.clearFilter = this.clearFilter.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }

    updateFilter(submissionId) {
        this.props.updateGenericFilter('active', 'submissionId', submissionId);
    }

    clearFilter() {
        this.props.clearFilter('active', 'submissionId');
    }

    render() {
        return (
            <SubmissionIdFilter
                clearFilter={this.clearFilter}
                updateFilter={this.updateFilter}
                selectedFilters={this.props.selectedFilters} />
        );
    }
}

SubmissionIdFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFilters: state.dashboardFilters.active
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch)
)(SubmissionIdFilterContainer);
