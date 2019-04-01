import { combineReducers } from 'redux';

import { sessionReducer } from './sessionReducer';
import { uploadReducer } from './uploadReducer';
import { agencyReducer } from './agencyReducer';
import { createdByReducer } from './createdByReducer';
import { lastDateModifiedReducer } from './lastDateModifiedReducer';
import { subTierAgencyReducer } from './subTierAgencyReducer';
import { dashboardFilterReducer } from './dashboard/dashboardFilterReducer';
import { appliedFiltersReducer } from './dashboard/appliedFiltersReducer';
import ui from './uiReducer';

const appReducer = combineReducers({
    session: sessionReducer,
    submission: uploadReducer,
    agencyList: agencyReducer,
    createdByList: createdByReducer,
    lastDateModifiedList: lastDateModifiedReducer,
    subTierAgencyList: subTierAgencyReducer,
    dashboardFilters: dashboardFilterReducer,
    appliedDashboardFilters: appliedFiltersReducer,
    ui
});

export default appReducer;
