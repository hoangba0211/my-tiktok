import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import Menu from './Menu/Menu';
import MenuItem from './Menu/MenuItem';
import styles from './Sidebar.module.scss';
import routes from '~/config/routes';
import { HomeActiveIcon, HomeIcon, LiveIcon, UsersActiveIcon, UsersIcon } from '~/components/Icons';
import SidebarAccounts from '~/components/SidebarAccount/SidebarAccounts';
import { getSuggested } from '~/services/userService';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;
function Siderbar() {
    // Global State
    const token = useSelector((state) => state.user.token);

    // Local State
    const [page, setPage] = useState(INIT_PAGE);
    const [pageFollowing, setPageFollowing] = useState(INIT_PAGE);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);

    useEffect(() => {
        getSuggested({ page, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUsers([...suggestedUsers, ...data]);
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        if (!token) {
            setFollowingUsers([]);
            return;
        }
        axios
            .get(`https://tiktok.fullstack.edu.vn/api/me/followings?page=${pageFollowing}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setFollowingUsers(res.data.data);
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageFollowing, token]);

    const handleSeeAll = () => {
        setPage(page + 1);
    };
    const handleSeeAllFollowing = () => {
        setPageFollowing(pageFollowing + 1);
    };
    return (
        <div className={cx('nav')}>
            <div className={cx('wrapper')}>
                <div className={cx('scroll-sidebar')}>
                    <div className={cx('sidebar')}>
                        <Menu className={cx('menu')}>
                            <MenuItem
                                title="For You"
                                to={routes.home}
                                icon={<HomeIcon />}
                                activeIcon={<HomeActiveIcon />}
                            />
                            <MenuItem
                                title="Following"
                                to={routes.following}
                                icon={<UsersIcon />}
                                activeIcon={<UsersActiveIcon />}
                            />
                            <MenuItem
                                title="LIVE"
                                to={routes.live}
                                icon={<LiveIcon />}
                                activeIcon={<UsersActiveIcon />}
                            />
                        </Menu>
                        {!token && (
                            <div className={cx('frame')}>
                                <p>Log in to follow creators, like videos, and view comments.</p>
                                <Button outline className={cx('login-btn')}>
                                    Log in
                                </Button>
                            </div>
                        )}
                        <SidebarAccounts label="Suggested accounts" data={suggestedUsers} onSeeAll={handleSeeAll} />
                        {token && (
                            <SidebarAccounts
                                label="Following accounts"
                                data={followingUsers}
                                onSeeAll={handleSeeAllFollowing}
                            />
                        )}
                    </div>
                    <div className={cx('srcoll')}></div>
                </div>
            </div>
        </div>
    );
}

export default Siderbar;
