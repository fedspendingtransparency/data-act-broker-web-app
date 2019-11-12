/**
 * SubmitButtonContainer-test.jsx
 * Created by Lizzie Salita 11/12/19
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Set } from 'immutable';

import { initialState as initialApplied } from 'redux/reducers/dashboard/appliedFiltersReducer';
import { initialState as initialStaged } from 'redux/reducers/dashboard/dashboardFiltersReducer';

import { SubmitButtonContainer } from 'containers/dashboard/filters/SubmitButtonContainer';

import { mockActions, mockSubmitRedux } from './mockFilters';

jest.mock('components/dashboard/filters/SubmitButton', () =>
    jest.fn(() => null));

describe('SubmitButtonContainer', () => {
    describe('compareStores', () => {
        it('should return false if the length of enumerable properties on the applied filter object is different from the length of enumerable properties on the staged filter object', () => {
            const changedStage = Object.assign({}, initialStaged, {
                bonusFilter: 'hello'
            });

            const redux = Object.assign({}, mockSubmitRedux, {
                stagedFilters: Object.assign({}, mockSubmitRedux.stagedFilters, changedStage)
            });

            const container = shallow(
                <SubmitButtonContainer
                    {...redux}
                    {...mockActions} />
            );
            const compare = container.instance().compareStores();
            expect(compare).toBeFalsy();
        });

        it('should return false if any item in the staged filter object does not equal the same key value in the applied filter object', () => {
            const changedStage = Object.assign({}, initialStaged, {
                fy: new Set(['1995'])
            });

            const redux = Object.assign({}, mockSubmitRedux, {
                stagedFilters: Object.assign({}, mockSubmitRedux.stagedFilters, changedStage)
            });

            const container = shallow(
                <SubmitButtonContainer
                    {...redux}
                    {...mockActions} />
            );
            const compare = container.instance().compareStores();
            expect(compare).toBeFalsy();
        });

        it('should return true if all key values are equal in both the staged and applied filter objects', () => {
            const changedStage = Object.assign({}, initialStaged, {
                fy: new Set(['1995'])
            });
            const changedApplied = Object.assign({}, initialApplied.filters, {
                fy: new Set(['1995'])
            });

            const redux = Object.assign({}, mockSubmitRedux, {
                stagedFilters: Object.assign({}, mockSubmitRedux.stagedFilters, changedStage),
                appliedFilters: Object.assign({}, mockSubmitRedux.appliedFilters.filters, changedApplied)
            });

            const container = shallow(
                <SubmitButtonContainer
                    {...redux}
                    {...mockActions} />
            );
            const compare = container.instance().compareStores();
            expect(compare).toBeTruthy();
        });
    });
    describe('stagingChanged', () => {
        it('should set the filtersChanged state to true when the stores are not equal', () => {
            const container = shallow(
                <SubmitButtonContainer
                    {...mockSubmitRedux}
                    {...mockActions} />
            );
            container.instance().compareStores = jest.fn(() => false);

            container.instance().stagingChanged();
            expect(container.state().filtersChanged).toBeTruthy();
        });
        it('should set the filtersChanged state to false when the stores are equal and the filtersChanged state was previously true', () => {
            const container = shallow(
                <SubmitButtonContainer
                    {...mockSubmitRedux}
                    {...mockActions} />
            );
            container.instance().compareStores = jest.fn(() => true);
            container.setState({
                filtersChanged: true
            });

            container.instance().stagingChanged();
            expect(container.state().filtersChanged).toBeFalsy();
        });
    });
    describe('applyStagedFilters', () => {
        it('should tell Redux to copy the staged filter set to the applied filter set', () => {
            const actions = Object.assign({}, mockActions, {
                applyStagedFilters: jest.fn()
            });

            const container = shallow(
                <SubmitButtonContainer
                    {...mockSubmitRedux}
                    {...actions} />
            );
            container.instance().applyStagedFilters();

            expect(actions.applyStagedFilters).toHaveBeenCalledTimes(1);
        });

        it('should reset the filtersChanged state to false', () => {
            const container = shallow(
                <SubmitButtonContainer
                    {...mockSubmitRedux}
                    {...mockActions} />
            );
            container.setState({
                filtersChanged: true
            });

            container.instance().applyStagedFilters();

            expect(container.state().filtersChanged).toBeFalsy();
        });
    });
    describe('resetFilters', () => {
        it('should reset all the staged filters to their initial states', () => {
            const actions = Object.assign({}, mockActions, {
                clearStagedFilters: jest.fn()
            });

            const container = shallow(
                <SubmitButtonContainer
                    {...mockSubmitRedux}
                    {...actions} />
            );

            container.instance().resetFilters();
            expect(actions.clearStagedFilters).toHaveBeenCalledTimes(1);
        });
        it('should reset all the applied filters to their initial states', () => {
            const actions = Object.assign({}, mockActions, {
                resetAppliedFilters: jest.fn()
            });

            const container = shallow(
                <SubmitButtonContainer
                    {...mockSubmitRedux}
                    {...actions} />
            );

            container.instance().resetFilters();
            expect(actions.resetAppliedFilters).toHaveBeenCalledTimes(1);
        });
    });
    describe('componentWillUnmount', () => {
        it('should reset staged and applied filters', () => {
            const container = shallow(
                <SubmitButtonContainer
                    {...mockSubmitRedux}
                    {...mockActions} />
            );
            const resetFilters = jest.fn();
            container.instance().resetFilters = resetFilters;
            container.instance().componentWillUnmount();
            expect(resetFilters).toHaveBeenCalled();
        });
    });
});
