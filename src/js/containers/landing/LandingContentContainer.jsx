/**
* LandingContentContainer.jsx
* Created by Kevin Li 5/31/16
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LandingContent from '../../components/landing/LandingContent.jsx';

class LandingContentContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LandingContent {...this.props} />
        );
    }
}

export default connect(
    state => ({ session: state.session })
)(LandingContentContainer);
