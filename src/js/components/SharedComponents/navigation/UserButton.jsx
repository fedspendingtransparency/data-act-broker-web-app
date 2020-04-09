import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { kGlobalConstants } from 'GlobalConstants';

const propTypes = {
    logout: PropTypes.func,
    buttonText: PropTypes.string
};

const defaultProps = {
    logout: () => {},
    buttonText: ''
};

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

        let settingsButton = null;
        if (!kGlobalConstants.PROD) {
            settingsButton = <li>
                    <button className="logout" href="#" onClick={this.props.logout}>
                        <FontAwesomeIcon icon="cog" />
                        Settings
                    </button>
                </li>;
        }

        return (
            <li className="usa-da-top-head-menu-item">
                <button
                    onClick={this.toggleDropdown.bind(this)}
                    className="usa-da-header-link dropdown-toggle">
                    <FontAwesomeIcon icon="user" />
                    {this.props.buttonText}
                </button>
                <ul className={`header-dropdown${hideDropdown}`}>
                    {settingsButton}
                    <li>
                        <button className="logout" href="#" onClick={this.props.logout}>
                            <FontAwesomeIcon icon="sign-out-alt" />
                            Logout
                        </button>
                    </li>
                </ul>
            </li>

        );
    }
}

UserButton.propTypes = propTypes;
UserButton.defaultProps = defaultProps;
