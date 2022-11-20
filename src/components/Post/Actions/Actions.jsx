import React, { useState } from 'react';
import { faCode, faCommentDots, faHeart, faLink, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './Actions.module.scss';
import Button from '~/components/Button';
import {
    faFacebook,
    faLinkedin,
    faReddit,
    faSquareWhatsapp,
    faTelegram,
    faTelegramPlane,
    faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);
// eslint-disable-next-line no-unused-vars
const shares = [
    {
        icon: <FontAwesomeIcon icon={faCode} />,
        title: 'Embed',
        to: '',
    },
    {
        icon: <FontAwesomeIcon icon={faTelegram} />,
        title: 'Send to friends',
        to: '',
    },
    {
        icon: <FontAwesomeIcon icon={faFacebook} />,
        title: 'Share to Facebook',
        to: '',
    },
    {
        icon: <FontAwesomeIcon icon={faSquareWhatsapp} />,
        title: 'share to WhatsApp',
        to: '',
    },
    {
        icon: <FontAwesomeIcon icon={faLink} />,
        title: 'Copy link',
        to: '',
    },
    {
        icon: <FontAwesomeIcon icon={faTwitterSquare} />,
        title: 'Share to Twitter',
        to: '',
    },
    {
        icon: <FontAwesomeIcon icon={faLinkedin} />,
        title: 'Share to Linkedln',
        to: '',
    },
    {
        icon: <FontAwesomeIcon icon={faReddit} />,
        title: 'Share to Reddit',
        to: '',
    },
    {
        icon: <FontAwesomeIcon icon={faTelegramPlane} />,
        title: 'Share to Telegram',
        to: '',
    },
];
function Actions({ data }) {
    const [relax, setRelax] = useState(data.is_Like);
    const handleOnRelax = () => {
        setRelax((prev) => !prev);
    };
    return (
        <div className={cx('video-action')}>
            <div className={cx('action')} onClick={handleOnRelax}>
                <Button rounded className={cx('action-btn')}>
                    <FontAwesomeIcon
                        className={cx('icon', {
                            [styles.relax]: relax,
                        })}
                        icon={faHeart}
                        style={{ fontSize: '2rem' }}
                    />
                </Button>
                <strong className={cx('action-count')}>{data.likes_count}</strong>
            </div>

            <div className={cx('action')}>
                <Button rounded className={cx('action-btn')}>
                    <FontAwesomeIcon style={{ fontSize: '2rem' }} className={cx('icon')} icon={faCommentDots} />
                </Button>
                <strong className={cx('action-count')}>{data.comments_count}</strong>
            </div>

            <div className={cx('action')}>
                <Button rounded className={cx('action-btn')}>
                    <FontAwesomeIcon style={{ fontSize: '2rem' }} className={cx('icon')} icon={faShare} />
                </Button>
                <strong className={cx('action-count')}>{data.shares_count}</strong>
            </div>
        </div>
    );
}

export default Actions;
