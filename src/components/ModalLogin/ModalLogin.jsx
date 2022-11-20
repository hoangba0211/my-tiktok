import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { faAngleLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './ModalLogin.module.scss';
import images from '~/assets/images';
import LoginUser from './LoginUser/LoginUser';

const cx = classNames.bind(styles);
const LOGIN_LIST = [
    {
        logo: images.qrCode,
        title: 'Use QR code',
        alt: 'qrcode',
    },
    {
        logo: images.user,
        title: 'Use phone / email / username',
        alt: 'user',
        to: '/',
    },
    {
        logo: images.facebook,
        title: 'Continue with Facebook',
        alt: 'facebook',
    },
    {
        logo: images.google,
        title: 'Continue with Google',
        alt: 'google',
    },
    {
        logo: images.twitter,
        title: 'Continue with Twitter',
        alt: 'twitter',
    },
    {
        logo: images.line,
        title: 'Continue with LINE',
        alt: 'line',
    },
    {
        logo: images.kakaotalk,
        title: 'Continue with KakaoTalk',
        alt: 'kakaotalk',
    },
    {
        logo: images.apple,
        title: 'Continue with Apple',
        alt: 'apple',
    },

    {
        logo: images.insta,
        title: 'Continue with Instagram',
        alt: 'insta',
    },
];
function ModalLogin({ open, onClose }) {
    const [login, setLogin] = useState(true);
    useEffect(() => {
        if (open) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }

        return () => {
            setLogin(true)
        }
    }, [open]);

    const handleLogin = (options) => {
        if (options === 'user') {
            setLogin(false);
        }
    };

    const handleBackModal = () => {
        setLogin(true);
    };
    if (!open) return null;
    return (
        <div className={cx('overlay')}>
            <div className={cx('mask')}></div>
            <div className={cx('wrapper')}>
                <div className={cx('modal')}>
                    <div className={cx('container')}>
                        <div className={cx('content')}>
                            {login ? (
                                <>
                                    <p className={cx('title')}>Log in to TikTok</p>

                                    {LOGIN_LIST.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={cx('item')}
                                                onClick={() => handleLogin(item.alt)}
                                            >
                                                <div className={cx('logo')}>
                                                    <img src={item.logo} alt="logo" />
                                                </div>
                                                <span>{item.title}</span>
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <LoginUser />
                            )}
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <p>
                            Don't have an account?
                            <span>Sign up</span>
                        </p>
                    </div>
                </div>
                <div className={cx('icon-btn', 'close')} onClick={onClose}>
                    <FontAwesomeIcon icon={faClose} />
                </div>

                {!login && (
                    <div className={cx('icon-btn', 'back')} onClick={handleBackModal}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalLogin;
