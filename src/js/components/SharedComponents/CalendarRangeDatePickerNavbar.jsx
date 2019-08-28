import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onPreviousClick: PropTypes.func,
    onNextClick: PropTypes.func,
    className: PropTypes.string
};

const defaultProps = {
    onPreviousClick: null,
    onNextClick: null,
    className: ''
};

export default function Navbar({
    onPreviousClick,
    onNextClick,
    className
}) {
    return (
        <div className={className}>
            <button onClick={() => onPreviousClick()}> ← </button>
            <button onClick={() => onNextClick()}> → </button>
        </div>
    );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;
