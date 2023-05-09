/**
 * FiltersMessage.jsx
 * Created by Lizzie Salita 8/13/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    filterCount: PropTypes.number
};

const defaultProps = {
    filterCount: 0
};

const FiltersMessage = (props) => (
    <div className="table-heading__message">
        <div className="filters-message">
            <FontAwesomeIcon icon="exclamation-circle" />
                You have <span className="filters-message__count">{props.filterCount}</span> filters selected.
                Click the submit button below to apply.
        </div>
    </div>
);

FiltersMessage.propTypes = propTypes;
FiltersMessage.defaultProps = defaultProps;

export default FiltersMessage;
