/**
 * RawFilesBreadcrumb.jsx
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
        fileType: {id: null, label: ''},
        agency: {id: null, label: ''},
        year: {id: null, label: ''},
        period: {id: null, label: ''}
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
        let breadcrumbClass = 'raw-files-breadcrumb';
        if (this.props.label === 'Home') {
            breadcrumbClass = `${breadcrumbClass} first`;
        }
        let breadcrumb = <span className={breadcrumbClass}>{this.props.label}</span>;
        if (this.props.clickable) {
            breadcrumb = <button className={breadcrumbClass} onClick={this.stateReset}>
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
