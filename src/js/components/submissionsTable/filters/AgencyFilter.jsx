/**
 * AgencyFilter.jsx
 * Created by Lizzie Salita 8/24/18
 */

import PropTypes from 'prop-types';

import AgencyFilterContainer from 'containers/submissionsTable/AgencyFilterContainer';

const propTypes = {
    updateFilterList: PropTypes.func,
    type: PropTypes.string,
    table: PropTypes.string
};

const AgencyFilter = ({updateFilterList = null, type = '', table = ''}) => {
    const handleAgencySelect = (code, codeType, isValid, name) => {
        if (code && name && isValid) {
            updateFilterList(
                'agencies',
                {
                    code,
                    name
                }
            );
        }
    };

    return (
        <div className="dashboard-filters__filter dashboard-filters__filter_typeahead agency-name">
            <div className="typeahead-holder">
                <AgencyFilterContainer
                    type={type}
                    table={table}
                    placeholder="Agency Name"
                    onSelect={handleAgencySelect} />
            </div>
        </div>
    );
};

AgencyFilter.propTypes = propTypes;
export default AgencyFilter;
