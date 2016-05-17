import React from 'react';
import * as Icons from '../icons/Icons.jsx';

export default class UserButton extends React.Component {
	constructor(props) {
        super(props);

        this.state = {
            showDropdown: false
        };
    }
    toggleDropdown(e) {
        e.preventDefault();

        if (!this.state.showDropdown) {
            this.setState({
                showDropdown: true
            });
        }
        else {
            this.setState({
                showDropdown: false
            });
        }
    }
	render() {

		let hideDropdown = " hide";
        if (this.state.showDropdown) {
            hideDropdown = "";
        }

		return (

			<li className="usa-da-top-head-menu-item">
	            <a href="#" onClick={this.toggleDropdown.bind(this)} className="usa-da-header-link usa-da-user-info dropdown-toggle usa-da-icon"><Icons.User />{this.props.buttonText}</a>
	            <ul className={"header-dropdown" + hideDropdown}>
	                <li>
	                    <a className="logout" href="#" onClick={this.props.logout}>Log Out</a>
	                </li>
	            </ul>
	        </li>

		);
	}
}