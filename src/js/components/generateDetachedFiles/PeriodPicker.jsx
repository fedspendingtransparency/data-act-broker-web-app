/**
 * PeriodPicker.jsx
 * Created by Kwadwo Opoku-Debrah 12/06/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as utils from '../../helpers/util';
import { AngleDown } from '../SharedComponents/icons/Icons';
import PeriodButton from './PeriodButton';


const propTypes = {
    period: PropTypes.number,
    periodArray: PropTypes.array,
    pickedPeriod: PropTypes.func.isRequired
};

export default class PeriodPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            hoveredPeriod: this.props.period
        };

        this.toggleList = this.toggleList.bind(this);
        this.clickedPeriod = this.clickedPeriod.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.hoveredPeriod = this.hoveredPeriod.bind(this);
        this.highlightCurrentSelection = this.highlightCurrentSelection.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.period !== prevProps.period) {
            this.hoveredPeriod(this.props.period);
        }
    }

    componentWillUnmount() {
        // remove the event listener
        document.removeEventListener('click', this.closeMenu);
    }

    closeMenu(e) {
        if (this.pickerRef && this.pickerRef.contains(e.target)) {
            // user clicked inside the dropdown, don't auto-close because it is the user interacting
            // with the dropdown
            return;
        }
        this.setState({
            expanded: false
        }, () => {
            // remove the event listener
            document.removeEventListener('click', this.closeMenu);
        });
    }

    toggleList(e) {
        e.preventDefault();
        this.setState({
            expanded: !this.state.expanded
        }, () => {
            if (this.state.expanded) {
                // subscribe to click events on the page to auto-close the menu
                document.addEventListener('click', this.closeMenu);
            }
            else {
                // remove the event listener
                document.removeEventListener('click', this.closeMenu);
            }
        });
    }

    clickedPeriod(period) {
        this.props.pickedPeriod(period);
        // Close the dropdown after a period has been selected
        this.setState({
            expanded: false
        });
    }

    hoveredPeriod(hoveredPeriod) {
        // Highlight periods before and including the one that is currently hovered over
        // to indicate that a selection is cumulative
        this.setState({
            hoveredPeriod
        });
    }

    highlightCurrentSelection() {
        // Use the currently selected period to determine which options to highlight
        this.hoveredPeriod(this.props.period);
    }

    render() {
        const minPeriod = utils.getPeriodTextFromValue(this.props.periodArray[0]);
        const maxPeriod = utils.getPeriodTextFromValue(this.props.period);
        const currentSelection = `${minPeriod} - ${maxPeriod}`;
        const periods = this.props.periodArray.map((period, index) => (
            <PeriodButton
                key={period}
                period={index + 1}
                active={index + 1 <= this.state.hoveredPeriod}
                hoveredPeriod={this.hoveredPeriod}
                endHover={this.highlightCurrentSelection}
                pickedPeriod={this.clickedPeriod} />
        ));

        let visibleClass = 'period-picker__list_hidden';
        if (this.state.expanded) {
            visibleClass = '';
        }

        return (
            <div
                className="period-picker"
                ref={(div) => {
                    this.pickerRef = div;
                }}>
                <div className="period-picker__header">
                    <div className="period-picker__dropdown-container">
                        <button
                            className="period-picker__button"
                            onClick={this.toggleList}>
                            <div className="period-picker__button-text">
                                {currentSelection}
                            </div>
                            <div className="period-picker__button-icon">
                                <AngleDown alt="Toggle menu" />
                            </div>
                        </button>
                        <ul className={`period-picker__list ${visibleClass}`}>
                            {periods}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

PeriodPicker.propTypes = propTypes;
