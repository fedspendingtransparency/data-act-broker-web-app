/**
  * ValidateValuesTreemapHelpPlaceholder.jsx
  * Created by Kevin Li 6/20/16
  */

import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.string
};

const ValidateValuesTreemapHelpPlaceholder = ({type = 'error'}) => {
    return (
        <div className="usa-da-treemap-help-wrap">
            Click on a block for more information about the {type}.
        </div>
    );
};

ValidateValuesTreemapHelpPlaceholder.propTypes = propTypes;
export default ValidateValuesTreemapHelpPlaceholder;
