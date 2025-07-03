/**
 * @jest-environment jsdom
 */

import { jest, expect, test } from "@jest/globals";
import AddDataPage from "../../src/js/components/addData/AddDataPage";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../src/js/redux/reducers";
import StoreSingleton from "../../src/js/redux/storeSingleton";
import { MemoryRouter } from "react-router";
import Cookies from "js-cookie";


jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: jest.fn()
}));

jest.mock('../../src/js/helpers/reviewHelper', () => ({
    ...jest.requireActual('../../src/js/helpers/reviewHelper'),
    listBanners: jest.fn(() => Promise.resolve({ data: { data: {} } }))
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

const initialState = {
    session: { admin: true, user: { affiliations: [{ permission: 'submitter' }, { permission: 'dabs' }] } }
};
const store = createStore(reducers, initialState);
const storeSingleton = new StoreSingleton();
storeSingleton.setStore(store);

function componentWithProvider(component) {
    return <Provider store={store}><MemoryRouter>{component}</MemoryRouter></Provider>;
}

const testCases = [
    {
        name: 'No agency',
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
        name: 'Agency selected',
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
];

testCases.forEach((testCase) => {
    test(`Add Page should render - ${testCase.name}`, async () => {
        render(componentWithProvider(<AddDataPage
            type="dabs"
            submission={testCase.submission}
            updateMetaData={jest.fn()} />
        ));
        testCase.content.forEach((i) => {
            expect(screen.queryAllByText(i).length).toBeGreaterThanOrEqual(1);
        });
    });
});
