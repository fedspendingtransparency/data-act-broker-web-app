/**
 * @jest-environment jsdom
 */

import { jest, expect, test } from "@jest/globals";
import ValidationContent from "../../src/js/components/validateData/ValidationContent";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../src/js/redux/reducers";
import StoreSingleton from "../../src/js/redux/storeSingleton";
import { MemoryRouter } from "react-router-dom";

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: jest.fn()
}));

jest.mock('../../src/js/components/SharedComponents/icons/iconSingleton', () => ({
    instance: jest.fn(),
    subscribe: jest.fn(),
    downloadIcons: jest.fn()
}));

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
        name: 'test all complete',
        props: {
            session: {},
            submission: {
                validation: {
                    appropriations: { file_status: 'complete', error_data: [], warning_data: [] },
                    program_activity: { file_status: 'complete', error_data: [], warning_data: [] },
                    award_financial: { file_status: 'complete', error_data: [], warning_data: [] }
                }
            },
            agency_name: '',
            hasFailed: false,
            hasFinished: false,
            progressMeta: {},
            resetProgress: jest.fn()
        },
        content: [
            'File A: Appropriation',
            'Last Validated:',
            /File Size:/,
            /Data Rows in File \(excludes header\):/,
            /Warnings/,
            /View & Download.*Warnings.*Report/,
            /Critical Errors/,
            /Original Submitted File:/,
            /File successfully validated/,
            'File B: Program Activity & Object Class Data',
            'File C: Award Financial',
            'Your files are being validated.',
            'You can return to this URL at any time to check the validation status.'
        ]
    },
    {
        name: 'test errors',
        props: {
            session: {},
            submission: {
                validation: {
                    appropriations: {
                        file_status: 'complete', error_data: ["appropriations"], error_count: 2, warning_data: []
                    },
                    program_activity: {
                        file_status: 'complete', error_data: ["program_activity"], error_count: 3, warning_data: []
                    },
                    award_financial: { file_status: 'complete', error_data: [], warning_data: [] }
                }
            },
            agency_name: '',
            hasFailed: false,
            hasFinished: false,
            progressMeta: {},
            resetProgress: jest.fn()
        },
        content: [
            /Choose Corrected File/
        ]
    },
    {
        name: 'test failed',
        props: {
            session: {},
            submission: {
                validation: {
                    appropriations: {
                        file_status: 'complete', error_data: ["appropriations"], error_count: 2, warning_data: []
                    },
                    program_activity: {
                        file_status: 'complete', error_data: ["program_activity"], error_count: 3, warning_data: []
                    },
                    award_financial: { file_status: 'complete', error_data: [], warning_data: [] }
                }
            },
            agency_name: '',
            hasFailed: true,
            hasFinished: true,
            progressMeta: {},
            resetProgress: jest.fn()
        },
        content: [
            /Choose Corrected File/,
            'Exclamation Mark Icon',
            'An error has occurred while validating your files.',
            'Contact the Service Desk for assistance. Provide this URL when describing the issue.'

        ]
    }
];

testCases.forEach((testCase) => {
    test(`Validate Data Content should render - ${testCase.name}`, async () => {
        render(componentWithProvider(<ValidationContent {...testCase.props} />));
        testCase.content.forEach((i) => {
            expect(screen.queryAllByText(i).length).toBeGreaterThanOrEqual(1);
        });
    });
});

