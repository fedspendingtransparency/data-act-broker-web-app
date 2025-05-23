/**
 * CreatedByContainer.jsx
 * Created by Kwadwo Opoku-Debrah 09/28/2018
 */


import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import * as createdByActions from '../../redux/actions/createdByActions';
import * as createdByHelper from '../../helpers/createdByHelper';

import DropdownTypeahead from '../../components/SharedComponents/DropdownTypeahead';

const propTypes = {
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
        createdByHelper.fetchCreatedBy(this.props.type)
            .then((res) => {
                this.props.setCreatedByList(res.data.users);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    dataFormatter(item) {
        return {
            label: item.name,
            value: item.user_id
        };
    }

    render() {
        const values = this.props.createdByList.createdBy;

        // Dedupe data
        const finalValues = values.length > 0 ? _.uniqBy(values, 'user_id') : [];
        return (
            <DropdownTypeahead
                {...this.props}
                errorHeader="Unknown Name"
                duplicateHeader="Duplicate Name"
                errorDescription="You must select an name from the list that is provided as you type."
                values={finalValues}
                keyValue="name"
                internalValue={['user_id']}
                formatter={this.dataFormatter}
                prioritySort={false}
                bubbledRemovedFilterValue={this.props.selectedFilters[this.props.type][this.props.table].createdBy}
                clearAfterSelect />
        );
    }
}

CreatedByContainer.propTypes = propTypes;
CreatedByContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        createdByList: state.createdByList,
        selectedFilters: state.submissionsTableFilters
    }),
    (dispatch) => bindActionCreators(createdByActions, dispatch)
)(CreatedByContainer);
