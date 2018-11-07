/**
 * FYPicker.jsx
 * Created by Lizzie Salita 11/5/18
 */

import React, { PropTypes } from 'react';

import { AngleDown } from '../SharedComponents/icons/Icons';

const propTypes = {
    fy: PropTypes.string,
    pickedYear: PropTypes.func
};

const defaultProps = {
    fy: '',
    pickedYear: null
};

export default class FYPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.toggleList = this.toggleList.bind(this);
        this.clickedYear = this.clickedYear.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    componentWillUnmount() {
        // remove the event listener
        document.removeEventListener('click', this.closeMenu);
    }

    closeMenu(e) {
        if (this.pickerRef && this.pickerRef.contains(e.target)) {
            // user clicked inside the dropdown, don't auto-close because it is the user interacting
            // with the dropdown
            return;
        }
        this.setState({
            expanded: false
        }, () => {
            // remove the event listener
            document.removeEventListener('click', this.closeMenu);
        });
    }

    toggleList(e) {
        e.preventDefault();
        this.setState({
            expanded: !this.state.expanded
        }, () => {
            if (this.state.expanded) {
                // subscribe to click events on the page to auto-close the menu
                document.addEventListener('click', this.closeMenu);
            }
            else {
                // remove the event listener
                document.removeEventListener('click', this.closeMenu);
            }
        });
    }

    clickedYear(e) {
        e.preventDefault();
        this.props.pickedYear(e.target.value);
        this.setState({
            expanded: false
        });
    }

    render() {
        const fy = [];
        // TODO - Lizzie: use helper method
        const currentFY = '2019';
        const earliestFY = '2017';
        for (let year = currentFY; year >= earliestFY; year--) {
            const item = (
                <li
                    key={year}
                    className="fy-picker__list-item">
                    <button
                        className="fy-picker__list-button"
                        value={year}
                        onClick={this.clickedYear}>
                        FY {year}
                    </button>
                </li>
            );

            fy.push(item);
        }

        let visibleClass = 'fy-picker__list_hidden';
        if (this.state.expanded) {
            visibleClass = '';
        }

        return (
            <div
                className="fy-picker"
                ref={(div) => {
                    this.pickerRef = div;
                }}>
                <div className="fy-picker__header">
                    <div className="fy-picker__dropdown-container">
                        <button
                            className="fy-picker__button"
                            onClick={this.toggleList}>
                            <div className="fy-picker__button-text">
                                FY {this.props.fy}
                            </div>
                            <div className="fy-picker__button-icon">
                                <AngleDown alt="Toggle menu" />
                            </div>
                        </button>
                        <ul className={`fy-picker__list ${visibleClass}`}>
                            {fy}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

FYPicker.propTypes = propTypes;
FYPicker.defaultProps = defaultProps;
