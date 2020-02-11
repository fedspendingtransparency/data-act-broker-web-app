/**
 * LastModifiedFilterContainer-test.jsx
 * Created by Lizzie Salita 02/07/20
 */

import React from 'react';
import { shallow } from 'enzyme';

import { LastModifiedFilterContainer } from 'containers/dashboard/filters/LastModifiedFilterContainer';
import { mockActions, mockReduxActive } from './mockFilters';
import moment from 'moment';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/dashboard/filters/LastModifiedFilter', () => jest.fn(() => null));

describe('LastModifiedFilterContainer', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    describe('pickedDates', () => {
        it('should call the updateGenericFilter action with dates converted to strings', () => {
            const container = shallow(<LastModifiedFilterContainer
                {...mockActions}
                {...mockReduxActive} />
            );

            const momentDates = {
                startDate: moment('02/03/2017', 'MM/DD/YYYY'),
                endDate: moment('03/03/2017', 'MM/DD/YYYY')
            };

            const dates = {
                startDate: '02/03/2017',
                endDate: '03/03/2017'
            };

            container.instance().pickedDates(momentDates);

            expect(mockActions.updateGenericFilter).toHaveBeenCalledWith('active', 'lastModified', dates);
        });
    });
});
