/**
 * FileNameFilter.jsx
 * Created by Lizzie Salita 8/22/18
 */

import PropTypes from 'prop-types';
import { useState } from 'react';

const propTypes = {
    updateFilterList: PropTypes.func,
    table: PropTypes.oneOf(['active', 'published'])
};

const FileNameFilter = ({updateFilterList = null, ...props}) => {
    const [value, setValue] = useState('');

    const changedInput = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value) {
            // prevent submitting an empty string
            updateFilterList('fileNames', value);
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
                    id={`${props.table}-file-name`}
                    type="text"
                    className="text-filter__input"
                    placeholder="File Name"
                    value={value}
                    onChange={changedInput} />
                <button
                    className="text-filter__button"
                    onClick={handleSubmit}
                    disabled={!value}
                    title="Add"
                    aria-label="Filter by File Name">
                    Add
                </button>
            </form>
        </div>
    );
};

FileNameFilter.propTypes = propTypes;
export default FileNameFilter;
