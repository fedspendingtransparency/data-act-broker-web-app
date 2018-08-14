/**
 * FiltersMessage.jsx
 * Created by Lizzie Salita 8/13/18
 */

import React, { PropTypes } from 'react';
import { ExclamationCircle } from '../../SharedComponents/icons/Icons';

const propTypes = {
    currentFilters: PropTypes.object
};

const defaultProps = {
    currentFilters: {}
};

export default class FiltersMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    calculateFilterCount() {
        // iterate through the current filters
        let count = 0;
        const filterLists = ['agencies', 'fileNames', 'submissionIds', 'createdBy'];

        for (let i = 0; i < filterLists.length; i++) {
            const filter = filterLists[i];
            count += this.props.currentFilters[filter].length;
        }
        const lastModified = this.props.currentFilters.lastModified;
        if (lastModified.startDate || lastModified.endDate) {
            count += 1;
        }

        return count;
    }

    render() {
        let message = null;
        const filterCount = this.calculateFilterCount();
        if (filterCount > 0) {
            message = (
                <div className="filters-message">
                    <ExclamationCircle />
                    You have <span className="filters-message__count">{filterCount}</span> filters selected.
                    Click the submit button below to apply.
                </div>
            );
        }

        return (
            <div className="table-heading__message">
                {message}
            </div>
        );
    }
}

FiltersMessage.propTypes = propTypes;
FiltersMessage.defaultProps = defaultProps;
