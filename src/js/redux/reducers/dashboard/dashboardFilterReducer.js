/**
 * dashboardFilterReducer.js
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
      lastModified: {
        startDate: '',
        endDate: '',
      },
    },
    certified: {
      agencies: [],
      fileNames: [],
      submissionIds: [],
      createdBy: [],
      lastModified: {
        startDate: '',
        endDate: '',
      },
    },
  },
  fabs: {
    active: {
      agencies: [],
      fileNames: [],
      submissionIds: [],
      createdBy: [],
      lastModified: {
        startDate: '',
        endDate: '',
      },
    },
    published: {
      agencies: [],
      fileNames: [],
      submissionIds: [],
      createdBy: [],
      lastModified: {
        startDate: '',
        endDate: '',
      },
    },
  },
};

export const dashboardFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DASHBOARD_FILTER': {
      const table = Object.assign({}, state[action.dashboard][action.table], {
        [action.filter]: action.value,
      });

      const dashboard = Object.assign({}, state[action.dashboard], {
        [action.table]: table,
      });

      return Object.assign({}, state, {
        [action.dashboard]: dashboard,
      });
    }
    case 'TOGGLE_DASHBOARD_FILTER': {
      // get the existing list
      console.log(state[action.dashboard][action.table][action.filter], 'what is this');
      const list = state[action.dashboard][action.table][action.filter].slice();

      const index = findIndex(list, filter => isEqual(filter, action.value));

      if (index === -1) {
        // append the new value
        list.push(action.value);
      } else {
        // remove the item
        list.splice(index, 1);
      }

      const table = Object.assign({}, state[action.dashboard][action.table], {
        [action.filter]: list,
      });

      const dashboard = Object.assign({}, state[action.dashboard], {
        [action.table]: table,
      });

      return Object.assign({}, state, {
        [action.dashboard]: dashboard,
      });
    }
    case 'RESET_DASHBOARD_FILTERS': {
      if (action.table) {
        // Just reset one table
        const dashboard = Object.assign({}, state[action.dashboard], {
          [action.table]: initialState[action.dashboard][action.table],
        });

        return Object.assign({}, state, {
          [action.dashboard]: dashboard,
        });
      }
      // Reset either all dabs or all fabs filters
      return Object.assign({}, state, {
        [action.dashboard]: initialState[action.dashboard],
      });
    }
    default:
      return state;
  }
};
