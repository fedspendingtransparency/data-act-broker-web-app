/**
 * SubmissionTypeFilterDropdown.jsx
 * Created by Alisa Burdeyny 08/27/2020
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onSelect: PropTypes.func
};

const defaultProps = {
    onSelect: () => {}
};

export default class SubmissionTypeFilterDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.setDropdownNodeRef = (element) => {
            this.dropdownNode = element;
        };

        this.state = {
            dropdownopen: false
        };

        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.testButtonClicked = this.testButtonClicked.bind(this);
        this.certifiableButtonClicked = this.certifiableButtonClicked.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick, false);
    }

    onDropdownChange() {
        const currentState = this.state.dropdownopen;
        this.setState({
            dropdownopen: !currentState
        });
    }

    handleOutsideClick(e) {
        if (this.dropdownNode && this.dropdownNode.contains(e.target)) {
            return false;
        }
        this.setState({
            dropdownopen: false
        });
        return true;
    }

    testButtonClicked() {
        this.props.onSelect('test');
        this.onDropdownChange();
    }

    certifiableButtonClicked() {
        this.props.onSelect('certifiable');
        this.onDropdownChange();
    }

    render() {
        return (
            <div className="dropdown filterdropdown" ref={this.setDropdownNodeRef}>
                <button
                    onClick={this.onDropdownChange}
                    className={
                        this.state.dropdownopen ?
                            'btn btn-default dropdown-toggle active' : 'btn btn-default dropdown-toggle'
                    }
                    type="button"
                    id="submissiontypedropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true">
                Submission Type
                    <span className="caret" />
                </button>
                <div
                    className="dropdown-menu submission-type-dropdown"
                    style={this.state.dropdownopen ? { display: 'block' } : { display: 'none' }}
                    aria-labelledby="submissiontypedropdown">
                    <ul>
                        <li>
                            <button onClick={this.testButtonClicked}>Test Submissions</button>
                        </li>
                        <li>
                            <button onClick={this.certifiableButtonClicked}>Certifiable Submissions</button>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}

SubmissionTypeFilterDropdown.defaultProps = defaultProps;
SubmissionTypeFilterDropdown.propTypes = propTypes;
