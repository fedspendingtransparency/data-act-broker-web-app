/**
 * DashboardTableLabelButton.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    row: PropTypes.object,
    openModal: PropTypes.func.isRequired
};

const defaultProps = {
    row: {}
};

export default class DashboardTableLabelButton extends React.Component {
    constructor(props) {
        super(props);

        this.openModal = this.openModal.bind(this);
    }

    openModal() {
        this.props.openModal(this.props.row);
    }

    render() {
        return (
            <button onClick={this.openModal} className="label-button">
                {this.props.label}
            </button>
        );
    }
}

DashboardTableLabelButton.defaultProps = defaultProps;
DashboardTableLabelButton.propTypes = propTypes;
