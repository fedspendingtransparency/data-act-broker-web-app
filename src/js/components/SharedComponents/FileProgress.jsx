/**
* FileProgress.jsx
* Created by Kyle Fox 2/16/16
*/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    fileStatus: PropTypes.number
};

const defaultProps = {
    fileStatus: 0
};

export default class FileProgress extends React.Component {
    render() {
        const style = {
            width: `${this.props.fileStatus}%`
        };

        return (
            <div>
                <div className="progress usa-da-progress-bar">
                    <div
                        className="progress-bar striped animated"
                        role="progressbar"
                        aria-valuenow={this.props.fileStatus}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={style}>
                        Uploading
                    </div>
                </div>
            </div>
        );
    }
}

FileProgress.propTypes = propTypes;
FileProgress.defaultProps = defaultProps;
