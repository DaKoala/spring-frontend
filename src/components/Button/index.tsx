import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

interface ButtonProps {
  className: string;
  type: 'primary' | 'secondary';
  size: 'normal' | 'big';
  disabled: boolean;
  onClick: React.MouseEventHandler;
}

export default class Button extends PureComponent<ButtonProps> {
  static defaultProps = {
    className: '',
    type: 'primary',
    size: 'normal',
    disabled: false,
    onClick: () => {},
  }

  get btnClass(): string {
    const {
      type,
      size,
      disabled,
      className,
    } = this.props;
    return cx('btn', {
      'btn--primary': type === 'primary',
      'btn--secondary': type === 'secondary',
      'btn--big': size === 'big',
      'btn--disabled': disabled,
    }, className);
  }

  get clickHandler(): React.MouseEventHandler {
    const { onClick, disabled } = this.props;
    if (disabled) {
      return () => {};
    }
    return (e: React.MouseEvent) => {
      onClick(e);
    };
  }

  render() {
    const { children } = this.props;
    return (
      <button onClick={this.clickHandler} className={this.btnClass} type="button">{children}</button>
    );
  }
}
