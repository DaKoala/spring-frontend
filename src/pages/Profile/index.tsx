import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames/bind';
import styles from './index.less';
import UserStore from '@/stores/user';
import { formatDate } from '@/utils/time';
import InfoItem from '@/components/InfoItem';

const cx = classNames.bind(styles);

interface ProfileProps {
  userStore: UserStore;
}

@inject('userStore')
@observer
export default class Profile extends PureComponent<ProfileProps> {
  get displayGender(): string {
    const { userStore } = this.props;
    const { gender } = userStore;
    return `${gender.substring(0, 1).toUpperCase()}${gender.substring(1)}`;
  }

  get displayBirthday(): string {
    const { userStore } = this.props;
    const { birthday } = userStore;
    return formatDate(birthday, 'YYYY-MM-DD');
  }

  render() {
    const { userStore } = this.props;
    const { fullName } = userStore;
    return (
      <div className={cx('profile')}>
        <div className={cx('profile__name')}>{fullName}</div>
        <div className={cx('profile__support')}>
          <span>{this.displayGender}</span>
          <span>{this.displayBirthday}</span>
        </div>
        <InfoItem label="ALLERGIES" />
        <InfoItem label="CHORONIC DISEASES" />
        <InfoItem label="MEDICAL HISTORY" />
      </div>
    );
  }
}
