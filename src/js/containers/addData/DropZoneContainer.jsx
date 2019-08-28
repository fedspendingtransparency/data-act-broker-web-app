/**
* DropZoneContainer.jsx
* Created by Kevin Li 3/24/16
*/

import React from 'react'; 
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as uploadActions from '../../redux/actions/uploadActions';

import DropZone from '../../components/addData/DropZone';

const propTypes = {
    setUploadItem: PropTypes.func,
    requestName: PropTypes.string
};

const defaultProps = {
    setUploadItem: () => {},
    requestName: ""
};

class DropZoneContainer extends React.Component {
    onDrop(files) {
        const file = files[0];

        this.props.setUploadItem({
            name: this.props.requestName,
            state: 'ready',
            file
        });
    }

    render() {
        return (
            <div>
                <DropZone {...this.props} onDrop={this.onDrop.bind(this)} />
            </div>
        );
    }
}

DropZoneContainer.propTypes = propTypes;
DropZoneContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ submission: state.submission }),
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(DropZoneContainer);
