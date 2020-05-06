/**
  * settingsActions.js
  * Created by Lizzie Salita 4/27/20
  **/

export const updateSavedSettings = (settings) => ({
    type: 'UPDATE_SAVED_SETTINGS',
    settings
});

export const updateStagedSettings = (settings, errorLevel) => ({
    type: 'UPDATE_STAGED_SETTINGS',
    settings,
    errorLevel
});

export const updateImpact = (impact, rule, errorLevel) => ({
    type: 'UPDATE_IMPACT',
    impact,
    rule,
    errorLevel
});

export const clearSettings = () => ({
    type: 'CLEAR_SETTINGS'
});
