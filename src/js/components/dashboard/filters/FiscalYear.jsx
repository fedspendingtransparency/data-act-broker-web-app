/**
 * FiscalYear.jsx
 * Created by Lizzie Salita 10/16/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    year: PropTypes.string,
    saveSelectedYear: PropTypes.func,
    checked: PropTypes.bool,
    saveAllYears: PropTypes.func,
    disabled: PropTypes.bool
};

const defaultProps = {
    checked: false
};

export default class FiscalYear extends React.Component {
    constructor(props) {
        super(props);

        this.allYears = this.allYears.bind(this);
        this.saveYear = this.saveYear.bind(this);
    }

    saveYear() {
        this.props.saveSelectedYear(parseInt(this.props.year, 10));
    }

    allYears() {
        this.props.saveAllYears();
    }

    render() {
        let yearOption = null;

        if (this.props.year === "all") {
            yearOption = (
                <li className="fy-option fy-option_all">
                    <label
                        className="fy-option__wrapper"
                        htmlFor={`fy${this.props.year}`}>
                        <input
                            type="checkbox"
                            className="fy-option__checkbox"
                            id={`fy${this.props.year}`}
                            value="All Fiscal Years"
                            checked={this.props.checked}
                            onChange={this.allYears} />
                        <span className="fy-option__label">
                            All Fiscal Years
                        </span>
                    </label>
                </li>
            );
        }
        else {
            yearOption = (
                <li className="fy-option">
                    <label
                        className="fy-option__wrapper"
                        htmlFor={`fy${this.props.year}`}>
                        <input
                            type="checkbox"
                            className="fy-option__checkbox"
                            id={`fy${this.props.year}`}
                            value={`FY ${this.props.year}`}
                            checked={!this.props.disabled && this.props.checked}
                            onChange={this.saveYear}
                            disabled={this.props.disabled} />
                        <span className="fy-option__label">
                            {`FY ${this.props.year - 2000}`}
                        </span>
                    </label>
                </li>
            );
        }
        return (
            <div>{ yearOption }</div>
        );
    }
}
FiscalYear.propTypes = propTypes;
FiscalYear.defaultProps = defaultProps;
