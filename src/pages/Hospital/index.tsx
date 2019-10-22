import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames/bind';
import Modal from '@/components/Modal';
import UserStore from '@/stores/user';
import styles from './index.less';

const cx = classNames.bind(styles);

interface HospitalProps {
  userStore: UserStore;
}

@inject('userStore')
@observer
export default class Hospital extends PureComponent<HospitalProps> {
  get greeting(): string {
    const { userStore } = this.props;
    const { firstName } = userStore;
    return `Hello, ${firstName}.`;
  }

  render() {
    return (
      <div className={cx('hospital')}>
        <Modal visible>
          Foo
        </Modal>
      </div>
    );
  }
}
