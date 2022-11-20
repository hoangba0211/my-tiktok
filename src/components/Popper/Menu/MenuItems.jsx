import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';


const cx = classNames.bind(styles);

function MenuItems({ data, onClick }) {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    useEffect(() => {
        if (!data.to) {
            data.to = `/@${user}`;
        } 
    }, []);

    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}
MenuItems.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};
export default MenuItems;
