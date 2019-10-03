import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

interface InputProps {
  label: string;
  type: 'text' | 'password';
  onChange: React.ChangeEventHandler;
  placeholder?: string;
}

export default class Input extends PureComponent<InputProps> {
  static defaultProps = {
    type: 'text',
    onChange: () => {},
  }

  get handleChange(): React.ChangeEventHandler {
    const { onChange } = this.props;
    return (e: React.ChangeEvent) => {
      onChange(e);
    };
  }

  render() {
    const { label, type, placeholder } = this.props;
    return (
      <div className={cx('input')}>
        <label className={cx('input__label')} htmlFor={label}>{label}</label>
        <input onChange={this.handleChange} className={cx('input__box')} id={label} type={type} placeholder={placeholder} />
      </div>
    );
  }
}
