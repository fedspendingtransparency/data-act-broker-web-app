/**
 * mockLoginHelper.js
 * Created by Lizzie Salita 1/23/20
 */

export const performLogout = () =>
    new Promise((resolve) => {
        process.nextTick(() => resolve());
    });

export const getPath = () => '/mockPath';

export const checkSession = jest.fn();
