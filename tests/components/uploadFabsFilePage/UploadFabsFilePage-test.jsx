/**
 * UploadFabsFilePage-test.jsx
 * Created by Jonathan Hill 08/21/19
 */

import React from 'react';
import { shallow } from 'enzyme';

import UploadFabsFilePage from 'components/uploadFabsFile/UploadFabsFilePage';
import { mockProps } from './mockData';

describe('UploadFabsFilePage', () => {
    describe('ComponentDidUpdate', () => {
        it('should call setSubmission on ID change', () => {
            const component = shallow(<UploadFabsFilePage {...mockProps} />);
            const newProps = {
                setSubmissionId: jest.fn(() => {}),
                setSubmissionState: jest.fn(() => {}),
                history: {},
                computedMatch: {
                    params: {
                        submissionID: '4321'
                    }
                },
                route: {},
                submission: {}
            };
            component.instance().componentDidUpdate(newProps);
            expect(component.instance().props.setSubmissionId).toHaveBeenCalled();
        });
        // TODO - test everything else in this function
    });
    // TODO - test everything else in this page
});
