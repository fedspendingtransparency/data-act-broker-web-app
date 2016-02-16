// jest.autoMockOff();
jest.dontMock('../src/js/components/SharedComponents/EmailValidation.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
var EmailValidation = require('../src/js/components/SharedComponents/EmailValidation.jsx').default;

// jest.dontMock('../src/js/components/SharedComponents/ProgressComponent.jsx');

describe('EmailValidation', () => {

  it('Shows invalid when no @ sign', () => {

var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(?:gov|mil)$/;
// console.log (<Username/>);
    // Render a checkbox with label in the document
    var validation = TestUtils.renderIntoDocument(
      <EmailValidation  />
    );
    var validationNode = ReactDOM.findDOMNode(validation);

    // Verify that it's Off by default
    expect(validationNode.textContent).toEqual('');

    // Simulate a click and verify that it is now On
  TestUtils.Simulate.change(validationNode, {target : {value : 'a'}});


    expect(validationNode.textContent).toEqual('a');
  });

});
