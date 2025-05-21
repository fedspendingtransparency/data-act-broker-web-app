/**
 * @jest-environment jsdom
 */

import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, jest, test } from "@jest/globals";
import { Set } from "immutable";

import { fetchLatestPublicationPeriod, fetchRules } from "../../../../src/js/helpers/dashboardHelper";
import { RulesFilterContainer } from "../../../../src/js/containers/dashboard/filters/RulesFilterContainer";
import { mockActions, mockReduxHistorical } from "./mockFilters";

jest.mock('../../../../src/js/helpers/dashboardHelper', () => ({
    ...jest.requireActual('../../../../src/js/helpers/dashboardHelper'),
    fetchLatestPublicationPeriod: jest.fn(),
    fetchRules: jest.fn()
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: jest.fn()
}));

test('PeriodFilterContainer should enable all periods when more than one FY is selected', async () => {
    fetchLatestPublicationPeriod.mockImplementation(() => Promise.resolve(
        { data: { period: 7, year: 2020 } }
    ));
    fetchRules.mockImplementation(() => Promise.resolve(
        { data: { labels: ['X1', 'Y2', 'Z3'] } }
    ));

    let result;
    // default case
    await act(async () => {
        result = render(<RulesFilterContainer
            {...mockActions}
            {...mockReduxHistorical} />);
    });
    await act(async () => {
        result.rerender(<RulesFilterContainer
            {...mockActions}
            selectedFilters={{
                ...mockReduxHistorical.selectedFilters,
                file: 'new-file',
                rules: new Set([...mockReduxHistorical.selectedFilters.rules, 'X1'])
            }} />);
    });

    const input = screen.getByPlaceholderText('Enter Code (e.g. C23)');

    await act(async () => {
        fireEvent.change(input, { target: { value: 'Y2' } });
    });
    expect(screen.getByRole('listbox').getElementsByTagName('li').length).toBe(1);
    expect(screen.getByRole('listbox').textContent).toBe('Y2');

    await act(async () => {
        fireEvent.change(input, { target: { value: 'Z3' } });
    });
    expect(screen.getByRole('listbox').getElementsByTagName('li').length).toBe(1);
    expect(screen.getByRole('listbox').textContent).toBe('Z3');

    await act(async () => {
        fireEvent.change(input, { target: { value: 'X1' } });
    });
    expect(screen.getByRole('listbox').getElementsByTagName('li').length).toBe(0);
});
