/**
 * FilterBar.jsx
 * Created by Lizzie Salita 8/14/18
 */

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    group: PropTypes.string,
    applied: PropTypes.bool,
    toggleFilter: PropTypes.func
};

const FilterBar = ({name = '', value = {}, group = '', applied = false, toggleFilter = null}) => {
    const removeFilter = () => {
        toggleFilter(group, value);
    };

    const tagClass = applied ? 'filter-tag_applied' : 'filter-tag_staged';
    return (
        <div className={`filter-tag ${tagClass}`}>
            <div className="filter-tag__name">
                {name}
            </div>
            <button
                aria-label="Remove filter"
                onClick={removeFilter}
                className="filter-tag__close">
                <FontAwesomeIcon icon="xmark" />
            </button>
        </div>
    );
};

FilterBar.propTypes = propTypes;
export default FilterBar;
