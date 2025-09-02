/**
 * CategoryButton.jsx
 * Created by Lizzie Salita 4/1/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    label: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    filterCategory: PropTypes.func,
    active: PropTypes.bool
};

const CategoryButton = ({
    label, color, disabled, filterCategory, active
}) => (
    <button
        className={`category-button${active ? '' : ' category-button_filtered'}`}
        onClick={() => filterCategory(label)}
        disabled={disabled}>
        <FontAwesomeIcon icon="circle" className="circle-icon" style={{ color }} />
        {` ${startCase(label)}`}
    </button>
);

CategoryButton.propTypes = propTypes;

export default CategoryButton;
