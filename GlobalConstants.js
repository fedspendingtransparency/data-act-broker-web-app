export const kGlobalConstants = {
    API: process.env.API,
    LOCAL_ROOT: "http://localhost:3000",
    CAS_ROOT: process.env.CAS_ROOT,
    AUTH_CALLBACK: process.env.API_CALLBACK,
    GITHUB:
      "https://github.com/fedspendingtransparency/data-act-validator/tree/development",
    PUBLIC_FILES: "",
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    LOCAL: false,
    DEV: (process.env.IS_DEV === 'true'),
    STAGING: false,
    PROD: (process.env.IS_DEV === 'false')
};
