import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import styles from './index.less';
import Table, { Column } from '@/components/Table';
import { viewDoctorAppointment, viewPatientAppointment } from '@/service';
import { HealthInformation, MyDoctorAppointment, MyPatientAppointment } from '@/constants';
import UserStore from '@/stores/user';
import Button from '@/components/Button';
import PatientRecord from '@/biz-components/PatientRecord';

const cx = classNames.bind(styles);

interface DoctorProps {
  userStore: UserStore;
}

interface DashboardState {
  doctorAppointments: MyDoctorAppointment[];
  patientAppointments: MyPatientAppointment[];
  selectedPatient: MyDoctorAppointment | null;
  selectedRecord: MyPatientAppointment;
}

@inject('userStore')
@observer
export default class Dashboard extends PureComponent<DoctorProps, DashboardState> {
  state: DashboardState = {
    doctorAppointments: [],
    patientAppointments: [],
    selectedPatient: null,
    selectedRecord: null,
  }

  private DoctorColumns: Column<MyDoctorAppointment>[] = [
    {
      key: 'id',
      title: 'APPOINTMENT ID',
      width: '20%',
      render(item: MyDoctorAppointment) {
        return item.id;
      },
    },
    {
      key: 'name',
      title: 'PATIENT',
      width: '15%',
      render: (item: MyDoctorAppointment) => {
        const clickHandler = () => { this.handleSelectPatient(item); };
        return (
          <button onClick={clickHandler} className={cx('patientInfo__link')} type="button">{item.name}</button>
        );
      },
    },
    {
      key: 'gender',
      title: 'GENDER',
      width: '15%',
      render(item: MyDoctorAppointment) {
        return item.gender;
      },
    },
    {
      key: 'date',
      title: 'DATE',
      width: '15%',
      render(item: MyDoctorAppointment) {
        return item.date;
      },
    },
    {
      key: 'time',
      title: 'TIME',
      width: '15%',
      render(item: MyDoctorAppointment) {
        return item.startTime;
      },
    },
  ];

  private PatientColumns: Column<MyPatientAppointment>[] = [
    {
      key: 'id',
      title: 'ID',
      width: '10%',
      render(item: MyPatientAppointment) {
        return item.id;
      },
    },
    {
      key: 'hospital',
      title: 'HOSPITAL',
      width: '15%',
      render(item: MyPatientAppointment) {
        return item.hospital;
      },
    },
    {
      key: 'department',
      title: 'DEPARTMENT',
      width: '15%',
      render(item: MyPatientAppointment) {
        return item.department;
      },
    },
    {
      key: 'doctor',
      title: 'DOCTOR',
      width: '15%',
      render(item: MyPatientAppointment) {
        return item.doctor;
      },
    },
    {
      key: 'date',
      title: 'DATE',
      width: '10%',
      render(item: MyPatientAppointment) {
        return item.date;
      },
    },
    {
      key: 'time',
      title: 'TIME',
      width: '10%',
      render(item: MyPatientAppointment) {
        return item.startTime;
      },
    },
    {
      key: 'operation',
      title: '',
      width: '10%',
      render: (item) => {
        const clickHandler = () => this.handleViewRecord(item);
        return <button type="button" onClick={clickHandler}>View</button>;
      },
    },
  ];

  componentDidMount() {
    const { userStore } = this.props;
    const isPatient = userStore!.role === 'PATIENT';
    if (isPatient) {
      this.fetchPatientAppointment();
    } else {
      this.fetchDoctorAppointment();
    }
  }

  async fetchDoctorAppointment() {
    const { userStore } = this.props;
    const res = await viewDoctorAppointment({
      doctorEmail: userStore!.email,
    });
    const doctorAppointments = res.data.map((item, index) => {
      const date = new Date(item.timeslot.date);
      const birthday = new Date(item.patient.birthday);
      const appointment: MyDoctorAppointment = {
        key: '',
        id: 0,
        name: '',
        gender: '',
        email: '',
        date: '',
        startTime: '',
        birthday: '',
        healthInfo: {
          allergy: '',
          disease: '',
          medicalHistory: '',
        },
      };
      appointment.date = `${(date.getMonth() + 1)}-${date.getDate()}`;
      appointment.startTime = item.timeslot.startTime;
      appointment.id = item.appointmentId;
      appointment.name = item.patient.firstName + item.patient.lastName;
      appointment.gender = item.patient.gender;
      appointment.email = item.patient.email;
      appointment.birthday = `${birthday.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
      const healthInfo = JSON.parse(item.patient.healthInformation) as HealthInformation;
      appointment.healthInfo.allergy = healthInfo.allergy;
      appointment.healthInfo.disease = healthInfo.disease;
      appointment.healthInfo.medicalHistory = healthInfo.medicalHistory;
      appointment.key = String(index);
      return appointment;
    });
    this.setState({
      doctorAppointments,
    });
  }

  async fetchPatientAppointment() {
    const { userStore } = this.props;
    const res = await viewPatientAppointment({
      patientEmail: userStore!.email,
    });
    const patientAppointments = res.data.map((item, index) => {
      const date = new Date(item.timeslot.date);
      const appointment: MyPatientAppointment = {
        key: '',
        id: 0,
        hospital: '',
        department: '',
        doctor: '',
        date: '',
        startTime: '',
      };
      appointment.date = `${(date.getMonth() + 1)}-${date.getDate()}`;
      appointment.id = item.appointmentId;
      appointment.doctor = item.doctor.firstName + item.doctor.lastName;
      appointment.department = item.department.departmentName;
      appointment.startTime = item.timeslot.startTime;
      appointment.hospital = item.hospital.hospitalName;
      appointment.key = String(index);
      return appointment;
    });
    this.setState({
      patientAppointments,
    });
  }

  @autobind
  handleSelectPatient(d: MyDoctorAppointment) {
    this.setState({
      selectedPatient: d,
    });
  }

  @autobind
  handleClearSelection() {
    this.setState({
      selectedPatient: null,
    });
  }

  @autobind
  handleViewRecord(record: MyPatientAppointment) {
    this.setState({
      selectedRecord: record,
    });
  }

  @autobind
  handleResetRecord() {
    this.setState({
      selectedRecord: null,
    });
  }

  renderPatient() {
    const { selectedPatient } = this.state;
    return (
      <div className={cx('appointment')}>
        <div className={cx('appointment__buttonContainer')}>
          <Button type="secondary" onClick={this.handleClearSelection}>Back</Button>
        </div>
        <div className={cx('appointment__name')}>{selectedPatient.name}</div>
        <div className={cx('appointment__support')}>
          <span>{selectedPatient.gender}</span>
          <span>{selectedPatient.birthday}</span>
        </div>
        <div className={cx('appointment__indicator')}>ALLERGIES</div>
        <div className={cx('appointment__content')}>{selectedPatient.healthInfo.allergy}</div>
        <div className={cx('appointment__indicator')}>CHRONIC DISEASE</div>
        <div className={cx('appointment__content')}>{selectedPatient.healthInfo.disease}</div>
        <div className={cx('appointment__indicator')}>MEDICAL HISTORY</div>
        <div className={cx('appointment__content')}>{selectedPatient.healthInfo.medicalHistory}</div>
      </div>
    );
  }

  renderAppointment() {
    const { patientAppointments, doctorAppointments } = this.state;
    const { userStore } = this.props;
    const isPatient = userStore!.role === 'PATIENT';
    const table = isPatient ? <Table className={cx('appointment__table')} columns={this.PatientColumns} dataSource={patientAppointments} /> : <Table className={cx('appointment__table')} columns={this.DoctorColumns} dataSource={doctorAppointments} />;
    return (
      <div className={cx('appointment')}>
        <div className={cx('appointment__title')}>{`Good morning ${userStore.firstName}.`}</div>
        <div className={cx('appointment__desc')}>
          <span className={cx('appointment__indicator')}>INCOMING APPOINTMENTS</span>
        </div>
        {table}
      </div>
    );
  }

  renderPatientRecord() {
    const { selectedRecord } = this.state;
    return <PatientRecord appointment={selectedRecord} onClickBack={this.handleResetRecord} />;
  }

  render() {
    const { selectedPatient, selectedRecord } = this.state;
    let content: React.ReactNode;
    if (selectedRecord) {
      content = this.renderPatientRecord();
    } else if (selectedPatient) {
      content = this.renderPatient();
    } else {
      content = this.renderAppointment();
    }
    return (
      <div className={cx('appointment')}>
        {content}
      </div>
    );
  }
}
