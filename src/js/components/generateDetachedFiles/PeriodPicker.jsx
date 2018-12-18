/**
 * PeriodPicker.jsx
 * Created by Kwadwo Opoku-Debrah 12/06/18
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import FYPicker from './FYPicker';


import MultiSelectionBox from './MultiSelectionBox';
import * as utils from '../../helpers/util';

const propTypes = {
    passedPeriod: PropTypes.number,
    periodArray: PropTypes.array,
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
                    value: 1,
                    text: '01 - October',
                    disabled: true,
                    tooltip: `October is not directly selectable since there is no Period 1 reporting
                     window in GTAS. Because File A Data is cumulative within the Fiscal year,
                     Period 1 data is automatically included with data from later periods.`
                },
                { value: 2, text: '02 - November' },
                { value: 3, text: '03 - December | Quarter 1' },
                { value: 4, text: '04 - January' },
                { value: 5, text: '05 - Feburary' },
                { value: 6, text: '06 - March | Quarters 1 - 2' },
                { value: 7, text: '07 - April' },
                { value: 8, text: '08 - May' },
                { value: 9, text: '09 - June | Quarters 1 - 3' },
                { value: 10, text: '10 - July' },
                { value: 11, text: '11 - August' },
                { value: 12, text: '12 - September | Quarters 1 - 4' }
            ],
            unavailablePeriod: 0
        };

        this.updateDropdownModel = this.updateDropdownModel.bind(this);
        this.setDropdownDefaults = this.setDropdownDefaults.bind(this);
    }

    componentDidMount() {
        this.setDropdownDefaults();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.fy !== this.props.fy) {
            this.updateDropdownForFyChange(this.props.passedPeriod);
        }
    }

    setDropdownDefaults() {
        if (this.props.passedPeriod) {
            const prevDropdownOptions = this.state.dropdownOptions;
            prevDropdownOptions[this.props.passedPeriod - 1].selected = true;
            this.setState({
                selectedDropdownOption: this.props.passedPeriod - 1
            });
        }
    }

    updateDropdownForFyChange(pickedOption) {
        const dropdownOptions = this.state.dropdownOptions;

        // Reset Dropdown Options to default
        for (let i = 1; i < dropdownOptions.length; i++) {
            dropdownOptions[i].selected = null;
            dropdownOptions[i].tooltip = null;
            dropdownOptions[i].disabled = null;
        }

        // Get the range of all unavailable periods
        let parsedRange = _.range(this.props.periodArray[0]);

        this.setState({
            unavailablePeriod: this.props.periodArray[0] === 1 ? 0 : this.props.periodArray[0]
        });

        if (this.props.periodArray.length < 1) {
            parsedRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }

        if (!_.isEmpty(parsedRange)) {
            for (let i = 1; i < parsedRange.length; i++) {
                const loopValue = parsedRange[i];
                dropdownOptions[loopValue].disabled = true;
                dropdownOptions[loopValue].tooltip = 'DATA Act reporting began in FY17Q2';
            }
            this.setState({
                dropdownOptions,
                selectedDropdownOption: pickedOption - 1
            });
        }
    }

    updateDropdownModel(rawPickedOption) {
        const pickedOption = rawPickedOption - 1;
        const prevDropdownOptions = this.state.dropdownOptions;
        const selectedField = this.state.selectedDropdownOption;

        // Pass the selected period and the unavailable range
        this.props.pickedPeriod(rawPickedOption, this.state.unavailablePeriod + 1);

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
        prevDropdownOptions[selectedField].selected = null;
        prevDropdownOptions[pickedOption].selected = true;
        this.setState({
            dropdownOptions: prevDropdownOptions,
            selectedDropdownOption: pickedOption
        });
    }

    render() {
        const minPeriod = utils.getPeriodTextFromValue(this.state.unavailablePeriod + 1);
        const maxPeriod = utils.getPeriodTextFromValue(this.props.passedPeriod);
        return (
            <div className="period-picker">
                <div className="period-picker__fy">
                    <FYPicker
                        fy={this.props.fy}
                        pickedYear={this.props.pickedYear} />
                </div>

                <div className="period-picker__fy">
                    <MultiSelectionBox
                        defaultDropdownText={`${minPeriod} - ${maxPeriod}`}
                        selectedDropdownOption={this.state.selectedDropdownOption}
                        updateDropdownModel={this.updateDropdownModel}
                        fieldOptions={this.state.dropdownOptions} />
                </div>
            </div>
        );
    }
}

PeriodPicker.propTypes = propTypes;
