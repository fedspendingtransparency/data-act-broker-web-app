/**
  * helpSidebarItem.jsx
  * Created by Kevin li 5/26/16
  */

import React, { PropTypes } from 'react';

const propTypes = {
    sectionId: PropTypes.string,
    sectionName: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    sectionId: '',
    sectionName: '',
    type: ''
};

export default class HelpSidebarItem extends React.Component {
    render() {
        const help = this.props.type === 'fabs' ? '/#/FABShelp' : '/#/help';
        return (
            <li>
                <a href={`${help}?section=${this.props.sectionId}`}>
                    {this.props.sectionName}
                </a>
            </li>
        );
    }
}

HelpSidebarItem.propTypes = propTypes;
HelpSidebarItem.defaultProps = defaultProps;
