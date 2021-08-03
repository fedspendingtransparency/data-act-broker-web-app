/**
 * DashboardTableDownloadButton.jsx
 * Created by Alisa Burdeyny 05/21/21
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    row: PropTypes.object,
    downloadFile: PropTypes.func.isRequired
};

const defaultProps = {
    row: {}
};

export default class DashboardTableDownloadButton extends React.Component {
    constructor(props) {
        super(props);

        this.downloadFile = this.downloadFile.bind(this);
    }

    downloadFile() {
        this.props.downloadFile(this.props.label, this.props.row.submissionId);
    }

    render() {
        return (
            <button onClick={this.downloadFile} className="label-button">
                File {this.props.label}
            </button>
        );
    }
}

DashboardTableDownloadButton.defaultProps = defaultProps;
DashboardTableDownloadButton.propTypes = propTypes;
