/**
 * SubmissionsTableFilters.jsx
 * Created by Lizzie Salita 8/10/18
 */

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FilterSubmitContainer from 'containers/submissionsTable/FilterSubmitContainer';
import SubmissionIdFilter from './filters/SubmissionIdFilter';
import FileNameFilter from './filters/FileNameFilter';
import AgencyFilter from './filters/AgencyFilter';
import CreatedByFilter from './filters/CreatedByFilter';
import LastDateModifiedFilter from './filters/LastDateModifiedFilter';
import SubmissionTypeFilter from './filters/SubmissionTypeFilter';

const propTypes = {
    toggleFilter: PropTypes.func,
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    table: PropTypes.oneOf(['active', 'published']),
    type: PropTypes.oneOf(['dabs', 'fabs']),
    minDateLastModified: PropTypes.string
};

const SubmissionsTableFilters = ({
    toggleFilter = null,
    stagedFilters = {},
    appliedFilters = {},
    table = '',
    type = '',
    minDateLastModified = ''
}) => {
    const updateFilterList = (filter, value) => {
        toggleFilter(table, filter, value);
    };

    let submissionTypeFilter = null;
    // test submissions only exist in the active tables so we only need that filter there
    if (table === 'active') {
        submissionTypeFilter = <SubmissionTypeFilter updateFilterList={updateFilterList} />;
    }
    return (
        <div className="dashboard-filters">
            <div className="dashboard-filters__label">
                <span className="usa-da-icon filter-icon">
                    <FontAwesomeIcon icon="filter" />
                </span>
                Filter by:
            </div>
            <AgencyFilter
                type={type}
                table={table}
                updateFilterList={updateFilterList} />
            <FileNameFilter
                table={table}
                updateFilterList={updateFilterList} />
            <SubmissionIdFilter
                table={table}
                updateFilterList={updateFilterList} />
            {submissionTypeFilter}
            <CreatedByFilter
                type={type}
                table={table}
                updateFilterList={updateFilterList} />
            <LastDateModifiedFilter
                type={type}
                table={table}
                updateFilterList={updateFilterList}
                minDateLastModified={minDateLastModified} />
            <FilterSubmitContainer
                stagedFilters={stagedFilters}
                appliedFilters={appliedFilters}
                type={type}
                table={table} />
        </div>
    );
};

SubmissionsTableFilters.propTypes = propTypes;
export default SubmissionsTableFilters;
