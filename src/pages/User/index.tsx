import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import classNames from 'classnames/bind';
import UserMenu from '@/biz-components/UserMenu';
import styles from './index.less';

const cx = classNames.bind(styles);

export default class User extends PureComponent {
  render() {
    return (
      <>
        <UserMenu />
        <div className={cx('main')}>

        </div>
      </>
    );
  }
}
