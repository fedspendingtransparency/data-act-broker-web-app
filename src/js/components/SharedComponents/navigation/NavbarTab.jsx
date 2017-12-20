/**
* NavbarTab.jsx
* Created by Kyle Fox 2/19/16
*/

import React, { PropTypes } from 'react';

const propTypes = {
    activeTabClassName: PropTypes.string,
    tabClass: PropTypes.string,
    name: PropTypes.string,
    comingSoon: PropTypes.bool
};

const defaultProps = {
    tabClass: 'landing',
    activeTabClassName: 'landing',
    comingSoon: false,
    name: ''
};

export default class NavbarTab extends React.Component {
    render() {
        const link = '#/' + this.props.tabClass;
        const isActiveClass = this.props.activeTabClassName.toLowerCase() === this.props.tabClass.toLowerCase();

        if (this.props.comingSoon) {
            return (
                <li>
                    <a className="usa-da-header-link disabled">{this.props.name}
                        <span className={isActiveClass ? 'sr-only' : ''}>{isActiveClass ? '(current)' : ''}
                            <div className="comingSoon" />
                        </span>
                    </a>
                </li>
            );
        }
        else if (this.props.tabClass === 'disabled') {
            return (
                <li>
                    <a className="usa-da-header-link disabled">{this.props.name}
                        <span className={isActiveClass ? 'sr-only' : ''}>{isActiveClass ? '(current)' : ''}
                            <div className="permissionsRequired" />
                        </span>
                    </a>
                </li>
            );
        }
        return (
            <li className={isActiveClass ? 'active' : ''}>
                <a className="usa-da-header-link" href={link}>{this.props.name}
                    <span className={isActiveClass ? 'sr-only' : ''}>{isActiveClass ? '(current)' : ''}</span>
                </a>
            </li>
        );
    }
}

NavbarTab.propTypes = propTypes;
NavbarTab.defaultProps = defaultProps;
