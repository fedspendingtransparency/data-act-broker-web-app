/**
 * RawFileBreadcrumb.jsx
 * Created by Alisa Burdeyny 9/03/21
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    clickable: PropTypes.bool,
    resetState: PropTypes.object,
    label: PropTypes.string,
    stateReset: PropTypes.func
};

const defaultProps = {
    clickable: false,
    resetState: {
        fileType: '',
        agency: '',
        year: '',
        month: ''
    },
    label: 'Home',
    stateReset: null
};

export default class RawFilesBreadcrumb extends React.Component {
    constructor(props) {
        super(props);

        this.stateReset = this.stateReset.bind(this);
    }

    stateReset() {
        this.props.stateReset(this.props.resetState);
    }

    render() {
        let breadcrumb = <span className="raw-files-breadcrumb">{this.props.label}</span>;
        if (this.props.clickable) {
            breadcrumb = <button className="raw-files-breadcrumb" onClick={this.stateReset}>
                {this.props.label}
            </button>
        }
        return (
            <React.Fragment>
                {breadcrumb}
            </React.Fragment>
        );
    }
}

RawFilesBreadcrumb.propTypes = propTypes;
RawFilesBreadcrumb.defaultProps = defaultProps;
