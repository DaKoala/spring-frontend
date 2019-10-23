import React, { PureComponent } from 'react';
import autobind from 'autobind-decorator';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

export interface Rule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  test?: RegExp;
  message: string;
}

interface InputProps {
  className: string;
  label: string;
  type: 'login' | 'register' | 'timeslot';
  textType: 'text' | 'password';
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onEnterKeyUp: () => void;
  onValidate: (valid: boolean) => void;
  rules: Rule[];
  autoFocus?: boolean;
  value?: string;
  placeholder?: string;
}

interface InputState {
  error: boolean;
  errorMessage: string;
}

export default class Input extends PureComponent<InputProps, InputState> {
  state: InputState = {
    error: false,
    errorMessage: '',
  }

  static defaultProps = {
    className: '',
    type: 'login',
    textType: 'text',
    rules: [],
    onChange: () => {},
    onEnterKeyUp: () => {},
    onValidate: () => {},
  }

  get isRequired(): boolean {
    const { rules } = this.props;
    return rules.some((rule) => rule.required);
  }

  @autobind
  handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    const { onEnterKeyUp } = this.props;
    if (e.keyCode === 13) {
      onEnterKeyUp();
    }
  }

  @autobind
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { onChange } = this.props;
    onChange(e);
    this.validate(e.target.value);
  }

  pass() {
    const { onValidate } = this.props;
    this.setState({
      error: false,
      errorMessage: '',
    });
    onValidate(true);
  }

  violate(rule: Rule) {
    const { onValidate } = this.props;
    this.setState({
      error: true,
      errorMessage: rule.message,
    });
    onValidate(false);
  }

  validate(value: string): boolean {
    const { rules } = this.props;
    for (const rule of rules) {
      if (!rule.required && value === '') {
        continue;
      }
      if (
        (rule.required && value === '')
        || (rule.minLength && value.length < rule.minLength)
        || (rule.maxLength && value.length > rule.maxLength)
        || (rule.test && !rule.test.test(value))
      ) {
        this.violate(rule);
        return false;
      }
    }
    this.pass();
    return true;
  }

  renderError() {
    const { error, errorMessage } = this.state;
    return error ? (
      <span className={cx('input__error')}>{errorMessage}</span>
    ) : null;
  }

  render() {
    const { error } = this.state;
    const {
      autoFocus,
      className,
      label,
      type,
      textType,
      value,
      placeholder,
    } = this.props;
    return (
      <div className={cx({ 'input--register': type === 'register' }, className)}>
        <label className={cx('input__label', { 'input__label--required': this.isRequired })} htmlFor={label}>
          {label}
          {this.renderError()}
        </label>
        <input
          autoFocus={autoFocus}
          value={value}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          className={cx('input__box', { 'input__box--error': error })}
          id={label}
          type={textType}
          placeholder={placeholder}
        />
      </div>
    );
  }
}
