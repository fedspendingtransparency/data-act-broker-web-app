/**
 * @jest-environment jsdom
 */

import { jest, expect, test } from "@jest/globals";
import LandingPage from "../../src/js/components/landing/LandingPage";
import React from "react";
import { render, screen } from "@testing-library/react";
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
    home: [
        'Welcome to Data Broker',
        'Upload, validate, and publish your agency\'s federal spending transparency data.',
        'Data Accountability Broker Submission (DABS)',
        'Enter here to upload, validate, and certify your agency\'s financial data. You can also test financial data, generate your award files, and view your submissions.',
        'Financial Assistance Broker Submission (FABS)',
        'Enter here to upload, validate, and publish your agency\'s financial assistance data. You can also test your financial assistance data and view your submissions.'
    ],
    fabs: [
        'Financial Assistance Broker Submission (FABS)',
        'Upload your agency\'s fiancial assistance data and validate it against the latest version of the Governmentwide Spending Data Model (GSDM), formerly known as the DATA Act Information Model Schema (DAIMS).',
        'Ready to upload and validate your agency\'s files? Great, we\'ll be happy to walk you through the process.',
        'Upload & Validate a New Submission',
        'Did you start a submission but were unable to complete it? Want to see your previous submissions? Continue here to the submission table.',
        'View Submission Table'
    ],
    dabs: [
        'Data Accountability Broker Submission (DABS)',
        'Upload your agency\'s financial data and validate it against the latest version of the Governmentwide Spending Data Model (GSDM), formerly known as the DATA Act Information Model Schema (DAIMS).',
        'Ready to upload and validate your agency\'s files? Great, we\'ll be happy to walk you through the process.',
        'Upload & Validate a New Submission',
        'Did you start a submission but were unable to complete it? Want to see your certified submissions? Continue here to the submission table.',
        'View Submission Table',
        'Generate your D1 and D2 award files without having to create a submission.',
        'Generate D Files',
        'Compare published Data Broker and GTAS data or generate File A outside of a submission.',
        'Generate Files',
        'Recent Activity for:',
        'View',
        'Agency',
        'Reporting Period (CY)',
        'Created By',
        'Last Modified',
        'Status',
        'Delete'
    ]
};

Object.entries(pageTypes).forEach(([page, content]) => {
    test(`Landing Page should render - ${page}`, async () => {
        render(componentWithProvider(<LandingPage type={page} />));
        content.forEach((i) => {
            expect(screen.queryAllByText(i).length).toBeGreaterThanOrEqual(1);
        });
    });
});
