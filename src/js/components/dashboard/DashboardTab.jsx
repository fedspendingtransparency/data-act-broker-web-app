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
        return (
            <button
                className={`dashboard-tabs__button ${activeClass}`}
                onClick={this.setActiveTab}
                disabled={this.props.disabled} >
                <Link to={`/dashboard/${this.props.type}`}>
                    {this.props.label}
                </Link>
            </button>
        );
    }
}

DashboardTab.propTypes = propTypes;
