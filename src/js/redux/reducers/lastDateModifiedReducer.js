const initialState = {
  lastDateModified: [],
};

export const lastDateModifiedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LASTDATEMODIFIED_LIST':
      return Object.assign({}, state, {
        lastDateModified: action.lastDateModified,
      });
    default:
      return state;
  }
};
