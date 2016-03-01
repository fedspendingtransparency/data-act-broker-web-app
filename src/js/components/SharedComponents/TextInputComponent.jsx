/**
* TextInputComponent.jsx
* Created by Katie Rose 12/17/15
**/

import React, { PropTypes } from 'react';

const propTypes = {
    inputDisabled: PropTypes.bool,
    inputName: PropTypes.string.isRequired,
    inputLength: PropTypes.number, // This not yet functional via React
    inputClass: PropTypes.string,
    inputPlaceholder: PropTypes.string,
    inputLabel: PropTypes.string,
    handleChange: PropTypes.func
};

// to do: complete implementation of inputLength prop
const defaultProps = {
    inputDisabled: false,
    inputLength: 40,
    inputClass: '',
    inputPlaceholder: '',
    inputLabel: ''
};

// A standard text input for submission that we can further turn into a sharable component
export default class TextInput extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="usa-da-input-container">
                 <label className="sr-only" htmlFor="username">{this.props.inputPlaceholder}</label>
                <input
                  id={this.props.inputName}
                  name={this.props.inputName}
                  type="text"
                  placeholder={this.props.inputPlaceholder}
                  aria-describedby={this.props.inputName}
                  onChange={this.props.handleChange}
                />
            </div>
        );
    }
}

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;
