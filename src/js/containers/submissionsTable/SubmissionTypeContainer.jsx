/**
 * LastDateModifiedContainer.jsx
 * Created by Kwadwo Opoku-Debrah 9/30/18
 */

import PropTypes from 'prop-types';

import SubmissionTypeFilterDropdown from '../../components/SharedComponents/SubmissionTypeFilterDropdown';

const propTypes = {
    updateFilterList: PropTypes.func
};

const SubmissionTypeContainer = ({updateFilterList = () => {}}) => {
    return (
        <SubmissionTypeFilterDropdown onSelect={updateFilterList} />
    );
};

SubmissionTypeContainer.propTypes = propTypes;
export default SubmissionTypeContainer;
