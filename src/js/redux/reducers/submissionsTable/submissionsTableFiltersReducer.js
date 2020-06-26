/**
 * submissionsTableReducer.js
 * Created by Lizzie Salita 8/10/18
 */

import { findIndex, isEqual } from 'lodash';

export const initialState = {
    dabs: {
        active: {
            agencies: [],
            fileNames: [],
            submissionIds: [],
            createdBy: [],
            lastDateModified: {
                startDate: '',
                endDate: ''
            }
        },
        published: {
            agencies: [],
            fileNames: [],
            submissionIds: [],
            createdBy: [],
            lastDateModified: {
                startDate: '',
                endDate: ''
            }
        }
    },
    fabs: {
        active: {
            agencies: [],
            fileNames: [],
            submissionIds: [],
            createdBy: [],
            lastDateModified: {
                startDate: '',
                endDate: ''
            }
        },
        published: {
            agencies: [],
            fileNames: [],
            submissionIds: [],
            createdBy: [],
            lastDateModified: {
                startDate: '',
                endDate: ''
            }
        }
    }
};

const defaultObjectValues = {
    dabs: {
        active: {
            lastDateModified: {
                startDate: '',
                endDate: ''
            }
        },
        published: {
            lastDateModified: {
                startDate: '',
                endDate: ''
            }
        }
    },
    fabs: {
        active: {
            lastDateModified: {
                startDate: '',
                endDate: ''
            }
        },
        published: {
            lastDateModified: {
                startDate: '',
                endDate: ''
            }
        }
    }
};

export const submissionsTableFiltersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_DASHBOARD_FILTER': {
            let filterObject;
            const Objectlist = action.value;
            const prevFilter = state[action.dashboard][action.table][action.filter];
            if (prevFilter.startDate === Objectlist.startDate && prevFilter.endDate === Objectlist.endDate) {
                filterObject = defaultObjectValues[action.dashboard][action.table][action.filter];
            }
            else {
                filterObject = Object.assign({}, Objectlist);
            }
            const table = Object.assign({}, state[action.dashboard][action.table], {
                [action.filter]: filterObject
            });

            const dashboard = Object.assign({}, state[action.dashboard], {
                [action.table]: table
            });

            return Object.assign({}, state, {
                [action.dashboard]: dashboard
            });
        }
        case 'TOGGLE_DASHBOARD_FILTER': {
            // get the existing list
            const list = state[action.dashboard][action.table][action.filter].slice();
            const index = findIndex(list, filter => isEqual(filter, action.value)); // eslint-disable-line arrow-parens

            if (index === -1) {
                // append the new value
                list.push(action.value);
            }
            else {
                // remove the item
                list.splice(index, 1);
            }

            const table = Object.assign({}, state[action.dashboard][action.table], {
                [action.filter]: list
            });

            const dashboard = Object.assign({}, state[action.dashboard], {
                [action.table]: table
            });

            return Object.assign({}, state, {
                [action.dashboard]: dashboard
            });
        }
        case 'RESET_DASHBOARD_FILTERS': {
            if (action.table) {
                // Just reset one table
                const dashboard = Object.assign({}, state[action.dashboard], {
                    [action.table]: initialState[action.dashboard][action.table]
                });

                return Object.assign({}, state, {
                    [action.dashboard]: dashboard
                });
            }
            // Reset either all dabs or all fabs filters
            return Object.assign({}, state, {
                [action.dashboard]: initialState[action.dashboard]
            });
        }
        default:
            return state;
    }
};
