import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import Brand from '@/components/Brand';
import Button from '@/components/Button';
import NavBar from '@/biz-components/NavBar';
import LoginForm from '@/biz-components/LoginForm';
import styles from './index.less';

const cx = classNames.bind(styles);

export default class Home extends PureComponent {
  renderHeader() {
    return (
      <header className={cx('home__header')}>
        <Brand />
        <NavBar />
      </header>
    );
  }

  renderDescription() {
    return (
      <div>
        <p className={cx('desc__title')}>Best Care & Best Doctor.</p>
        <p className={cx('desc__subtitle')}>
          <span>
            An easy-to-use tool for patients to track
            their health history and better understand their physical conditions.
          </span>
          <br />
          <span>
            A consistent record system for patients, doctors and
            the hospital staff, and facilitates the communication among the three parts.
          </span>
        </p>
        <Button className={cx('desc__btn')} size="big">Check out our plans ➔</Button>
      </div>
    );
  }

  renderMain() {
    return (
      <div className={cx('home__main')}>
        {this.renderDescription()}
        <LoginForm />
      </div>
    );
  }

  render() {
    return (
      <div className={cx('home')}>
        {this.renderHeader()}
        {this.renderMain()}
      </div>
    );
  }
}
