/**
 * ReviewDataCommentsTextfield.jsx
 * Created by Alisa Burdeyny 11/21/16
 **/

import React from 'react';

export default class ReviewDataCommentsTextfield extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentContent: props.currentContent
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({currentContent: nextProps.currentContent})
    }

    textChanged(e) {
        this.setState({currentContent: e.target.value});
    }

    render() {
        return (
            <div className="col-md-8">
                <textarea id="submission-review-comments" value={this.state.currentContent} onChange={this.textChanged.bind(this)}></textarea>
            </div>
        );
    }
}