/**
  * ErrorTabs.jsx
  * Created by Kevin Li 8/29/16
  **/

import React from 'react';

class TabItem extends React.Component {
	clickedTab(e) {
		e.preventDefault();
		this.props.changeTab(this.props.value);
	}
	render() {
		let activeClass = '';
		if (this.props.isActive) {
			activeClass = ' active';
		}
		
		return (
			<a href="#" className={"tab-item" + activeClass} onClick={this.clickedTab.bind(this)}>
				{this.props.label}
			</a>
		)
	}
}

const defaultProps = {
	showTabs: "both"
};

export default class ErrorTabs extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: []
		};
	}

	componentDidMount() {
		this.buildTabs();
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.status != this.props.status || prevProps.activeTab != this.props.activeTab) {
			this.buildTabs();
		}
	}

	buildTabs() {
		const tabs = [];
		const errors = {
			label: "Cross-File Validation Errors",
			value: "errors",
			isActive: true
		};
		const warnings = {
			label: "Cross-File Validation Warnings",
			value: "warnings",
			isActive: false
		};

		if (this.props.activeTab == "warnings") {
			warnings.isActive = true;
			errors.isActive = false;
		}

		if (this.props.showTabs == "both") {
			tabs.push(errors);
			tabs.push(warnings);
		}
		else if (this.props.showTabs == "errors") {
			tabs.push(errors);
		}
		else if (this.props.showTabs == "warnings") {
			tabs.push(warnings);
		}

		this.setState({
			tabs: tabs
		});
	}

	render() {
		const tabs = this.state.tabs.map((tab, index) => {
			return <TabItem {...tab} key={index} />;
		});

		return (
			<div className="error-tabs">
				{tabs}
			</div>
		)
	}
}

ErrorTabs.defaultProps = defaultProps;