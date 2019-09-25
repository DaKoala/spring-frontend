import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

export default class Brand extends PureComponent {
  render() {
    return (
      <h1 className={cx('brand')}>Spring</h1>
    );
  }
}
