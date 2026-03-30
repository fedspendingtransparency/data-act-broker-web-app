/**
 * LastDateModifiedFilter.jsx
 * Created by Kwadwo Opoku-Debrah 8/25/18
 */

import PropTypes from 'prop-types';

import LastDateModifiedContainer from 'containers/submissionsTable/LastDateModifiedContainer';

const propTypes = {
    updateFilterList: PropTypes.func,
    minDateLastModified: PropTypes.string
};

const LastDateModifiedFilter = ({updateFilterList = null, minDateLastModified = ''}) => {
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
                    onSelect={lastDateModifiedSelect}
                    minDateLastModified={minDateLastModified} />
            </div>
        </div>
    );
};

LastDateModifiedFilter.propTypes = propTypes;
export default LastDateModifiedFilter;
