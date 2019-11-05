/**
 * RadioGroup.jsx
 * Created by Lizzie Salita 10/30/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    columns: PropTypes.array,
    onChange: PropTypes.func,
    currentValue: PropTypes.string
};

export default class RadioGroup extends React.Component {
    constructor(props) {
        super(props);

        this.pickedOption = this.pickedOption.bind(this);
    }

    pickedOption(e) {
        this.props.onChange(e.target.value);
    }

    generateColumns() {
        return this.props.columns.map((column, i) => (
            <div
                className="radio-group__column"
                key={`radio-group-col-${i}`}>
                {this.generateOptions(column)}
            </div>
        ));
    }

    generateOptions(options) {
        return options.map((option) => (
            <div className="radio-option" key={option.value}>
                <input
                    id={option.value}
                    className="radio-option__input"
                    type="radio"
                    value={option.value}
                    checked={option.value === this.props.currentValue}
                    onChange={this.pickedOption} />
                <label className="radio-option__label" htmlFor={option.value}>
                    {option.label}
                </label>
            </div>
        ));
    }

    render() {
        return (
            <div className="radio-group">
                {this.generateColumns()}
            </div>
        );
    }
}

RadioGroup.propTypes = propTypes;
