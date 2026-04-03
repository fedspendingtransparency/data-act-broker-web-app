/**
 * CreatedByFilter.jsx
 * Created by Kwadwo Opoku-Debrah 8/25/18
 */

import PropTypes from 'prop-types';

import CreatedByContainer from 'containers/submissionsTable/CreatedByContainer';

const propTypes = {
    updateFilterList: PropTypes.func,
    type: PropTypes.string,
    table: PropTypes.string
};

const CreatedByFilter = ({updateFilterList = null, type = '', table = ''}) => {
    const createdBySelect = (userId, codeType, isValid, name) => {
        if (userId && name && isValid) {
            updateFilterList(
                'createdBy',
                {
                    userId,
                    name
                }
            );
        }
    };

    return (
        <div className="dashboard-filters__filter dashboard-filters__filter_typeahead">
            <div className="typeahead-holder">
                <CreatedByContainer
                    type={type}
                    table={table}
                    placeholder="Created By"
                    onSelect={createdBySelect} />
            </div>
        </div>
    );
};

CreatedByFilter.propTypes = propTypes;
export default CreatedByFilter;
