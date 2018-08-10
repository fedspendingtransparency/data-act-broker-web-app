/**
 * DashboardFilters.jsx
 * Created by Lizzie Salita 8/10/18
 */

import React, {PropTypes} from 'react';

const propTypes = {
    updateDashboardFilter: PropTypes.func,
    resetDashboardFilters: PropTypes.func,
    currentFilters: PropTypes.object,
};

export default class DashboardFilters extends React.Component {
    constructor (props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        // TODO - Lizzie: implement submit filters
        console.log(this.props.currentFilters);
    }

    resetForm(e) {
        e.preventDefault();
        this.props.resetDashboardFilters();
    }

    render() {
        return (
            <div className="dashboard-filters-wrapper">
                <form
                    className="dashboard-filters"
                    onSubmit={this.handleSubmit}>
                    Filters Here
                    <button
                        className="dashboard-filters__reset"
                        onClick={this.resetForm}>
                        Reset Filters
                    </button>
                    <input
                        className="btn-primary dashboard-filters__submit"
                        type="submit"
                        value="Submit"/>
                </form>
            </div>
        );
    }
}

DashboardFilters.propTypes = propTypes;
