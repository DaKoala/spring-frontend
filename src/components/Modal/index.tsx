import React, { PureComponent } from 'react';
import autobind from 'autobind-decorator';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

interface ModalProps {
  visible: boolean;
  onMaskClick?: React.MouseEventHandler;
  children: React.ReactNode;
}

export default class Modal extends PureComponent<ModalProps> {
  @autobind
  handleMaskClick(e: React.MouseEvent) {
    const { onMaskClick } = this.props;
    onMaskClick && onMaskClick(e);
  }

  render() {
    const { visible, children } = this.props;
    return visible ? (
      <div className={cx('modal')}>
        <div className={cx('modal__mask')} onClick={this.handleMaskClick} />
        <div className={cx('modal__window')}>
          {children}
        </div>
      </div>
    ) : null;
  }
}
