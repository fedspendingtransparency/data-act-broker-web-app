/**
* NavbarTab.jsx
* Created by Kyle Fox 2/19/16
**/

import React, { PropTypes } from 'react';

const propTypes = {
    tabClass: PropTypes.string.isRequired,
    activeTabClassName: PropTypes.string.isRequired
};

const defaultProps = {
    tabClass: 'landing',
    activeTabClassName: 'landing',
    comingSoon: false
};

export default class NavbarTab extends React.Component {
    render() {
        const link = '#/' + this.props.tabClass;
        const isActiveClass = this.props.activeTabClassName === this.props.tabClass;

        if (this.props.comingSoon) {
            return (
                <li>
                    <a className="usa-da-header-link disabled">{this.props.name}
                        <span className={isActiveClass ? 'sr-only' : ''}>{isActiveClass ? '(current)' : ''}
                            <div className='comingSoon'></div>
                        </span>
                    </a>
                </li>
            );
        } else if (this.props.tabClass === 'disabled') {
            return (
                <li>
                    <a className="usa-da-header-link disabled">{this.props.name}
                        <span className={isActiveClass ? 'sr-only' : ''}>{isActiveClass ? '(current)' : ''}
                            <div className='permissionsRequired'></div>
                        </span>
                    </a>
                </li>
            );
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
