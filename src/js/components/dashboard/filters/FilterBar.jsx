/**
 * FilterBar.jsx
 * Created by Lizzie Salita 8/14/18
 */

import React, { PropTypes } from 'react';
import TagItem from './TagItem';

const propTypes = {
    filters: PropTypes.array,
    toggleDashboardFilter: PropTypes.func,
    type: PropTypes.string,
    table: PropTypes.string
};

const defaultProps = {
    filters: [],
    toggleDashboardFilter: null,
    type: '',
    table: ''
};

export default class FilterBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggleFilter = this.toggleFilter.bind(this);
    }

    toggleFilter(filter, value) {
        this.props.toggleDashboardFilter({
            dashboard: this.props.type,
            table: this.props.table,
            filter,
            value
        });
    }

    render() {
        const tags = this.props.filters.map((filter) => {
            return (
                <TagItem
                    key={filter.name}
                    {...filter}
                    toggleFilter={this.toggleFilter} />
            );
        });

        return (
            <div className="filter-bar">
                {tags}
            </div>
        );
    }
}

FilterBar.propTypes = propTypes;
FilterBar.defaultProps = defaultProps;
