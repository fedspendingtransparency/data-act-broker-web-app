/**
 * QuarterFilterContainer-test.jsx
 * Created by Lizzie Salita 10/16/19
 */

import React from 'react';
import { shallow } from 'enzyme';

import { QuarterFilterContainer } from 'containers/dashboard/filters/QuarterFilterContainer';
import { mockActions, mockRedux } from './mockFilters';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/dashboard/filters/QuarterPicker', () => jest.fn(() => null));

describe('QuarterFilterContainer', () => {
    describe('pickedQuarter', () => {
        it('should call the updateGenericFilter action', () => {
            const container = shallow(<QuarterFilterContainer
                {...mockActions}
                {...mockRedux} />
            );

            container.instance().pickedQuarter(4);

            expect(mockActions.updateGenericFilter).toHaveBeenCalledWith('quarters', 4);
        });
    });
});
