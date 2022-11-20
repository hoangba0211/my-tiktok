import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames/bind'
import style from './Popper.module.scss'

const cx = classNames.bind(style)
function Popper({children, className}) {
  return (
    <div className={cx('popper',className)}>{children}</div>
  )
}
Popper.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string
}
export default Popper