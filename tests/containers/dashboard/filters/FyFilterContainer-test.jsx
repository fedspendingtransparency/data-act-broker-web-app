/**
 * @jest-environment jsdom
 */

import React, { act } from 'react';
import { Set } from 'immutable';
import { render, screen } from '@testing-library/react';
import { jest, test, expect, afterEach } from "@jest/globals";
import '@testing-library/jest-dom';

import { FyFilterContainer } from 'containers/dashboard/filters/FyFilterContainer';
import { mockActions, mockReduxHistorical } from './mockFilters';
import { fetchLatestPublicationPeriod } from "../../../../src/js/helpers/dashboardHelper";


jest.mock('../../../../src/js/helpers/dashboardHelper', () => ({
    ...jest.requireActual('../../../../src/js/helpers/dashboardHelper'),
    fetchLatestPublicationPeriod: jest.fn()
}));

afterEach(() => {
    jest.clearAllMocks();
});


test('FyFilterContainer should disable 2017 when P01, P02, or Q1 is the only period selected', async () => {
    fetchLatestPublicationPeriod.mockImplementation(() => Promise.resolve(
        { period: 12, year: 2019 }
    ));

    let result;
    // default case
    await act(async () => {
        result = render(<FyFilterContainer {...mockActions} {...mockReduxHistorical} />);
    });
    expect(screen.getByText('FY 17').parentElement.firstChild).not.toBeDisabled();

    // period 2
    await act(async () => {
        result.rerender(<FyFilterContainer
            {...mockActions}
            selectedFilters={{ ...mockReduxHistorical.selectedFilters, period: 2 }} />);
    });
    expect(screen.getByText('FY 17').parentElement.firstChild).toBeDisabled();

    // period 3
    await act(async () => {
        result.rerender(<FyFilterContainer
            {...mockActions}
            selectedFilters={{ ...mockReduxHistorical.selectedFilters, period: 3 }} />);
    });
    expect(screen.getByText('FY 17').parentElement.firstChild).toBeDisabled();

    // quarter 1
    await act(async () => {
        result.rerender(<FyFilterContainer
            {...mockActions}
            selectedFilters={{ ...mockReduxHistorical.selectedFilters, period: 'Q1' }} />);
    });
    expect(screen.getByText('FY 17').parentElement.firstChild).toBeDisabled();
});

test('FyFilterContainer should disable the current FY when the selected period is in the future', async () => {
    fetchLatestPublicationPeriod.mockImplementation(() => Promise.resolve(
        { period: 3, year: 2020 }
    ));
    await act(async () => {
        render(<FyFilterContainer
            {...mockActions}
            selectedFilters={{ ...mockReduxHistorical.selectedFilters, period: 4 }} />);
    });
    expect(screen.getByText('FY 20').parentElement.firstChild).toBeDisabled();
});

test('FyFilterContainer should remove FY 2017 if P02, P03, or Q1 is the only period selected', async () => {
    fetchLatestPublicationPeriod.mockImplementation(() => Promise.resolve(
        { period: 3, year: 2020 }
    ));
    let result;
    await act(async () => {
        result = render(<FyFilterContainer
            {...mockActions}
            selectedFilters={{
                ...mockReduxHistorical.selectedFilters,
                period: 'Q2',
                fy: new Set([...mockReduxHistorical.selectedFilters.fy, 2017])
            }} />);
    });
    expect(mockActions.updateFilterSet).not.toHaveBeenCalled();
    await act(async () => {
        result.rerender(<FyFilterContainer
            {...mockActions}
            selectedFilters={{
                ...mockReduxHistorical.selectedFilters,
                period: 'Q1',
                fy: new Set([...mockReduxHistorical.selectedFilters.fy, 2017])
            }} />);
    });
    expect(mockActions.updateFilterSet).toHaveBeenCalledWith('historical', 'fy', 2017);
});

test('should remove the current FY if only a future period is selected', async () => {
    fetchLatestPublicationPeriod.mockImplementation(() => Promise.resolve(
        { period: 3, year: 2020 }
    ));
    let result;
    await act(async () => {
        result = render(<FyFilterContainer
            {...mockActions}
            selectedFilters={{
                ...mockReduxHistorical.selectedFilters,
                period: 3,
                fy: new Set([...mockReduxHistorical.selectedFilters.fy, 2020])
            }} />);
    });
    expect(mockActions.updateFilterSet).not.toHaveBeenCalled();
    await act(async () => {
        result.rerender(<FyFilterContainer
            {...mockActions}
            selectedFilters={{
                ...mockReduxHistorical.selectedFilters,
                period: 4,
                fy: new Set([...mockReduxHistorical.selectedFilters.fy, 2020])
            }} />);
    });
    expect(mockActions.updateFilterSet).toHaveBeenCalledWith('historical', 'fy', 2020);
});
