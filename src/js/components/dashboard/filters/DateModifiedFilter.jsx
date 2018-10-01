/**
 * DateModifiedFilter.jsx
 * Created by Kwadwo Opoku-Debrah 8/25/18
 */

import React, { PropTypes } from 'react';

import DateModifiedContainer from '../../../containers/dashboard/DateModifiedContainer';

const propTypes = {
  updateFilterList: PropTypes.func,
  type: PropTypes.string,
  table: PropTypes.string,
};

const defaultProps = {
  updateFilterList: null,
  type: '',
  table: '',
};

export default class DateModifiedFilter extends React.Component {
  constructor(props) {
    super(props);

    this.dateModifiedSelect = this.dateModifiedSelect.bind(this);
  }

  dateModifiedSelect(userId, codeType, isValid, name) {
    if (userId && name && isValid) {
      this.props.updateFilterList(
        'dateModified',
        {
          userId,
          name,
        },
      );
    }
  }

  render() {
    return (
      <div className="dashboard-filters__filter dashboard-filters__filter_typeahead">
        <div className="typeahead-holder">
          <DateModifiedContainer
            type={this.props.type}
            table={this.props.table}
            placeholder="Created By"
            onSelect={this.dateModifiedSelect}
          />
        </div>
      </div>
    );
  }
}

DateModifiedFilter.propTypes = propTypes;
DateModifiedFilter.defaultProps = defaultProps;
