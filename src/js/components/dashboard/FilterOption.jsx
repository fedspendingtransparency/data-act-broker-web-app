/**
 * FilterOption.jsx
 * Created by Lizzie Salita 10/02/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    required: PropTypes.bool,
    component: PropTypes.func
};

export default class FilterOption extends React.Component {
    render() {
        const required = this.props.required ? (
            <span className="filter-sidebar__option-required">Required</span>
        ) : null;
        let component = null;
        if (this.props.component) {
            const Component = this.props.component;
            component = <Component />;
        }
        return (
            <div className="filter-sidebar__option">
                <span className="filter-sidebar__option-name">
                    {this.props.name}{required}
                </span>
                <div>
                    {this.props.description}
                </div>
                {component}
            </div>
        );
    }
}

FilterOption.propTypes = propTypes;
