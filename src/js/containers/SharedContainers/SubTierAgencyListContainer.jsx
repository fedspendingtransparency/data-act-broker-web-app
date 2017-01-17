/**
  * SubTierAgencyListContainer.jsx
  * Created by Michael Hess
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as subTierAgencyActions from '../../redux/actions/subTierAgencyActions.js';
import * as AgencyHelper from '../../helpers/agencyHelper.js';

import Typeahead from '../../components/SharedComponents/Typeahead.jsx';

class SubTierAgencyListContainer extends React.Component {

	componentDidMount() {
		this.loadData();
	}

	loadData() {
		if (this.props.subTierAgencyList.subTierAgencies.length == 0) {
			// we need to populate the list
			AgencyHelper.fetchSubTierAgencies()
				.then((agencies) => {
					this.props.setSubTierAgencyList(agencies);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	dataFormatter(item, input) {
		return {
			label: item.agency_name,
			value: item.agency_code
		};
	}

	render() {
		return (
			<Typeahead {...this.props} values={this.props.subTierAgencyList.subTierAgencies} formatter={this.dataFormatter} />
		)
	}

}

export default connect(
    state => ({ subTierAgencyList: state.subTierAgencyList }),
    dispatch => bindActionCreators(subTierAgencyActions, dispatch)
)(SubTierAgencyListContainer)