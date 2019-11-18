import React from 'react';
import classNames from 'classnames/bind';
import { MyPatientAppointment } from '@/constants';
import Button from '@/components/Button';
import InfoItem from '@/components/InfoItem';
import styles from './index.less';

const cx = classNames.bind(styles);

interface PatientRecordProps {
  appointment: MyPatientAppointment;
  onClickBack: React.MouseEventHandler<HTMLButtonElement>;
}

function renderCell(title: string, content: React.ReactNode) {
  return (
    <div className={cx('record__cell')}>
      <p className={cx('cell__title')}>{title}</p>
      <p className={cx('cell__content')}>{content}</p>
    </div>
  );
}

const PatientRecord: React.FC<PatientRecordProps> = ({ appointment, onClickBack }) => {
  const {
    hospital,
    department,
    doctor,
    date,
    id,
  } = appointment;
  return (
    <div>
      <div className={cx('record__header')}>
        <p className={cx('record__title')}>Medical Records</p>
        <Button onClick={onClickBack} type="secondary">Back</Button>
      </div>
      <div className={cx('record__line')}>
        {renderCell('HOSPITAL', hospital)}
        {renderCell('DEPARTMENT', department)}
      </div>
      <div className={cx('record__line')}>
        {renderCell('DOCTOR', doctor)}
        {renderCell('DATE', date)}
        {renderCell('APPOINTMENT ID', id)}
      </div>
      <InfoItem label="CASE DESCRIPTION" />
    </div>
  );
};

export default PatientRecord;
