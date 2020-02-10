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
    component: PropTypes.object,
    altDescription: PropTypes.string
};

export default class FilterOption extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            useAltText: false
        };

        this.setDescription = this.setDescription.bind(this);
    }

    setDescription(useAltText) {
        this.setState({
            useAltText
        });
    }

    render() {
        const required = this.props.required ? (
            <span className="filter-sidebar__option-required">Required</span>
        ) : null;
        let component = null;
        if (this.props.component) {
            const Component = this.props.component;
            component = <Component setDescription={this.setDescription} />;
        }
        const description = this.state.useAltText ? this.props.altDescription : this.props.description;
        return (
            <div className="filter-sidebar__option">
                <span className="filter-sidebar__option-name">
                    {this.props.name}{required}
                </span>
                <div className="filter-sidebar__option-description">
                    {description}
                </div>
                {component}
            </div>
        );
    }
}

FilterOption.propTypes = propTypes;
