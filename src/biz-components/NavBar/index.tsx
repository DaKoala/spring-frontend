import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

function NavItem(props: NavItemProps) {
  const { to, children } = props;
  return (
    <NavLink to={to} className={cx('nav__item')} activeClassName={cx('nav__item--active')}>
      {children}
    </NavLink>
  );
}

export default class NavBar extends PureComponent {
  render() {
    return (
      <nav className={cx('nav')}>
        <NavItem to="/plans">Plans</NavItem>
        <NavItem to="/features">Features</NavItem>
        <NavItem to="/about">About us</NavItem>
      </nav>
    );
  }
}
