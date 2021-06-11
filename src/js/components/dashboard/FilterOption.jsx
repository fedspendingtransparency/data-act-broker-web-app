/**
 * FilterOption.jsx
 * Created by Lizzie Salita 10/02/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import FilterSubOption from './FilterSubOption';

const propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    required: PropTypes.bool,
    component: PropTypes.object,
    subOptions: PropTypes.array,
    altDescription: PropTypes.string,
    type: PropTypes.oneOf(['historical', 'active'])
};

const defaultProps = {
    subOptions: []
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
            component = <Component setDescription={this.setDescription} type={this.props.type} />;
        }
        const description = this.state.useAltText ? this.props.altDescription : this.props.description;

        const subOptionsList = this.props.subOptions.map((option, i) => (
            <FilterSubOption
                key={option.name}
                type={this.props.type}
                lastSubOption={this.props.subOptions.length === i + 1}
                {...option} />)
        );
        return (
            <div className="filter-sidebar__option">
                <span className="filter-sidebar__option-name">
                    {this.props.name}{required}
                </span>
                <div className="filter-sidebar__option-description">
                    {description}
                </div>
                {component}
                {subOptionsList}
            </div>
        );
    }
}

FilterOption.defaultProps = defaultProps;
FilterOption.propTypes = propTypes;
