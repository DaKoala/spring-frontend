import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Brand from '@/components/Brand';
import Button from '@/components/Button';
import styles from './index.less';

const cx = classNames.bind(styles);

export default class NotFound extends PureComponent {
  render() {
    return (
      <div className={cx('notFound')}>
        <Brand className={cx('notFound__brand')} />
        <p className={cx('notFound__text')}>Oops! Page not found</p>
        <Link to="/">
          <Button className={cx('notFound__btn')} size="big">Back to home page</Button>
        </Link>
      </div>
    );
  }
}
