/**
 * ReviewDataNarrativeCollapsed.jsx
 * Created by Alisa Burdeyny 01/19/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    toggleCommentBox: PropTypes.func,
    initialComments: PropTypes.object
};

export default class ReviewDataNarrativeCollapsed extends React.Component {
    render() {
        // here to calm the proptypes error, needs to be updated with proper logic
        const displayText = this.props.initialComments !== null ? 'No comments have been added to this submission' : '';
        return (
            <div className="narrative-wrapper collapsed">
                <button
                    className="collapse-button"
                    onClick={this.props.toggleCommentBox}
                    aria-label="Toggle collapsed comment box state">
                    Add comments <FontAwesomeIcon icon="chevron-down" />
                </button>
                <p className="collapsed-text">{displayText}</p>
            </div>
        );
    }
}

ReviewDataNarrativeCollapsed.propTypes = propTypes;
