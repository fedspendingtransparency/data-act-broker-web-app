/**
  * Typeahead.jsx
  * Created by Kevin Li 4/20/2016
  */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Awesomplete from 'awesomplete';
import { keyCodes } from 'dataMapping/keyMappings';

import TypeaheadWarning from './TypeaheadWarning';

const propTypes = {
    formatter: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    internalValue: PropTypes.array,
    values: PropTypes.array,
    customClass: PropTypes.string,
    errorHeader: PropTypes.string,
    errorDescription: PropTypes.string,
    keyValue: PropTypes.string,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.number,
    isRequired: PropTypes.bool,
    prioritySort: PropTypes.bool,
    clearAfterSelect: PropTypes.bool
};

const defaultProps = {
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
    prioritySort: true,
    clearAfterSelect: false
};

export default class Typeahead extends React.Component {
    constructor(props) {
        super(props);

        this.typeahead = null;
        this.dataDictionary = {};
        this.internalValueDictionary = {};

        this.state = {
            value: '',
            showWarning: false,
            expanded: false
        };

        this.changedText = this.changedText.bind(this);
    }

    componentDidMount() {
        this.mountAwesomeplete();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.values, this.props.values) && this.typeahead) {
            this.loadValues();
        }
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
                this.bubbleUpChange();
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
                // we need to show a warning that no matching agencies were found
                this.setState({
                    showWarning: true
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

    bubbleUpChange() {
    // force the change up into the parent components
    // validate the current value is on the autocomplete list
        const validity = Object.prototype.hasOwnProperty.call(this.dataDictionary, this.state.value);
        this.props.onSelect(
            this.dataDictionary[this.state.value],
            this.internalValueDictionary[this.state.value], validity, this.state.value
        );
    }


    // create public functions to perform Awesomplete actions
    expand() {
        if (this.typeahead) {
            this.typeahead.open();
            this.setState({
                expanded: true
            });
        }
    }

    collapse() {
        if (this.typeahead) {
            this.typeahead.close();
            this.setState({
                expanded: false
            });
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
            if (this.props.errorHeader) {
                errorProps.header = this.props.errorHeader;
            }
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
            <div className={`usa-da-typeahead${disabledClass}`}>
                <div>
                    <input
                        className={this.props.customClass}
                        ref={(c) => {
                            this.awesomplete = c;
                        }}
                        type="text"
                        placeholder={placeholder}
                        value={this.state.value}
                        onChange={this.changedText}
                        tabIndex={this.props.tabIndex}
                        disabled={disabled}
                        aria-required={this.props.isRequired}
                        role="combobox"
                        aria-expanded={this.state.expanded}
                        aria-label={placeholder} />
                </div>
                {warning}
            </div>
        );
    }
}

Typeahead.defaultProps = defaultProps;
Typeahead.propTypes = propTypes;
