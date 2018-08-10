import { combineReducers } from 'redux';

import { sessionReducer } from './sessionReducer';
import { uploadReducer } from './uploadReducer';
import { agencyReducer } from './agencyReducer';
import { subTierAgencyReducer } from './subTierAgencyReducer';
import { dashboardFilterReducer } from './dashboardFilterReducer';

const appReducer = combineReducers({
    session: sessionReducer,
    submission: uploadReducer,
    agencyList: agencyReducer,
    subTierAgencyList: subTierAgencyReducer,
    dashboardFilters: dashboardFilterReducer
});

export default appReducer;
