import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import routesConfig from '~/config/routes';
import Button from '~/components/Button';
import style from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Search from '../Search/Search';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const cx = classNames.bind(style);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];
// Handle logic
const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
        case 'language':
            // Handle change language
            break;
        default:
    }
};
function Header() {
    const token = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.user);

    const USER =    JSON.parse(localStorage.getItem('user'))
    const TOKEN =    localStorage.getItem('Token')
    // console.log(USER);
    const [userInfo, setUserInfo] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!USER) {
            setUserInfo('')
            setIsOpen(false)
            return;
        }
        axios
            .get(`https://tiktok.fullstack.edu.vn/api/users/@${USER.nickname}`)
            .then((res) => {
                setUserInfo(res.data.data)
            })
            .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [TOKEN]);
    const handleLogin = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={routesConfig.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="TikTok" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {!!TOKEN ? (
                        <>
                            <Tippy content="UpLoad video" placement="bottom" offset={[10, 10]}>
                                <Link to={routesConfig.upload} className={cx('action-btn')}>
                                    <UploadIcon />
                                </Link>
                            </Tippy>
                            <Tippy content="Messeage" placement="bottom" offset={[10, 10]}>
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" placement="bottom" offset={[10, 10]}>
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text onClick={handleLogin}>
                                Upload
                            </Button>

                            <Button primary onClick={handleLogin}>
                                Log in
                            </Button>
                            <ModalLogin open={isOpen} onClose={handleLogin} />
                        </>
                    )}
                    <Menu items={TOKEN ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {!!TOKEN ? (
                            <Link to={`/@${user}`}><img className={cx('user-avatar')} src={userInfo.avatar} alt="avatar" /></Link>
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
