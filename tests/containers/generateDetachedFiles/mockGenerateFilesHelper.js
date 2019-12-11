const mockFileState = {
    job_id: 1234,
    status: 'finished',
    file_type: 'D1',
    url: 'https://........',
    size: null,
    start: '01/01/2016',
    end: '03/31/2016',
    message: ''
};

export const generateDetachedFile = jest.fn(() => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve(mockFileState);
            });
        }),
        cancel: jest.fn(),
        then: jest.fn()
    }
));

export const checkGenerationStatus = jest.fn(() => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve(mockFileState);
            });
        }),
        cancel: jest.fn(),
        then: jest.fn()
    }
));
