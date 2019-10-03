import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

interface BrandProps {
  className: string;
}

export default class Brand extends PureComponent<BrandProps> {
  static defaultProps = {
    className: '',
  }

  render() {
    const { className } = this.props;
    return (
      <h1 className={cx('brand', className)}>Spring</h1>
    );
  }
}
