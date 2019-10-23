import { observable, action, computed } from 'mobx';
import { Role } from '@/constants';

export default class UserStore {
  @observable email = '';

  @observable firstName = '';

  @observable lastName = '';

  @observable gender = '';

  @observable title = '';

  @observable departmentId = 0;

  @observable departmentName = '';

  @observable hospitalId = '';

  @observable hospitalName = '';

  @observable birthday = 0;

  @observable role: Role = 'DOCTOR';

  @computed
  get fullName(): string {
    if (this.role === 'HOSPITAL') {
      return this.hospitalName;
    }
    return `${this.firstName} ${this.lastName}`;
  }

  @action
  setEmail(email: string) {
    this.email = email;
  }

  @action
  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  @action
  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  @action
  setGender(gender: string) {
    this.gender = gender;
  }

  @action
  setTitle(title: string) {
    this.title = title;
  }

  @action
  setDepartmentId(departmentId: number) {
    this.departmentId = departmentId;
  }

  @action
  setDepartmentName(departmentName: string) {
    this.departmentName = departmentName;
  }

  @action
  setHospitalId(hospitalId: string) {
    this.hospitalId = hospitalId;
  }

  @action
  setHospitalName(hospitalName: string) {
    this.hospitalName = hospitalName;
  }

  @action
  setBirthday(birthday: number) {
    this.birthday = birthday;
  }

  @action
  setRole(role: Role) {
    this.role = role;
  }
}

export const userStoreInstance = new UserStore();
