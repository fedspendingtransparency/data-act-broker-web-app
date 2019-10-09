/**
 * FilterOption.jsx
 * Created by Lizzie Salita 10/02/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    required: PropTypes.bool
    // TODO- Lizzie: add the component prop
};

export default class FilterOption extends React.Component {
    render() {
        const required = this.props.required ? (
            <span className="filter-sidebar__option-required">Required</span>
        ) : null;
        return (
            <div className="filter-sidebar__option">
                <span className="filter-sidebar__option-name">
                    {this.props.name}{required}
                </span>
                <div>
                    {this.props.description}
                </div>
            </div>
        );
    }
}

FilterOption.propTypes = propTypes;
