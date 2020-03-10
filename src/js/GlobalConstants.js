export const kGlobalConstants = {
    API: process.env.BROKER_API,
    CAS_ROOT: process.env.CAS_ROOT,
    AUTH_CALLBACK: process.env.BROKER_CALLBACK,
    PUBLIC_FILES: process.env.PUBLIC_FILES,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    LOCAL: (process.env.IS_LOCAL === 'true'),
    DEV: (process.env.IS_DEV === 'true'),
    PROD: (process.env.IS_DEV === 'false')
};
