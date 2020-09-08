/**
 * FilterBar.jsx
 * Created by Lizzie Salita 8/14/18
 */

import React from 'react';
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

const defaultProps = {
    filters: [],
    toggleDashboardFilter: null,
    updateDashboardObjectFilter: null,
    updateDashboardStringFilter: null,
    type: '',
    table: '',
    applied: false
};

export default class FilterBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggleFilter = this.toggleFilter.bind(this);
    }

    toggleFilter(filter, value) {
        if (filter === 'lastDateModified') {
            this.props.updateDashboardObjectFilter({
                dashboard: this.props.type,
                table: this.props.table,
                filter,
                value
            });
        }
        else if (filter === 'submissionType') {
            this.props.updateDashboardStringFilter({
                dashboard: this.props.type,
                table: this.props.table,
                filter,
                value
            });
        }
        else {
            this.props.toggleDashboardFilter({
                dashboard: this.props.type,
                table: this.props.table,
                filter,
                value
            });
        }
    }

    render() {
        const tags = this.props.filters.map((filter) => (
            <TagItem
                key={filter.name}
                {...filter}
                applied={this.props.applied}
                toggleFilter={this.toggleFilter} />
        ));

        return (
            <div className="filter-bar">
                {tags}
            </div>
        );
    }
}

FilterBar.propTypes = propTypes;
FilterBar.defaultProps = defaultProps;
