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
                <div className="progress">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={this.props.fileStatus}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={style}>{Math.round(this.props.fileStatus)}%
                    </div>
                </div>
            </div>
        );
    }
}

FileProgress.propTypes = propTypes;
FileProgress.defaultProps = defaultProps;
