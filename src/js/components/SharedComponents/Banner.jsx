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
            bannerList: []
        };
    }

    componentDidMount() {
        this.getBanners();
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            this.getBanners();
        }
    }

    getBanners() {
        ReviewHelper.listBanners(this.props.type === "login")
            .then((res) => {

                if (!res.data.data) {
                    return;
                }
                const bannerList = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i].type.toLowerCase() === this.props.type.toLowerCase() ||
                        res.data.data[i].type.toLowerCase() === 'all') {
                        bannerList.push(res.data.data[i]);
                    }
                }
                if (bannerList.length !== 0) {
                    this.setState({ bannerList });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        const rows = this.state.bannerList.map((banner) =>
            (
                <BannerRow
                    key={banner.message}
                    type={banner.banner_type}
                    header={banner.header}
                    message={banner.message} />));
        return (
            <div role="banner">
                {rows}
            </div>
        );
    }
}

Banner.propTypes = propTypes;
Banner.defaultProps = defaultProps;
