/**
 * DashboardTab.jsx
 * Created by Lizzie Salita 10/02/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool
};

export default class DashboardTab extends React.Component {
    render() {
        const activeClass = this.props.active ? 'dashboard-tabs__button_active' : '';
        const link = this.props.disabled ? (
            <button
                className={`dashboard-tabs__button ${activeClass}`}
                disabled={this.props.disabled}>
                {this.props.label}
            </button>
        ) : (
            <Link
                className={`dashboard-tabs__button ${activeClass}`}
                to={`/dashboard/${this.props.type}`}>
                {this.props.label}
            </Link>
        );
        return link;
    }
}

DashboardTab.propTypes = propTypes;
