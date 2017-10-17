/**
  * CommonOverlay.jsx
  * Created by Kevin Li 8/24/16
  **/

import React from 'react';

const defaultProps = {
    showIcon: false,
    icon: null,
    iconClass: '',
    header: '',
    detail: null,
    showButtons: false
};

class OverlayIcon extends React.Component {
    render() {
        return (
            <div className="overlay-icon">
                <div className="usa-da-icon">
                    <div className={this.props.iconClass}>{this.props.icon}</div>
                </div>
            </div>
        );
    }
}

class OverlayDetail extends React.Component {
    render() {
        return (
            <div className="overlay-help-text">
                {this.props.detail}
            </div>
        );
    }
}

export default class CommonOverlay extends React.Component {
    render() {
        let icon = null;
        if (this.props.showIcon) {
            icon = <OverlayIcon {...this.props} />;
        }

        let detail = null;
        if (this.props.detail) {
            detail = <OverlayDetail {...this.props} />;
        }

        let buttons = null;
        if (this.props.showButtons) {
            buttons = <div className="col-xs-12 col-md-4">{this.props.children}</div>;
        }

        return (
            <div className="center-block usa-da-validation-overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-11 col-xs-offset-1 col-md-8 col-md-offset-0 usa-da-overlay-content-wrap">
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

CommonOverlay.defaultProps = defaultProps;
