import chai from 'chai';
chai.use(require('chai-shallow-deep-equal'));
import { createStore } from 'redux';
import _ from 'lodash';

import * as agencyActions from '../../src/js/redux/actions/agencyActions.js';
import reducers from '../../src/js/redux/reducers/index.js';


describe('Agency List Redux state', () => {

	it('should default to an empty array', () => {
		const store = createStore(reducers, {});
		const expectedResult = [];

		const isEqual = _.isEqual(store.getState().agencyList.agencies, expectedResult);

		chai.expect(isEqual).to.be.true;
	});

	it ('should populate the agency array when setAgencyList is called', () => {
		const store = createStore(reducers, {});
		const expectedAgency = {
			cgac_code: "123",
			agency_name: "Test Agency"
		}

		const action = agencyActions.setAgencyList([expectedAgency]);
		store.dispatch(action);

		const expectedResult = [expectedAgency];

		const isEqual = _.isEqual(store.getState().agencyList.agencies, expectedResult);

		chai.expect(isEqual).to.be.true;
	});
});