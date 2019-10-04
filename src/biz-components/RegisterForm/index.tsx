import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import autobind from 'autobind-decorator';
import Input, { Rule } from '@/components/Input';
import Button from '@/components/Button';
import Select, { Option } from '@/components/Select';
import { EMAIL_REGEX } from '@/constants';
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
}

export default class RegisterForm extends Component<{}, RegisterFormState> {
  state: RegisterFormState = {
    step: Step.General,
    email: '',
    emailValid: false,
    password: '',
    passwordValid: false,
  }

  get canContinue(): boolean {
    const { emailValid, passwordValid } = this.state;
    return emailValid && passwordValid;
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
    return (
      <>
        <Input
          className={cx('registerForm__input')}
          type="register"
          label="FIRST NAME"
        />
        <Input
          className={cx('registerForm__input')}
          type="register"
          label="LAST NAME"
        />
        <Select
          className={cx('registerForm__input')}
          label="GENDER"
          options={genderOptions}
        />
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
