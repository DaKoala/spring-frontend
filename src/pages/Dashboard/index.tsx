import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import styles from './index.less';
import Table, { Column } from '@/components/Table';
import { ViewDoctorAppointment, ViewPatientAppointment } from '@/service';
import UserStore from '@/stores/user';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

interface DoctorProps {
  userStore: UserStore;
}

interface DashboardState {
  doctorAppointments: MyDoctorAppointment[];
  patientAppointments: MyPatientAppointment[];
  selectedPatient: MyDoctorAppointment | null;
}

interface MyDoctorAppointment {
  key: string;
  id: number;
  name: string;
  gender: string;
  email: string;
  healthInfo: {
    allergy: string;
    disease: string;
    medicalHistory: string;
  };
  birthday: string;
  date: string;
  startTime: string;
}

interface MyPatientAppointment {
  key: string;
  id: number;
  hospital: string;
  department: string;
  doctor: string;
  date: string;
  startTime: string;
}

@inject('userStore')
@observer
export default class Dashboard extends PureComponent<DoctorProps, DashboardState> {
  state: DashboardState = {
    doctorAppointments: [],
    patientAppointments: [],
    selectedPatient: null,
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
    const res = await ViewDoctorAppointment({
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
      appointment.startTime = `${date.getHours()}:${date.getMinutes()}`;
      appointment.id = item.appointmentId;
      appointment.name = item.patient.firstName + item.patient.lastName;
      appointment.gender = item.patient.gender;
      appointment.email = item.patient.email;
      appointment.birthday = `${birthday.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
      appointment.healthInfo.allergy = item.patient.healthInformation.allergy;
      appointment.healthInfo.disease = item.patient.healthInformation.disease;
      appointment.healthInfo.medicalHistory = item.patient.healthInformation.medicalHistory;
      appointment.key = String(index);
      return appointment;
    });
    this.setState({
      doctorAppointments,
    });
  }

  async fetchPatientAppointment() {
    const { userStore } = this.props;
    const res = await ViewPatientAppointment({
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
      appointment.startTime = `${date.getHours()}:${date.getMinutes()}`;
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

  render() {
    const { selectedPatient } = this.state;
    const pageContent = selectedPatient ? this.renderPatient() : this.renderAppointment();
    return pageContent;
  }
}
