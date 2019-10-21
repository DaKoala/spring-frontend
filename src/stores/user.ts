import { observable, action, computed } from 'mobx';
import { Role, Department } from '@/constants';

export default class UserStore {
  @observable email = '';

  @observable firstName = '';

  @observable lastName = '';

  @observable gender = '';

  @observable birthday = 0;

  @observable role: Role = 'PATIENT';

  @observable departments: Department[] = [];

  @computed
  get fullName(): string {
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
  setBirthday(birthday: number) {
    this.birthday = birthday;
  }

  @action
  setRole(role: Role) {
    this.role = role;
  }

  @action
  setDepartments(departments: Department[]) {
    this.departments = departments;
  }
}

export const userStoreInstance = new UserStore();
