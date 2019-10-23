import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames/bind';
import autobind from 'autobind-decorator';
import { Department, Indexable } from '@/constants';
import Modal from '@/components/Modal';
import Table, { Column } from '@/components/Table';
import Button from '@/components/Button';
import Input from '@/components/Input';
import UserStore from '@/stores/user';
import { viewDepartment, postDepartment } from '@/service';
import DepartmentPage from './DepartmentPage';
import styles from './index.less';

const cx = classNames.bind(styles);

interface HospitalProps {
  userStore: UserStore;
}

interface HospitalState {
  departments: (Department & Indexable)[];
  selectedDepartment: Department | null;
  isAddingDepartment: boolean;
  departmentName: string;
}

@inject('userStore')
@observer
export default class Hospital extends PureComponent<HospitalProps, HospitalState> {
  state: HospitalState = {
    departments: [],
    selectedDepartment: null,
    isAddingDepartment: false,
    departmentName: '',
  }

  private departmentColumns: Column<Department & Indexable>[] = [
    {
      key: 'name',
      title: 'NAME',
      width: '90%',
      render(item: Department) {
        return item.departmentName;
      },
    },
    {
      key: 'select',
      title: '',
      width: '10%',
      render: (item: Department) => {
        const clickHandler = () => { this.handleSelectDepartment(item); };
        return (
          <button onClick={clickHandler} className={cx('hospital__link')} type="button">Select</button>
        );
      },
    },
  ];

  componentDidMount() {
    this.fetchDepartments();
  }

  get greeting(): string {
    const { userStore } = this.props;
    const { hospitalName } = userStore;
    return `Hello, ${hospitalName}.`;
  }

  async fetchDepartments() {
    const { userStore } = this.props;
    const res = await viewDepartment({
      hospitalId: userStore!.hospitalId,
    });
    const departments = res.data.map((department, index) => {
      const departmentWithKey = department as (Department & Indexable);
      departmentWithKey.key = String(index);
      return departmentWithKey;
    });
    this.setState({
      departments,
    });
  }

  @autobind
  closeModal() {
    this.setState({
      isAddingDepartment: false,
      departmentName: '',
    });
  }

  @autobind
  async handleDepartmentCreate() {
    const { departmentName } = this.state;
    await postDepartment({
      departmentName,
    });
    this.closeModal();
    this.fetchDepartments();
  }

  @autobind
  handleDepartmentNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      departmentName: e.target.value,
    });
  }

  @autobind
  handleClickClose() {
    this.setState({
      isAddingDepartment: false,
    });
  }

  @autobind
  handleClickAdd() {
    this.setState({
      isAddingDepartment: true,
    });
  }

  @autobind
  handleSelectDepartment(d: Department) {
    this.setState({
      selectedDepartment: d,
    });
  }

  @autobind
  handleClearSelection() {
    this.setState({
      selectedDepartment: null,
    });
  }

  renderDoctors() {
    const { selectedDepartment } = this.state;
    return (
      <DepartmentPage
        onClickBack={this.handleClearSelection}
        department={selectedDepartment}
      />
    );
  }

  renderDepartments() {
    const { departments } = this.state;
    return (
      <>
        <div className={cx('hospital__greeting')}>
          {this.greeting}
        </div>
        <div className={cx('hospital__line')}>
          <div className={cx('hospital__title')}>
            DEPARTMENTS
          </div>
          <Button onClick={this.handleClickAdd}>Add new</Button>
        </div>
        <Table className={cx('hospital__table')} dataSource={departments} columns={this.departmentColumns} />
      </>
    );
  }

  render() {
    const { selectedDepartment, isAddingDepartment } = this.state;
    const pageContent = selectedDepartment ? this.renderDoctors() : this.renderDepartments();
    return (
      <div className={cx('hospital')}>
        {pageContent}
        <Modal visible={isAddingDepartment} onMaskClick={this.handleClickClose}>
          <div className={cx('modal')}>
            <div className={cx('modal__title')}>New Department</div>
            <Input onChange={this.handleDepartmentNameChange} className={cx('modal__input')} label="" placeholder="name" type="register" />
            <div className={cx('modal__buttons')}>
              <Button onClick={this.closeModal} type="secondary">Cancel</Button>
              <Button onClick={this.handleDepartmentCreate}>Create</Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
