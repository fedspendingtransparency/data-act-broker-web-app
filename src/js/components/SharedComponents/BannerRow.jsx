/**
* BannerRow.jsx
* Created by Daniel Boos 12/06/19
*/

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    type: PropTypes.oneOf(['warning', 'info', 'success', 'error']),
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    useMarkdown: PropTypes.bool
};

const defaultProps = {
    type: 'info',
    header: null,
    message: null,
    useMarkdown: true
};

const iconMapping = {
    warning: 'exclamation-triangle',
    info: 'info-circle',
    error: 'exclamation-circle',
    success: 'check-circle'
};

export default class BannerRow extends React.Component {
    render() {
        const messageIcon = <FontAwesomeIcon icon={iconMapping[this.props.type]} />;

        return (
            <div className={`internal-banner ${this.props.type}-banner`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-1 banner-icon">
                            {messageIcon}
                        </div>
                        <div className="col-xs-11">
                            {this.props.useMarkdown ?
                                <div>
                                    <div className="banner-header">
                                        <ReactMarkdown children={this.props.header} />
                                    </div>
                                    <div className="banner-content">
                                        <ReactMarkdown children={this.props.message} />
                                    </div>
                                </div> :
                                <div>
                                    <div className="banner-header">
                                        {this.props.header}
                                    </div>
                                    <div className="banner-content">
                                        {this.props.message}
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BannerRow.propTypes = propTypes;
BannerRow.defaultProps = defaultProps;
