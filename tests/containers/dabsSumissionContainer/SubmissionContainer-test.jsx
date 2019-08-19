/**
 * SubmissionContainer-test.jsx
 * Created by Jonathan Hill 08/16/19
 */

import React from 'react';
import { shallow } from 'enzyme';

import { SubmissionContainer } from 'containers/submission/SubmissionContainer';

const props = {
    params: {
        submissionID: "2054"
    },
    route: {
        getComponent: () => {},
        onEnter: () => {},
        path: "submission/:submissionID",
        type: "dabs"
    },
    routeParams: {
        submissionID: "2054"
    }
};

describe('SubmissionContainer', () => {
    const getSubmission = jest.fn();
    it('should call getSubmission on mount', async () => {
        const container = shallow(<SubmissionContainer {...props} />);
        container.instance().getSubmission = getSubmission;
        await container.instance().componentDidMount();

        expect(getSubmission).toHaveBeenCalled();
    });
});
