/**
  * SubTierAgencyListContainer.jsx
  * Created by Michael Hess
  **/

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as subTierAgencyActions from '../../redux/actions/subTierAgencyActions.js';
import * as AgencyHelper from '../../helpers/agencyHelper.js';

import Typeahead from '../../components/SharedComponents/Typeahead.jsx';

const propTypes = {
    setSubTierAgencyList: PropTypes.func,
    subTierAgencyList: PropTypes.object
};

class SubTierAgencyListContainer extends React.Component {

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        if (this.props.subTierAgencyList.subTierAgencies.length === 0) {
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

    dataFormatter(item) {
        return {
            label: item.agency_name,
            value: { value: item.agency_code, priority: item.priority }
        };
    }

    render() {
        return (
            <Typeahead {...this.props} values={this.props.subTierAgencyList.subTierAgencies}
                formatter={this.dataFormatter} />
        );
    }

}

SubTierAgencyListContainer.propTypes = propTypes;

export default connect(
    (state) => ({ subTierAgencyList: state.subTierAgencyList }),
    (dispatch) => bindActionCreators(subTierAgencyActions, dispatch)
)(SubTierAgencyListContainer);
