import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import autobind from 'autobind-decorator';
import { Department } from '@/constants';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { postDoctorInfo } from '@/service';
import styles from './index.less';

const cx = classNames.bind(styles);

interface AddDoctorProps {
  department: Department;
  onComplete(): void;
  onCancel(): void;
}

interface AddDoctorState {
  firstName: string;
  lastName: string;
  doctorEmail: string;
  password: string;
  title: string;
  birthday: string;
  gender: string;
}

const genderOptions = [
  {
    value: 'male',
    text: 'Male',
  },
  {
    value: 'female',
    text: 'Female',
  },
];

export default class AddDoctor extends PureComponent<AddDoctorProps, AddDoctorState> {
  state: AddDoctorState = {
    firstName: '',
    lastName: '',
    doctorEmail: '',
    password: '',
    title: '',
    birthday: '',
    gender: '',
  }

  @autobind
  getInputHandler(field: keyof AddDoctorState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newState = {
        [field]: e.target.value,
      } as Pick<AddDoctorState, keyof AddDoctorState>;
      this.setState(newState);
    };
  }

  @autobind
  handleGenderChange(value: string) {
    this.setState({
      gender: value,
    });
  }

  @autobind
  async handleSubmit() {
    const { department } = this.props;
    const {
      firstName,
      lastName,
      doctorEmail,
      password,
      title,
      birthday,
      gender,
    } = this.state;
    await postDoctorInfo({
      departmentId: department.departmentId,
      firstName,
      lastName,
      doctorEmail,
      password,
      title,
      birthday,
      gender,
    });
    const { onComplete } = this.props;
    onComplete();
  }

  render() {
    const { department, onCancel } = this.props;
    const titleText = `New doctor at ${department.departmentName}`;
    return (
      <div>
        <div className={cx('department__line')}>
          <div className={cx('hospital__greeting')}>{titleText}</div>
          <div>
            <Button className={cx('doctor__complete')} onClick={this.handleSubmit}>Complete</Button>
            <Button onClick={onCancel} type="secondary">Back</Button>
          </div>
        </div>
        <div className={cx('doctor__form')}>
          <Input onChange={this.getInputHandler('firstName')} type="register" label="FIRST NAME" />
          <Input onChange={this.getInputHandler('lastName')} type="register" label="LAST NAME" />
          <Input onChange={this.getInputHandler('doctorEmail')} type="register" label="DOCTOR EMAIL" />
          <Input onChange={this.getInputHandler('password')} type="register" textType="password" label="PASSWORD" />
          <Input onChange={this.getInputHandler('title')} type="register" label="TITLE" />
          <Input onChange={this.getInputHandler('birthday')} type="register" label="BIRTHDAY" />
          <Select onChange={this.handleGenderChange} label="GENDER" options={genderOptions} />
        </div>
      </div>
    );
  }
}
