/**
 * FiscalYearFilter.jsx
 * Created by Lizzie Salita 10/16/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import WarningTooltip from 'components/SharedComponents/WarningTooltip';
import FiscalYear from './FiscalYear';

const propTypes = {
    selectedFY: PropTypes.array,
    pickedFy: PropTypes.func,
    allFy: PropTypes.array
};

export default class FiscalYearFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: ''
        };

        this.saveAllYears = this.saveAllYears.bind(this);
        this.toggleTooltip = this.toggleTooltip.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedFY !== prevProps.selectedFY) {
            this.toggleTooltip('');
        }
    }

    saveAllYears() {
        if (this.props.selectedFY.length !== this.props.allFy.length) {
            // Add years that are not yet selected
            this.props.allFy.forEach((fy) => {
                if (!this.props.selectedFY.includes(fy.year)) {
                    this.props.pickedFy(fy.year);
                }
            });
        }
        else {
            // Remove years that are still selected
            this.props.allFy.forEach((fy) => {
                if (this.props.selectedFY.includes(fy.year)) {
                    this.props.pickedFy(fy.year);
                }
            });
        }
    }

    toggleTooltip(showTooltip) {
        if (showTooltip !== this.state.showTooltip) {
            this.setState({
                showTooltip
            });
        }
    }

    render() {
        let allFY = true;
        const leftCount = Math.ceil(this.props.allFy.length / 2);
        let disableAllFy = false;

        const leftFY = [];
        const rightFY = [];

        this.props.allFy.forEach((fy, i) => {
            // determine if the checkbox should be selected based on whether the filter is already
            // staged
            const checked = this.props.selectedFY.includes(fy.year);

            if (!checked) {
                allFY = false;
            }

            if (fy.disabled) {
                disableAllFy = true;
            }

            const checkbox = (<FiscalYear
                checked={checked}
                year={`${fy.year}`}
                key={`filter-fy-${fy.year}`}
                disabled={fy.disabled}
                saveSelectedYear={this.props.pickedFy}
                toggleTooltip={this.toggleTooltip} />);

            if (i + 1 <= leftCount) {
                leftFY.push(checkbox);
            }
            else {
                rightFY.push(checkbox);
            }
        });

        let message = 'The submission period has yet to open. Please search for a submission period that has closed.';
        if (this.state.showTooltip === '2017') {
            message = 'There is no data available for this year. We began recording data in Q2 of FY 17.';
        }
        return (
            <div className="fiscal-years">
                <ul className="fiscal-years-list">
                    <FiscalYear
                        checked={allFY}
                        year="all"
                        key="filter-fy-all"
                        saveAllYears={this.saveAllYears}
                        toggleTooltip={this.toggleTooltip}
                        disabled={disableAllFy} />
                    <li key="individual-fiscal-years">
                        <span className="fiscal-years__wrapper">
                            <div className="fiscal-years__left">
                                <ul>
                                    {leftFY}
                                </ul>
                            </div>
                            <div className="fiscal-years__right">
                                <ul>
                                    {rightFY}
                                </ul>
                            </div>
                        </span>
                    </li>
                </ul>
                {this.state.showTooltip && <WarningTooltip message={message} />}
            </div>
        );
    }
}

FiscalYearFilter.propTypes = propTypes;
