/**
 * FilterBar.jsx
 * Created by Lizzie Salita 8/14/18
 */

import React, { PropTypes } from 'react';
import { Times } from '../../SharedComponents/icons/Icons';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    group: PropTypes.string,
    toggleFilter: PropTypes.func
};

const defaultProps = {
    name: '',
    value: {},
    group: '',
    toggleFilter: null
};

export default class FilterBar extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
    }

    removeFilter() {
        this.props.toggleFilter(this.props.group, this.props.value);
    }

    render() {
        return (
            <div className="filter-tag">
                <div className="filter-tag__name">
                    {this.props.name}
                </div>
                <button
                    aria-label="Remove filter"
                    onClick={this.removeFilter}
                    className="filter-tag__close">
                    <Times />
                </button>
            </div>
        );
    }
}

FilterBar.propTypes = propTypes;
FilterBar.defaultProps = defaultProps;
