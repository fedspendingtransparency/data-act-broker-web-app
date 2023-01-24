/**
 * FooterComponent.jsx
 * Created by Mike Bray 12/26/15
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Footer extends React.Component {
    render() {
        const year = new Date().getFullYear();
        return (
            <div className="usa-da-footer" role="contentinfo">
                <div>
                    &copy; {year}&nbsp;
                    <a href="https://www.usaspending.gov/" rel="noopener noreferrer" target="_blank">
                        USAspending.gov
                    </a>
                </div>
                <div className="right">
                    <a
                        href="https://github.com/fedspendingtransparency/data-act-broker-backend"
                        rel="noopener noreferrer"
                        target="_blank">
                        <FontAwesomeIcon icon={['fab', 'github']} />
                    </a>
                    
                </div>
            </div>
        );
    }
}
