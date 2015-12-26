/**
* NavigationComponent.jsx
* Created by Katie Rose 12/8/15
**/

import React from 'react';

class NavbarTab extends React.Component {
	render() {
		var link = "#/" + this.props.class;
		var isActiveClass = this.props.activeTabClassName === this.props.class;

		return (
			<li className={isActiveClass ? "active" : ""}>
				<a className="usa-da-header-link" href={link}>{this.props.name}
					<span className={isActiveClass ? "sr-only" : ""}>{isActiveClass ? "(current)" : ""}</span>
				</a>
			</li>
		);
	}
}

export default class Navbar extends React.Component {
	render() {
		var tabNames = {
			"Home": 'landing',
			"Add New Data": 'addData',
			"Performance Dashboard": 'dashboard',
			"Documentation": 'documentation'
		};
		var headerTabs = [];
		var context = this;

		Object.keys(tabNames).map(function (key) {
			headerTabs.push(<NavbarTab key={tabNames[key]} name={key} class={tabNames[key]} activeTabClassName={context.props.activeTab} />);
		});

        return (
			<nav className="navbar navbar-default usa-da-header">
				<div className="container usa-da-header-container">
					<div className="navbar-header usa-da-header-navbar">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand usa-da-header-brand" href="#">Data Broker</a>
					</div>

					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul id="usa-da-header-link-holder" className="nav navbar-nav navbar-right">
							{headerTabs}
							<li><a className="usa-da-header-link usa-da-user-info" href="#">John Doe</a></li>
						</ul>
					</div>
				</div>
			</nav>
        );
    }
}

Navbar.propTypes = { activeTabClassName: React.PropTypes.string };
Navbar.defaultProps = { activeTabClassName: 'landing' };