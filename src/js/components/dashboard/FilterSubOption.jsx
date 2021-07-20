/**
 * FilterSubOption.jsx
 * Created by Alisa Burdeyny 06/04/21
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    required: PropTypes.bool,
    component: PropTypes.object,
    altDescription: PropTypes.string,
    type: PropTypes.oneOf(['historical', 'active']),
    lastSubOption: PropTypes.bool
};

export default class FilterSubOption extends React.Component {
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
            <span className="filter-sidebar__sub-option-required">Required</span>
        ) : null;
        const lastOption = this.props.lastSubOption ? ' last-sub-option' : '';
        let component = null;
        if (this.props.component) {
            const Component = this.props.component;
            component = <Component setDescription={this.setDescription} type={this.props.type} />;
        }
        const description = this.state.useAltText ? this.props.altDescription : this.props.description;
        return (
            <div className={`filter-sidebar__sub-option${lastOption}`}>
                <span className="filter-sidebar__sub-option-name">
                    {this.props.name}{required}
                </span>
                <div className="filter-sidebar__sub-option-description">
                    {description}
                </div>
                {component}
            </div>
        );
    }
}

FilterSubOption.propTypes = propTypes;
