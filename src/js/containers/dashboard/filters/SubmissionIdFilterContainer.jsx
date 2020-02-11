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

export const SubmissionIdFilterContainer = (props) => (
    <SubmissionIdFilter
        {...props} />
);


SubmissionIdFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedFilters: state.dashboardFilters.active
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch),
)(SubmissionIdFilterContainer);
