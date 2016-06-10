/**
 * ReviewDataContainer.jsx
 * Created by Mike Bray 6/8/16
 **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReviewDataPage from '../../components/reviewData/ReviewDataPage.jsx';

class ReviewDataContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReviewDataPage {...this.props} />
        );
    }
}

export default connect(
    state => ({ session: state.session })
)(ReviewDataContainer)