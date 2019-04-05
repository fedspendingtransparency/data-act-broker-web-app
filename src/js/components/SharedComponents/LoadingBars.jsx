/**
 * LoadingScreen.jsx
 * Copied from USASpending by Jonathan Hill 03/19/19
 */

import React from 'react';

const LoadingBars = () => (
    <div className="loading-animation">
        <svg
            className="loading-bars"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="50"
            height="50"
            style={{
                opacity: 0
            }}>
            <rect
                className="bar-one"
                x="0"
                y="0"
                height="50"
                width="10" />
            <rect
                className="bar-two"
                x="13"
                y="0"
                height="50"
                width="10" />
            <rect
                className="bar-three"
                x="26"
                y="0"
                height="50"
                width="10" />
            <rect
                className="bar-four"
                x="39"
                y="0"
                height="50"
                width="10" />

        </svg>
    </div>
);

export default LoadingBars;
