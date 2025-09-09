/**
  * ValidateValuesFileDetailBox.jsx
  * Created by Kevin Li 6/27/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createOnKeyDownHandler } from '../../../helpers/util';

const propTypes = {
    onClick: PropTypes.func,
    count: PropTypes.number,
    label: PropTypes.string,
    styleClass: PropTypes.string,
    expandedReport: PropTypes.bool
};

const defaultProps = {
    onClick: () => {},
    count: 0,
    label: '',
    styleClass: '',
    expandedReport: false
};

export default class ValidateValuesFileDetailBox extends React.Component {
    render() {
        const onKeyDownHandler = createOnKeyDownHandler(this.props.onClick);
        // handle CSS class for determining if the error/warning count should be color text or black
        let labelClass = 'usa-da-validate-item-message-count';
        if (this.props.count === 0) {
            labelClass += ' none';
        }

        // handle CSS for displaying the error/warning report button only when there are errors/warnings
        let showButton = ' hide';
        if (this.props.count > 0) {
            showButton = '';
        }

        // handle CSS class for expanding/collapsing the error/warning report
        let footerStatus = '';
        if (this.props.expandedReport) {
            footerStatus = ' active';
        }

        // toggle report button icon for open/close state
        let buttonIcon = <FontAwesomeIcon icon="angle-down" />;
        if (this.props.expandedReport) {
            buttonIcon = <FontAwesomeIcon icon="angle-up" className="angle-up-icon" />;
        }

        return (
            <div className={`col-md-6 ${this.props.styleClass}`}>
                <div className="row usa-da-validate-item-body">
                    <div className="usa-da-validate-txt-wrap">
                        <span className="usa-da-validate-item-message-label">{this.props.label}:&nbsp;</span>
                        <span className={labelClass}>{this.props.count}</span>
                    </div>
                </div>
                <div className="row usa-da-validate-item-footer-wrapper">
                    <div
                        role="button"
                        tabIndex={0}
                        className={`usa-da-validate-item-footer usa-da-header-error${showButton}${footerStatus}`}
                        onKeyDown={onKeyDownHandler}
                        onClick={this.props.onClick}>
                        <div>View &amp; Download {this.props.label} Report
                            <span className="usa-da-icon">{buttonIcon}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ValidateValuesFileDetailBox.propTypes = propTypes;
ValidateValuesFileDetailBox.defaultProps = defaultProps;
