import React, { PureComponent } from 'react';
import autobind from 'autobind-decorator';
import { Route } from 'react-router-dom';
import classNames from 'classnames/bind';
import UserMenu from '@/biz-components/UserMenu';
import Profile from '@/pages/Profile';
import ProfileDoc from '@/pages/ProfileDoc';
import { viewDepartment, postDepartment, postDoctorInfo, viewHospital, searchDoctor } from '@/service';
import styles from './index.less';

const cx = classNames.bind(styles);

export default class User extends PureComponent {
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
    return (
      <>
        <UserMenu />
        <div className={cx('main')}>
          <button type="button" onClick={this.viewDepartmentFunc}>View Department</button>
          <button type="button" onClick={this.postDepartmentFunc}>Post Department</button>
          <button type="button" onClick={this.postDoctorInfoFunc}>Post Doctor Info</button>
          <button type="button" onClick={this.viewHospitalFunc}>View Hospital</button>
          <button type="button" onClick={this.searchDoctorFunc}>Search Doctor</button>
          <Route path="/user" component={ProfileDoc} />
        </div>
      </>
    );
  }
}
