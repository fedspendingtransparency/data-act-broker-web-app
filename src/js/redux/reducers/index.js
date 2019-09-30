import { combineReducers } from 'redux';

import { sessionReducer } from './sessionReducer';
import { uploadReducer } from './uploadReducer';
import { agencyReducer } from './agencyReducer';
import { createdByReducer } from './createdByReducer';
import { lastDateModifiedReducer } from './lastDateModifiedReducer';
import { subTierAgencyReducer } from './subTierAgencyReducer';
import { dashboardFilterReducer } from './submissionsTable/stagedFiltersReducer';
import { appliedFiltersReducer } from './submissionsTable/appliedFiltersReducer';

const appReducer = combineReducers({
    session: sessionReducer,
    submission: uploadReducer,
    agencyList: agencyReducer,
    createdByList: createdByReducer,
    lastDateModifiedList: lastDateModifiedReducer,
    subTierAgencyList: subTierAgencyReducer,
    dashboardFilters: dashboardFilterReducer,
    appliedDashboardFilters: appliedFiltersReducer
});

export default appReducer;
