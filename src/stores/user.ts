import { observable, action, computed } from 'mobx';

export default class UserStore {
  @observable email = '';

  @observable firstName = 'Billy';

  @observable lastName = 'Zou';

  @observable gender = 'male';

  @observable birthday = 0;

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
}

export const userStoreInstance = new UserStore();
