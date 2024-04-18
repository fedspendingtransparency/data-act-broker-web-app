/**
  * DropdownTypeahead.jsx
  * Created by Kwadwo Opoku-Debrah 09/28/2018
  */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Awesomplete from 'awesomplete';
import { keyCodes } from 'dataMapping/keyMappings';
import DropdownTypeaheadCheckbox from './DropdownTypeaheadCheckbox';

import TypeaheadWarning from './TypeaheadWarning';

const propTypes = {
    bubbledRemovedFilterValue: PropTypes.array,
    formatter: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    internalValue: PropTypes.array,
    values: PropTypes.array,
    customClass: PropTypes.string,
    errorHeader: PropTypes.string,
    errorDescription: PropTypes.string,
    duplicateHeader: PropTypes.string,
    keyValue: PropTypes.string,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.number,
    isRequired: PropTypes.bool,
    prioritySort: PropTypes.bool,
    clearAfterSelect: PropTypes.bool
};

const defaultProps = {
    bubbledRemovedFilterValue: PropTypes.array,
    values: [],
    placeholder: '',
    customClass: '',
    formatter: null,
    keyValue: 'agency_name',
    internalValue: ['frec_code', 'cgac_code'],
    tabIndex: null,
    isRequired: false,
    errorHeader: null,
    errorDescription: null,
    duplicateHeader: null,
    prioritySort: true,
    clearAfterSelect: false
};

export default class DropdownTypeahead extends React.Component {
    constructor(props) {
        super(props);

        this.typeahead = null;
        this.dataDictionary = {};
        this.internalValueDictionary = {};
        this.dropdownNode = null;

        this.setDropdownNodeRef = (element) => {
            this.dropdownNode = element;
        };

        this.state = {
            dropdownopen: false,
            value: '',
            showWarning: false,
            warningType: 'invalid',
            selectedValues: [],
            unselectedValues: []
        };

        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.getSelectedName = this.getSelectedName.bind(this);
        this.passSelectedName = this.passSelectedName.bind(this);
        this.selectCheckbox = this.selectCheckbox.bind(this);
        this.unselectCheckbox = this.unselectCheckbox.bind(this);
        this.removedFilterItemFromDropdown = this.removedFilterItemFromDropdown.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    componentDidMount() {
        this.mountAwesomeplete();
        document.addEventListener('mousedown', this.handleOutsideClick, false);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.values, this.props.values) && this.typeahead) {
            this.loadValues();
        }

        if (JSON.stringify(prevProps.bubbledRemovedFilterValue)
            !== JSON.stringify(this.props.bubbledRemovedFilterValue)) {
            this.removedFilterItemFromDropdown(
                this.props.bubbledRemovedFilterValue, prevProps.bubbledRemovedFilterValue
            );
        }
    }

    componentWillUnmount() {
        this.mountAwesomeplete();
        document.removeEventListener('mousedown', this.handleOutsideClick, false);
    }

    onDropdownChange() {
        const currentState = this.state.dropdownopen;
        this.setState({
            dropdownopen: !currentState
        });
    }

    getSelectedName() {
        if (this.state.unselectedValues.includes(this.state.value) ||
        this.state.selectedValues.includes(this.state.value)) {
            this.setState({
                showWarning: true,
                warningType: 'duplicate'
            });
        }
        else {
            this.setState({
                unselectedValues: this.state.unselectedValues.concat(this.state.value)
            });
        }
    }

    handleOutsideClick(e) {
        if (this.dropdownNode && this.dropdownNode.contains(e.target)) {
            return false;
        }
        this.setState({
            dropdownopen: false
        });
        return true;
    }

    loadValues() {
        this.typeahead.list = this.props.values;

        this.props.values.forEach((value) => {
            for (let i = 0; i < this.props.internalValue.length; i++) {
                if (value[this.props.internalValue[i]]) {
                    this.dataDictionary[value[this.props.keyValue]] = value[this.props.internalValue[i]];
                    this.internalValueDictionary[value[this.props.keyValue]] = this.props.internalValue[i];
                }
            }
        });
    }

    mountAwesomeplete() {
        const target = this.awesomplete;
        if (this.props.prioritySort) {
            this.typeahead = new Awesomplete(target, {
                sort: (a, b) => {
                    if (a.value.priority > b.value.priority) {
                        return 1;
                    }
                    if (a.value.priority < b.value.priority) {
                        return -1;
                    }
                    return 0;
                }
            });
        }
        else {
            this.typeahead = new Awesomplete(target);
        }
        this.typeahead.autoFirst = true;

        if (this.props.formatter) {
            this.typeahead.data = this.props.formatter;
        }

        this.loadValues();

        // set up event handlers
        this.awesomplete.addEventListener('awesomplete-selectcomplete', (e) => {
            this.setState({
                value: e.text.label
            }, () => {
                this.getSelectedName();
            });
            if (this.props.clearAfterSelect) {
                e.target.value = '';
                this.setState({
                    value: ''
                });
            }
            this.typeahead.close();
        });

        // enable tab keyboard shortcut for selection
        this.awesomplete.addEventListener('keydown', (e) => {
            if (e.keyCode === keyCodes.tab) {
                this.typeahead.select();
            }
        });
    }

    changedText(e) {
        this.setState({
            value: e.target.value
        }, this.detectEmptySuggestions);
    }

    detectEmptySuggestions() {
        if (this.state.value.length > 2 && this.typeahead.suggestions.length === 0) {
            if (!this.state.showWarning) {
                // we need to show a warning that no matching users were found
                this.setState({
                    showWarning: true,
                    warningType: 'invalid'
                });
            }
            return;
        }

        // otherwise hide the warning
        if (this.state.showWarning) {
            this.setState({
                showWarning: false
            });
        }
    }

    selectCheckbox(filterValue) {
        this.setState({
            selectedValues: this.state.selectedValues.concat(filterValue)
        });
        this.setState({
            unselectedValues: this.state.unselectedValues.filter((value) => value !== filterValue)
        });
    }

    unselectCheckbox(filterValue) {
        this.setState({
            unselectedValues: this.state.unselectedValues.concat(filterValue)
        });
        this.setState({
            selectedValues: this.state.selectedValues.filter((value) => value !== filterValue)
        });
    }

    passSelectedName(clickedCheckboxValue) {
        const validity = Object.prototype.hasOwnProperty.call(this.dataDictionary, clickedCheckboxValue);
        this.props.onSelect(
            this.dataDictionary[clickedCheckboxValue],
            this.internalValueDictionary[clickedCheckboxValue],
            validity,
            clickedCheckboxValue
        );
    }

    removedFilterItemFromDropdown(filterValuefromFilterBarDropdown, oldProps) {
        const parsedNewProps = filterValuefromFilterBarDropdown.map((item) => item.name);

        const parsedOldProps = oldProps.map((item) => item.name);

        if (!filterValuefromFilterBarDropdown.length) {
            const finalUnselected = parsedOldProps.concat(this.state.unselectedValues);
            this.setState({
                selectedValues: []
            });

            this.setState({
                unselectedValues: finalUnselected
            });
        }
        else {
            const added = _.difference(parsedNewProps, parsedOldProps)[0];
            const removed = _.difference(parsedOldProps, parsedNewProps)[0];
            if (removed) {
                this.unselectCheckbox(removed);
            }

            if (added) {
                this.selectCheckbox(added);
            }
        }
    }


    // create public functions to perform Awesomplete actions
    expand() {
        if (this.typeahead) {
            this.typeahead.open();
        }
    }

    collapse() {
        if (this.typeahead) {
            this.typeahead.close();
        }
    }

    nextItem() {
        if (this.typeahead) {
            this.typeahead.next();
        }
    }

    prevItem() {
        if (this.typeahead) {
            this.typeahead.previous();
        }
    }

    selectItem() {
        if (this.typeahead) {
            this.typeahead.select();
        }
    }

    jumpTo(i) {
        if (this.typeahead) {
            this.typeahead.goto(i);
        }
    }

    render() {
        let disabled = null;
        let placeholder = this.props.placeholder;
        if (this.props.values.length === 0) {
            disabled = 'disabled';
            placeholder = 'Loading list...';
        }

        let warning = null;
        if (this.state.showWarning) {
            const errorProps = {};
            errorProps.header = this.state.warningType === 'duplicate' ?
                this.props.duplicateHeader : this.props.errorHeader;

            if (this.props.errorDescription) {
                errorProps.description = this.props.errorDescription;
            }
            warning = <TypeaheadWarning {...errorProps} />;
        }

        let disabledClass = '';
        if (disabled) {
            disabledClass = ' disabled';
        }

        return (
            <div className="dropdown filterdropdown" ref={this.setDropdownNodeRef}>
                <button
                    onClick={this.onDropdownChange}
                    className={
                        this.state.dropdownopen ?
                            'btn btn-default dropdown-toggle active' : 'btn btn-default dropdown-toggle'
                    }
                    type="button"
                    id="createdbydropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true">
                Created By
                    <span className="caret" />
                </button>
                <div
                    className="dropdown-menu"
                    style={this.state.dropdownopen ? { display: 'block' } : { display: 'none' }}
                    aria-labelledby="createdbydropdown">
                    <ul>
                        <li className={`usa-da-typeahead${disabledClass}`}>
                            <input
                                title={this.state.value}
                                className={this.props.customClass}
                                ref={(c) => {
                                    this.awesomplete = c;
                                }}
                                type="text"
                                placeholder={placeholder}
                                value={this.state.value}
                                onChange={this.changedText.bind(this)}
                                tabIndex={this.props.tabIndex}
                                disabled={disabled}
                                aria-required={this.props.isRequired} />
                            {warning}
                        </li>
                    </ul>

                    <ul>
                        {
                            this.state.selectedValues.length > 0 ? this.state.selectedValues.map((value) =>
                                (
                                    <DropdownTypeaheadCheckbox
                                        checkCheckbox
                                        key={value}
                                        passSelectedNameFunc={this.passSelectedName}
                                        fieldValue={value} />
                                )) : ''
                        }
                    </ul>

                    {
                        this.state.selectedValues.length > 0 ? <span role="separator" className="divider" /> : ''
                    }

                    <ul>
                        {this.state.unselectedValues.length > 0 ? this.state.unselectedValues.map((value) =>
                            (
                                <DropdownTypeaheadCheckbox
                                    key={value}
                                    passSelectedNameFunc={this.passSelectedName}
                                    fieldValue={value} />
                            )) : ''
                        }
                    </ul>

                </div>
            </div>

        );
    }
}

DropdownTypeahead.defaultProps = defaultProps;
DropdownTypeahead.propTypes = propTypes;
