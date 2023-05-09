/**
 * FilterBar.jsx
 * Created by Lizzie Salita 8/14/18
 */

import React from 'react';
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

const defaultProps = {
    name: '',
    value: {},
    group: '',
    applied: false,
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
        const tagClass = this.props.applied ? 'filter-tag_applied' : 'filter-tag_staged';
        return (
            <div className={`filter-tag ${tagClass}`}>
                <div className="filter-tag__name">
                    {this.props.name}
                </div>
                <button
                    aria-label="Remove filter"
                    onClick={this.removeFilter}
                    className="filter-tag__close">
                    <FontAwesomeIcon icon="times" />
                </button>
            </div>
        );
    }
}

FilterBar.propTypes = propTypes;
FilterBar.defaultProps = defaultProps;
