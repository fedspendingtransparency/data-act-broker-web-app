/**
  * GenerateEFItem.jsx
  * Created by Kevin Li 8/24/16
  **/

import React, { PropTypes } from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

const propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    comingSoon: PropTypes.bool
};

const defaultProps = {
    comingSoon: false
};

export default class GenerateEFItem extends React.Component {

    clickedDownload(e) {
        e.preventDefault();
        const download = window.open(this.props[this.props.type.toLowerCase()].url, '_target');
        download.opener = null;
    }

    render() {
        let hideError = ' hide';
        let hideDownload = ' hide';
        let hideSpinner = '';
        let icon = null;
        const status = this.props[this.props.type.toLowerCase()].status;
        if (status === 'failed') {
            hideError = '';
            hideSpinner = ' hide';
            icon = <Icons.ExclamationCircle />;
        }
        else if (status === 'invalid') {
            hideError = '';
            hideSpinner = ' hide';
            icon = <Icons.ExclamationCircle />;
        }
        else if (status === 'finished') {
            hideDownload = '';
            hideSpinner = ' hide';
            icon = <Icons.CheckCircle />;
        }

        let comingSoon = '';
        if (this.props.comingSoon) {
            comingSoon = ' coming-soon';
        }

        return (
            <div className="generate-ef-wrap">
                <div className={"generate-ef-item" + comingSoon}>
                    <div className="generate-left">
                        <div className="generate-header">
                            <div className="generate-type">
                                File {this.props.type}
                            </div>
                            <div className="generate-title">
                                {this.props.title}
                            </div>
                        </div>
                        <div className="generate-description">
                            <p>{this.props.description}</p>
                        </div>
                    </div>
                    <div className="generate-right">
                        <div className="right-content">
                            <div className="icon-wrapper">
                                <div className="usa-da-icon">
                                    {icon}
                                </div>
                            </div>
                            <div className="file-name">
                                File_{this.props.type}.csv
                            </div>
                            <div className={"spinner" + hideSpinner}>
                                <div className="cssload-squares">
                                    <span /><span /><span /><span /><span />
                                </div>
                            </div>
                            <button className={"usa-da-button btn-primary btn-full" + hideDownload}
                                onClick={this.clickedDownload.bind(this)}>
                                Download
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"alert alert-danger" + hideError}>
                    <span className="usa-da-icon error-icon"><Icons.ExclamationCircle /></span>
                    <div className="alert-header-text">File {this.props.type} Error</div>
                    <p>{this.props[this.props.type.toLowerCase()].message}</p>
                </div>
            </div>
        );
    }
}

GenerateEFItem.propTypes = propTypes;
GenerateEFItem.defaultProps = defaultProps;
