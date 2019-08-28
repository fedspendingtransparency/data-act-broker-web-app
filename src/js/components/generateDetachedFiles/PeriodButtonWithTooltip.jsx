/**
* PeriodButtonWithTooltip.jsx
* Created by Lizzie Salita 3/4/19
*/

import React from 'react'; 
import PropTypes from 'prop-types';
import * as utils from '../../helpers/util';

const propTypes = {
    active: PropTypes.bool
};

const defaultProps = {
    active: false
};

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
    }

    hideTooltip() {
        this.setState({
            showTooltip: false
        });
    }

    render() {
        const button = (
            <button
                onMouseEnter={this.showTooltip}
                onFocus={this.showTooltip}
                onMouseLeave={this.hideTooltip}
                onBlur={this.hideTooltip}
                className="period-picker__list-button period-picker__list-button_disabled">
                {utils.getPeriodTextFromValue(1)}
            </button >
        );

        let tooltip = null;
        if (this.state.showTooltip) {
            tooltip = (
                <div className="period-picker__tooltip">
                    <p>
                        October is not directly selectable since there is no <em>Period 1</em> reporting window in GTAS.
                    </p>
                    <p>
                        Because File A Data is cumulative within the Fiscal year, <em>Period 1</em> data is automatically included with data from later periods.
                    </p>
                </div>
            );
        }

        return (
            <li
                className="period-picker__list-item">
                {button}
                {tooltip}
            </li>
        );
    };
}


PeriodButtonWithTooltip.propTypes = propTypes;
PeriodButtonWithTooltip.defaultProps = defaultProps;
