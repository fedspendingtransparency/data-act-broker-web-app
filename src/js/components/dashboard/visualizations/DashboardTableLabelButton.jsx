/**
 * DashboardTableLabelButton.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    row: PropTypes.object,
    togglePopup: PropTypes.func.isRequired
};

const defaultProps = {
    row: {}
};

export default class DashboardTableLabelButton extends React.Component {
    constructor(props) {
        super(props);

        this.togglePopup = this.togglePopup.bind(this);
    }

    togglePopup() {
        this.props.togglePopup(this.props.row);
    }

    render() {
        return (
            <button onClick={this.togglePopup} className="file-label-button">
                {this.props.row.fileLabel}
            </button>
        );
    }
}

DashboardTableLabelButton.defaultProps = defaultProps;
DashboardTableLabelButton.propTypes = propTypes;
