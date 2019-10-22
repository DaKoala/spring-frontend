import React, { PureComponent } from 'react';
import autobind from 'autobind-decorator';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames/bind';
import Brand from '@/components/Brand';
import Icon, { IconName } from '@/components/Icon';
import UserStore from '@/stores/user';
import RouterStore from '@/stores/router';
import { deleteToken } from '@/service/cookie';
import styles from './index.less';

const cx = classNames.bind(styles);

interface MenuItemProps {
  to?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
}

const MenuItem: React.FunctionComponent<MenuItemProps> = (
  props: MenuItemProps,
) => {
  const { to, onClick, children } = props;
  const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick && onClick(e);
  };
  return to ? (
    <NavLink
      exact
      to={to}
      onClick={clickHandler}
      className={cx('menu__item')}
      activeClassName={cx('menu__item--active')}
    >
      {children}
    </NavLink>
  ) : (
    <a onClick={clickHandler} className={cx('menu__item')}>
      {children}
    </a>
  );
};

interface MenuItemConfig {
  to: string;
  iconName: IconName;
  text: string;
}

interface UserMenuProps {
  userStore?: UserStore;
  routerStore?: RouterStore;
}

@inject('userStore', 'routerStore')
@observer
export default class UserMenu extends PureComponent<UserMenuProps> {
  private dashboardConfig: MenuItemConfig = {
    to: '/user',
    iconName: 'dashboard',
    text: 'Dashboard'
  };

  private patientConfig: MenuItemConfig[] = [
    this.dashboardConfig,
    {
      to: '/user/records',
      iconName: 'records',
      text: 'Medical records'
    },
    {
      to: '/user/appointment',
      iconName: 'appointment',
      text: 'Make appointment'
    },
    {
      to: '/user/consult',
      iconName: 'consult',
      text: 'Urgent consult'
    },
    {
      to: '/user/profile',
      iconName: 'profile',
      text: 'My profile'
    }
  ];

  private doctorConfig: MenuItemConfig[] = [
    this.dashboardConfig,
    {
      to: '/user/timeslot',
      iconName: 'appointment',
      text: 'Time Slots',
    },
    {
      to: '/user/profileDoc',
      iconName: 'profile',
      text: 'My profile'
    }
  ];

  @autobind
  handleLogOut() {
    const isSure = window.confirm('Are you sure to log out?');
    if (!isSure) {
      return;
    }
    deleteToken();
    const { routerStore } = this.props;
    routerStore!.push('/');
  }

  renderStatus() {
    const { userStore } = this.props;
    const { fullName } = userStore!;
    return (
      <div className={cx('menu__status')}>
        <span>Signed in as</span>
        <span className={cx('menu__status--name')}>{fullName}</span>
      </div>
    );
  }

  renderItems() {
    const { userStore } = this.props;
    let config: MenuItemConfig[];
    if (userStore.role === 'PATIENT') {
      config = this.patientConfig;
    } else {
      config = this.doctorConfig;
    }
    return config.map(itemConfig => {
      const { to, iconName, text } = itemConfig;
      return (
        <MenuItem key={to} to={to}>
          <Icon name={iconName} />
          {text}
        </MenuItem>
      );
    });
  }

  render() {
    return (
      <nav className={cx('menu')}>
        <Brand className={cx('menu__brand')} />
        {this.renderItems()}
        <MenuItem onClick={this.handleLogOut}>
          <Icon name='log-out' />
          <span>Log out</span>
        </MenuItem>
        {this.renderStatus()}
      </nav>
    );
  }
}
