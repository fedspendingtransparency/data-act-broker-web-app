/**
  * DropdownTypeaheadCheckbox.jsx
  * Created by Kwadwo Opoku-Debrah 09/28/2018
  */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    passSelectedNameFunc: PropTypes.func,
    fieldValue: PropTypes.string,
    checkCheckbox: PropTypes.bool
};

const defaultProps = {
    passSelectedNameFunc: null,
    fieldValue: '',
    checkCheckbox: false
};

export default class DropdownTypeaheadCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.checkCheckbox
        };
        this.handleChecked = this.handleChecked.bind(this);
    }

    handleChecked() {
        this.setState({ isChecked: !this.state.isChecked });
        this.props.passSelectedNameFunc(this.props.fieldValue);
    }

    render() {
        return (
            <li>
                <input
                    title={this.props.fieldValue}
                    type="checkbox"
                    defaultChecked={this.props.checkCheckbox}
                    onChange={this.handleChecked} />
                {this.props.fieldValue}
            </li>
        );
    }
}

DropdownTypeaheadCheckbox.defaultProps = defaultProps;
DropdownTypeaheadCheckbox.propTypes = propTypes;
