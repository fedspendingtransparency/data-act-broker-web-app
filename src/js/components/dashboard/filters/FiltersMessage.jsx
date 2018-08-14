/**
 * FiltersMessage.jsx
 * Created by Lizzie Salita 8/13/18
 */

import React, { PropTypes } from 'react';
import { ExclamationCircle } from '../../SharedComponents/icons/Icons';

const propTypes = {
    currentFilters: PropTypes.object,
    filterCount: PropTypes.number
};

const defaultProps = {
    currentFilters: {},
    filterCount: 0
};

export default class FiltersMessage extends React.Component {
    render() {
        return (
            <div className="table-heading__message">
                <div className="filters-message">
                    <ExclamationCircle />
                    You have <span className="filters-message__count">{this.props.filterCount}</span> filters selected.
                    Click the submit button below to apply.
                </div>
            </div>
        );
    }
}

FiltersMessage.propTypes = propTypes;
FiltersMessage.defaultProps = defaultProps;
