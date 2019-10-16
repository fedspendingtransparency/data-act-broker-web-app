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
            this.props.allFy.forEach((year) => {
                if (!this.props.selectedFY.includes(year)) {
                    this.props.pickedFy(year);
                }
            });
        }
        else {
            // Remove years that are still selected
            this.props.allFy.forEach((year) => {
                if (this.props.selectedFY.includes(year)) {
                    this.props.pickedFy(year);
                }
            });
        }
    }

    render() {
        let allFY = true;
        const leftCount = Math.ceil(this.props.allFy.length / 2);

        const leftFY = [];
        const rightFY = [];

        this.props.allFy.forEach((year, i) => {
            // determine if the checkbox should be selected based on whether the filter is already
            // staged
            const checked = this.props.selectedFY.includes(year);

            if (!checked) {
                allFY = false;
            }

            const fy = (<FiscalYear
                checked={checked}
                year={`${year}`}
                key={`filter-fy-${year}`}
                saveSelectedYear={this.props.pickedFy} />);

            if (i + 1 <= leftCount) {
                leftFY.push(fy);
            }
            else {
                rightFY.push(fy);
            }
        });

        return (
            <ul className="fiscal-years">
                <FiscalYear
                    checked={allFY}
                    year="all"
                    key="filter-fy-all"
                    saveAllYears={this.saveAllYears} />
                <div className="left-fy">
                    {leftFY}
                </div>
                <div className="right-fy">
                    {rightFY}
                </div>
            </ul>
        );
    }
}

FiscalYearFilter.propTypes = propTypes;
