import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

export default class Brand extends React.PureComponent {
  render() {
    return (
      <span className={cx('brand')}>Spring</span>
    );
  }
}
