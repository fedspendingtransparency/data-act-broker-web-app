import React, { PropTypes } from 'react';
import * as Icons from '../icons/Icons';

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

        return (
            <li className="usa-da-top-head-menu-item">
                <button
                    onClick={this.toggleDropdown.bind(this)}
                    className="usa-da-header-link usa-da-user-info dropdown-toggle usa-da-icon"><Icons.User />
                    {this.props.buttonText}
                </button>
                <ul className={`header-dropdown${hideDropdown}`}>
                    <li>
                        <button className="logout" href="#" onClick={this.props.logout}>Log Out</button>
                    </li>
                </ul>
            </li>

        );
    }
}

UserButton.propTypes = propTypes;
UserButton.defaultProps = defaultProps;
