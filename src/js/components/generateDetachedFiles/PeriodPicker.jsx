/**
 * PeriodPicker.jsx
 * Created by Kwadwo Opoku-Debrah 12/06/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as utils from '../../helpers/util';
import PeriodButton from './PeriodButton';


const propTypes = {
    period: PropTypes.number,
    periodArray: PropTypes.array,
    pickedPeriod: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['fileA', 'historicDashboard']),
    disabledPeriods: PropTypes.array
};

const defaultProps = {
    type: 'fileA',
    disabledPeriods: []
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
        let currentSelection = 'Select a reporting period';
        if (this.props.type === 'fileA') {
            // in file A we always select period 1 first
            const minPeriod = utils.getPeriodTextFromValue(1);
            const maxPeriod = utils.getPeriodTextFromValue(this.props.period);
            currentSelection = `${minPeriod} - ${maxPeriod}`;
        }
        const periods = this.props.periodArray.map((period, index) => {
            // if it's the file A generation, highlight the hovered period and everything before it. We start on
            // period 2 so we have to add 2 to the index, not 1
            let active = index + 2 <= this.state.hoveredPeriod;
            let disabledReason = '';

            // if it's the historic dashboard, highlight the hovered item or the periods that make up the quarter
            if (this.props.type === 'historicDashboard') {
                active = this.state.hoveredPeriod === period;

                // if the hovered period is a quarter, also highlight all periods within it
                if (typeof this.state.hoveredPeriod === 'string' && typeof period === 'number') {
                    const quarter = parseInt(this.state.hoveredPeriod.substring(1), 10);
                    active = period <= quarter * 3 && period > (quarter - 1) * 3;
                }

                disabledReason = this.props.disabledPeriods[index];
            }
            return (
                <PeriodButton
                    key={period}
                    period={period}
                    active={active}
                    hoveredPeriod={this.hoveredPeriod}
                    endHover={this.highlightCurrentSelection}
                    pickedPeriod={this.clickedPeriod}
                    type={this.props.type}
                    disabledReason={disabledReason} />
            );
        });

        let visibleClass = 'period-picker__list_hidden';
        let angleIcon = <FontAwesomeIcon icon="chevron-down" alt="Toggle menu" />;
        if (this.state.expanded) {
            visibleClass = '';
            angleIcon = <FontAwesomeIcon icon="chevron-up" alt="Toggle menu" />;
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
                                {angleIcon}
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
PeriodPicker.defaultProps = defaultProps;
