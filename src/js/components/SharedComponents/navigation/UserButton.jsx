import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { kGlobalConstants } from 'GlobalConstants';

const propTypes = {
    logout: PropTypes.func,
    openSettings: PropTypes.func,
    user: PropTypes.object,
    buttonText: PropTypes.string
};

const defaultProps = {
    logout: () => {},
    openSettings: () => {},
    user: { website_admin: false, affiliations: [] },
    buttonText: ''
};

export default class UserButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDropdown: false
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
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

    render() {
        let hideDropdown = " hide";
        if (this.state.showDropdown) {
            hideDropdown = "";
        }

        let settingsButton = null;
        let displaySettings = false;
        if (this.props.user.website_admin) {
            displaySettings = true;
        }
        else {
            for (let i = 0; i < this.props.user.affiliations.length; i++) {
                if (this.props.user.affiliations[i].permission === 'submitter') {
                    displaySettings = true;
                    break;
                }
            }
        }
        if (!kGlobalConstants.PROD && displaySettings) {
            settingsButton = (
                <li>
                    <button onClick={this.props.openSettings}>
                        <FontAwesomeIcon icon="cog" />
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
