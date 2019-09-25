import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

interface ButtonProps {
  className?: string;
  type: 'primary' | 'secondary';
  size: 'normal' | 'big';
  onClick?: React.MouseEventHandler;
}

export default class Button extends PureComponent<ButtonProps> {
  static defaultProps = {
    type: 'primary',
    size: 'normal',
  }

  get btnClass(): string {
    const { type, size, className = '' } = this.props;
    return cx('btn', {
      'btn--primary': type === 'primary',
      'btn--secondary': type === 'secondary',
      'btn--big': size === 'big',
    }, className);
  }

  get clickHandler(): React.MouseEventHandler {
    const { onClick } = this.props;
    return (e: React.MouseEvent) => {
      onClick && onClick(e);
    };
  }

  render() {
    return (
      <button className={this.btnClass} type="button">Big Button</button>
    );
  }
}
