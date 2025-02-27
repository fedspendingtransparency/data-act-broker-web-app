/**
 * ActiveDashboardContainer.jsx
 * Created by Lizzie Salita 3/9/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEqual, cloneDeep } from 'lodash';
import { connect } from 'react-redux';
import { fetchSubmissions } from 'helpers/dashboardHelper';
import ActiveDashboard from 'components/dashboard/ActiveDashboard';
import NoResultsMessage from 'components/dashboard/NoResultsMessage';
import LoadingMessage from 'components/dashboard/LoadingMessage';
import SelectSubmissionTable from 'components/dashboard/SelectSubmissionTable';

const propTypes = {
    appliedFilters: PropTypes.shape({
        filters: PropTypes.shape({
            active: PropTypes.shape({
                agency: PropTypes.shape({
                    code: PropTypes.string,
                    name: PropTypes.string
                }),
                createdBy: PropTypes.shape({
                    name: PropTypes.string,
                    id: PropTypes.number
                }),
                lastModified: PropTypes.shape({
                    from: PropTypes.instanceOf(Date),
                    to: PropTypes.instanceOf(Date)
                }),
                submissionId: PropTypes.string,
                file: PropTypes.string
            }),
            historical: PropTypes.object
        }),
        _activeEmpty: PropTypes.bool,
        _historicalEmpty: PropTypes.bool
    })
};

export class ActiveDashboardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            errorMessage: '',
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
        this.clearSubmission = this.clearSubmission.bind(this);
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
            errorMessage: '',
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
            agency_codes: [filters.agency.code]
        };
        if (filters.lastModified?.from || filters.lastModified?.to) {
            const modDates = cloneDeep(filters.lastModified);
            payload.last_modified_range = {
                start_date: modDates?.from ? moment(modDates?.from).format('MM/DD/YYYY') : '',
                end_date: modDates?.to ? moment(modDates?.to).format('MM/DD/YYYY') : ''
            };
        }
        if (filters.submissionId) {
            payload.submission_ids = [filters.submissionId];
        }
        if (filters.createdBy?.id) {
            payload.user_ids = [filters.createdBy?.id];
        }
        fetchSubmissions({
            filters: payload,
            published: 'false',
            sort: this.state.sort,
            order: this.state.order,
            limit: this.state.limit,
            page: this.state.page
        })
            .then((data) => {
                this.parseResults(data);
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    loading: false,
                    errorMessage: error.message
                });
            });
    }

    clearSubmission() {
        this.setState({
            submission: ''
        });
    }

    render() {
        if (this.state.loading) {
            return (<LoadingMessage />);
        }
        if (this.state.errorMessage) {
            return (
                <NoResultsMessage>
                    Error: {this.state.errorMessage}
                </NoResultsMessage>
            );
        }
        if (this.state.totalItems === 0) {
            return (
                <NoResultsMessage>
                    No submissions were found matching these criteria.<br />
                    Please try a different set of filters.
                </NoResultsMessage>
            );
        }
        if (this.state.submission) {
            return (<ActiveDashboard
                submissionID={this.state.submission}
                numResults={this.state.results.length}
                backToList={this.clearSubmission} />);
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
