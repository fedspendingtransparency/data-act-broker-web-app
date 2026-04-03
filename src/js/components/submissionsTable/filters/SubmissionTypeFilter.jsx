/**
 * SubmissionTypeFilter.jsx
 * Created by Alisa Burdeyny 8/27/20
 */

import PropTypes from 'prop-types';

import SubmissionTypeContainer from 'containers/submissionsTable/SubmissionTypeContainer';

const propTypes = {
    updateFilterList: PropTypes.func
};


const SubmissionTypeFilter = ({updateFilterList = () => {}}) => {
    const submissionTypeSelected = (subType) => {
        updateFilterList(
            'submissionType',
            subType
        );
    };

    return (
        <div className="dashboard-filters__filter dashboard-filters__filter_typeahead">
            <SubmissionTypeContainer updateFilterList={submissionTypeSelected} />
        </div>
    );
};

SubmissionTypeFilter.propTypes = propTypes;
export default SubmissionTypeFilter;
