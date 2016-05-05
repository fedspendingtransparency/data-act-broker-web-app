import React from 'react';
import * as Icons from '../icons/Icons.jsx';

export default class AdminButton extends React.Component {
	constructor(props) {
        super(props);
    }
	render() {


		return (

			<li className="usa-da-top-head-menu-item">
	            <a className="logout usa-da-header-link usa-da-user-info" href="#/admin">Admin</a>
	        </li>

		);
	}
}