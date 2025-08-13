import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    logout: PropTypes.func,
    openSettings: PropTypes.func,
    isSubmitter: PropTypes.bool,
    buttonText: PropTypes.string
};

const defaultProps = {
    logout: () => {},
    openSettings: () => {},
    isSubmitter: false,
    buttonText: ''
};

export default class UserButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDropdown: false
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.openSettings = this.openSettings.bind(this);
    }

    toggleDropdown() {
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

    openSettings() {
        this.toggleDropdown();
        this.props.openSettings();
    }

    render() {
        let hideDropdown = " hide";
        if (this.state.showDropdown) {
            hideDropdown = "";
        }

        let settingsButton = null;
        if (this.props.isSubmitter) {
            settingsButton = (
                <li>
                    <button onClick={this.openSettings}>
                        <FontAwesomeIcon icon="gear" />
                        Settings
                    </button>
                </li>
            );
        }

        return (
            <li className="usa-da-top-head-menu-item">
                <button
                    onClick={this.toggleDropdown}
                    className="usa-da-header-link">
                    <FontAwesomeIcon icon="user" />
                    {this.props.buttonText}
                </button>
                <ul className={`header-dropdown${hideDropdown}`}>
                    {settingsButton}
                    <li>
                        <button onClick={this.props.logout}>
                            <FontAwesomeIcon icon="right-from-bracket" />
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
