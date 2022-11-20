import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './Post.module.scss';
import Button from '../Button';
import { MusicIcon } from '../Icons';
import Video from './Video/Video';
import Popper from '../Popper';
import AccountPreview from '../AccountPreview/AccountPreview';

const cx = classNames.bind(styles);
function Post({ data }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <Popper>
                    <AccountPreview user={data.user} />
                </Popper>
            </div>
        );
    };
    return (
        <div className={cx('wrapper')}>
            <Link to={`/@${data.user.nickname}`} className={cx('avatar')}>
                <Tippy interactive delay={[800, 0]} offset={[135, 30]} placement="bottom" render={renderPreview}>
                    <img src={data.user.avatar} alt="avatar" />
                </Tippy>
            </Link>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <Link to={`/@${data.user.nickname}`} className={cx('author')}>
                        <Tippy interactive delay={[800, 0]} offset={[35, 40]} placement="bottom" render={renderPreview}>
                            <h3 className={cx('uniqueid')}>{data.user.nickname}</h3>
                        </Tippy>
                        {data.user.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        <h4 className={cx('nickname')}>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                    </Link>
                    <div className={cx('video-desc')}>
                        <span>{data.description}</span>
                        <Link to="#" className={cx('link')}>
                            <strong>#china</strong>
                        </Link>
                        <Link to="#" className={cx('link')}>
                            <strong>#trungquoc</strong>
                        </Link>
                    </div>
                    <h4 className={cx('video-music')}>
                        <MusicIcon className={cx('icon')} />
                        <Link to="#">{data.music}</Link>
                    </h4>
                </div>
                <Button outline small className={cx('follow-btn')}>
                    Follow
                </Button>
                <Video data={data}/>
            </div>
        </div>
    );
}
Post.propsType = {
    data: PropTypes.object.isRequired,
};
export default Post;
