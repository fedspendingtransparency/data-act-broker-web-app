/**
* Banner.jsx
* Created by Minahm Kim 07/07/17
*/

import React from 'react';
import PropTypes from 'prop-types';
import BannerRow from './BannerRow';

import * as ReviewHelper from '../../helpers/reviewHelper';

const propTypes = {
    type: PropTypes.string
};

const defaultProps = {
    type: 'all'
};

export default class Banner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            appWindow: []
        };
    }

    componentDidMount() {
        this.isWindow();
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            this.isWindow();
        }
    }

    isWindow() {
        ReviewHelper.isWindow()
            .then((res) => {
                if (!res.data) {
                    return;
                }
                const appWindow = [];
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].type.toLowerCase() === this.props.type.toLowerCase() ||
                        res.data[i].type.toLowerCase() === 'all') {
                        appWindow.push(res.data[i]);
                    }
                }
                if (appWindow.length !== 0) {
                    this.setState({ appWindow });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        const rows = this.state.appWindow.map((window) =>
            (
                <BannerRow
                    key={window.message}
                    type={window.banner_type}
                    header={window.header}
                    message={window.message} />));
        return (
            <div role="banner">
                {rows}
            </div>
        );
    }
}

Banner.propTypes = propTypes;
Banner.defaultProps = defaultProps;
