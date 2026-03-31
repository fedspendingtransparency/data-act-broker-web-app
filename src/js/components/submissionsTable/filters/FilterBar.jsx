/**
 * FilterBar.jsx
 * Created by Lizzie Salita 8/14/18
 */

import PropTypes from 'prop-types';
import TagItem from './TagItem';

const propTypes = {
    filters: PropTypes.array,
    toggleDashboardFilter: PropTypes.func,
    updateDashboardObjectFilter: PropTypes.func,
    updateDashboardStringFilter: PropTypes.func,
    type: PropTypes.string,
    table: PropTypes.string,
    applied: PropTypes.bool
};

const FilterBar = ({
    filters = [],
    toggleDashboardFilter = null,
    updateDashboardObjectFilter = null,
    updateDashboardStringFilter = null,
    type = '',
    table = '',
    applied = false
}) => {
    const toggleFilter = (filter, value) => {
        if (filter === 'lastDateModified') {
            updateDashboardObjectFilter({
                dashboard: type,
                table: table,
                filter,
                value
            });
        }
        else if (filter === 'submissionType') {
            updateDashboardStringFilter({
                dashboard: type,
                table: table,
                filter,
                value
            });
        }
        else {
            toggleDashboardFilter({
                dashboard: type,
                table: table,
                filter,
                value
            });
        }
    };

    const tags = filters.map((filter) => (
        <TagItem
            key={filter.name}
            {...filter}
            applied={applied}
            toggleFilter={toggleFilter} />
    ));

    return (
        <div className="filter-bar">
            {tags}
        </div>
    );
};

FilterBar.propTypes = propTypes;
export default FilterBar;
