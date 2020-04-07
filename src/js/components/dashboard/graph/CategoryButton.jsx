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
    disabled: PropTypes.bool
};

const CategoryButton = ({ label, color, disabled }) => (
    <button
        className="category-button"
        disabled={disabled}>
        <FontAwesomeIcon icon="circle" style={{ color }} />
        {` ${startCase(label)}`}
    </button>
);

CategoryButton.propTypes = propTypes;

export default CategoryButton;
