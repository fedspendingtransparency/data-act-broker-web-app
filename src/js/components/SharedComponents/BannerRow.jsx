/**
* BannerRow.jsx
* Created by Daniel Boos 12/06/19
*/

import React from 'react';
import PropTypes from 'prop-types';
import { parseMarkdown } from 'helpers/helpHelper';
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
        let bannerHeader = '';
        let bannerMessage = '';
        if (this.props.header) {
            bannerHeader = this.props.useMarkdown ? parseMarkdown(this.props.header).html : this.props.header;
        }
        if (this.props.message) {
            bannerMessage = this.props.useMarkdown ? parseMarkdown(this.props.message).html : this.props.message;
        }

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
                                    <div className="banner-header" dangerouslySetInnerHTML={{ __html: bannerHeader }} />
                                    <div
                                        className="banner-content"
                                        dangerouslySetInnerHTML={{ __html: bannerMessage }} />
                                </div> :
                                <div>
                                    <div className="banner-header">
                                        {bannerHeader}
                                    </div>
                                    <div className="banner-content">
                                        {bannerMessage}
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
