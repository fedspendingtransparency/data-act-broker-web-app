/**
 * FiscalYearFilter.jsx
 * Created by Lizzie Salita 10/16/19
 */

import React from 'react';
import PropTypes from 'prop-types';

import FiscalYear from './FiscalYear';

const propTypes = {
    selectedFY: PropTypes.array,
    pickedFy: PropTypes.func,
    allFy: PropTypes.array
};

export default class FiscalYearFilter extends React.Component {
    constructor(props) {
        super(props);

        this.saveAllYears = this.saveAllYears.bind(this);
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

    render() {
        let allFY = true;
        const leftCount = Math.ceil(this.props.allFy.length / 2);

        const leftFY = [];
        const rightFY = [];

        this.props.allFy.forEach((fy, i) => {
            // determine if the checkbox should be selected based on whether the filter is already
            // staged
            const checked = this.props.selectedFY.includes(fy.year);

            if (!checked) {
                allFY = false;
            }

            const checkbox = (<FiscalYear
                checked={checked}
                year={`${fy.year}`}
                key={`filter-fy-${fy.year}`}
                disabled={fy.disabled}
                saveSelectedYear={this.props.pickedFy} />);

            if (i + 1 <= leftCount) {
                leftFY.push(checkbox);
            }
            else {
                rightFY.push(checkbox);
            }
        });

        return (
            <div>
                <ul className="fiscal-years">
                    <FiscalYear
                        checked={allFY}
                        year="all"
                        key="filter-fy-all"
                        saveAllYears={this.saveAllYears} />
                    <span className="fiscal-years__wrapper">
                        <div className="fiscal-years__left">
                            {leftFY}
                        </div>
                        <div className="fiscal-years__right">
                            {rightFY}
                        </div>
                    </span>
                </ul>
            </div>
        );
    }
}

FiscalYearFilter.propTypes = propTypes;
