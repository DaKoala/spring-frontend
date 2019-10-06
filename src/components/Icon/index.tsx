import React, { PureComponent } from 'react';
import SVG from 'react-inlinesvg';
import classNames from 'classnames/bind';
import appointment from '@/assets/icons/appointment.svg';
import consult from '@/assets/icons/consult.svg';
import dashboard from '@/assets/icons/dashboard.svg';
import logOut from '@/assets/icons/log-out.svg';
import profile from '@/assets/icons/profile.svg';
import records from '@/assets/icons/records.svg';
import styles from './index.less';

const cx = classNames.bind(styles);

const iconMap = {
  appointment,
  consult,
  dashboard,
  'log-out': logOut,
  profile,
  records,
};

interface IconProps {
  name: keyof typeof iconMap;
  className: string;
}

export default class Icon extends PureComponent<IconProps> {
  static defaultProps = {
    className: '',
  }

  render() {
    const { name, className } = this.props;
    const src = iconMap[name];
    return <SVG src={src} className={cx('icon', className)} />;
  }
}
