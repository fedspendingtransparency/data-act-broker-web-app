export const performLogout = () =>
    new Promise((resolve) => {
        process.nextTick(() => resolve());
    });

export const getPath = () => '/mockPath';

export const checkSession = jest.fn();
