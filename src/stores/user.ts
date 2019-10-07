import { observable, action, computed } from 'mobx';

export default class UserStore {
  @observable email = '';

  @observable firstName = '';

  @observable lastName = '';

  @observable gender = '';

  @observable birthday = '';

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
  setBirthday(birthday: string) {
    this.birthday = birthday;
  }
}
