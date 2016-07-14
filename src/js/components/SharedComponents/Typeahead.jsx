/**
  * Typeahead.jsx
  * Created by Kevin Li 4/20/2016
  */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import Awesomeplete from 'awesomplete';

const propTypes = {
	values: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	customClass: PropTypes.string,
	keyValue: PropTypes.string,
	internalValue: PropTypes.string
}

const defaultProps = {
	values: [],
	placeholder: '',
	customClass: '',
	formatter: null,
	keyValue: 'agency_name',
	internalValue: 'cgac_code',
	tabIndex: null,
	isRequired: false
}

export default class Typeahead extends React.Component {
	constructor(props) {
		super(props);

		this.typeahead = null;
		this.dataDictionary = {};

		this.state = {
			value: ''
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
			this.dataDictionary[value[this.props.keyValue]] = value[this.props.internalValue];
		});
	}

	mountAwesomeplete() {
		const target = this.refs.awesomplete;
		this.typeahead = new Awesomplete(target);
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
		});
	}

	bubbleUpChange() {
		// force the change up into the parent components
		// validate the current value is on the autocomplete list
		const validity = this.dataDictionary.hasOwnProperty(this.state.value);
		this.props.onSelect(this.dataDictionary[this.state.value], validity);
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

		return (
			<div className='usa-da-typeahead'>
				<input className={this.props.customClass} ref="awesomplete" type="text" placeholder={placeholder} value={this.state.value} onChange={this.changedText.bind(this)} tabIndex={this.props.tabIndex} disabled={disabled} aria-required={this.props.isRequired} />
			</div>
		);
	}
}

Typeahead.defaultProps = defaultProps;
Typeahead.propTypes = propTypes;