/**
  * CommonOverlay.jsx
  * Created by Kevin Li 8/24/16
  */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.object,
    icon: PropTypes.object,
    detail: PropTypes.node,
    header: PropTypes.string,
    iconClass: PropTypes.string,
    showButtons: PropTypes.bool,
    showIcon: PropTypes.bool
};

const defaultProps = {
    showIcon: true,
    icon: null,
    iconClass: '',
    header: '',
    detail: null,
    showButtons: true,
    children: null
};

export default class CommonOverlay extends React.Component {
    render() {
        let icon = null;
        if (this.props.showIcon) {
            icon = (
                <div className="overlay-icon">
                    <div className="usa-da-icon">
                        <div className={this.props.iconClass}>{this.props.icon}</div>
                    </div>
                </div>);
        }

        let detail = null;
        if (this.props.detail) {
            detail = (
                <div className="overlay-help-text">
                    {this.props.detail}
                </div>);
        }

        let buttons = null;
        let mainOverlayWidth = 'col-md-8';
        if (this.props.showButtons) {
            buttons = <div className="col-xs-12 col-md-5">{this.props.children}</div>;
            mainOverlayWidth = 'col-md-7';
        }

        return (
            <div className="center-block usa-da-validation-overlay">
                <div className="container">
                    <div className="row">
                        <div className={`col-xs-11 col-xs-offset-1 ${mainOverlayWidth} col-md-offset-0
                            usa-da-overlay-content-wrap`}>
                            <div className="overlay-content">
                                {icon}
                                <div className="overlay-text">
                                    <h6>{this.props.header}</h6>
                                    {detail}
                                </div>
                            </div>
                        </div>
                        {buttons}
                    </div>
                </div>
            </div>
        );
    }
}

CommonOverlay.propTypes = propTypes;
CommonOverlay.defaultProps = defaultProps;
