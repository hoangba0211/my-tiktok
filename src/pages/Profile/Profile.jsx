import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { faCircleCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

// Local
import styles from './Profile.module.scss';
import Button from '~/components/Button';
import ProfileTab from '~/components/ProfileTab/ProfileTab';
import { getProfile } from '~/services/profileService';
import Image from '~/components/Images';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function Profile() {
    const { nickname } = useParams();
    const [profile, setProfile] = useState({});
    const [isFollow, setIsFollow] = useState(false);
    useEffect(() => {
        console.log(1);
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty('--default-layout-content-width', '100%');
        rootStyle.setProperty('--default-layout-width', '100%');
        rootStyle.setProperty('--sidebar-width', '240px');

        return () => {
            rootStyle.setProperty('--default-layout-content-width', '692px');
            rootStyle.setProperty('--default-layout-width', '1150px');
            rootStyle.setProperty('--sidebar-width', '356px');
        };
    }, []);

    useEffect(() => {
        getProfile(nickname)
            .then((data) => {
                setProfile(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [nickname]);

    const handleStatusFollow = () => {
        setIsFollow((prev) => !prev);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <div className={cx('avatar')}>
                        <Image src={profile.avatar} alt="avatar" />
                    </div>
                    <div className={cx('title')}>
                        <h2 className={cx('nickname')}>
                            {profile.nickname}
                            {profile.tick && (
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon
                                        icon={faCircleCheck}
                                        style={{ color: '#20D5EC', fontSize: '2rem' }}
                                    />
                                </span>
                            )}
                        </h2>

                        <p className={cx('name')}>{`${profile.first_name} ${profile.last_name}`}</p>
                        {!isFollow ? (
                            <div className={cx('follow-btn')}>
                                <Button className={cx('follow')} primary onClick={handleStatusFollow}>
                                    Follow
                                </Button>
                            </div>
                        ) : (
                            <div className={cx('follow-btn')}>
                                <Button className={cx('messages')} outline>
                                    Messages
                                </Button>
                                <Tippy content="Unfollow" placement="bottom">
                                    <button button className={cx('unfollow')} onClick={handleStatusFollow}>
                                        <img src={images.unfollow} alt="unfollow" />
                                    </button>
                                </Tippy>
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('count-info')}>
                    <div className={cx('number')}>
                        <strong>{profile.followings_count}</strong>
                        <span>Following</span>
                    </div>
                    <div className={cx('number')}>
                        <strong>{profile.followers_count}</strong>
                        <span>Followers</span>
                    </div>
                    <div className={cx('number')}>
                        <strong>{profile.likes_count}</strong>
                        <span>Likes</span>
                    </div>
                </div>
                <div className={cx('bio')}>{profile.bio ? <p>{profile.bio}</p> : <p>No bio yet.</p>}</div>
                <div className={cx('link')}>
                    <Link>
                        <img src={images.link} alt="link" />
                        <span>youtu.be/r7WQvfBHV8Q</span>
                    </Link>
                </div>
                <div className={cx('actions', 'share')}>
                    <img src={images.share} alt="share" />
                </div>
                <div className={cx('actions', 'more')}>
                    <img src={images.menu} alt="more" />
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('tab')}>
                    <p className={cx('video')}>Videos</p>
                    <p className={cx('liked')}>
                        <FontAwesomeIcon icon={faLock} />
                        Likes
                    </p>

                    <div className={cx('bottom-line')}></div>
                </div>
                <div className={cx('list')}>
                    <ProfileTab />
                </div>
            </div>
        </div>
    );
}

export default Profile;
