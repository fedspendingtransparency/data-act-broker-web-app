/**
 * ActiveDashboardContainer.jsx
 * Created by Lizzie Salita 3/9/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import { fetchSubmissions } from 'helpers/dashboardHelper';
import ActiveDashboard from 'components/dashboard/ActiveDashboard';
import NoResultsMessage from 'components/dashboard/NoResultsMessage';
import LoadingMessage from 'components/dashboard/LoadingMessage';
import SelectSubmissionTable from 'components/dashboard/SelectSubmissionTable';

const propTypes = {
    appliedFilters: PropTypes.object
};

export class ActiveDashboardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            error: false,
            loading: false,
            submission: '',
            sort: 'reporting_start',
            order: 'desc',
            limit: 10,
            page: 1,
            totalItems: 0
        };

        this.changeLimit = this.changeLimit.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.setSubmission = this.setSubmission.bind(this);
    }

    componentDidMount() {
        if (!this.props.appliedFilters._activeEmpty) {
            this.loadSubmissions();
        }
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.appliedFilters.filters.active, this.props.appliedFilters.filters.active)) {
            // Reset to page 1 when the filters change
            this.changePage(1);
        }
    }

    setSubmission(submission) {
        this.setState({
            submission
        });
    }

    changePage(page) {
        this.setState({
            page
        }, () => this.loadSubmissions());
    }

    changeLimit(limit) {
        this.setState({
            limit,
            page: 1
        }, () => this.loadSubmissions());
    }

    changeSort(sort, order) {
        this.setState({
            sort,
            order,
            page: 1
        }, () => this.loadSubmissions());
    }

    parseResults(data) {
        let submission = '';
        if (data.total === 1) {
            submission = `${data.submissions[0].submission_id}`;
        }
        this.setState({
            loading: false,
            results: data.submissions,
            totalItems: data.total,
            submission
        });
    }

    loadSubmissions() {
        this.setState({
            loading: true
        });
        const filters = this.props.appliedFilters.filters.active;
        const payload = {
            agency_codes: [filters.agency]
        };
        if (filters.lastModified.start || filters.lastModified.end) {
            payload.last_modified_range = {
                start_date: filters.lastModified.start,
                end_date: filters.lastModified.end
            };
        }
        if (filters.submissionId) {
            payload.submission_ids = [filters.submissionId];
        }
        if (filters.createdBy.id) {
            payload.user_ids = [filters.createdBy.id];
        }
        fetchSubmissions({
            filters: payload,
            certified: 'false',
            sort: this.state.sort,
            order: this.state.order,
            limit: this.state.limit,
            page: this.state.page
        })
            .then((data) => {
                this.parseResults(data);
            })
            .catch(() => {
                this.setState({
                    error: true,
                    loading: false
                });
            });
    }

    render() {
        if (this.state.loading) {
            return (<LoadingMessage />);
        }
        if (this.state.totalItems === 0 || this.state.error) {
            return (<NoResultsMessage />);
        }
        if (this.state.submission) {
            return (<ActiveDashboard submissionID={this.state.submission} />);
        }
        return (
            <SelectSubmissionTable
                {...this.state}
                clickedSubmission={this.setSubmission}
                changeSort={this.changeSort}
                changeLimit={this.changeLimit}
                changePage={this.changePage} />
        );
    }
}

ActiveDashboardContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters
    })
)(ActiveDashboardContainer);
