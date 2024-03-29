import React, { PureComponent } from 'react';
import autobind from 'autobind-decorator';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import RouterStore from '@/stores/router';
import { login, viewPersonalInfo } from '@/service';
import styles from './index.less';

const cx = classNames.bind(styles);

interface LoginFormProps {
  routerStore?: RouterStore;
}

interface LoginFormState {
  email: string;
  password: string;
}

@inject('routerStore')
@observer
export default class LoginForm extends PureComponent<LoginFormProps, LoginFormState> {
  state: LoginFormState = {
    email: '',
    password: '',
  }

  get buttonDisabled(): boolean {
    const { email, password } = this.state;
    return !(email && password);
  }

  @autobind
  handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: e.target.value,
    });
  }

  @autobind
  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: e.target.value,
    });
  }

  @autobind
  async handleLoginSubmit() {
    const { email, password } = this.state;
    const { routerStore } = this.props;
    await login({
      email,
      password,
    });
    await viewPersonalInfo();
    routerStore!.push('/user');
  }

  render() {
    return (
      <div className={cx('login')}>
        <p className={cx('login__title')}>Log in</p>
        <div className={cx('login__support')}>
          <span>Do not have an account?</span>
          <Link className={cx('login__support--link')} to="/register">Sign up</Link>
        </div>
        <Input
          className={cx('login__input')}
          label="EMAIL"
          placeholder="Enter email address"
          onChange={this.handleEmailChange}
        />
        <Input
          className={cx('login__input')}
          label="PASSWORD"
          placeholder="Enter password"
          textType="password"
          onChange={this.handlePasswordChange}
        />
        <Button onClick={this.handleLoginSubmit} className={cx('login__submit')} disabled={this.buttonDisabled}>Log in</Button>
      </div>
    );
  }
}
