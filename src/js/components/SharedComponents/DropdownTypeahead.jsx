/**
  * DropdownTypeahead.jsx
  * Created by Kwadwo Opoku-Debrah 09/28/2018
  */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import Awesomplete from 'awesomplete';
import DropdownTypeaheadCheckbox from './DropdownTypeaheadCheckbox';

import TypeaheadWarning from './TypeaheadWarning';

const propTypes = {
  bubbledRemovedFilterValue: PropTypes.shape({
    filter: PropTypes.string,
    value: PropTypes.shape({
      userId: PropTypes.number,
      name: PropTypes.string
    })
  }),
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
  bubbledRemovedFilterValue: {
    filter: '',
    value: {
      userId: 0,
      name: ''
    }
  },
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

export default class DropdownTypeahead extends React.Component {
  constructor(props) {
    super(props);

    this.typeahead = null;
    this.dataDictionary = {};
    this.internalValueDictionary = {};

    this.state = {
      dropdownopen: false,
      value: '',
      showWarning: false,
      selectedValues: [],
      unselectedValues: []
    };

    this.onDropdownChange = this.onDropdownChange.bind(this);
    this.getSelectedName = this.getSelectedName.bind(this);
    this.passSelectedName = this.passSelectedName.bind(this);
    this.selectCheckbox = this.selectCheckbox.bind(this);
    this.unselectCheckbox = this.unselectCheckbox.bind(this);
    this.removeClickedFilterBarItemFromDropdown = this.removeClickedFilterBarItemFromDropdown.bind(this);
  }

  componentDidMount() {
    this.mountAwesomeplete();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.values, this.props.values) && this.typeahead) {
      this.loadValues();
    }

    if (!_.isEqual(prevProps.bubbledRemovedFilterValue, this.props.bubbledRemovedFilterValue) && this.props.bubbledRemovedFilterValue.value) {
      this.removeClickedFilterBarItemFromDropdown(this.props.bubbledRemovedFilterValue);
    }
  }

  onDropdownChange() {
    const currentState = this.state.dropdownopen;
    this.setState({
      dropdownopen: !currentState
    });
  }

  getSelectedName() {
    if (this.state.unselectedValues.includes(this.state.value) || this.state.selectedValues.includes(this.state.value)) {
      alert('This name is already used, please use the checkbox in the dropdown.');
    }
    else {
      this.setState({
        unselectedValues: this.state.unselectedValues.concat(this.state.value)
      });
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
    const target = this.refs.awesomplete;
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
    this.refs.awesomplete.addEventListener('awesomplete-selectcomplete', (e) => {
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
    this.refs.awesomplete.addEventListener('keydown', (e) => {
      if (e.keyCode === 9) {
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

  passSelectedName(clickedCheckboxValue, checkStatus) {
    if (!checkStatus) {
      this.selectCheckbox(clickedCheckboxValue);
    }
    else {
      this.unselectCheckbox(clickedCheckboxValue);
    }

    const validity = this.dataDictionary.hasOwnProperty(clickedCheckboxValue);
    this.props.onSelect(
      this.dataDictionary[clickedCheckboxValue],
      this.internalValueDictionary[clickedCheckboxValue],
      validity,
      clickedCheckboxValue,
    );
  }

  removeClickedFilterBarItemFromDropdown(filterValuefromFilterBarDropdown) {
    if (filterValuefromFilterBarDropdown.filter === 'createdBy') {
      this.unselectCheckbox(filterValuefromFilterBarDropdown.value.name);
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
        <div className="dropdown filterdropdown">
            <button onClick={this.onDropdownChange} className={this.state.dropdownopen ? 'btn btn-default dropdown-toggle active' : 'btn btn-default dropdown-toggle'} type="button" id="createdbydropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          Created By
                <span className="caret" />
            </button>
            <ul className="dropdown-menu" style={this.state.dropdownopen ? { display: 'block' } : { display: 'none' }} aria-labelledby="createdbydropdown">
                <li className={`usa-da-typeahead${disabledClass}`}>
                    <input
                        className={this.props.customClass}
                        ref="awesomplete"
                        type="text"
                        placeholder={placeholder}
                        value={this.state.value}
                        onChange={this.changedText.bind(this)}
                        tabIndex={this.props.tabIndex}
                        disabled={disabled}
                        aria-required={this.props.isRequired} />
                    {warning}
                </li>

                {this.state.selectedValues.length > 0 ? this.state.selectedValues.map((value) =>
              (
                  <DropdownTypeaheadCheckbox checkCheckbox key={value} passSelectedNameFunc={this.passSelectedName} fieldValue={value} />
             )) : ''
          }

                {
            this.state.selectedValues.length > 0 ? <li role="separator" className="divider" /> : ''
          }

                {this.state.unselectedValues.length > 0 ? this.state.unselectedValues.map((value) =>
              (
                  <DropdownTypeaheadCheckbox key={value} passSelectedNameFunc={this.passSelectedName} fieldValue={value} />
             )) : ''
          }

            </ul>
        </div>

    );
  }
}

DropdownTypeahead.defaultProps = defaultProps;
DropdownTypeahead.propTypes = propTypes;
