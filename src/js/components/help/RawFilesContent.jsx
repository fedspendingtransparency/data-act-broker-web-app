/**
 * RawFilesContent.jsx
 * Created by Alisa Burdeyny 9/03/21
 */

import React from 'react';
import PropTypes from 'prop-types';

import RawFilesBreadcrumb from 'components/help/RawFilesBreadcrumb';
import RawFilesItem from 'components/help/RawFilesItem';

const propTypes = {
    fileType: PropTypes.object,
    agency: PropTypes.object,
    year: PropTypes.object,
    period: PropTypes.object,
    currentList: PropTypes.array,
    stateReset: PropTypes.func,
    itemAction: PropTypes.func
};

const defaultProps = {
    fileType: {id: null, label: ''},
    agency: {id: null, label: ''},
    year: {id: null, label: ''},
    period: {id: null, label: ''},
    currentList: [],
    stateReset: null,
    itemAction: null
};

export default class RawFilesContent extends React.Component {
    render() {
        let currentLevel = 'fileType';
        const breadcrumbList = [
            <RawFilesBreadcrumb
                key="home"
                clickable={this.props.fileType.id !== null}
                stateReset={this.props.stateReset} />
        ];
        const resetState = {
            fileType: {id: null, label: ''},
            agency: {id: null, label: ''},
            year: {id: null, label: ''},
            period: {id: null, label: ''}
        }

        if (this.props.fileType.id !== null) {
            currentLevel = 'agency';
            resetState.fileType = this.props.fileType;

            breadcrumbList.push('/');
            breadcrumbList.push(
                <RawFilesBreadcrumb
                    key="file-type"
                    clickable={this.props.agency.id !== null}
                    resetState={Object.assign({}, resetState)}
                    label={this.props.fileType.label}
                    stateReset={this.props.stateReset} />
            );
        }

        if (this.props.agency.id !== null) {
            currentLevel = 'year';
            resetState.agency = this.props.agency;

            breadcrumbList.push('/');
            breadcrumbList.push(
                <RawFilesBreadcrumb
                    key="agency"
                    clickable={this.props.year.id !== null}
                    resetState={Object.assign({}, resetState)}
                    label={this.props.agency.label}
                    stateReset={this.props.stateReset} />
            );
        }

        if (this.props.year.id !== null) {
            currentLevel = 'period';
            resetState.year = this.props.year;

            breadcrumbList.push('/');
            breadcrumbList.push(
                <RawFilesBreadcrumb
                    key="year"
                    clickable={this.props.period.id !== null}
                    resetState={Object.assign({}, resetState)}
                    label={this.props.year.label}
                    stateReset={this.props.stateReset} />
            );
        }

        if (this.props.period.id !== null) {
            currentLevel = 'download';
            breadcrumbList.push('/');
            breadcrumbList.push(<RawFilesBreadcrumb key="period" label={this.props.period.label} />);
        }

        const items = this.props.currentList.map((item) =>
            (<RawFilesItem
                key={item.id}
                item={item}
                currentLevel={currentLevel}
                itemAction={this.props.itemAction} />)
        );

        return (
            <div className="usa-da-help-content">
                <div className="raw-files-page">
                    <h2>Raw Agency Submission Files</h2>
                    <div className="raw-files-breadcrumbs">
                        {breadcrumbList}
                    </div>
                    {items}
                </div>
            </div>
        );
    }
}

RawFilesContent.propTypes = propTypes;
RawFilesContent.defaultProps = defaultProps;
