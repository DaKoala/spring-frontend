import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import Brand from '@/components/Brand';
import NavBar from '@/biz-components/NavBar';
import styles from './index.less';

const cx = classNames.bind(styles);

export default class Home extends PureComponent {
  render() {
    return (
      <div>
        <header className={cx('home__header')}>
          <Brand />
          <NavBar />
        </header>
      </div>
    );
  }
}
