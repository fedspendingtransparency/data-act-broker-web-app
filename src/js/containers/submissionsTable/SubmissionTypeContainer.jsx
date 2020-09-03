/**
 * LastDateModifiedContainer.jsx
 * Created by Kwadwo Opoku-Debrah 9/30/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import SubmissionTypeFilterDropdown from '../../components/SharedComponents/SubmissionTypeFilterDropdown';

const propTypes = {
    updateFilterList: PropTypes.func
};

const defaultProps = {
    updateFilterList: () => {}
};

export default class SubmissionTypeContainer extends React.Component {
    render() {
        return (
            <SubmissionTypeFilterDropdown onSelect={this.props.updateFilterList} />
        );
    }
}

SubmissionTypeContainer.propTypes = propTypes;
SubmissionTypeContainer.defaultProps = defaultProps;
