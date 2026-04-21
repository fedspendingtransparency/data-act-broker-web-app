/**
* LandingContentContainer.jsx
* Created by Kevin Li 5/31/16
*/

import { connect } from 'react-redux';

import LandingContent from '../../components/landing/LandingContent';

const LandingContentContainer = (props) => {
    return (
        <LandingContent {...props} />
    );
};

export default connect(
    (state) => ({ session: state.session })
)(LandingContentContainer);
