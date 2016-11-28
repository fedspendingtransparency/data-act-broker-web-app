/**
 * ReviewDataNarrativeTextfield.jsx
 * Created by Alisa Burdeyny 11/21/16
 **/

import React from 'react';

export default class ReviewDataNarrativeTextfield extends React.Component {
    textChanged(e) {
        this.props.textChanged(e.target.value);
    }

    render() {
        return (
            <div className="col-md-8">
                <textarea id="submission-review-narrative" value={this.props.currentContent} onChange={this.textChanged.bind(this)}></textarea>
            </div>
        );
    }
}