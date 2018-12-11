/**
 * PeriodPicker.jsx
 * Created by Kwadwo Opoku-Debrah 12/06/18
 */

import React, { PropTypes } from 'react';

import FYPicker from './FYPicker';


import MultiSelectionBox from './MultiSelectionBox';

const propTypes = {
    passedPeriod: PropTypes.number,
    fy: PropTypes.string.isRequired,
    pickedPeriod: PropTypes.func.isRequired,
    pickedYear: PropTypes.func.isRequired
};

export default class PeriodPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDropdownOption: null,
            dropdownOptions: [
                {
                    fieldIndex: 0,
                    value: 1,
                    text: '01 - October',
                    disabled: true,
                    tooltip: `October is not directly selectable since there is no Period 1 reporting
                     window in GTAS. Because File A Data is cumulative within the Fiscal year,
                     Period 1 data is automatically included with data from later periods.`
                },
                { fieldIndex: 1, value: 2, text: '02 - November' },
                { fieldIndex: 2, value: 3, text: '03 - December | Quarter 1' },
                { fieldIndex: 3, value: 4, text: '04 - January' },
                {
                    fieldIndex: 4, value: 5, text: '05 - Feburary'
                },
                { fieldIndex: 5, value: 6, text: '06 - March | Quarters 1 - 2' },
                { fieldIndex: 6, value: 7, text: '07 - April' },
                { fieldIndex: 7, value: 8, text: '08 - May' },
                { fieldIndex: 8, value: 9, text: '09 - June | Quarters 1 - 3' },
                { fieldIndex: 9, value: 10, text: '10 - July' },
                { fieldIndex: 10, value: 11, text: '11 - August' },
                { fieldIndex: 11, value: 12, text: '12 - September | Quarters 1 - 4' }
            ]
        };

        this.updateDropdownModel = this.updateDropdownModel.bind(this);
        this.setDropdownDefault = this.setDropdownDefault.bind(this);
    }

    componentDidMount() {
        this.setDropdownDefault();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fy !== this.props.fy) {
            this.updateDropdownModel(this.props.passedPeriod);
        }
    }

    setDropdownDefault() {
        if (this.props.passedPeriod) {
            const prevDropdownOptions = this.state.dropdownOptions;
            prevDropdownOptions[this.props.passedPeriod].selected = true;
            this.setState({
                selectedDropdownOption: this.props.passedPeriod
            });
        }
    }

    updateDropdownModel(pickedOption) {
        const prevDropdownOptions = this.state.dropdownOptions;
        const selectedField = this.state.selectedDropdownOption;

        if (!selectedField) {
            prevDropdownOptions[pickedOption].selected = true;
            this.setState({
                dropdownOptions: prevDropdownOptions,
                selectedDropdownOption: pickedOption
            });
        }

        else if (selectedField === pickedOption) {
            return;
        }
        prevDropdownOptions[selectedField].selected = false;
        prevDropdownOptions[pickedOption].selected = true;
        this.setState({
            dropdownOptions: prevDropdownOptions,
            selectedDropdownOption: pickedOption
        });
    }

    render() {
        return (
            <div className="quarter-picker">
                <div className="quarter-picker__fy">
                    <FYPicker
                        fy={this.props.fy}
                        pickedYear={this.props.pickedYear} />
                </div>

                <div className="quarter-picker__fy">
                    <MultiSelectionBox
                        selectedDropdownOption={this.state.selectedDropdownOption}
                        defaultDropdownOption={this.props.passedPeriod}
                        updateDropdownModel={this.updateDropdownModel}
                        sendSelectedOption={this.props.pickedPeriod}
                        fieldOptions={this.state.dropdownOptions} />
                </div>
            </div>
        );
    }
}

PeriodPicker.propTypes = propTypes;
