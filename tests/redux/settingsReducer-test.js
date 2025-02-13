/**
 * @jest-environment jsdom
 *
 * settingsReducer-test.js
 * Created by Lizzie Salita 4/27/20
 */

import { settingsReducer, initialState } from 'redux/reducers/settingsReducer';
import { mockSettings } from './mockData';

describe('settingsReducer', () => {
    describe('UPDATE_SAVED_SETTINGS', () => {
        const action = {
            type: 'UPDATE_SAVED_SETTINGS',
            settings: mockSettings
        };

        it('should update the saved settings', () => {
            const updatedState = settingsReducer(undefined, action);
            expect(updatedState.savedSettings).toEqual(mockSettings);
        });

        it('should also update the staged settings', () => {
            const updatedState = settingsReducer(undefined, action);
            expect(updatedState.stagedSettings).toEqual(mockSettings);
        });
    });
    describe('UPDATE_STAGED_SETTINGS', () => {
        const action = {
            type: 'UPDATE_STAGED_SETTINGS',
            settings: mockSettings.warnings,
            errorLevel: 'warning'
        };

        it('should update the staged settings for the given error level', () => {
            const updatedState = settingsReducer(undefined, action);
            expect(updatedState.stagedSettings.warnings).toEqual(mockSettings.warnings);
        });

        it('should not update the saved settings', () => {
            const updatedState = settingsReducer(undefined, action);
            expect(updatedState.savedSettings.warnings).toEqual(initialState.savedSettings.warnings);
        });
    });
    describe('UPDATE_IMPACT', () => {
        // Settings will already be populated when we invoke this action
        const state = { stagedSettings: mockSettings, savedSettings: mockSettings };
        it('should change the impact of the specified rule to its given value', () => {
            const action = {
                type: 'UPDATE_IMPACT',
                impact: 'low',
                rule: 'A35',
                errorLevel: 'warning'
            };

            const updatedState = settingsReducer(state, action);
            expect(updatedState.stagedSettings.warnings).toEqual([
                {
                    description: 'A18 description',
                    label: 'A18',
                    significance: 1,
                    impact: 'high'
                },
                {
                    description: 'A19 description',
                    label: 'A19',
                    significance: 2,
                    impact: 'high'
                },
                {
                    description: 'A35 description',
                    label: 'A35',
                    significance: 3,
                    impact: 'low'
                }
            ]);
        });
    });
    describe('CLEAR_SETTINGS', () => {
        it('should reset the dashboard filters to their initial state', () => {
            const state = { stagedSettings: mockSettings, savedSettings: mockSettings };

            // Reset the filters
            const resetAction = {
                type: 'CLEAR_SETTINGS'
            };

            const restoredState = settingsReducer(state, resetAction);

            expect(restoredState).toEqual(initialState);
        });
    });
});
