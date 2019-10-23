import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames/bind';
import styles from './index.less';
import UserStore from '@/stores/user';
import formatDate from '@/utils/time';
import capitalize from '@/utils/string';

const cx = classNames.bind(styles);

interface ProfileProps {
  userStore?: UserStore;
}

@inject('userStore')
@observer
export default class ProfileDoctor extends PureComponent<ProfileProps> {
  get displayGender(): string {
    const { userStore } = this.props;
    const { gender } = userStore!;
    return capitalize(gender);
  }

  get displayBirthday(): string {
    const { userStore } = this.props;
    const { birthday } = userStore!;
    return formatDate(birthday, 'YYYY-MM-DD');
  }

  get displayHospital(): string {
    const { userStore } = this.props;
    const { hospitalName } = userStore!;
    return capitalize(hospitalName);
  }

  get displayDepartment(): string {
    const { userStore } = this.props;
    const { departmentName } = userStore!;
    return capitalize(String(departmentName));
  }

  get displayTitle(): string {
    const { userStore } = this.props;
    const { title } = userStore!;
    return capitalize(title);
  }

  render() {
    const { userStore } = this.props;
    const { fullName } = userStore!;
    return (
      <div className={cx('profile')}>
        <div className={cx('profile__name')}>{fullName}</div>
        <div className={cx('profile__support')}>
          <span>{this.displayGender}</span>
          <span>{this.displayBirthday}</span>
        </div>
        <div className={cx('profile__title')}>{this.displayTitle}</div>
        <div className={cx('profile__support')}>
          <span>{this.displayDepartment}</span>
          <span>{this.displayHospital}</span>
        </div>
      </div>
    );
    return null;
  }
}
