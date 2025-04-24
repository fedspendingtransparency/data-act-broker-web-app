/**
 * @jest-environment jsdom
 */

import React, { act } from "react";
import { Set } from "immutable";
import { render, screen } from "@testing-library/react";
import { jest, test, expect } from "@jest/globals";

import { fetchLatestPublicationPeriod } from "../../../../src/js/helpers/dashboardHelper";
import { mockActions, mockReduxHistorical } from "./mockFilters";
import { PeriodFilterContainer } from "../../../../src/js/containers/dashboard/filters/PeriodFilterContainer";

jest.mock('../../../../src/js/helpers/dashboardHelper', () => ({
    ...jest.requireActual('../../../../src/js/helpers/dashboardHelper'),
    fetchLatestPublicationPeriod: jest.fn()
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: jest.fn()
}));

test('PeriodFilterContainer should disable P02, P03, and Q1 when 2017 is the only FY selected', async () => {
    fetchLatestPublicationPeriod.mockImplementation(() => Promise.resolve(
        { period: 4, year: 2019 }
    ));
    let result;
    // default case
    await act(async () => {
        result = render(<PeriodFilterContainer
            {...mockActions}
            {...mockReduxHistorical} />);
    });
    await act(async () => {
        result.rerender(<PeriodFilterContainer
            {...mockActions}
            selectedFilters={{
                ...mockReduxHistorical.selectedFilters,
                fy: new Set([...mockReduxHistorical.selectedFilters.fy, 2017])
            }} />);
    });
    expect(screen.getByText('Q1')).toHaveClass('period-picker__list-button_disabled');
    expect(screen.getByText('P01/P02')).toHaveClass('period-picker__list-button_disabled');
    expect(screen.getByText('P03')).toHaveClass('period-picker__list-button_disabled');
    ['Q2', 'Q3', 'Q4', 'P04', 'P05', 'P06', 'P07', 'P08', 'P09', 'P10', 'P11', 'P12'].forEach((period) => {
        expect(screen.getByText(period)).not.toHaveClass('period-picker__list-button_disabled');
    });
});

test('PeriodFilterContainer should disabled future periods when the current FY is the only FY selected, current period enabled', async () => {
    fetchLatestPublicationPeriod.mockImplementation(() => Promise.resolve(
        { period: 7, year: 2020 }
    ));

    let result;
    // default case
    await act(async () => {
        result = render(<PeriodFilterContainer
            {...mockActions}
            {...mockReduxHistorical} />);
    });
    await act(async () => {
        result.rerender(<PeriodFilterContainer
            {...mockActions}
            selectedFilters={{
                ...mockReduxHistorical.selectedFilters,
                fy: new Set([...mockReduxHistorical.selectedFilters.fy, 2020])
            }} />);
    });
    const pastPeriods = ['Q1', 'P01/P02', 'P03', 'Q2', 'P04', 'P05', 'P06', 'Q3', 'P07'];
    const futurePeriods = ['P08', 'P09', 'Q4', 'P10', 'P11', 'P12'];
    futurePeriods.forEach((period) => {
        expect(screen.getByText(period)).toHaveClass('period-picker__list-button_disabled');
    });
    pastPeriods.forEach((period) => {
        expect(screen.getByText(period)).not.toHaveClass('period-picker__list-button_disabled');
    });
});

test('PeriodFilterContainer should enable all periods when more than one FY is selected', async () => {
    fetchLatestPublicationPeriod.mockImplementation(() => Promise.resolve(
        { period: 7, year: 2020 }
    ));

    let result;
    // default case
    await act(async () => {
        result = render(<PeriodFilterContainer
            {...mockActions}
            {...mockReduxHistorical} />);
    });
    await act(async () => {
        result.rerender(<PeriodFilterContainer
            {...mockActions}
            selectedFilters={{
                ...mockReduxHistorical.selectedFilters,
                fy: new Set([...mockReduxHistorical.selectedFilters.fy, 2018, 2020])
            }} />);
    });
    const periods = [
        'Q1', 'P01/P02', 'P03', 'Q2', 'P04', 'P05', 'P06', 'Q3', 'P07', 'P08', 'P09', 'Q4', 'P10', 'P11', 'P12'
    ];
    periods.forEach((period) => {
        expect(screen.getByText(period)).not.toHaveClass('period-picker__list-button_disabled');
    });
});

