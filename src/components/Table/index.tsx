import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

interface Column<T> {
  key: string;
  title: string;
  width: string;
  render(item: T, index: number): React.ReactNode;
}

interface Indexable {
  key: string;
}

interface TableProps<T extends Indexable> {
  className?: string;
  dataSource: T[];
  columns: Column<T>[];
}

interface Data {
  key: string;
  name: string;
  title: string;
  gender: string;
  birthday: string;
}

export default class Table<T extends Indexable> extends PureComponent<TableProps<T>> {
  renderTableHead() {
    const { columns } = this.props;
    const heads = columns.map((item) => {
      const { key, title, width } = item;
      const style = { width };
      return (
        <th className={cx('table__head')} key={`${key}-title`} style={style}>{title}</th>
      );
    });
    return (
      <tr>
        {heads}
      </tr>
    );
  }

  renderTableBody() {
    const { dataSource, columns } = this.props;
    return dataSource.map((item, index) => {
      const cells = columns.map((columnItem) => {
        const { key, width, render } = columnItem;
        const itemKey = `${key}-${index}`;
        const style = { width };
        return (
          <td className={cx('table__body')} key={itemKey} style={style}>{render(item, index)}</td>
        );
      });
      const { key } = item;
      return (
        <tr key={key}>
          {cells}
        </tr>
      );
    });
  }

  render() {
    const { className = '' } = this.props;
    return (
      <table className={cx('table', className)}>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </table>
    );
  }
}
