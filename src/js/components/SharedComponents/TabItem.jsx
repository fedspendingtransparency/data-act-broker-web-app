/**
 * TabItem.jsx
 * Created by Lizzie Salita 4/23/20
 */

import PropTypes from 'prop-types';
import { Link } from 'react-router';

const propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    link: PropTypes.string
};

const defaultProps = {
    onClick: null,
    disabled: false,
    link: ''
};

const TabItem = ({
    label,
    id,
    onClick,
    disabled,
    active,
    link
}) => {
    const activeClass = active ? ' tabs__item_active' : '';
    if (onClick) {
        return (
            <button
                disabled={disabled}
                className={`tabs__item${activeClass}`}
                onClick={() => onClick(id)}>
                {label}
            </button>
        );
    }
    return (
        <Link
            className={`tabs__item ${activeClass}`}
            to={link}>
            {label}
        </Link>
    );
};

TabItem.propTypes = propTypes;
TabItem.defaultProps = defaultProps;
export default TabItem;
