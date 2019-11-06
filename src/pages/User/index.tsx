import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Route } from 'react-router-dom';
import classNames from 'classnames/bind';
import UserMenu from '@/biz-components/UserMenu';
import ProfilePatient from '@/pages/ProfilePatient';
import ProfileDoctor from '@/pages/ProfileDoctor';
import TimeSlot from '@/pages/TimeSlot';
import Hospital from '@/pages/Hospital';
import MakeAppointment from '@/pages/MakeAppointment';
import UserStore from '@/stores/user';
import styles from './index.less';

const cx = classNames.bind(styles);

interface UserProps {
  userStore?: UserStore;
}

@inject('userStore')
@observer
export default class User extends PureComponent<UserProps> {
  render() {
    const { userStore } = this.props;
    const isPatient = userStore!.role === 'PATIENT';
    const isHospital = userStore!.role === 'HOSPITAL';
    const ProfileComponent = isPatient ? ProfilePatient : ProfileDoctor;
    const DashboardComponent = isHospital ? Hospital : ProfileComponent;
    return (
      <>
        <UserMenu />
        <div className={cx('main')}>
          <Route exact path="/user" component={DashboardComponent} />
          <Route path="/user/profile" component={ProfileComponent} />
          <Route path="/user/timeslot" component={TimeSlot} />
          <Route path="/user/appointment" component={MakeAppointment} />
        </div>
      </>
    );
  }
}
