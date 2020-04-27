/**
 * ImpactDropdown.jsx
 * Created by Lizzie Salita 4/27/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { Picker } from 'data-transparency-ui';

const propTypes = {
    rule: PropTypes.string.isRequired,
    selectedOption: PropTypes.oneOf(['low', 'medium', 'high']),
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
            onClick: () => updateImpact(rule, impact)
        }
    ));
    return (
        <Picker
            options={impactOptions}
            selectedOption={selectedOption}
            sortFn={() => 0} />
    );
};

ImpactDropdown.propTypes = propTypes;

export default ImpactDropdown;
