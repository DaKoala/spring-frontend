import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

interface BrandProps {
  className: string;
  toIndex?: boolean;
}

export default class Brand extends PureComponent<BrandProps> {
  static defaultProps = {
    className: '',
  }

  render() {
    const { className, toIndex } = this.props;
    const content = toIndex ? (
      <Link to="/">Spring</Link>
    ) : 'Spring';
    return (
      <h1 className={cx('brand', className)}>{content}</h1>
    );
  }
}
