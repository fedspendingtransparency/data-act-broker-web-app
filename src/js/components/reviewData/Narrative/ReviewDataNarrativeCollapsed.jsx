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
        return (
            <div className="narrative-wrapper collapsed">
                <button
                    className="collapse-button"
                    onClick={this.props.toggleCommentBox}
                    aria-label="Toggle collapsed comment box state">
                    Add comments <FontAwesomeIcon icon="chevron-down" />
                </button>
                <p className="collapsed-text">No comments have been added to this submission.</p>
            </div>
        );
    }

};

ReviewDataNarrativeCollapsed.propTypes = propTypes;
