/**
 * CreatedByFilter.jsx
 * Created by Kwadwo Opoku-Debrah 8/25/18
 */

import React, { PropTypes } from 'react';

import CreatedByContainer from '../../../containers/dashboard/CreatedByContainer';

const propTypes = {
  bubbledRemovedFilterValue: PropTypes.shape({
    filter: PropTypes.string,
    value: PropTypes.shape({
      userId: PropTypes.number,
      name: PropTypes.string
    })
  }),
  updateFilterList: PropTypes.func,
  type: PropTypes.string,
  table: PropTypes.string
};

const defaultProps = {
  bubbledRemovedFilterValue: {
    filter: '',
    value: {
      userId: 0,
      name: ''
    }
  },
  updateFilterList: null,
  type: '',
  table: ''
};

export default class CreatedByFilter extends React.Component {
  constructor(props) {
    super(props);

    this.createdBySelect = this.createdBySelect.bind(this);
  }

  createdBySelect(userId, codeType, isValid, name) {
    if (userId && name && isValid) {
      this.props.updateFilterList(
        'createdBy',
        {
          userId,
          name
        },
      );
    }
  }

  render() {
    return (
        <div className="dashboard-filters__filter dashboard-filters__filter_typeahead">
            <div className="typeahead-holder">
                <CreatedByContainer
                    type={this.props.type}
                    table={this.props.table}
                    placeholder="Created By"
                    onSelect={this.createdBySelect}
                    bubbledRemovedFilterValue={this.props.bubbledRemovedFilterValue} />
            </div>
        </div>
    );
  }
}

CreatedByFilter.propTypes = propTypes;
CreatedByFilter.defaultProps = defaultProps;
