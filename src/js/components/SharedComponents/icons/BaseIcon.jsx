/**
  * BaseIcon.jsx
  * Created by Kevin Li 4/25/2016
  */

import React, { PropTypes } from 'react';
import svg4everybody from 'svg4everybody';
import IconSingleton from './iconSingleton';

const propTypes = {
    alt: PropTypes.string,
    iconClass: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired
};

const defaultProps = {
    alt: ''
};

export default class BaseIcon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            icon: {
                data: '',
                viewBox: '0 0 0 0'
            }
        };

        this.iconSingleton = IconSingleton;
        this.subscription = null;
    }
    componentDidMount() {
        // download icons if necessary, otherwise populate the correct state
        this.prepareIcons();

        // necessary for IE support
        svg4everybody({
            polyfill: true
        });
    }
    componentWillUnmount() {
        // unsubscribe to reduce memory overhead, if we have a subscription active
        if (this.subscription) {
            this.iconSingleton.unsubscribe(this.subscription);
        }
    }

    prepareIcons() {
        // check to see if anyone has started the download process
        if (!this.iconSingleton.svgLoaded) {
            // no icons available, subscribe to the singleton to be notified when they are ready
            this.subscription = this.iconSingleton.subscribe(this.svgEvent.bind(this));
            // check to see if they are in the process of being downloaded
            if (!this.iconSingleton.svgRequested) {
                // not requested either, let's request it now
                this.iconSingleton.downloadIcons();
            }
        }
        else {
            // icons are ready
            this.displayIcon();
        }
    }

    displayIcon() {
        // set the state to the correct SVG data
        if (this.iconSingleton.svgCache.hasOwnProperty(this.props.iconName)) {
            this.setState({
                icon: this.iconSingleton.svgCache[this.props.iconName]
            });
        }
    }

    svgEvent() {
        // icons have loaded, unsubscribe to reduce memory overhead
        this.iconSingleton.unsubscribe(this.subscription);
        this.subscription = null;

        // display the icon
        this.displayIcon();
    }

    render() {
        return (
            <svg
                className={this.props.iconClass}
                viewBox={this.state.icon.viewBox}
                key={this.state.icon.data}
                aria-label={this.props.alt}>
                <title>{this.props.alt}</title>
                <g dangerouslySetInnerHTML={{ __html: this.state.icon.data }} />
            </svg>
        );
    }
}

BaseIcon.propTypes = propTypes;
BaseIcon.defaultProps = defaultProps;
