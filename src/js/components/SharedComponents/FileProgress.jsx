/**
* FileProgress.jsx
* Created by Kyle Fox 2/16/16
**/

import React, { PropTypes } from 'react';

const propTypes = {
    progress: PropTypes.number.isRequired
};

const defaultProps = {
    progress: 0
};

export default class FileProgress extends React.Component {

    render() {
        const style = {
            width: this.props.fileStatus + '%'
        };

        return (
            <div>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow={this.props.fileStatus} aria-valuemin="0" aria-valuemax="100" style={style}></div>
                </div>
                <div>
                    <span>{this.props.fileStatus}%</span>
                </div>
            </div>
        );
    }
}

FileProgress.propTypes = propTypes;
FileProgress.defaultProps = defaultProps;
