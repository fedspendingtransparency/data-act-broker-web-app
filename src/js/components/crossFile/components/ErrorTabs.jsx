/**
  * ErrorTabs.jsx
  * Created by Kevin Li 8/29/16
  **/

import React from 'react';

class TabItem extends React.Component {
    clickedTab(e) {
        e.preventDefault();
        this.props.changeTab(this.props.value);
    }
    render() {
        let activeClass = '';
        if (this.props.isActive) {
            activeClass = ' active';
        }

        return (
            <a href="#" className={"tab-item" + activeClass} onClick={this.clickedTab.bind(this)}>
                {this.props.label}
                <span className="count-badge">
                    {this.props.count}
                </span>
            </a>
        );
    }
}

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
            tabs: tabs
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

ErrorTabs.defaultProps = defaultProps;
