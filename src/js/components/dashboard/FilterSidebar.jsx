/**
 * FilterSidebar.jsx
 * Created by Lizzie Salita 10/02/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import SubmitButtonContainer from 'containers/dashboard/filters/SubmitButtonContainer';
import FilterOption from './FilterOption';

const defaultProps = {
    filters: []
};

const propTypes = {
    filters: PropTypes.arrayOf(PropTypes.object)
};

export default class FilterSidebar extends React.Component {
    render() {
        const optionsList = this.props.filters.map((filter) => (
            <FilterOption
                key={filter.name}
                {...filter} />)
        );

        return (
            <div className="filter-sidebar">
                <div className="filter-sidebar__option">
                    <span className="filter-sidebar__option-heading">FILTER</span>
                </div>
                {optionsList}
                <SubmitButtonContainer />
            </div>
        );
    }
}

FilterSidebar.defaultProps = defaultProps;
FilterSidebar.propTypes = propTypes;
