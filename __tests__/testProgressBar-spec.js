// jest.autoMockOff();
jest.dontMock('../src/js/components/SharedComponents/ProgressComponent.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
var ProgressBar = require('../src/js/components/SharedComponents/ProgressComponent.jsx').default;

// jest.dontMock('../src/js/components/SharedComponents/ProgressComponent.jsx');

describe('ProgressBar', () => {

  it('changes the text after click', () => {

// console.log (<Username/>);
    // Render a checkbox with label in the document
    var progress = TestUtils.renderIntoDocument(
      <ProgressBar />
    );

    var progressNode = ReactDOM.findDOMNode(progress);

    // Verify that it's Off by default
    expect(progressNode.textContent).toEqual('Off');

    // Simulate a click and verify that it is now On
    TestUtils.Simulate.change(
      TestUtils.findRenderedDOMComponentWithTag(progress, 'input')
    );
    expect(progressNode.textContent).toEqual('On');
  });

});
