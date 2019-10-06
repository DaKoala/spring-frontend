import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import Brand from '@/components/Brand';
import Icon from '@/components/Icon';
import styles from './index.less';

const cx = classNames.bind(styles);

interface MenuItemProps {
  to: string;
  children: React.ReactNode;
}

const MenuItem: React.FunctionComponent<MenuItemProps> = (props: MenuItemProps) => {
  const { to, children } = props;
  return (
    <NavLink exact to={to} className={cx('menu__item')} activeClassName={cx('menu__item--active')}>{children}</NavLink>
  );
};

export default class UserMenu extends PureComponent {
  render() {
    return (
      <nav className={cx('menu')}>
        <Brand className={cx('menu__brand')} />
        <MenuItem to="/user">
          <Icon name="dashboard" />
          <span>Dashboard</span>
        </MenuItem>
        <MenuItem to="/user/records">
          <Icon name="records" />
          <span>Medical records</span>
        </MenuItem>
        <MenuItem to="/user/appointment">
          <Icon name="appointment" />
          Make appointment
        </MenuItem>
        <MenuItem to="/user/consult">
          <Icon name="consult" />
          <span>Urgent consult</span>
        </MenuItem>
        <MenuItem to="/user/profile">
          <Icon name="profile" />
          <span>My profile</span>
        </MenuItem>
        <MenuItem to="/user/logout">
          <Icon name="log-out" />
          <span>Log out</span>
        </MenuItem>
      </nav>
    );
  }
}
