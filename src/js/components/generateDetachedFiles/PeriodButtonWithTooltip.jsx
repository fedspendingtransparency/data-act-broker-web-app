/**
* PeriodButtonWithTooltip.jsx
* Created by Lizzie Salita 3/4/19
*/

import React from 'react';
import PropTypes from 'prop-types';
import WarningTooltip from 'components/SharedComponents/WarningTooltip';
import * as utils from '../../helpers/util';

const propTypes = {
    hoveredPeriod: PropTypes.func,
    buttonText: PropTypes.string,
    type: PropTypes.oneOf(['fileA', 'historicDashboard']),
    firstYear: PropTypes.bool,
    paddingCSS: PropTypes.string
};

const defaultProps = {
    hoveredPeriod: null,
    buttonText: '',
    type: 'fileA',
    firstYear: false,
    paddingCSS: ''
};

// TODO - Lizzie: after upgrading to React 16, change this to a functional component
// with useState
export default class PeriodButtonWithTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    showTooltip() {
        this.setState({
            showTooltip: true
        });
        this.props.hoveredPeriod(0);
    }

    hideTooltip() {
        this.setState({
            showTooltip: false
        });
    }

    render() {
        const buttonText = this.props.type === 'fileA' ? utils.getPeriodTextFromValue(1) : this.props.buttonText;
        const button = (
            <button
                onMouseEnter={this.showTooltip}
                onFocus={this.showTooltip}
                onMouseLeave={this.hideTooltip}
                onBlur={this.hideTooltip}
                aria-disabled
                className={`period-picker__list-button period-picker__list-button_disabled${this.props.paddingCSS}`}>
                {buttonText}
            </button >
        );

        let tooltip = null;
        if (this.state.showTooltip) {
            if (this.props.type === 'fileA') {
                tooltip = (
                    <div className="period-picker__tooltip">
                        <p>
                            October is not directly selectable since there is no <em>Period 1</em> reporting window in
                            GTAS.
                        </p>
                        <p>
                            Because File A Data is cumulative within the Fiscal year, <em>Period 1</em> data is
                            automatically included with data from later periods.
                        </p>
                    </div>
                );
            }
            else if (this.props.firstYear) {
                tooltip = (
                    <WarningTooltip message={`There is no data available for this period. We began recording ` +
                        `data in Q2 as of FY 17.`} />
                );
            }
            else {
                tooltip = (
                    <WarningTooltip message={`The submission period has yet to open. Please search for a ` +
                        `submission period that has opened.`} />
                );
            }
        }

        return (
            <li className="period-picker__list-item">
                {button}
                {tooltip}
            </li>
        );
    }
}

PeriodButtonWithTooltip.propTypes = propTypes;
PeriodButtonWithTooltip.defaultProps = defaultProps;
