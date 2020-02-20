import { combineReducers } from 'redux';

import { sessionReducer } from './sessionReducer';
import { uploadReducer } from './uploadReducer';
import { agencyReducer } from './agencyReducer';
import { createdByReducer } from './createdByReducer';
import { lastDateModifiedReducer } from './lastDateModifiedReducer';
import { subTierAgencyReducer } from './subTierAgencyReducer';
import { submissionsTableFiltersReducer } from './submissionsTable/submissionsTableFiltersReducer';
import { appliedSubmissionsTableFiltersReducer } from './submissionsTable/appliedFiltersReducer';
import { dashboardFiltersReducer } from './dashboard/dashboardFiltersReducer';
import { appliedDashboardFiltersReducer } from './dashboard/appliedFiltersReducer';
import { submissionStepsReducer } from './submission/submissionStepsReducer';

const appReducer = combineReducers({
    session: sessionReducer,
    submission: uploadReducer,
    agencyList: agencyReducer,
    createdByList: createdByReducer,
    lastDateModifiedList: lastDateModifiedReducer,
    subTierAgencyList: subTierAgencyReducer,
    submissionsTableFilters: submissionsTableFiltersReducer,
    appliedSubmissionsTableFilters: appliedSubmissionsTableFiltersReducer,
    dashboardFilters: dashboardFiltersReducer,
    appliedDashboardFilters: appliedDashboardFiltersReducer,
    submissionSteps: submissionStepsReducer
});

export default appReducer;
