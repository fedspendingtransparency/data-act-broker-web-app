/**
  * ValidateValuesTreemapHelp.jsx
  * Created by Kevin Li 6/20/16
  */

import PropTypes from 'prop-types';

const propTypes = {
    count: PropTypes.number,
    description: PropTypes.string,
    detail: PropTypes.string,
    field: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string
};

const ValidateValuesTreemapHelp = ({
    description = '', detail = null, count = 0, type = 'error', field = '', name = ''
}) => {
    let detailCSS = ' hide';
    if (detail) {
        detailCSS = '';
    }
    return (
        <div className="usa-da-treemap-help-wrap">
            <div className="treemap-help-title">
                {name}
            </div>
            <div className="treemap-help-description">
                <b>Field:</b> {field}<br />
                <b>{type}:</b> {description}<br />
                <b>Occurrences: </b>{count}
            </div>
            <div className={`treemap-help-detail${detailCSS}`}>
                <b>More information:</b><br />
                {detail}
            </div>
        </div>
    );
};

ValidateValuesTreemapHelp.propTypes = propTypes;
export default ValidateValuesTreemapHelp;
