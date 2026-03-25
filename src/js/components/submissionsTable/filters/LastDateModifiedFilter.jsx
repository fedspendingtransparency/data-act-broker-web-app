/**
 * LastDateModifiedFilter.jsx
 * Created by Kwadwo Opoku-Debrah 8/25/18
 */

import PropTypes from 'prop-types';

import LastDateModifiedContainer from 'containers/submissionsTable/LastDateModifiedContainer';

const propTypes = {
    updateFilterList: PropTypes.func,
    type: PropTypes.string,
    table: PropTypes.string,
    minDateLastModified: PropTypes.string
};

const LastDateModifiedFilter = ({updateFilterList = null, type = '', table = '', minDateLastModified = ''}) => {
    const lastDateModifiedSelect = (lastDateModified) => {
        if (lastDateModified) {
            const startDate = lastDateModified.startDate;
            const endDate = lastDateModified.endDate;
            updateFilterList(
                'lastDateModified',
                {
                    startDate,
                    endDate
                }
            );
        }
    };

    return (
        <div className="dashboard-filters__filter dashboard-filters__filter_typeahead">
            <div className="">
                <LastDateModifiedContainer
                    type={type}
                    table={table}
                    placeholder="Last Date Modified"
                    onSelect={lastDateModifiedSelect}
                    minDateLastModified={minDateLastModified} />
            </div>
        </div>
    );
};

LastDateModifiedFilter.propTypes = propTypes;
export default LastDateModifiedFilter;
