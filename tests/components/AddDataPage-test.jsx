/**
 * @jest-environment jsdom
 */

import { jest, expect, test } from "@jest/globals";
import AddDataPage from "../../src/js/components/addData/AddDataPage";
import React, { act } from "react";
import { render, screen, prettyDOM } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../src/js/redux/reducers";
import StoreSingleton from "../../src/js/redux/storeSingleton";
import { MemoryRouter } from "react-router-dom";
import Cookies from "js-cookie";


jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: jest.fn()
}));

jest.mock('../../src/js/helpers/reviewHelper', () => ({
    ...jest.requireActual('../../src/js/helpers/reviewHelper'),
    listBanners: jest.fn(() => Promise.resolve({ data: {} }))
}));

jest.mock('../../src/js/helpers/submissionListHelper', () => ({
    ...jest.requireActual('../../src/js/helpers/submissionListHelper'),
    loadRecentActivity: jest.fn(() => Promise.resolve({ data: {} }))
}));

jest.mock('../../src/js/helpers/loginHelper', () => ({
    ...jest.requireActual('../../src/js/helpers/loginHelper'),
    fetchActiveUser: jest.fn(() => Promise.resolve({ data: {} }))
}));

jest.mock('../../src/js/components/SharedComponents/icons/iconSingleton', () => ({
    instance: jest.fn()
}));


jest.mock('../../src/js/helpers/util', () => ({
    ...jest.requireActual('../../src/js/helpers/util'),
    getYearAndPeriod: jest.fn(() => ({ period: 12, year: 2025 }))
}));

jest.spyOn(Cookies, 'get').mockReturnValue('');


// jest.mock('../../src/js/helpers/submissionListHelper', () => jest.fn());

const initialState = {
    session: { admin: true, user: { affiliations: [{ permission: 'submitter' }, { permission: 'fabs' }] } }
};
const store = createStore(reducers, initialState);
const storeSingleton = new StoreSingleton();
storeSingleton.setStore(store);

function componentWithProvider(component) {
    return <Provider store={store}><MemoryRouter>{component}</MemoryRouter></Provider>;
}

const pageTypes = {
    // fabs: [
    //     'Financial Assistance Broker Submission (FABS)',
    //     'Upload your agency\'s fiancial assistance data and validate it against the latest version of the Governmentwide Spending Data Model (GSDM), formerly known as the DATA Act Information Model Schema (DAIMS).',
    //     'Ready to upload and validate your agency\'s files? Great, we\'ll be happy to walk you through the process.',
    //     'Upload & Validate a New Submission',
    //     'Did you start a submission but were unable to complete it? Want to see your previous submissions? Continue here to the submission table.',
    //     'View Submission Table'
    // ],
    dabs: [
        {
            submission: {
                meta: {
                    publishedSubmissions: [],
                    testSubmission: false
                }
            },
            content: [
                'Please begin by telling us about the submission you are creating',
                'Which agency is this submission for?'
            ]
        },
        {
            submission: {
                meta: {
                    agency: 'test',
                    publishedSubmissions: [],
                    testSubmission: false
                }
            },
            content: [
                'File-A_FY25Q0',
                'File B: Program Activity & Object Class Data',
                'File C: Award Financial'
            ]
        }
    ]
};

let result;

Object.entries(pageTypes).forEach(([page, configs]) => {
    configs.forEach((config) => {
        test(`Add Page should render - ${page}`, async () => {
            await act(async () => {
                result = render(componentWithProvider(<AddDataPage
                    type={page}
                    submission={config.submission}
                    updateMetaData={jest.fn()} />));
            });
            config.content.forEach((i) => {
                expect(screen.queryAllByText(i).length).toBeGreaterThanOrEqual(1);
            });
        });
    });
});
