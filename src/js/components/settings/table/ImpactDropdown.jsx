/**
 * ImpactDropdown.jsx
 * Created by Lizzie Salita 4/27/20
 */

import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { NewPicker } from 'data-transparency-ui';

const propTypes = {
    rule: PropTypes.string.isRequired,
    selectedOption: PropTypes.oneOf(['Low', 'Medium', 'High']),
    updateImpact: PropTypes.func.isRequired
};

const impacts = [
    'low',
    'medium',
    'high'
];

const ImpactDropdown = ({ rule, selectedOption, updateImpact }) => {
    const impactOptions = impacts.map((impact) => (
        {
            value: impact,
            name: startCase(impact),
            onClick: () => updateImpact(impact, rule)
        }
    ));
    return (
        <NewPicker
            enabled
            classname="settings-table__impact-dropdown"
            id={`impact-${rule}-picker`}
            options={impactOptions}
            selectedOption={selectedOption}
            sortFn={() => 0} />
    );
};

ImpactDropdown.propTypes = propTypes;

export default ImpactDropdown;
