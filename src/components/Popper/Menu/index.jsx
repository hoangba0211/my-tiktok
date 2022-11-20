import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import Popper from '~/components/Popper';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItems from './MenuItems';
import Header from './Header';

const cx = classNames.bind(styles);
const defaultFn = () => {};
function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    // Local State
    const [historys, setHistorys] = useState([{ data: items }]);
    const current = historys[historys.length - 1];

    useEffect(() => {
        setHistorys([{data:items}])
    },[items])
    // Handle Function
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItems
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistorys((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <div>
            <Tippy
                delay={[0, 500]}
                offset={[16, 8]}
                hideOnClick={hideOnClick}
                interactive
                placement="bottom-end"
                onHide={() => setHistorys((prev) => prev.slice(0, 1))}
                render={(attrs) => (
                    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                        <Popper className={cx('menu-popper')}>
                            {historys.length > 1 && (
                                <Header
                                    title="Language"
                                    onBack={() => {
                                        setHistorys((prev) => prev.slice(0, prev.length - 1));
                                    }}
                                />
                            )}
                            <div className={cx('menu-body')}>{renderItems()}</div>
                        </Popper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

Menu.propTypes = {
    children:PropTypes.node,
    item: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func
}
export default Menu;
