/**
* TextInputComponent.jsx
* Created by Katie Rose 12/17/15
**/

import React, { PropTypes } from 'react';

const propTypes = {
    inputDisabled: PropTypes.bool,
    inputName: PropTypes.string.required,
    inputLength: PropTypes.Number, // This not yet functional via React
    inputClass: '',
    inputPlaceholder: PropTypes.string
};

// to do: complete implementation of inputLength prop
const defaultProps = {
    inputDisabled: false,
    inputLength: 40,
    inputClass: '',
    inputPlaceholder: ''
};

// A standard text input for submission that we can further turn into a sharable component
export default class TextInput extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input className={this.props.inputClass} id={this.props.inputName} name={this.props.inputName} placeholder={this.props.inputPlaceholder} size={this.props.inputLength} type="text"/>
        );
    }
}

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;
