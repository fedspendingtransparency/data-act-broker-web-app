/**
 * CreatedByContainer.jsx
 * Created by Kwadwo Opoku-Debrah 09/28/2018
 */


import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import * as createdByActions from '../../redux/actions/createdByActions';
import * as createdByHelper from '../../helpers/createdByHelper';

import DropdownTypeahead from '../../components/SharedComponents/DropdownTypeahead';

const propTypes = {
    setCreatedByList: PropTypes.func,
    createdByList: PropTypes.object,
    selectedFilters: PropTypes.object,
    type: PropTypes.string,
    table: PropTypes.string,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func
};

const CreatedByContainer = ({
    setCreatedByList = () => {},
    createdByList = {},
    selectedFilters = [],
    table = '',
    type = '',
    placeholder = '',
    onSelect = () => {}
}) => {
    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        createdByHelper.fetchCreatedBy(type)
            .then((res) => {
                setCreatedByList(res.data.users);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const dataFormatter = (item) => {
        return {
            label: item.name,
            value: item.user_id
        };
    };

    const values = createdByList.createdBy;

    // Dedupe data
    const finalValues = values.length > 0 ? _.uniqBy(values, 'user_id') : [];
    return (
        <DropdownTypeahead
            onSelect={onSelect}
            errorHeader="Unknown Name"
            duplicateHeader="Duplicate Name"
            errorDescription="You must select an name from the list that is provided as you type."
            placeholder={placeholder}
            values={finalValues}
            keyValue="name"
            internalValue={['user_id']}
            formatter={dataFormatter}
            prioritySort={false}
            bubbledRemovedFilterValue={selectedFilters[type][table].createdBy}
            clearAfterSelect />
    );
};

CreatedByContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        createdByList: state.createdByList,
        selectedFilters: state.submissionsTableFilters
    }),
    (dispatch) => bindActionCreators(createdByActions, dispatch)
)(CreatedByContainer);
