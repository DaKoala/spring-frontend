import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import autobind from 'autobind-decorator';
import Input, { Rule } from '@/components/Input';
import Button from '@/components/Button';
import Select, { Option } from '@/components/Select';
import { EMAIL_REGEX, DATE_REGEX } from '@/constants';
import styles from './index.less';

const cx = classNames.bind(styles);

const emailRules: Rule[] = [
  {
    required: true,
    message: 'Email cannot be empty',
  },
  {
    test: EMAIL_REGEX,
    message: 'Invalid email address',
  },
];
const passwordRules: Rule[] = [
  {
    required: true,
    message: 'Password cannot be empty',
  },
  {
    minLength: 6,
    maxLength: 16,
    message: 'Password should be 6-16 characters',
  },
];
const dateRules: Rule[] = [
  {
    test: DATE_REGEX,
    message: 'Date should be in the format YYYY-MM-DD',
  },
];

const genderOptions: Option[] = [
  {
    value: 'male',
    text: 'Male',
  },
  {
    value: 'female',
    text: 'Female',
  },
];

enum Step {
  General,
  Patient,
}

interface RegisterFormState {
  step: Step;
  email: string;
  emailValid: boolean;
  password: string;
  passwordValid: boolean;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  birthdayValid: boolean;
}

export default class RegisterForm extends Component<{}, RegisterFormState> {
  state: RegisterFormState = {
    step: Step.General,
    email: '',
    emailValid: false,
    password: '',
    passwordValid: false,
    firstName: '',
    lastName: '',
    gender: '',
    birthday: '',
    birthdayValid: true,
  }

  get canContinue(): boolean {
    const { emailValid, passwordValid } = this.state;
    return emailValid && passwordValid;
  }

  get canSubmit(): boolean {
    const { birthdayValid } = this.state;
    return birthdayValid;
  }

  @autobind
  handleContinueClick() {
    this.setState({
      step: Step.Patient,
    });
  }

  @autobind
  handleBackClick() {
    this.setState({
      step: Step.General,
    });
  }

  @autobind
  handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: e.target.value,
    });
  }

  @autobind
  handleEmailValidate(valid: boolean) {
    this.setState({
      emailValid: valid,
    });
  }

  @autobind
  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: e.target.value,
    });
  }

  @autobind
  handlePasswordValidate(valid: boolean) {
    this.setState({
      passwordValid: valid,
    });
  }

  @autobind
  handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      firstName: e.target.value,
    });
  }

  @autobind
  handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      lastName: e.target.value,
    });
  }

  @autobind
  handleGenderChange(value: string) {
    this.setState({
      gender: value,
    });
  }

  @autobind
  handleBirthdayChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      birthday: e.target.value,
    });
  }

  @autobind
  handleBirthdayValidate(valid: boolean) {
    this.setState({
      birthdayValid: valid,
    });
  }

  @autobind
  handleContinueEnter() {
    if (this.canContinue) {
      this.handleContinueClick();
    }
  }

  renderGeneralForm() {
    const { email, password } = this.state;
    return (
      <>
        <div className={cx('registerForm__title')}>Sign up</div>
        <div className={cx('registerForm__support')}>
          <span>Already have an account?</span>
          <Link className={cx('registerForm__support--link')} to="/">Sign in</Link>
        </div>
        <Input
          autoFocus
          className={cx('registerForm__input')}
          type="register"
          label="EMAIL"
          placeholder="Enter your email address"
          value={email}
          rules={emailRules}
          onChange={this.handleEmailChange}
          onValidate={this.handleEmailValidate}
        />
        <Input
          className={cx('registerForm__input')}
          type="register"
          label="PASSWORD"
          placeholder="Enter a password longer than 6 characters"
          textType="password"
          value={password}
          rules={passwordRules}
          onChange={this.handlePasswordChange}
          onEnterKeyUp={this.handleContinueEnter}
          onValidate={this.handlePasswordValidate}
        />
        <Button
          className={cx('registerForm__continue')}
          disabled={!this.canContinue}
          onClick={this.handleContinueClick}
        >
          Continue
        </Button>
      </>
    );
  }

  renderPatientForm() {
    const {
      firstName,
      lastName,
      gender,
      birthday,
    } = this.state;
    return (
      <>
        <Input
          autoFocus
          key="firstName"
          className={cx('registerForm__input')}
          type="register"
          label="FIRST NAME"
          value={firstName}
          onChange={this.handleFirstNameChange}
        />
        <Input
          key="lastName"
          className={cx('registerForm__input')}
          type="register"
          label="LAST NAME"
          value={lastName}
          onChange={this.handleLastNameChange}
        />
        <Select
          className={cx('registerForm__input')}
          label="GENDER"
          defaultValue={gender}
          options={genderOptions}
          onChange={this.handleGenderChange}
        />
        <Input
          key="birthday"
          className={cx('registerForm__input')}
          label="DATE OF BIRTH (YYYY-MM-DD)"
          type="register"
          rules={dateRules}
          value={birthday}
          onChange={this.handleBirthdayChange}
          onValidate={this.handleBirthdayValidate}
        />
        <Button
          className={cx('registerForm__create')}
          disabled={!this.canSubmit}
        >
          Create account
        </Button>
        <Button
          className={cx('registerForm__back')}
          onClick={this.handleBackClick}
          type="secondary"
        >
          Back
        </Button>
      </>
    );
  }

  renderForm() {
    const { step } = this.state;
    if (step === Step.General) {
      return this.renderGeneralForm();
    }
    if (step === Step.Patient) {
      return this.renderPatientForm();
    }
    return null;
  }

  render() {
    return (
      <div className={cx('registerForm')}>
        {this.renderForm()}
      </div>
    );
  }
}
