/**
  * ErrorTabs.jsx
  * Created by Kevin Li 8/29/16
  */

import React, { PropTypes } from 'react';
import * as TabItem from './TabItem';

const propTypes = {
    changeTab: PropTypes.func,
    counts: PropTypes.object,
    activeTab: PropTypes.string,
    label: PropTypes.string,
    status: PropTypes.string,
    value: PropTypes.string,
    count: PropTypes.number,
    isActive: PropTypes.bool,
    showTabs: PropTypes.string
};

const defaultProps = {
    showTabs: "both",
    counts: {
        errors: 0,
        warnings: 0
    }
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
        const tabs = this.state.tabs.map((tab, index) => {
            return <TabItem {...tab} key={index} changeTab={this.props.changeTab} />;
        });

        return (
            <div className="error-tabs">
                {tabs}
            </div>
        );
    }
}

ErrorTabs.propTypes = propTypes;
ErrorTabs.defaultProps = defaultProps;
