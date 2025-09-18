/**
 * FilterSubmit.jsx
 * Created by Lizzie Salita 8/14/18
 */

import PropTypes from 'prop-types';

const propTypes = {
    filtersChanged: PropTypes.bool,
    applyStagedFilters: PropTypes.func,
    resetFilters: PropTypes.func
};

const defaultProps = {
    filtersChanged: false,
    applyStagedFilters: null,
    resetFilters: null
};

const FilterSubmit = (props) => (
    <div className="dashboard-filters__submit-content">
        <button
            className="dashboard-filters__reset"
            aria-label="Reset search"
            onClick={props.resetFilters}>
                Reset Filters
        </button>
        <button
            className="btn-primary dashboard-filters__submit"
            title="Submit"
            aria-label="Submit"
            disabled={!props.filtersChanged}
            onClick={props.applyStagedFilters}>
                Submit
        </button>
    </div>
);

FilterSubmit.propTypes = propTypes;
FilterSubmit.defaultProps = defaultProps;

export default FilterSubmit;
