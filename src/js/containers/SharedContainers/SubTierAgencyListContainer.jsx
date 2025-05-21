/**
  * SubTierAgencyListContainer.jsx
  * Created by Michael Hess
  */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as subTierAgencyActions from '../../redux/actions/subTierAgencyActions';
import * as AgencyHelper from '../../helpers/agencyHelper';

import Typeahead from '../../components/SharedComponents/Typeahead';

const propTypes = {
    setSubTierAgencyList: PropTypes.func,
    subTierAgencyList: PropTypes.object
};

const defaultProps = {
    setSubTierAgencyList: () => {},
    subTierAgencyList: {}
};

class SubTierAgencyListContainer extends React.Component {
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        if (this.props.subTierAgencyList.subTierAgencies.length === 0) {
            // we need to populate the list
            AgencyHelper.fetchSubTierAgencies()
                .then((res) => {
                    this.props.setSubTierAgencyList(res.data.sub_tier_agency_list);
                })
                .catch((err) => {
                    console.error(err);
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
            <Typeahead
                {...this.props}
                values={this.props.subTierAgencyList.subTierAgencies}
                formatter={this.dataFormatter} />
        );
    }
}

SubTierAgencyListContainer.propTypes = propTypes;
SubTierAgencyListContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ subTierAgencyList: state.subTierAgencyList }),
    (dispatch) => bindActionCreators(subTierAgencyActions, dispatch)
)(SubTierAgencyListContainer);
