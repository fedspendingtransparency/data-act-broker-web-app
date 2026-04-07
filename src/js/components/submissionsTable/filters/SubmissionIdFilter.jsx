/**
 * SubmissionIdFilter.jsx
 * Created by Lizzie Salita 8/15/18
 */

import PropTypes from 'prop-types';
import { useState } from 'react';

const propTypes = {
    updateFilterList: PropTypes.func,
    table: PropTypes.oneOf(['active', 'published'])
};

const SubmissionIdFilter = ({updateFilterList = null, ...props}) => {
    const [value, setValue] = useState('');

    const changedInput = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value) {
            // prevent submitting an empty string
            updateFilterList('submissionIds', value);
        }

        // clear the value
        setValue('');
    };

    return (
        <div className="dashboard-filters__filter">
            <form
                className="text-filter"
                onSubmit={handleSubmit}>
                <input
                    id={`${props.table}-submission-id`}
                    aria-label="submission-id-filter"
                    type="number"
                    className="text-filter__input"
                    placeholder="Submission ID"
                    value={value}
                    onChange={changedInput} />
                <button
                    className="text-filter__button"
                    onClick={handleSubmit}
                    disabled={!value}
                    title="Add"
                    aria-label="Filter by Submission ID">
                    Add
                </button>
            </form>
        </div>
    );
};

SubmissionIdFilter.propTypes = propTypes;
export default SubmissionIdFilter;
