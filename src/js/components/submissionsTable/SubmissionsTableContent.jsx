/**
  * SubmissionsTableContent.jsx
  * Created by Kevin Li 10/27/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import FilterBarContainer from 'containers/submissionsTable/FilterBarContainer';
import SubmissionsTable from './SubmissionsTable';
import SubmissionsTableFilters from './SubmissionsTableFilters';
import FiltersMessage from './filters/FiltersMessage';

const propTypes = {
    loadTableData: PropTypes.func,
    session: PropTypes.object,
    activeSubmissions: PropTypes.array,
    publishedSubmissions: PropTypes.array,
    type: PropTypes.oneOf(['dabs', 'fabs']),
    activeTotal: PropTypes.number,
    publishedTotal: PropTypes.number,
    activeLoading: PropTypes.bool,
    publishedLoading: PropTypes.bool,
    activeError: PropTypes.string,
    publishedError: PropTypes.string,
    toggleDashboardFilter: PropTypes.func,
    updateDashboardFilter: PropTypes.func,
    activeMinDateLastModified: PropTypes.string,
    publishedMinDateLastModified: PropTypes.string,
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object
};

const defaultProps = {
    loadTableData: null,
    session: null,
    activeSubmissions: [],
    publishedSubmissions: [],
    type: '',
    activeTotal: 0,
    publishedTotal: 0,
    activeLoading: false,
    publishedLoading: false,
    activeError: '',
    publishedError: '',
    toggleDashboardFilter: null,
    updateDashboardFilter: null,
    activeMinDateLastModified: '',
    publishedMinDateLastModified: '',
    stagedFilters: {},
    appliedFilters: {}
};

export default class SubmissionsTableContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 1,
            publishedPage: 1,
            filterCounts: {
                dabs: {
                    active: 0,
                    published: 0
                },
                fabs: {
                    active: 0,
                    published: 0
                }
            }
        };

        this.toggleFilter = this.toggleFilter.bind(this);
        this.updateFilterCount = this.updateFilterCount.bind(this);
        this.generateMessage = this.generateMessage.bind(this);
    }

    toggleFilter(table, filter, value) {
        if (filter === 'lastDateModified') {
            this.props.updateDashboardFilter({
                dashboard: this.props.type,
                table,
                filter,
                value
            });
        }
        else {
            this.props.toggleDashboardFilter({
                dashboard: this.props.type,
                table,
                filter,
                value
            });
        }
    }

    /**
     * Use the top filter bar container's internal filter parsing to track the current number of
     * filters applied
     */

    updateFilterCount(count, type, tableType) {
        const dashboard = Object.assign({}, this.state.filterCounts[type], {
            [tableType]: count
        });

        const filterCounts = Object.assign({}, this.state.filterCounts, {
            [type]: dashboard
        });

        this.setState({
            filterCounts
        });
    }

    generateMessage(count) {
        if (count > 0) {
            return (
                <FiltersMessage
                    filterCount={count} />
            );
        }
        return null;
    }

    render() {
        const stagedFilters = this.props.stagedFilters[this.props.type];
        const appliedFilters = this.props.appliedFilters[this.props.type];

        const activeMessage = this.generateMessage(this.state.filterCounts[this.props.type].active);
        const secondMessage = this.generateMessage(this.state.filterCounts[this.props.type].published);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-heading">
                            <h2 className="table-heading__title">Active Submissions</h2>
                            {activeMessage}
                        </div>
                        <SubmissionsTableFilters
                            toggleFilter={this.toggleFilter}
                            stagedFilters={stagedFilters.active}
                            appliedFilters={appliedFilters.active}
                            minDateLastModified={this.props.activeMinDateLastModified}
                            type={this.props.type}
                            table="active" />
                        <FilterBarContainer
                            type={this.props.type}
                            table="active"
                            stagedFilters={stagedFilters.active}
                            appliedFilters={appliedFilters.active}
                            updateFilterCount={this.updateFilterCount} />
                        <SubmissionsTable
                            isLoading={this.props.activeLoading}
                            errorMessage={this.props.activeError}
                            isPublished={false}
                            loadTableData={this.props.loadTableData}
                            appliedFilters={appliedFilters.active}
                            total={this.props.activeTotal}
                            data={this.props.activeSubmissions}
                            page={this.state.activePage}
                            session={this.props.session}
                            type={this.props.type} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-heading">
                            <h2 className="table-heading__title">
                                {this.props.type === 'fabs' ? 'Published Submissions' : 'Published and Certified Submissions'}
                            </h2>
                            {secondMessage}
                        </div>
                        <SubmissionsTableFilters
                            toggleFilter={this.toggleFilter}
                            stagedFilters={stagedFilters.published}
                            appliedFilters={appliedFilters.published}
                            minDateLastModified={this.props.publishedMinDateLastModified}
                            table="published"
                            type={this.props.type} />
                        <FilterBarContainer
                            type={this.props.type}
                            table="published"
                            stagedFilters={stagedFilters.published}
                            appliedFilters={appliedFilters.published}
                            updateFilterCount={this.updateFilterCount} />
                        <SubmissionsTable
                            isLoading={this.props.publishedLoading}
                            errorMessage={this.props.publishedError}
                            loadTableData={this.props.loadTableData}
                            appliedFilters={appliedFilters.published}
                            total={this.props.publishedTotal}
                            data={this.props.publishedSubmissions}
                            page={this.state.publishedPage}
                            session={this.props.session}
                            type={this.props.type} />
                    </div>
                </div>
            </div>
        );
    }
}

SubmissionsTableContent.propTypes = propTypes;
SubmissionsTableContent.defaultProps = defaultProps;
