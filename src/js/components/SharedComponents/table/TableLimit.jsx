/**
  * TableLimit.jsx
  * Created by Alisa Burdeyny 11/15/19
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    changeLimit: PropTypes.func.isRequired,
    pageLimit: PropTypes.number,
    limitList: PropTypes.array
};

const defaultProps = {
    pageLimit: 10,
    limitList: [10, 25, 50, 100]
};

export default class TableLimit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayDropdown: false
        };

        this.setVisibility = this.setVisibility.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
        this.changeLimit = this.changeLimit.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.hideDropdown, false);
    }

    componentWillUnmount() {
        document.addEventListener('mousedown', this.hideDropdown, false);
    }

    setVisibility() {
        this.setState({
            displayDropdown: !this.state.displayDropdown
        });
    }

    hideDropdown(e) {
        if (this.selector.contains(e.target)) {
            return;
        }

        if (this.state.displayDropdown) {
            this.setState({
                displayDropdown: false
            });
        }
    }

    changeLimit(e) {
        const targetId = parseInt(e.target.dataset.id, 10);
        this.setState({
            displayDropdown: false
        }, () => {
            this.props.changeLimit(targetId);
        });
    }

    render() {
        let dropdownClass = 'table-limit-selector__dropdown';
        if (!this.state.displayDropdown) {
            dropdownClass += ' hidden';
        }

        const limitList = this.props.limitList.map((limit) => {
            if (this.props.pageLimit !== limit) {
                return (
                    <li
                        key={`limit-${limit}`}
                        className="list-item">
                        <button
                            data-id={limit}
                            onClick={this.changeLimit}>
                            {limit}
                        </button>
                    </li>);
            }
            return null;
        });
        return (
            <div
                ref={(s) => {
                    this.selector = s;
                }}
                className="table-limit-selector">
                <button
                    className="table-limit-selector__main"
                    onClick={this.setVisibility}>
                    {this.props.pageLimit}
                    <FontAwesomeIcon icon="chevron-down" />
                </button>
                <ul className={dropdownClass}>
                    {limitList}
                </ul>
            </div>
        );
    }
}

TableLimit.propTypes = propTypes;
TableLimit.defaultProps = defaultProps;
