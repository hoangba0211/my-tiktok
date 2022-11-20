import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Popper from '~/components/Popper';
import AccountPreview from '../AccountPreview/AccountPreview';
import styles from './SidebarAccounts.module.scss';
import Image from '../Images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem({user}) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <Popper>
                    <AccountPreview user={user}/>
                </Popper>
            </div>
        );
    };

    return (
        <Link to={`/@${user.nickname}`}>
            <Tippy interactive delay={[800, 0]} offset={[-20, 0]} placement="bottom" render={renderPreview}>
                <div className={cx('account-item')}>
                    <Image
                        className={cx('avatar')}
                        src={user.avatar}
                        alt={user.last_name}
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{user.nickname}</strong>
                            {user.tick && (<FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />)}
                        </p>
                        <p className={cx('name')}>{user.last_name}</p>
                    </div>
                </div>
            </Tippy>
        </Link>
    );
}

AccountItem.propTypes = {
    user: PropTypes.object
};

export default AccountItem;
