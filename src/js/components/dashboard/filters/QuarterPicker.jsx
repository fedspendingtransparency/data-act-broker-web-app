/**
 * QuarterPicker.jsx
 * Created by Lizzie Salita 10/15/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import QuarterButton from './QuarterButton';

const propTypes = {
    selectedQuarters: PropTypes.array,
    pickedQuarter: PropTypes.func
};

export default class QuarterPicker extends React.Component {
    generateQuarters() {
        const quarters = [];
        for (let i = 1; i <= 4; i++) {
            quarters.push(
                <li key={i}>
                    <QuarterButton
                        quarter={i}
                        active={this.props.selectedQuarters.includes(i)}
                        pickedQuarter={this.props.pickedQuarter} />
                </li>
            );
        }
        return quarters;
    }

    render() {
        return (
            <div className="quarter-picker">
                <ul className="quarter-picker__list">
                    {this.generateQuarters()}
                </ul>
            </div>
        );
    }
}

QuarterPicker.propTypes = propTypes;
