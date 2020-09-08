/**
 * SubmissionTypeFilter.jsx
 * Created by Alisa Burdeyny 8/27/20
 */

import React from 'react';
import PropTypes from 'prop-types';

import SubmissionTypeContainer from 'containers/submissionsTable/SubmissionTypeContainer';

const propTypes = {
    updateFilterList: PropTypes.func
};

const defaultProps = {
    updateFilterList: () => {}
};

export default class SubmissionTypeFilter extends React.Component {
    constructor(props) {
        super(props);

        this.submissionTypeSelected = this.submissionTypeSelected.bind(this);
    }

    submissionTypeSelected(subType) {
        this.props.updateFilterList(
            'submissionType',
            subType
        );
    }

    render() {
        return (
            <div className="dashboard-filters__filter dashboard-filters__filter_typeahead">
                <SubmissionTypeContainer updateFilterList={this.submissionTypeSelected} />
            </div>
        );
    }
}

SubmissionTypeFilter.propTypes = propTypes;
SubmissionTypeFilter.defaultProps = defaultProps;
