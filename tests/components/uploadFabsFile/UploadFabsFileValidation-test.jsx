/**
 * UploadFabsFileValidation-test.jsx
 * Created by Jonathan Hill 08/21/19
 */
import React from 'react';
import { shallow } from 'enzyme';

import { UploadFabsFileValidation } from '../../../src/js/components/uploadFabsFile/UploadFabsFileValidation';
import props from './mockData';

describe('UploadFabsFileValidation Component', () => {
    let container;
    beforeEach(() => {
        container = shallow(<UploadFabsFileValidation {...props} />);
    });
    it('resets submission on unmount', () => {
        container.unmount();
        expect(props.resetSubmission).toHaveBeenCalledTimes(1);
    });
});
