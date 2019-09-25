/**
 * SubmissionPage-test.jsx
 * Created by Jonathan Hill 08/21/19
 */

import React from 'react';
import { shallow } from 'enzyme';

import SubmissionPage from 'components/submission/SubmissionPage';
import { classNames } from 'dataMapping/dabs/submission';
import { mockProps } from './mockData';

describe('SubmissionPage', () => {
    it('whichClassName, should return className based on step property', () => {
        const component = shallow(<SubmissionPage {...mockProps} />);
        const name = component.instance().whichClassName();
        expect(name).toEqual(classNames[mockProps.step]);
    });
});
