import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { Department, Doctor, Indexable } from '@/constants';
import Table, { Column } from '@/components/Table';
import Button from '@/components/Button';
import formatDate from '@/utils/time';
import UserStore from '@/stores/user';
import { searchDoctor } from '@/service';
import AddDoctor from './AddDoctor';
import styles from './index.less';

const cx = classNames.bind(styles);

interface DepartmentPageProps {
  userStore?: UserStore;
  department: Department;
  onClickBack(): void;
}

interface DepartmentPageState {
  doctors: (Doctor & Indexable)[];
  isAdding: boolean;
}

@inject('userStore')
@observer
export default class DepartmentPage extends Component<DepartmentPageProps, DepartmentPageState> {
  state: DepartmentPageState = {
    doctors: [],
    isAdding: false,
  }

  private doctorColumns: Column<Doctor & Indexable>[] = [
    {
      key: 'name',
      title: 'NAME',
      width: '25%',
      render(item) {
        return `${item.firstName} ${item.lastName}`;
      },
    },
    {
      key: 'title',
      title: 'TITLE',
      width: '25%',
      render(item) {
        return item.title;
      },
    },
    {
      key: 'gender',
      title: 'GENDER',
      width: '25%',
      render(item) {
        return item.gender;
      },
    },
    {
      key: 'dob',
      title: 'BIRTHDAY',
      width: '25%',
      render(item) {
        return formatDate(item.birthday, 'YYYY-MM-DD');
      },
    },
  ];

  componentDidMount() {
    this.fetchDoctors();
  }

  async fetchDoctors() {
    const { userStore } = this.props;
    const res = await searchDoctor({
      hospitalId: userStore!.hospitalId,
    });
    const doctors = res.data.map((doctor, index) => {
      const doctorWithKey = doctor as (Doctor & Indexable);
      doctorWithKey.key = String(index);
      return doctorWithKey;
    });
    this.setState({
      doctors,
    });
  }

  goToMainPage() {
    this.setState({
      isAdding: false,
    });
  }

  @autobind
  handleAddingClick() {
    this.setState({
      isAdding: true,
    });
  }

  @autobind
  handleComplete() {
    this.goToMainPage();
    this.fetchDoctors();
  }

  @autobind
  handleBack() {
    this.goToMainPage();
  }

  renderDoctors() {
    const { department, onClickBack } = this.props;
    const { doctors } = this.state;
    return (
      <>
        <div className={cx('department__line')}>
          <div className={cx('hospital__greeting')}>{department.departmentName}</div>
          <div>
            <Button onClick={this.handleAddingClick} className={cx('department__addButton')}>Add new</Button>
            <Button onClick={onClickBack} type="secondary">Back</Button>
          </div>
        </div>
        <div className={cx('hospital__title', 'department__title')}>DOCTORS</div>
        <div className={cx('department__table')}>
          <Table dataSource={doctors} columns={this.doctorColumns} />
        </div>
      </>
    );
  }

  renderAddingForm() {
    const { department } = this.props;
    return (
      <AddDoctor
        onComplete={this.handleComplete}
        onCancel={this.handleBack}
        department={department}
      />
    );
  }

  render() {
    const { isAdding } = this.state;
    return isAdding ? this.renderAddingForm() : this.renderDoctors();
  }
}
