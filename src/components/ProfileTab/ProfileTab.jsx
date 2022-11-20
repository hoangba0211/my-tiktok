import React from 'react'
import classNames from 'classnames/bind'

import styles from './ProfileTab.module.scss'

const cx = classNames.bind(styles)

function ProfileTab() {
  return (
    <div className={cx('item-list')}>
      Profile
    </div>
  )
}

export default ProfileTab