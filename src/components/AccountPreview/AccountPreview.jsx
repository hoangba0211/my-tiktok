import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';
import Image from '../Images';

const cx = classNames.bind(styles);

function AccountPreview({ user }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('avatar')}>
                    <Image src={user.avatar} alt={user.last_name}/>
                </div>
                <Button className={cx('follow-btn')} primary>
                    Follow
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{user.nickname}</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>{user.last_name}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{user.followings_count}</strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{user.likes_count}</strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}
AccountPreview.propTypes = {
    user: PropTypes.object.isRequired,
};

export default AccountPreview;
