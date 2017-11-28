/**
* GTASWarningBanner.jsx
* Created by Minahm Kim 07/07/17
*/

import React, { PropTypes } from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';
import * as ReviewHelper from '../../helpers/reviewHelper.js';

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
            type: this.props.type,
            appWindow: []
        };
    }

    componentDidMount() {
        this.isWindow();
    }

    componentWillReceiveProps(nextProps) {
        let type = null;
        if (this.state.type !== nextProps.type) {
            type = nextProps.type;
        }
        if (type && type !== this.state.type) {
            this.setState({
                type
            });
            this.isWindow();
        }
    }

    getRows() {
        const msg = [];
        for (let i = 0; i < this.state.appWindow.length; i++) {
            msg.push(
                <div key={'banner' + i} className="published-submission-warning-banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-1">
                                <i className="usa-da-icon"><Icons.ExclamationTriangle /> </i>
                            </div>
                            <div className="col-xs-11">
                                <p>{this.state.appWindow[i].message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return msg;
    }

    isWindow() {
        ReviewHelper.isWindow()
            .then((res) => {
                if (!res.data) {
                    return;
                }
                const appWindow = [];
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].type.toLowerCase() === this.state.type.toLowerCase() ||
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
        const message = this.getRows();
        return (
            <div>
                {message}
            </div>
        );
    }
}

Banner.propTypes = propTypes;
Banner.defaultProps = defaultProps;
