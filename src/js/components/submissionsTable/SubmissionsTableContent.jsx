/**
  * SubmissionsTableContent.jsx
  * Created by Kevin Li 10/27/16
  */

import PropTypes from 'prop-types';
import { useState } from 'react';
import FilterBarContainer from 'containers/submissionsTable/FilterBarContainer';
import SubmissionsTable from './SubmissionsTable';
import SubmissionsTableFilters from './SubmissionsTableFilters';
import FiltersMessage from './filters/FiltersMessage';

const propTypes = {
    loadTableData: PropTypes.func,
    session: PropTypes.object,
    activeSubmissions: PropTypes.array,
    publishedSubmissions: PropTypes.array,
    type: PropTypes.oneOf(['dabs', 'fabs']),
    activeTotal: PropTypes.number,
    publishedTotal: PropTypes.number,
    activeLoading: PropTypes.bool,
    publishedLoading: PropTypes.bool,
    activeError: PropTypes.string,
    publishedError: PropTypes.string,
    toggleDashboardFilter: PropTypes.func,
    updateDashboardObjectFilter: PropTypes.func,
    updateDashboardStringFilter: PropTypes.func,
    activeMinDateLastModified: PropTypes.string,
    publishedMinDateLastModified: PropTypes.string,
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object
};

const SubmissionsTableContent = ({
    loadTableData = null,
    session = null,
    activeSubmissions = [],
    publishedSubmissions = [],
    type = '',
    activeTotal = 0,
    publishedTotal = 0,
    activeLoading = false,
    publishedLoading = false,
    activeError = '',
    publishedError = '',
    toggleDashboardFilter = null,
    updateDashboardObjectFilter = null,
    updateDashboardStringFilter = null,
    activeMinDateLastModified = '',
    publishedMinDateLastModified = '',
    stagedFilters = {},
    appliedFilters = {}
}) => {
    const [filterCounts, setFilterCounts] = useState({
        dabs: {
            active: 0,
            published: 0
        },
        fabs: {
            active: 0,
            published: 0
        }
    });

    const toggleFilter = (table, filter, value) => {
        if (filter === 'lastDateModified') {
            updateDashboardObjectFilter({
                dashboard: type,
                table,
                filter,
                value
            });
        }
        else if (filter === 'submissionType') {
            updateDashboardStringFilter({
                dashboard: type,
                table,
                filter,
                value
            });
        }
        else {
            toggleDashboardFilter({
                dashboard: type,
                table,
                filter,
                value
            });
        }
    };

    /**
     * Use the top filter bar container's internal filter parsing to track the current number of
     * filters applied
     */

    const updateFilterCount = (count, subType, tableType) => {
        const dashboard = Object.assign({}, filterCounts[subType], {
            [tableType]: count
        });

        const tmpFilterCounts = Object.assign({}, filterCounts, {
            [subType]: dashboard
        });

        setFilterCounts(tmpFilterCounts);
    };

    const generateMessage = (count) => {
        if (count > 0) {
            return <FiltersMessage filterCount={count} />;
        }
        return null;
    };

    const activeMessage = generateMessage(filterCounts[type].active);
    const secondMessage = generateMessage(filterCounts[type].published);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="table-heading">
                        <h2 className="table-heading__title">Active Submissions</h2>
                        {activeMessage}
                    </div>
                    <SubmissionsTableFilters
                        toggleFilter={toggleFilter}
                        stagedFilters={stagedFilters[type].active}
                        appliedFilters={appliedFilters[type].active}
                        minDateLastModified={activeMinDateLastModified}
                        type={type}
                        table="active" />
                    <FilterBarContainer
                        type={type}
                        table="active"
                        stagedFilters={stagedFilters[type].active}
                        appliedFilters={appliedFilters[type].active}
                        updateFilterCount={updateFilterCount} />
                    <SubmissionsTable
                        isLoading={activeLoading}
                        errorMessage={activeError}
                        isPublished={false}
                        loadTableData={loadTableData}
                        appliedFilters={appliedFilters[type].active}
                        total={activeTotal}
                        data={activeSubmissions}
                        session={session}
                        type={type} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="table-heading">
                        <h2 className="table-heading__title">
                            {type === 'fabs' ? 'Published Submissions' : 'Published and Certified Submissions'}
                        </h2>
                        {secondMessage}
                    </div>
                    <SubmissionsTableFilters
                        toggleFilter={toggleFilter}
                        stagedFilters={stagedFilters[type].published}
                        appliedFilters={appliedFilters[type].published}
                        minDateLastModified={publishedMinDateLastModified}
                        table="published"
                        type={type} />
                    <FilterBarContainer
                        type={type}
                        table="published"
                        stagedFilters={stagedFilters[type].published}
                        appliedFilters={appliedFilters[type].published}
                        updateFilterCount={updateFilterCount} />
                    <SubmissionsTable
                        isLoading={publishedLoading}
                        errorMessage={publishedError}
                        loadTableData={loadTableData}
                        appliedFilters={appliedFilters[type].published}
                        total={publishedTotal}
                        data={publishedSubmissions}
                        session={session}
                        type={type} />
                </div>
            </div>
        </div>
    );
};

SubmissionsTableContent.propTypes = propTypes;
export default SubmissionsTableContent;
