/**
* DropZoneContainer.jsx
* Created by Kevin Li 3/24/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DropZone from 'components/addData/DropZone';
import DropZoneGenerated from 'components/addData/DropZoneGenerated';

import * as uploadActions from '../../redux/actions/uploadActions';

const propTypes = {
    setUploadItem: PropTypes.func,
    requestName: PropTypes.string,
    interactive: PropTypes.bool
};

const defaultProps = {
    setUploadItem: () => {},
    requestName: "",
    interactive: true
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
        let zoneType = <DropZone {...this.props} onDrop={this.onDrop.bind(this)} />;
        if (!this.props.interactive) {
            zoneType = <DropZoneGenerated {...this.props} />;
        }
        return (
            <div>
                {zoneType}
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
