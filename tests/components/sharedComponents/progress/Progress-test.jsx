/**
 * Progress-test.jsx
 * Created by Jonathan Hill 08/21/19
 */

import React from 'react';
import { shallow } from 'enzyme';

import Progress from 'components/SharedComponents/Progress';
import { mockProps } from './mockData';

describe('Progress Component', () => {
    it('handleClick, should call setStep on click', () => {
        const component = shallow(<Progress {...mockProps} />);
        component.instance().handleClick();
        expect(mockProps.setStep).toHaveBeenCalled();
    });
    describe('className', () => {
        it('should set classname to the step classname', () => {
            const component = shallow(<Progress {...mockProps} />);
            const theClassName = component.instance().className(3);
            expect(theClassName).toEqual(mockProps.barClasses.step);
        });
        it('should set classname to the current classname', () => {
            const component = shallow(<Progress {...mockProps} />);
            const theClassName = component.instance().className(1);
            expect(theClassName).toEqual(mockProps.barClasses.current);
        });
        it('should set classname to the done classname', () => {
            const newProps = mockProps;
            newProps.currentStep = 3;
            const component = shallow(<Progress {...newProps} />);
            const theClassName = component.instance().className(2);
            expect(theClassName).toEqual(mockProps.barClasses.done);
        });
    });
    describe('isDisabled', () => {
        it('button should be disabled', () => {
            const component = shallow(<Progress {...mockProps} />);
            const isDisabled = component.instance().isDisabled(3);
            expect(isDisabled).toEqual(true);
        });
        it('button should be enabled', () => {
            const newProps = mockProps;
            newProps.currentStep = 4;
            const component = shallow(<Progress {...newProps} />);
            const isDisabled = component.instance().isDisabled(3);
            expect(isDisabled).toEqual(false);
        });
        // TODO - test for bar function
        // TODO - test for label function
        // TODO - test for progress function
    });
});
