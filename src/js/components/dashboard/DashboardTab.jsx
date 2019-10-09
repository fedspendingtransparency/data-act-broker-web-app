/**
  * DashboardTab.jsx
  * Created by Lizzie Salita 10/02/19
  */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    setActiveTab: PropTypes.func,
    disabled: PropTypes.bool,
    active: PropTypes.bool
};

export default class DashboardTab extends React.Component {
    constructor(props) {
        super(props);

        this.setActiveTab = this.setActiveTab.bind(this);
    }
    setActiveTab() {
        this.props.setActiveTab(this.props.type);
    }
    render() {
        const activeClass = this.props.active ? 'dashboard-tabs__button_active' : '';
        return (
            <button
                className={`dashboard-tabs__button ${activeClass}`}
                onClick={this.setActiveTab}
                disabled={this.props.disabled} >
                {this.props.label}
            </button>
        );
    }
}

DashboardTab.propTypes = propTypes;
