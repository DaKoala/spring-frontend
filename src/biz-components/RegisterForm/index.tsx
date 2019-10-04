import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import autobind from 'autobind-decorator';
import Input, { Rule } from '@/components/Input';
import Button from '@/components/Button';
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

interface RegisterFormState {
  email: string;
  emailValid: boolean;
  password: string;
  passwordValid: boolean;
}

export default class RegisterForm extends Component<{}, RegisterFormState> {
  state: RegisterFormState = {
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
        <Button className={cx('registerForm__continue')} disabled={!this.canContinue}>Continue</Button>
      </>
    );
  }

  render() {
    return (
      <div className={cx('registerForm')}>
        {this.renderGeneralForm()}
      </div>
    );
  }
}
