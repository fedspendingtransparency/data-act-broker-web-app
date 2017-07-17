/**
  * AgencyListContainer.jsx
  * Created by Kevin Li 6/1/2016
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as agencyActions from '../../redux/actions/agencyActions.js';
import * as AgencyHelper from '../../helpers/agencyHelper.js';

import Typeahead from '../../components/SharedComponents/Typeahead.jsx';

class AgencyListContainer extends React.Component {

	componentDidMount() {
		this.loadData();
	}

	loadData() {
		if (this.props.agencyList.agencies.length == 0) {
			// we need to populate the list
			if(this.props.detached){
				AgencyHelper.fetchAllAgencies()
				.then((agencies) => {
					this.props.setAgencyList(agencies);
				})
				.catch((err) => {
					console.log(err);
				});
			} else {
				AgencyHelper.fetchAgencies()
				.then((agencies) => {
					this.props.setAgencyList(agencies);
				})
				.catch((err) => {
					console.log(err);
				});
			}
		}
	}

	dataFormatter(item, input) {
		return {
			label: item.agency_name,
			value: item.cgac_code ? item.cgac_code : item.frec_code
		};
	}

	render() {
		return (
			<Typeahead {...this.props} values={this.props.agencyList.agencies} formatter={this.dataFormatter} />
		)
	}

}

export default connect(
    state => ({ agencyList: state.agencyList }),
    dispatch => bindActionCreators(agencyActions, dispatch)
)(AgencyListContainer)