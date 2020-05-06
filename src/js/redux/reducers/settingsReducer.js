/**
 * settingsReducer.js
 * Created by Lizzie Salita 4/27/20
 **/


import { cloneDeep } from 'lodash';

export const initialState = {
    stagedSettings: {
        warnings: [],
        errors: []
    },
    savedSettings: {
        warnings: [],
        errors: []
    }
};

export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SAVED_SETTINGS': {
            return Object.assign({}, state, {
                stagedSettings: action.settings,
                savedSettings: action.settings
            });
        }

        case 'UPDATE_STAGED_SETTINGS': {
            const settings = Object.assign({}, state.stagedSettings, {
                [`${action.errorLevel}s`]: action.settings
            });
            return Object.assign({}, state, {
                stagedSettings: settings
            });
        }

        case 'UPDATE_IMPACT': {
            const settings = cloneDeep(state.stagedSettings[`${action.errorLevel}s`]);
            // Find the index of the rule to update
            const index = settings.findIndex((setting) => setting.label === action.rule);
            settings[index].impact = action.impact;
            const stagedSettings = Object.assign({}, state.stagedSettings, {
                [`${action.errorLevel}s`]: settings
            });
            return Object.assign({}, state, {
                stagedSettings
            });
        }

        case 'CLEAR_SETTINGS': {
            return initialState;
        }

        default:
            return state;
    }
};

