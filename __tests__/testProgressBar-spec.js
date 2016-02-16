// jest.autoMockOff();
jest.dontMock('../src/js/components/SharedComponents/ProgressComponent.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
var ProgressBar = require('../src/js/components/SharedComponents/ProgressComponent.jsx').default;

// jest.dontMock('../src/js/components/SharedComponents/ProgressComponent.jsx');

describe('ProgressBar', () => {

  it('has the correct number of steps', () => {

// console.log (<Username/>);
    // Render a checkbox with label in the document
    var progress = TestUtils.renderIntoDocument(
      <ProgressBar totalSteps={5} currentStep={2} />
    );

    var progressNode = TestUtils.scryRenderedDOMComponentsWithClass(progress, 'usa-da-progress-bar-step');

    // Verify that it's Off by default
    expect(progressNode.length).toEqual(6);

    progressNode = TestUtils.scryRenderedDOMComponentsWithClass(progress, 'usa-da-progress-bar-step-done');
    expect(progressNode.length).toEqual(2);

    progressNode = TestUtils.scryRenderedDOMComponentsWithClass(progress, 'usa-da-progress-bar-step-current');
    expect(progressNode.length).toEqual(2);

  });

});
