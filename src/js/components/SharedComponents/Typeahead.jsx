/**
  * Typeahead.jsx
  * Created by Kevin Li 4/20/2016
  */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import Awesomeplete from 'awesomplete';

import TypeaheadWarning from './TypeaheadWarning.jsx';

const propTypes = {
	values: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	customClass: PropTypes.string,
	keyValue: PropTypes.string,
	internalValue: PropTypes.array,
	selectedInternalValue: PropTypes.string
}

const defaultProps = {
	values: [],
	placeholder: '',
	customClass: '',
	formatter: null,
	keyValue: 'agency_name',
	internalValue: ['frec_code', 'cgac_code'],
	selectedInternalValue: 'cgac_code',
	tabIndex: null,
	isRequired: false,
	errorHeader: null,
	errorDescription: null
}

export default class Typeahead extends React.Component {
	constructor(props) {
		super(props);

		this.typeahead = null;
		this.dataDictionary = {};

		this.state = {
			value: '',
			showWarning: false
		};
	}
	componentDidMount() {
		this.mountAwesomeplete();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(prevProps.values, this.props.values) && this.typeahead) {
			this.loadValues();
		}
	}

	loadValues() {
		this.typeahead.list = this.props.values;

		this.props.values.forEach((value) => {
			for (var i = 0; i < this.props.internalValue.length; i++) {
				if (value[this.props.internalValue[i]]) {
					this.dataDictionary[value[this.props.keyValue]] = value[this.props.internalValue[i]];
					this.selectedInternalValue = this.props.internalValue[i];
				}
			}
		});
	}

	mountAwesomeplete() {
		const target = this.refs.awesomplete;
		if(this.props.prioritySort) {
			this.typeahead = new Awesomplete(target, {sort: function(a, b) {
				if(a.value.priority > b.value.priority) {
					return 1;
				}
				if(a.value.priority < b.value.priority) {
					return -1;
				}
				return 0;
			}});
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
				this.bubbleUpChange();
			});
			this.typeahead.close();
		});

		this.refs.awesomplete.addEventListener('blur', (e) => {
			this.bubbleUpChange();
		});

		// enable tab keyboard shortcut for selection
		this.refs.awesomplete.addEventListener('keydown', (e) => {
			if (e.keyCode == 9) {
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
		if (this.state.value.length > 2 && this.typeahead.suggestions.length == 0) {
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
		const validity = this.dataDictionary.hasOwnProperty(this.state.value);
		this.props.onSelect(this.dataDictionary[this.state.value], this.selectedInternalValue, validity);
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
		if (this.props.values.length == 0) {
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

		let disabledClass = "";
		if(this.props.disabled) {
			disabledClass = " disabled";
		}

		return (
			<div className={"usa-da-typeahead"+disabledClass}>
				<input className={this.props.customClass} ref="awesomplete" type="text" placeholder={placeholder} value={this.state.value} onChange={this.changedText.bind(this)} tabIndex={this.props.tabIndex} disabled={disabled} aria-required={this.props.isRequired} disabled={this.props.disabled}/>
				{warning}
			</div>
		);
	}
}

Typeahead.defaultProps = defaultProps;
Typeahead.propTypes = propTypes;