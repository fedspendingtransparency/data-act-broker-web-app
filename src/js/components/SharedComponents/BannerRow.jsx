/**
* BannerRow.jsx
* Created by Daniel Boos 12/06/19
*/

import React from 'react';
import PropTypes from 'prop-types';
import { parseMarkdown } from 'helpers/helpHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    type: PropTypes.string,
    header: PropTypes.string,
    message: PropTypes.string
};

const defaultProps = {
    type: 'info',
    header: null,
    message: null
};

const iconMapping = {
    warning: 'exclamation-triangle',
    info: 'info-circle'
};

export default class BannerRow extends React.Component {
    render() {
        const messageIcon = <FontAwesomeIcon icon={iconMapping[this.props.type]} />;
        const parsedHeader = this.props.header ? parseMarkdown(this.props.header) : '';
        const parsedMessage = this.props.message ? parseMarkdown(this.props.message) : '';
        return (
            <div className={`internal-banner ${this.props.type}-banner`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-1 banner-icon">
                            {messageIcon}
                        </div>
                        <div className="col-xs-11">
                            <div className="banner-header" dangerouslySetInnerHTML={{ __html: parsedHeader.html }} />
                            <div className="banner-content" dangerouslySetInnerHTML={{ __html: parsedMessage.html }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BannerRow.propTypes = propTypes;
BannerRow.defaultProps = defaultProps;
