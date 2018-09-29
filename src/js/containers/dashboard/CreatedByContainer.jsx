/**
 * CreatedByContainer.jsx
 * Created by Lizzie Salita 8/30/18
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as createdByActions from '../../redux/actions/createdByActions';
import * as createdByHelper from '../../helpers/createdByHelper';

import DropdownTypeahead from '../../components/SharedComponents/DropdownTypeahead';

const propTypes = {
  setCreatedByList: PropTypes.func,
  createdByList: PropTypes.array,
  detached: PropTypes.bool,
  selectedFilters: PropTypes.object,
  type: PropTypes.string,
  table: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
};

const defaultProps = {
  setCreatedByList: () => {},
  createdByList: [],
  detached: true,
  selectedFilters: [],
  table: '',
  type: '',
  placeholder: '',
  onSelect: () => {},
};

class CreatedByContainer extends React.Component {
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    if (this.props.createdByList.length === 0) {
      // we need to populate the list
      if (this.props.detached) {
        createdByHelper.fetchCreatedBy()
          .then((data) => {
            console.log(data, 'createdby data detached');
            // this.props.setCreatedByList(data);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        createdByHelper.fetchCreatedBy()
          .then((data) => {
            console.log(data, 'createdby data');
            // this.props.setCreatedByList(agencies);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }

  dataFormatter(item) {
    return {
      label: item.user.name,
      value: item.user.name,
    };
  }

  render() {
    const values = this.props.createdByList;
    // if (this.props.type && this.props.table) {
    //   const selectedAgencies = this.props.selectedFilters[this.props.type][this.props.table].agencies;
    //   if (selectedAgencies.length > 0) {
    //     // remove selected agencies from the options
    //     const selectedAgencyCodes = selectedAgencies.map(selectedAgency => selectedAgency.code);
    //     values = values.filter((agency) => {
    //       const code = agency.cgac_code || agency.frec_code;
    //       return !selectedAgencyCodes.includes(code);
    //     });
    //   }
    // }
    return (
      <DropdownTypeahead
        {...this.props}
        values={values}
        formatter={this.dataFormatter}
        prioritySort={false}
        clearAfterSelect
      />
    );
  }
}

CreatedByContainer.propTypes = propTypes;
CreatedByContainer.defaultProps = defaultProps;

export default connect(
  state => ({
    createdByList: state.createdByList,
    selectedFilters: state.dashboardFilters,
  }),
  dispatch => bindActionCreators(createdByActions, dispatch),
)(CreatedByContainer);
