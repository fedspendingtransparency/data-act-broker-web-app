/**
 * RawFilesContent.jsx
 * Created by Alisa Burdeyny 9/03/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import RawFilesBreadcrumb from 'components/help/RawFilesBreadcrumb';

const propTypes = {
    fileType: PropTypes.string,
    agency: PropTypes.string,
    year: PropTypes.string,
    month: PropTypes.string,
    currentList: PropTypes.array,
    stateReset: PropTypes.func
};

const defaultProps = {
    fileType: '',
    agency: '',
    year: '',
    month: '',
    currentList: [],
    stateReset: null
};

export default class RawFilesContent extends React.Component {
    componentDidMount() {
        this.scrollToTop();
    }

    scrollToTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    }

    render() {
        const breadcrumbList = [
            <RawFilesBreadcrumb
                key="home"
                clickable={this.props.fileType !== ''}
                stateReset={this.props.stateReset} />
        ];
        const resetState = {
            type: '',
            agency: '',
            year: '',
            month: ''
        }

        if (this.props.fileType !== '') {
            resetState.fileType = this.props.fileType;

            breadcrumbList.push(
                <RawFilesBreadcrumb
                    key="file-type"
                    clickable={this.props.agency !== ''}
                    resetState={Object.assign({}, resetState)}
                    label={this.props.fileType}
                    stateReset={this.props.stateReset} />
            );
        }

        if (this.props.agency !== '') {
            resetState.agency = this.props.agency;

            breadcrumbList.push(
                <RawFilesBreadcrumb
                    key="agency"
                    clickable={this.props.year !== ''}
                    resetState={Object.assign({}, resetState)}
                    label={this.props.agency}
                    stateReset={this.props.stateReset} />
            );
        }

        if (this.props.year !== '') {
            resetState.year = this.props.year;

            breadcrumbList.push(
                <RawFilesBreadcrumb
                    key="year"
                    clickable={this.props.month !== ''}
                    resetState={Object.assign({}, resetState)}
                    label={this.props.year}
                    stateReset={this.props.stateReset} />
            );
        }

        if (this.props.month !== '') {
            breadcrumbList.push(<RawFilesBreadcrumb key="month" label={this.props.month} />);
        }
        
        return (
            <div className="usa-da-help-content">
                <div className="raw-files-page">
                    <h2>Raw Files</h2>
                    <div className="raw-files-breadcrumbs">
                        {breadcrumbList}
                    </div>
                </div>
            </div>
        );
    }
}

RawFilesContent.propTypes = propTypes;
RawFilesContent.defaultProps = defaultProps;
