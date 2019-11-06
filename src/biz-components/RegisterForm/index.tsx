import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import RouterStore from '@/stores/router';
import Input, { Rule } from '@/components/Input';
import Button from '@/components/Button';
import Select, { Option } from '@/components/Select';
import { EMAIL_REGEX, DATE_REGEX } from '@/constants';
import { register, postPatientInfo, viewPersonalInfo } from '@/service';
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
    required: true,
    message: 'Birthday cannot be empty',
  },
  {
    test: DATE_REGEX,
    message: 'Date should be in the format YYYY-MM-DD',
  },
];
const firstNameRules: Rule[] = [
  {
    required: true,
    message: 'First name cannot be empty',
  },
];
const lastNameRules: Rule[] = [
  {
    required: true,
    message: 'Last name cannot be empty',
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

interface RegisterFormProps {
  routerStore?: RouterStore;
}

interface RegisterFormState {
  step: Step;
  email: string;
  emailValid: boolean;
  password: string;
  passwordValid: boolean;
  firstName: string;
  firstNameValid: boolean;
  lastName: string;
  lastNameValid: boolean;
  gender: string;
  genderValid: boolean;
  birthday: string;
  birthdayValid: boolean;
  allergy: string;
  disease: string;
  medicalHistory: string;
}

@inject('routerStore')
@observer
export default class RegisterForm extends PureComponent<RegisterFormProps, RegisterFormState> {
  state: RegisterFormState = {
    step: Step.General,
    email: '',
    emailValid: false,
    password: '',
    passwordValid: false,
    firstName: '',
    firstNameValid: false,
    lastName: '',
    lastNameValid: false,
    gender: '',
    genderValid: false,
    birthday: '',
    birthdayValid: false,
    allergy: '',
    disease: '',
    medicalHistory: '',
  }

  get canContinue(): boolean {
    const { emailValid, passwordValid } = this.state;
    return emailValid && passwordValid;
  }

  get canSubmit(): boolean {
    const {
      firstNameValid,
      lastNameValid,
      genderValid,
      birthdayValid,
    } = this.state;
    return firstNameValid && lastNameValid && genderValid && birthdayValid;
  }

  @autobind
  async handleContinueClick() {
    const { email, password } = this.state;
    const res = await register({
      email,
      password,
      role: 'PATIENT',
    });
    if (res.success) {
      this.setState({
        step: Step.Patient,
      });
    }
  }

  @autobind
  handleBackClick() {
    this.setState({
      step: Step.General,
    });
  }

  @autobind
  async handleFinishClick() {
    const {
      firstName,
      lastName,
      gender,
      birthday,
      allergy,
      disease,
      medicalHistory,
    } = this.state;
    const healthInfo = { allergy, disease, medicalHistory };
    await postPatientInfo({
      firstName,
      lastName,
      gender,
      birthday,
      healthInformation: healthInfo,
    });
    await viewPersonalInfo();
    const { routerStore } = this.props;
    routerStore!.push('/user');
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
  handleFirstNameValidate(valid: boolean) {
    this.setState({
      firstNameValid: valid,
    });
  }

  @autobind
  handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      lastName: e.target.value,
    });
  }

  @autobind
  handleLastNameValidate(valid: boolean) {
    this.setState({
      lastNameValid: valid,
    });
  }

  @autobind
  handleGenderChange(value: string) {
    this.setState({
      gender: value,
      genderValid: true,
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
  handleAllergyChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      allergy: e.target.value,
    });
  }

  @autobind
  handleDiseaseChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      disease: e.target.value,
    });
  }

  @autobind
  handleMedicalHistoryChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      medicalHistory: e.target.value,
    });
  }

  @autobind
  handleContinueEnter() {
    if (this.canContinue) {
      this.handleContinueClick();
    }
  }

  @autobind
  handleFinishEnter() {
    if (this.canSubmit) {
      this.handleFinishClick();
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
          Create account
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
      allergy,
      disease,
      medicalHistory,
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
          rules={firstNameRules}
          onChange={this.handleFirstNameChange}
          onValidate={this.handleFirstNameValidate}
        />
        <Input
          key="lastName"
          className={cx('registerForm__input')}
          type="register"
          label="LAST NAME"
          value={lastName}
          rules={lastNameRules}
          onChange={this.handleLastNameChange}
          onValidate={this.handleLastNameValidate}
        />
        <Select
          required
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
          onEnterKeyUp={this.handleFinishEnter}
          onChange={this.handleBirthdayChange}
          onValidate={this.handleBirthdayValidate}
        />
        <Input
          key="allergy"
          className={cx('registerForm__input')}
          label="ALLERGY"
          type="register"
          value={allergy}
          onEnterKeyUp={this.handleFinishEnter}
          onChange={this.handleAllergyChange}
        />
        <Input
          key="disease"
          className={cx('registerForm__input')}
          label="CHRONIC DISEASE"
          type="register"
          value={disease}
          onEnterKeyUp={this.handleFinishEnter}
          onChange={this.handleDiseaseChange}
        />
        <Input
          key="medicalHistory"
          className={cx('registerForm__input')}
          label="OTHER RELATED MEDICAL HISTORY"
          type="register"
          value={medicalHistory}
          onEnterKeyUp={this.handleFinishEnter}
          onChange={this.handleMedicalHistoryChange}
        />
        <Button
          onClick={this.handleFinishClick}
          className={cx('registerForm__create')}
          disabled={!this.canSubmit}
        >
          Finish
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
