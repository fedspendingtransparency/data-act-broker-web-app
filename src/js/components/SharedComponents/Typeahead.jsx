/**
  * Typeahead.jsx
  * Created by Kevin Li 4/20/2016
  */

import React, { PropTypes } from 'react';
import Awesomeplete from 'awesomplete';

const propTypes = {
	values: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	customClass: PropTypes.string
}

const defaultProps = {
	values: [],
	placeholder: '',
	customClass: ''
}

export default class Typeahead extends React.Component {
	constructor(props) {
		super(props);

		this.typeahead = null;

		this.state = {
			value: ''
		};
	}
	componentDidMount() {
		this.mountAwesomeplete();
	}

	componentWillReceiveProps(nextProps) {
		if (this.typeahead) {
			this.typeahead.list = this.props.values;
		}
	}

	mountAwesomeplete() {
		const target = this.refs.awesomplete;
		this.typeahead = new Awesomplete(target);
		this.typeahead.autoFirst = true;
		this.typeahead.list = this.props.values;

		// set up event handlers
		this.refs.awesomplete.addEventListener('awesomplete-selectcomplete', (e) => {
			this.setState({
				value: e.text.label
			});
			this.typeahead.close();
		});

		this.refs.awesomplete.addEventListener('blur', (e) => {
			// validate the current value is on the autocomplete list
			const validity = this.props.values.indexOf(this.state.value) > -1;
			this.props.onSelect(this.state.value, validity);
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
		return (
			<div className='usa-da-typeahead'>
				<input className={this.props.customClass} ref="awesomplete" type="text" placeholder={this.props.placeholder} value={this.state.value} onChange={this.changedText.bind(this)} />
			</div>
		);
	}
}

Typeahead.defaultProps = defaultProps;
Typeahead.propTypes = propTypes;