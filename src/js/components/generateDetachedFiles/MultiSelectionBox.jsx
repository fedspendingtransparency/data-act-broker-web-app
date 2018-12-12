/**
 * Dropdown.jsx
 * Created by Kwadwo Opoku-Debrah 12/06/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AngleDown } from '../SharedComponents/icons/Icons';

const propTypes = {
    selectedDropdownOption: PropTypes.number,
    fieldOptions: PropTypes.array.isRequired,
    sendSelectedOption: PropTypes.func.isRequired,
    updateDropdownModel: PropTypes.func.isRequired
};

const defaultProps = {
    selectedDropdownOption: null
};

export default class MultiSelectionBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.toggleList = this.toggleList.bind(this);
        this.clickedYear = this.clickedYear.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    componentWillUnmount() {
        // remove the event listener
        document.removeEventListener('click', this.closeMenu);
    }

    closeMenu(e) {
        if (this.pickerRef && this.pickerRef.contains(e.target)) {
            // user clicked inside the dropdown, don't auto-close because it is the user interacting
            // with the dropdown
            return;
        }
        this.setState({
            expanded: false
        }, () => {
            // remove the event listener
            document.removeEventListener('click', this.closeMenu);
        });
    }

    toggleList(e) {
        e.preventDefault();
        this.setState({
            expanded: !this.state.expanded
        }, () => {
            if (this.state.expanded) {
                // subscribe to click events on the page to auto-close the menu
                document.addEventListener('click', this.closeMenu);
            }
            else {
                // remove the event listener
                document.removeEventListener('click', this.closeMenu);
            }
        });
    }

    clickedYear(pickedOption) {
        this.props.sendSelectedOption(parseInt(pickedOption, 10));
        this.props.updateDropdownModel(pickedOption);
        this.setState({
            expanded: false
        });
    }

    render() {
        const finalFields = [];
        if (_.isEmpty(this.props.fieldOptions)) {
            const item = (
                <li> Empty - No options</li>
            );
            finalFields.push(item);
        }
        else {
            this.props.fieldOptions.forEach((value) => {
                const splitText = value.text.split('|');

                const item = (
                    <li
                        key={value.value}
                        fieldIndex={value.value}
                        className={`multiSelect__list-item ${value.disabled ? 'disabled' : ''} ${value.selected ? 'selected' : ''}`}>
                        <button
                            disabled={value.disabled}
                            className="period-picker-dropdown__list-button"
                            value={value.value}
                            data-tooltip={value.tooltip}
                            onClick={() => this.clickedYear(value.value)}>
                            {splitText[0]}{splitText[1]}
                        </button>
                    </li>
                );
                finalFields.push(item);
            });
        }


        let visibleClass = 'period-picker-dropdown__list_hidden';
        if (this.state.expanded) {
            visibleClass = '';
        }

        return (
            <div
                className="period-picker-dropdown"
                ref={(div) => {
                    this.pickerRef = div;
                }}>
                <div className="period-picker-dropdown__header">
                    <div className="period-picker-dropdown__dropdown-container">
                        <button
                            className="period-picker-dropdown__button period-picker-dropdown"
                            onClick={this.toggleList}>
                            <div className="period-picker-dropdown__button-text">
                                {this.props.selectedDropdownOption ?
                                    `01 October - ${this.props.fieldOptions[this.props.selectedDropdownOption].text.split('|')[0]}` :
                                    'Select a period range'}
                            </div>
                            <div className="period-picker-dropdown__button-icon">
                                <AngleDown alt="Toggle menu" />
                            </div>
                        </button>
                        <ul className={`multiSelect__list ${visibleClass} ${this.props.selectedDropdownOption ? 'override' : ''}`}>
                            {finalFields}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

MultiSelectionBox.propTypes = propTypes;
MultiSelectionBox.defaultProps = defaultProps;
