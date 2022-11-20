import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SidebarAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SidebarAccounts({ label, data = [], onSeeAll }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {data.map((user) => {
                return <AccountItem key={user.id} user={user}/>
            })}
            <p className={cx('more-btn')} onClick={onSeeAll}>See all</p>
        </div>
    );
}

SidebarAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default SidebarAccounts;