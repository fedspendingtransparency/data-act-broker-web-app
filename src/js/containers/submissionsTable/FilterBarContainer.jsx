/**
 * FilterBarContainer.jsx
 * Created by Lizzie Salita 8/16/18
 */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import * as dashboardFilterActions from 'redux/actions/submissionsTable/stagedFiltersActions';

import FilterBar from 'components/submissionsTable/filters/FilterBar';

const propTypes = {
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    toggleDashboardFilter: PropTypes.func,
    updateDashboardObjectFilter: PropTypes.func,
    updateDashboardStringFilter: PropTypes.func,
    type: PropTypes.string,
    table: PropTypes.string,
    updateFilterCount: PropTypes.func
};

const FilterBarContainer = ({
    stagedFilters = {},
    appliedFilters = {},
    toggleDashboardFilter = null,
    updateDashboardObjectFilter = null,
    updateDashboardStringFilter = null,
    type = '',
    table = '',
    updateFilterCount = null
}) => {
    const [filters, setFilters] = useState([]);
    const [filterCount, setFilterCount] = useState(0);
    const [applied, setApplied] = useState(false);

    useEffect(() => {
        prepareFilters(appliedFilters, true);
    }, [appliedFilters]);

    useEffect(() => {
        // staged filters changed
        if (!isEqual(stagedFilters, appliedFilters)) {
            prepareFilters(stagedFilters, false);
        }
        else {
            // staged filters already match the applied filters
            prepareFilters(appliedFilters, true);
        }
    }, [stagedFilters]);

    useEffect(() => {
        updateFilterCount(filterCount, type, table);
    }, [filterCount]);

    const prepareFilters = (newFilters, isApplied) => {
        let tmpFilters = [];

        // prepare the file name filters
        const fileNameFilters = prepareFileNames(newFilters);
        if (fileNameFilters) {
            tmpFilters = tmpFilters.concat(fileNameFilters);
        }

        // prepare the submission id filters
        const submissionIdFilters = prepareSubmissionIds(newFilters);
        if (submissionIdFilters) {
            tmpFilters = tmpFilters.concat(submissionIdFilters);
        }

        // prepare the agency filters
        const agencyFilters = prepareAgencies(newFilters);
        if (agencyFilters) {
            tmpFilters = tmpFilters.concat(agencyFilters);
        }

        // prepare the submissionType filter
        const submissionTypeFilters = prepareSubmissionType(newFilters);
        if (submissionTypeFilters) {
            tmpFilters = tmpFilters.concat(submissionTypeFilters);
        }

        // prepare the createdBy filters
        const createdByFilters = prepareCreatedBy(newFilters);
        if (createdByFilters) {
            tmpFilters = tmpFilters.concat(createdByFilters);
        }

        // prepare the lastDateModified filters
        const lastDateModifiedFilters = prepareLastDateModified(newFilters);
        if (lastDateModifiedFilters) {
            tmpFilters = tmpFilters.concat(lastDateModifiedFilters);
        }

        setFilters(tmpFilters);
        setApplied(isApplied);
        setFilterCount(isApplied ? 0 : tmpFilters.length);
    };

    const prepareFileNames = (newFileNames) => {
        if (newFileNames.fileNames.length > 0) {
            return newFileNames.fileNames.map((name) => ({
                name,
                value: name,
                group: 'fileNames'
            }));
        }
        return null;
    };

    const prepareSubmissionIds = (newSubIds) => {
        if (newSubIds.submissionIds.length > 0) {
            return newSubIds.submissionIds.map((id) => ({
                name: id,
                value: id,
                group: 'submissionIds'
            }));
        }
        return null;
    };

    const prepareAgencies = (newAgencies) => {
        if (newAgencies.agencies.length > 0) {
            return newAgencies.agencies.map((agency) => ({
                name: agency.name,
                value: agency,
                group: 'agencies'
            }));
        }
        return null;
    };

    const prepareSubmissionType = (newSubType) => {
        if (newSubType.submissionType && newSubType.submissionType !== '') {
            const subType = `${newSubType.submissionType.charAt(0).toUpperCase()}${newSubType.submissionType.slice(1)}`;
            return {
                name: `${subType} Submissions`,
                value: newSubType.submissionType,
                group: 'submissionType'
            };
        }
        return null;
    };

    const prepareCreatedBy = (newCreatedBy) => {
        if (newCreatedBy.createdBy.length > 0) {
            return newCreatedBy.createdBy.map((createdBylist) => ({
                name: createdBylist.name,
                value: createdBylist,
                group: 'createdBy'
            }));
        }
        return null;
    };

    const prepareLastDateModified = (newModDate) => {
        if (newModDate.lastDateModified.endDate) {
            return {
                name: `${newModDate.lastDateModified.startDate} - ${newModDate.lastDateModified.endDate}`,
                value: newModDate.lastDateModified,
                group: 'lastDateModified'
            };
        }
        return null;
    };

    let output = null;
    if (filters.length > 0) {
        output = (
            <FilterBar
                applied={applied}
                filters={filters}
                type={type}
                table={table}
                toggleDashboardFilter={toggleDashboardFilter}
                updateDashboardObjectFilter={updateDashboardObjectFilter}
                updateDashboardStringFilter={updateDashboardStringFilter} />
        );
    }

    return output;
};

FilterBarContainer.propTypes = propTypes;

export default connect(
    () => ({}),
    (dispatch) => bindActionCreators(dashboardFilterActions, dispatch)
)(FilterBarContainer);
