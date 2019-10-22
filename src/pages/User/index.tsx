import React, { PureComponent } from 'react';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import { Route } from 'react-router-dom';
import classNames from 'classnames/bind';
import UserMenu from '@/biz-components/UserMenu';
import ProfilePatient from '@/pages/ProfilePatient';
import ProfileDoctor from '@/pages/ProfileDoctor';
import Hospital from '@/pages/Hospital';
import UserStore from '@/stores/user';
import {
  viewDepartment,
  postDepartment,
  postDoctorInfo,
  viewHospital,
  searchDoctor,
} from '@/service';
import styles from './index.less';

const cx = classNames.bind(styles);

interface UserProps {
  userStore?: UserStore;
}

@inject('userStore')
@observer
export default class User extends PureComponent<UserProps> {
  @autobind
  async viewDepartmentFunc() {
    const res = await viewDepartment({
      hospitalId: 'seimc1228',
    });
    console.log(res);
  }

  @autobind
  async postDepartmentFunc() {
    const res = await postDepartment({
      departmentName: 'Department of Coding',
    });
    console.log(res);
  }

  @autobind
  async postDoctorInfoFunc() {
    const res = await postDoctorInfo({
      firstName: 'Alice',
      lastName: 'Wang',
      doctorEmail: 'alice@seimc.com',
      password: 'alice123456',
      departmentId: 1,
      title: 'Internship Doctor',
      birthday: '2000-01-01',
      gender: 'female',
    });
    console.log(res);
  }

  @autobind
  async viewHospitalFunc() {
    const res = await viewHospital();
    console.log(res);
  }

  @autobind
  async searchDoctorFunc() {
    const res = await searchDoctor({
      hospitalId: 'seimc1228',
    });
    console.log(res);
  }

  render() {
    const { userStore } = this.props;
    const isPatient = userStore!.role === 'PATIENT';
    const ProfileComponent = isPatient ? ProfilePatient : ProfileDoctor;
    return (
      <>
        <UserMenu />
        <div className={cx('main')}>
          {/* <button type="button" onClick={this.viewDepartmentFunc}>View Department</button>
          <button type="button" onClick={this.postDepartmentFunc}>Post Department</button>
          <button type="button" onClick={this.postDoctorInfoFunc}>Post Doctor Info</button>
          <button type="button" onClick={this.viewHospitalFunc}>View Hospital</button>
          <button type="button" onClick={this.searchDoctorFunc}>Search Doctor</button> */}
          <Route exact path="/user" component={Hospital} />
          <Route path="/user/profile" component={ProfileComponent} />
        </div>
      </>
    );
  }
}
