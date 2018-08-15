/**
 * FilterBar.jsx
 * Created by Lizzie Salita 8/14/18
 */

import React, { PropTypes } from 'react';
import TagItem from './TagItem';

const propTypes = {
    currentFilters: PropTypes.object,
    toggleFilter: PropTypes.func
};

const defaultProps = {
    currentFilters: {},
    toggleFilter: null
};

export default class FilterBar extends React.Component {
    render() {
        const filterGroups = Object.keys(this.props.currentFilters);

        const tags = filterGroups.map((filterGroup) => {
            if (filterGroup !== 'lastModified') {
                return this.props.currentFilters[filterGroup].map((filter) => {
                    return (
                        <TagItem
                            key={filter.name}
                            name={filter.name}
                            value={filter}
                            group={filterGroup}
                            toggleFilter={this.props.toggleFilter} />
                    );
                });
            }
            const filter = this.props.currentFilters.lastModified;
            if (filter.startDate || filter.endDate) {
                return (
                    <TagItem
                        key={filter.name}
                        name={filter.name}
                        value={filter}
                        group="lastModified"
                        toggleFilter={this.props.toggleFilter} />
                );
            }
            return null;
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
