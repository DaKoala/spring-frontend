import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import Brand from '@/components/Brand';
import RegisterForm from '@/biz-components/RegisterForm';
import styles from './index.less';

const cx = classNames.bind(styles);

export default class Register extends PureComponent {
  render() {
    return (
      <div className={cx('register')}>
        <Brand className={cx('register__brand')} />
        <RegisterForm />
      </div>
    );
  }
}
