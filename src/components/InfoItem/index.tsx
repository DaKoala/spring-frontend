import React, { PureComponent } from 'react'
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

interface InfoItemProps {
  label: string;
  content: string;
  className: string;
}

export default class InfoItem extends PureComponent<InfoItemProps> {
  static defaultProps = {
    content: '',
    className: '',
  }

  get displayContent(): string {
    const { content } = this.props;
    return content || '- Empty -';
  }

  render() {
    const { className, label, content } = this.props;
    return (
      <div className={cx('info', className)}>
        <div className={cx('info__label')}>{label}</div>
        <div className={cx('info__content', { 'info__content--empty': content === '' })}>
          {this.displayContent}
        </div>
      </div>
    )
  }
}

