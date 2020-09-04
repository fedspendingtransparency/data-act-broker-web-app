/**
  * ErrorTabs.jsx
  * Created by Kevin Li 8/29/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import TabItem from './TabItem';

const propTypes = {
    changeTab: PropTypes.func,
    counts: PropTypes.object,
    activeTab: PropTypes.string,
    status: PropTypes.string
};

const defaultProps = {
    counts: {
        errors: 0,
        warnings: 0
    },
    changeTab: null,
    activeTab: '',
    status: ''
};

export default class ErrorTabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: []
        };
    }

    componentDidMount() {
        this.buildTabs();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status || prevProps.activeTab !== this.props.activeTab) {
            this.buildTabs();
        }
    }

    buildTabs() {
        const tabs = [];

        const errors = {
            label: "Cross-File Validation Errors",
            value: "errors",
            isActive: true,
            count: this.props.counts.errors
        };
        const warnings = {
            label: "Cross-File Validation Warnings",
            value: "warnings",
            isActive: false,
            count: this.props.counts.warnings
        };

        if (this.props.activeTab === "warnings") {
            warnings.isActive = true;
            errors.isActive = false;
        }

        if (this.props.status === "error") {
            tabs.push(errors);
            tabs.push(warnings);
        }
        else if (this.props.status === "warning") {
            tabs.push(warnings);
        }

        this.setState({
            tabs
        });
    }

    render() {
        const tabs = this.state.tabs.map((tab) =>
            (<TabItem
                label={tab.value}
                count={tab.count}
                value={tab.value}
                isActive={tab.isActive}
                key={tab.value}
                changeTab={this.props.changeTab} />)
        );

        return (
            <div className="error-tabs">
                {tabs}
            </div>
        );
    }
}

ErrorTabs.propTypes = propTypes;
ErrorTabs.defaultProps = defaultProps;
