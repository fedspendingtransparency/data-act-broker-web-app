// export const kGlobalConstants = {
//     API: process.env.BROKER_API,
//     CAS_ROOT: process.env.CAS_ROOT,
//     AUTH_CALLBACK: process.env.BROKER_CALLBACK,
//     PUBLIC_FILES: "",
//     GA_TRACKING_ID: process.env.GA_TRACKING_ID,
//     LOCAL: false,
//     DEV: (process.env.IS_DEV === 'true'),
//     PROD: (process.env.IS_DEV === 'false')
// };

export const kGlobalConstants = {
  // API: process.env.BROKER_API,
  API: "https://broker-dev-api.usaspending.gov:443/v1/",
  // CAS_ROOT: process.env.CAS_ROOT,
  CAS_ROOT: "https://login.test.max.gov",
  // AUTH_CALLBACK: process.env.BROKER_CALLBACK,
  // AUTH_CALLBACK: "https://broker-dev.usaspending.gov/#/auth",
  AUTH_CALLBACK: "http://localhost:3000/#/auth",
  PUBLIC_FILES: "",
  GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  LOCAL: false,
  DEV: (process.env.IS_DEV === 'true'),
  PROD: (process.env.IS_DEV === 'false')
};
