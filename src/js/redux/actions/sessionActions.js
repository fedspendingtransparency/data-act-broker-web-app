export const setLoginState = (state) => ({
    type: 'SET_LOGIN_STATE',
    login: state
});

export const setActiveUser = (state) => ({
    type: 'SET_ACTIVE_USER',
    user: state
});

export const setAdmin = (state) => ({
    type: 'SET_ADMIN',
    admin: state
});

export const setSession = (state) => ({
    type: 'SET_SESSION',
    login: state.login,
    user: state.user,
    admin: state.admin,
    skipGuide: state.user.skip_guide
});

// convenience method for logging out
export const setLoggedOut = () => ({
    type: 'SET_SESSION',
    login: 'loggedOut',
    user: {},
    admin: false
});

export const setSkipGuide = (state) => ({
    type: 'SET_SKIP_GUIDE',
    skipGuide: state
});

export const setApiMeta = (state) => ({
    type: 'SET_API_META',
    time: state.time
});
