/**
* ProgressBar.jsx
* Created by Alisa Burdeyny 11/22/21
*/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    progress: PropTypes.number,
    animate: PropTypes.bool,
    action: PropTypes.string,
    fileName: PropTypes.string
};

const defaultProps = {
    progress: 0,
    animate: true,
    action: 'Validating',
    fileName: null
};

export default class ProgressBar extends React.Component {
    render() {
        let extraClasses = '';
        const roundedProgress = this.props.progress.toFixed(2);
        if (this.props.animate) {
            extraClasses = ' animated striped';
        }

        let fileName = null;
        if (this.props.fileName) {
            fileName = <div className="file-name">{this.props.fileName}</div>;
        }

        const progressBarStyle = {
            width: `${roundedProgress}%`
        };
        return (
            <div className="usa-da-progress-bar">
                {fileName}
                <div className="total-progress">
                    <div
                        className={`progress-bar${extraClasses}`}
                        style={progressBarStyle}
                        aria-valuenow={roundedProgress}
                        aria-valuemin="0" 
                        aria-valuemax="100">
                    </div>
                </div>
                <div className="action-progress">
                    {this.props.action}... {roundedProgress}
                </div>
            </div>
        );
    }
}

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;
