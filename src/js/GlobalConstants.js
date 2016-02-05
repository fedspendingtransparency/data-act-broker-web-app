const apiConst = (process.env.NODE_ENV === 'production') ? null : 'http://ec2-54-173-199-34.compute-1.amazonaws.com:80/v1/';

export const kGlobalConstants = {
    API: apiConst
};
