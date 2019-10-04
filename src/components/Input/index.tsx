import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

interface InputProps {
  className: string;
  label: string;
  textType: 'text' | 'password';
  onChange: React.ChangeEventHandler;
  placeholder?: string;
}

export default class Input extends PureComponent<InputProps> {
  static defaultProps = {
    className: '',
    textType: 'text',
    onChange: () => {},
  }

  get handleChange(): React.ChangeEventHandler {
    const { onChange } = this.props;
    return (e: React.ChangeEvent) => {
      onChange(e);
    };
  }

  render() {
    const {
      className,
      label,
      type,
      placeholder,
    } = this.props;
    return (
      <div className={cx(className)}>
        <label className={cx('input__label')} htmlFor={label}>{label}</label>
        <input onChange={this.handleChange} className={cx('input__box')} id={label} type={type} placeholder={placeholder} />
      </div>
    );
  }
}
