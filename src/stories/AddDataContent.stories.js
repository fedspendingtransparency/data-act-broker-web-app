import { fn, userEvent, within, expect } from '@storybook/test';
import { MemoryRouter } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../js/redux/reducers';
import AddDataPage from '../js/components/addData/AddDataPage';
import StoreSingleton from "../js/redux/storeSingleton";

const initialState = {
    session: { user: { affiliations: [{ permission: 'submitter' }] } },
    agencyList: {
        agencies: [
            { agency_name: 'Test Agency', cgac_code: 0 },
            { agency_name: 'Mock Agency', cgac_code: 1 },
            { agency_name: 'Test Department', cgac_code: 3 },
        ]
    }
};
const store = createStore(reducers, initialState);
const storeSingleton = new StoreSingleton();
storeSingleton.setStore(store);

export default {
    title: 'AddDataPage',
    component: AddDataPage,
    parameters: {
        updateMetaData: fn,
        type: 'dabs',
    },
    decorators: [
        (Story) => (
            <Provider store={store}><MemoryRouter><Story /></MemoryRouter></Provider>
        )
    ]
};

export const SelectAgency = {
    args: {
        updateMetaData: fn,
        type: 'dabs',
        submission: {
            meta: {
                agency: false,
            }
        }
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Type in "Agency"
        await userEvent.type(
            canvas.getByPlaceholderText("Enter the name of the reporting agency"),
            "Agency"
        );

        // Expect "Mock Agency" and "Test Agency" in the drop down
        const expected = initialState.agencyList.agencies.map(
            (agency) => agency.agency_name
        ).filter((agency) => agency.includes("Agency")).sort();
        await expect(
            canvas.getAllByText("Agency").map((element) => element.parentElement.innerText)
        ).toEqual(expected);

        // Click on "Mock agency
        await userEvent.click(canvas.getByText("Mock"));

        // Expect form to include the "duration" and "submission includes" sections
        await expect(canvas.getByText("For what duration are you submitting or validating data?")).toBeInTheDocument();
        await expect(canvas.getByText("Your submission includes data from...")).toBeInTheDocument();
    },
};
