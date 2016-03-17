/**
* NavbarTab.jsx
* Created by Kyle Fox 2/19/16
**/

import React, { PropTypes } from 'react';

const propTypes = {
    class: PropTypes.string.isRequired,
    activeTabClassName: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired
};

const defaultProps = {
    class: 'landing',
    activeTabClassName: 'landing',
    admin: false
};

export default class NavbarTab extends React.Component {
    render() {
        const link = '#/' + this.props.class;
        const isActiveClass = this.props.activeTabClassName === this.props.class;

        if (this.props.class == 'dashboard') {
            return (
                <li>
                    <a className="usa-da-header-link disabled">{this.props.name}
                        <span className={isActiveClass ? 'sr-only' : ''}>{isActiveClass ? '(current)' : ''}
                            <div className='comingSoon'></div>
                        </span>
                    </a>
                </li>
            );
        } else if (this.props.class == 'admin') {
            // TODO: Replace with correct admin check in redux here
            if (this.props.admin == true) {
                return (
                    <li className={isActiveClass ? 'active' : ''}>
                        <a className="usa-da-header-link admin" href={link}>{this.props.name}
                            <span className={isActiveClass ? 'sr-only' : ''}>{isActiveClass ? '(current)' : ''}</span>
                        </a>
                    </li>
                );
            } else {
                return null;
            }
        } else {
            return (
                <li className={isActiveClass ? 'active' : ''}>
                    <a className="usa-da-header-link" href={link}>{this.props.name}
                        <span className={isActiveClass ? 'sr-only' : ''}>{isActiveClass ? '(current)' : ''}</span>
                    </a>
                </li>
            );
        }
    }
}

NavbarTab.propTypes = propTypes;
NavbarTab.defaultProps = defaultProps;
