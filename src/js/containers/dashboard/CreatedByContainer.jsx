/**
 * CreatedByContainer.jsx
 * Created by Kwadwo Opoku-Debrah 09/28/2018
 */


import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import * as createdByActions from '../../redux/actions/createdByActions';
import * as createdByHelper from '../../helpers/createdByHelper';

import DropdownTypeahead from '../../components/SharedComponents/DropdownTypeahead';

const propTypes = {
  bubbledRemovedFilterValue: PropTypes.shape({
    filter: PropTypes.string,
    value: PropTypes.shape({
      userId: PropTypes.number,
      name: PropTypes.string
    })
  }),
  setCreatedByList: PropTypes.func,
  createdByList: PropTypes.object,
  detached: PropTypes.bool,
  selectedFilters: PropTypes.object,
  type: PropTypes.string,
  table: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func
};

const defaultProps = {
  bubbledRemovedFilterValue: {
    filter: '',
    value: {
      userId: 0,
      name: ''
    }
  },
  setCreatedByList: () => {},
  createdByList: {},
  detached: true,
  selectedFilters: [],
  table: '',
  type: '',
  placeholder: '',
  onSelect: () => {}
};

class CreatedByContainer extends React.Component {
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    if (this.props.createdByList.createdBy.length === 0) {
      // we need to populate the list
      if (this.props.detached) {
        createdByHelper.fetchCreatedBy()
          .then((data) => {
            this.props.setCreatedByList(data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
      else {
        createdByHelper.fetchCreatedBy()
          .then((data) => {
            this.props.setCreatedByList(data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }

  dataFormatter(item) {
    return {
      label: item.name,
      value: item.user_id
    };
  }

  render() {
    let values = this.props.createdByList.createdBy;
    if (this.props.type && this.props.table) {
      const selectedCreatedBy = this.props.selectedFilters[this.props.type][this.props.table].createdBy;
      if (selectedCreatedBy.length > 0) {
        // remove selected agencies from the options
        const selectedCreatedByNames = selectedCreatedBy.map((selectedCreatedByItems) => selectedCreatedByItems.name);
        values = values.filter((user) => {
          const userid = user.userId;
          return !selectedCreatedByNames.includes(userid);
        });
      }
    }

    // Reduce and Dedupe data
    if (values.length > 0) {
      const payload = [];
      values.forEach((value) => {
        payload.push({
          name: value.user.name,
          user_id: value.user.user_id
        });
      });
      const removeDuplicateNames = _.uniqBy(payload, 'name');
      values = removeDuplicateNames;
    }

    return (
        <DropdownTypeahead
            {...this.props}
            errorHeader="Unknown Name"
            errorDescription="You must select an name from the list that is provided as you type."
            values={values}
            keyValue="name"
            internalValue={['user_id']}
            formatter={this.dataFormatter}
            prioritySort={false}
            bubbledRemovedFilterValue={this.props.bubbledRemovedFilterValue}
            clearAfterSelect />
    );
  }
}

CreatedByContainer.propTypes = propTypes;
CreatedByContainer.defaultProps = defaultProps;

export default connect(
  (state) => ({
    createdByList: state.createdByList,
    selectedFilters: state.dashboardFilters
  }),
  (dispatch) => bindActionCreators(createdByActions, dispatch),
)(CreatedByContainer);
