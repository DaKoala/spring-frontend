import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames/bind';
import Modal from '@/components/Modal';
import Table from '@/components/Table';
import Button from '@/components/Button';
import UserStore from '@/stores/user';
import styles from './index.less';

const cx = classNames.bind(styles);

interface HospitalProps {
  userStore: UserStore;
}

const dataSource = [
  {
    key: '1',
    name: 'Nathan Davis',
    title: 'Chef Physician',
    gender: 'Male',
    birthday: '1990-01-01',
  },
  {
    key: '2',
    name: 'Nathan Davis',
    title: 'Chef Physician',
    gender: 'Male',
    birthday: '1990-01-01',
  },
];

const columns = [
  {
    key: 'name',
    title: 'NAME',
    width: '20%',
    render(item) {
      return item.name;
    },
  },
  {
    key: 'title',
    title: 'TITLE',
    width: '20%',
    render(item) {
      return item.title;
    },
  },
  {
    key: 'gender',
    title: 'GENDER',
    width: '20%',
    render(item) {
      return item.gender;
    },
  },
  {
    key: 'dob',
    title: 'DOB',
    width: '20%',
    render(item) {
      return item.birthday;
    },
  },
  {
    key: 'edit',
    title: 'EDIT',
    width: '20%',
    render(item) {
      return <a href={`https://billyzou.com/${item.name}`}>edit</a>;
    },
  },
];

@inject('userStore')
@observer
export default class Hospital extends PureComponent<HospitalProps> {
  get greeting(): string {
    const { userStore } = this.props;
    const { firstName } = userStore;
    return `Hello, ${firstName}.`;
  }

  render() {
    return (
      <div className={cx('hospital')}>
        <div className={cx('hospital__greeting')}>
          {this.greeting}
        </div>
        <div className={cx('hospital__line')}>
          <div className={cx('hospital__title')}>
            DEPARTMENTS
          </div>
          <Button>Add new</Button>
        </div>
        <Table className={cx('hospital__table')} dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}
