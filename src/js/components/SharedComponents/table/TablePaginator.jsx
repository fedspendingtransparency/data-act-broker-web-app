/**
  * TablePaginator.jsx
  * Created by Kevin Li 10/31/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import TablePaginatorArrow from 'components/SharedComponents/table/TablePaginatorArrow';
import TablePaginatorItem from './TablePaginatorItem';

const propTypes = {
    changePage: PropTypes.func,
    current: PropTypes.number,
    total: PropTypes.number
};

const defaultProps = {
    current: 1,
    total: 1,
    changePage: null
};

export default class TablePaginator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: []
        };
    }

    componentDidMount() {
        this.generatePages();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.generatePages();
        }
    }

    moveDirection(direction) {
        if (direction === 'left') {
            // go back a page
            this.props.changePage(this.props.current - 1);
        }
        else {
            // go forward a page
            this.props.changePage(this.props.current + 1);
        }
    }

    generatePages() {
        const items = [];

        let start = 1;

        // base the starting page on the total page count if we're near the end
        if ((this.props.total - this.props.current) < 3 && this.props.total > 4) {
            start = this.props.total - 2;
        }
        // otherwise, keep the current page in the center of the list
        else if (this.props.total > 2 && this.props.current > 3) {
            start = this.props.current - 1;
        }

        let end = start + 2;
        if (end > this.props.total) {
            end = this.props.total;
        }

        if (start !== 1) {
            const firstItem = (<TablePaginatorItem
                key={1}
                value={1}
                current={this.props.current === 1}
                showTail={start > 2}
                changePage={this.props.changePage} />);
            items.push(firstItem);
        }

        for (let i = start; i <= end; i++) {
            const item = (<TablePaginatorItem
                key={i}
                value={i}
                current={i === this.props.current}
                changePage={this.props.changePage} />);
            items.push(item);
        }

        if (end !== this.props.total) {
            const lastItem = (<TablePaginatorItem
                key={this.props.total}
                value={this.props.total}
                current={this.props.current === this.props.total}
                showLead={end < this.props.total}
                changePage={this.props.changePage} />);
            items.push(lastItem);
        }

        this.setState({
            pages: items
        });
    }

    render() {
        let prevButton = <TablePaginatorArrow direction="left" moveDirection={this.moveDirection.bind(this)} />;
        let nextButton = <TablePaginatorArrow direction="right" moveDirection={this.moveDirection.bind(this)} />;

        if (this.props.current === 1) {
            prevButton = null;
        }

        if (this.props.current === this.props.total) {
            nextButton = null;
        }

        return (
            <div className="table-paginator">
                <ul>
                    {prevButton}
                    {this.state.pages}
                    {nextButton}
                </ul>
            </div>
        );
    }
}

TablePaginator.propTypes = propTypes;
TablePaginator.defaultProps = defaultProps;