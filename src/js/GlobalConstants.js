const local = require('./LocalConstants');

export const kGlobalConstants = {
    API: local?.localConstants?.BROKER_API || process.env.BROKER_API,
    CAS_ROOT: process.env.CAS_ROOT,
    CAIA_ROOT: process.env.CAIA_ROOT,
    CAIA_CLIENT: process.env.CAIA_CLIENT,
    AUTH_CALLBACK: local?.localConstants?.BROKER_CALLBACK || process.env.BROKER_CALLBACK,
    PUBLIC_FILES: process.env.PUBLIC_FILES,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    LOCAL: (local?.localConstants?.IS_LOCAL || process.env.IS_LOCAL === 'true'),
    DEV: (process.env.IS_DEV === 'true'),
    PROD: (process.env.IS_DEV === 'false')
};
