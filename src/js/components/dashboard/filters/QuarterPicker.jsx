/**
 * QuarterPicker.jsx
 * Created by Lizzie Salita 10/15/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import WarningTooltip from 'components/SharedComponents/WarningTooltip';
import QuarterButton from './QuarterButton';

const propTypes = {
    selectedQuarters: PropTypes.array,
    pickedQuarter: PropTypes.func,
    disabledQuarters: PropTypes.array
};

export default class QuarterPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: 0
        };

        this.toggleTooltip = this.toggleTooltip.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedQuarters !== prevProps.selectedQuarters) {
            this.toggleTooltip(0);
        }
    }

    toggleTooltip(showTooltip) {
        if (showTooltip !== this.state.showTooltip) {
            this.setState({
                showTooltip
            });
        }
    }

    generateQuarters() {
        const quarters = [];
        for (let i = 1; i <= 4; i++) {
            quarters.push(
                <li
                    className="quarter-picker__list-item"
                    key={i}>
                    <QuarterButton
                        quarter={i}
                        disabled={this.props.disabledQuarters[i - 1]}
                        active={this.props.selectedQuarters.includes(i)}
                        pickedQuarter={this.props.pickedQuarter}
                        toggleTooltip={this.toggleTooltip} />
                </li>
            );
        }
        return quarters;
    }

    render() {
        let message = 'The submission period has yet to open. Please search for a submission period that has closed.';
        if (this.state.showTooltip === 1) {
            message = 'There is no data available for this quarter. We began recording data in Q2 of FY 17.';
        }
        return (
            <div className="quarter-picker">
                <ul className="quarter-picker__list">
                    {this.generateQuarters()}
                </ul>
                {this.state.showTooltip !== 0 && <WarningTooltip message={message} />}
            </div>
        );
    }
}

QuarterPicker.propTypes = propTypes;
