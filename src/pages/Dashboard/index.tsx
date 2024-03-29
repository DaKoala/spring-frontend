import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import styles from './index.less';
import Table, { Column } from '@/components/Table';
import {
  viewPatientDailyAnalysis,
  viewDoctorAppointment,
  viewPatientAppointment,
  viewPatientAppointmentDoctor,
  addPatientCaseReport,
  cancelAppointmentByPatient,
} from '@/service';
import {
  HealthInformation,
  CaseDesc,
  MyDoctorAppointment,
  MyPatientAppointment,
} from '@/constants';

import UserStore from '@/stores/user';
import Button from '@/components/Button';
import PatientRecord from '@/biz-components/PatientRecord';
import { isFutureDay, isToday } from '@/utils/time';
import toast from '@/utils/toast';

const cx = classNames.bind(styles);

interface DoctorProps {
  userStore: UserStore;
}

interface DashboardState {
  doctorAppointments: MyDoctorAppointment[];
  patientAppointments: MyPatientAppointment[];
  patientPastAppointments: MyPatientAppointment[];
  selectedPatient: MyDoctorAppointment | null;
  selectedRecord: MyPatientAppointment;
  selectedPatientCase: MyDoctorAppointment | null;
  symptoms: string;
  diagnoses: string;
  prescription: string;
  selectedPatientAppointments: MyPatientAppointment[];
  message: string;
}

@inject('userStore')
@observer
export default class Dashboard extends PureComponent<DoctorProps, DashboardState> {
  state: DashboardState = {
    doctorAppointments: [],
    patientAppointments: [],
    patientPastAppointments: [],
    selectedPatient: null,
    selectedRecord: null,
    selectedPatientCase: null,
    symptoms: '',
    diagnoses: '',
    prescription: '',
    selectedPatientAppointments: [],
    message: '',
  }

  private selectedPatientColumns: Column<MyPatientAppointment>[] = [
    {
      key: 'id',
      title: 'APPOINTMENT ID',
      width: '20%',
      render(item: MyPatientAppointment) {
        return item.id;
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
      key: 'department',
      title: 'DEPARTMENT',
      width: '15%',
      render(item: MyPatientAppointment) {
        return item.department;
      },
    },
    {
      key: 'caseDescription',
      title: 'CASE DESCRIPTION',
      width: '55%',
      render: (item: MyPatientAppointment) => (
        <div className={cx('appointment__description')}>
          <div className={cx('appointment__oneDescription')}>
            <div className={cx('appointment__prompt')}>Symptoms:</div>
            <div className={cx('appointment__text')}>{item.caseDescription.symptoms}</div>
          </div>
          <div className={cx('appointment__oneDescription')}>
            <div className={cx('appointment__prompt')}>Diagnoses:</div>
            <div className={cx('appointment__text')}>{item.caseDescription.diagnoses}</div>
          </div>
          <div className={cx('appointment__oneDescription')}>
            <div className={cx('appointment__prompt')}>Prescription:</div>
            <div className={cx('appointment__text')}>{item.caseDescription.prescription}</div>
          </div>
        </div>
      ),
    },
  ];

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
    {
      key: 'add',
      title: '',
      width: '15%',
      render: (item: MyDoctorAppointment) => {
        const clickHandler = () => { this.handleAddCaseReport(item); };
        return (
          <button onClick={clickHandler} className={cx('patientInfo__link')} type="button">Add Case Report</button>
        );
      },
    },
  ];

  private patientColumns: Column<MyPatientAppointment>[] = [
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
        const { isIncoming } = item;
        const clickHandler = isIncoming
          ? () => this.handleCancelAppointment(item) : () => this.handleViewRecord(item);
        const text = isIncoming ? 'Cancel' : 'View';
        return <button type="button" onClick={clickHandler}>{text}</button>;
      },
    },
  ];

  componentDidMount() {
    const { userStore } = this.props;
    const isPatient = userStore!.role === 'PATIENT';
    if (isPatient) {
      this.fetchPatientAppointment();
      this.fetchMessage();
    } else {
      this.fetchDoctorAppointment();
    }
  }

  async fetchMessage() {
    const res = await viewPatientDailyAnalysis();
    const message = res.data;
    this.setState({
      message,
    });
  }

  async fetchDoctorAppointment() {
    const res = await viewDoctorAppointment();
    res.data = res.data.filter((item) => isToday(new Date(item.timeslot.date)));
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
      appointment.name = `${item.patient.firstName} ${item.patient.lastName}`;
      appointment.gender = item.patient.gender;
      appointment.email = item.patient.patientEmail;
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
    const res = await viewPatientAppointment();
    const patientAppointments = res.data.map((item) => {
      const date = new Date(item.timeslot.date);
      const caseDescNull: CaseDesc = {
        symptoms: '',
        diagnoses: '',
        prescription: '',
      };
      const caseDesc = item.caseDescription ? JSON.parse(item.caseDescription) as CaseDesc : caseDescNull;
      const appointment: MyPatientAppointment = {
        key: String(item.appointmentId),
        caseDescription: {
          symptoms: caseDesc.symptoms,
          diagnoses: caseDesc.diagnoses,
          prescription: caseDesc.prescription,
        },
        id: item.appointmentId,
        hospital: item.hospital.hospitalName,
        department: item.department.departmentName,
        doctor: `${item.doctor.firstName} ${item.doctor.lastName}`,
        date: `${(date.getMonth() + 1)}-${date.getDate()}`,
        startTime: item.timeslot.startTime,
        timeSlotId: item.timeslot.timeSlotId,
        isIncoming: isFutureDay(date),
      };
      return appointment;
    });
    const incomingAppointments: MyPatientAppointment[] = [];
    const pastAppointments: MyPatientAppointment[] = [];
    for (const appointment of patientAppointments) {
      if (appointment.isIncoming) {
        incomingAppointments.push(appointment);
      } else {
        pastAppointments.push(appointment);
      }
    }
    this.setState({
      patientAppointments: incomingAppointments,
      patientPastAppointments: pastAppointments,
    });
  }

  async fetchSelectedPatientAppointments(selectedEmail: string) {
    const res = await viewPatientAppointmentDoctor({
      patientEmail: selectedEmail,
    });
    const usableData = res.data.filter((item) => {
      const date = new Date(item.timeslot.date);
      return isFutureDay(date) === false;
    });
    const selectedPatientAppointments = usableData.map((item, index) => {
      const date = new Date(item.timeslot.date);
      const caseDesc = JSON.parse(item.caseDescription) as CaseDesc;
      const appointment: MyPatientAppointment = {
        key: String(index),
        id: item.appointmentId,
        department: item.department.departmentName,
        date: `${(date.getMonth() + 1)}-${date.getDate()}`,
        caseDescription: {
          symptoms: caseDesc.symptoms,
          diagnoses: caseDesc.diagnoses,
          prescription: caseDesc.prescription,
        },
        hospital: item.hospital.hospitalName,
        doctor: '',
        timeSlotId: 0,
        startTime: '',
        isIncoming: isFutureDay(date),
      };
      return appointment;
    });
    this.setState({
      selectedPatientAppointments,
    });
  }

  @autobind
  handleSelectPatient(d: MyDoctorAppointment) {
    this.setState({
      selectedPatient: d,
    });
    this.fetchSelectedPatientAppointments(d.email);
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
  async handleCancelAppointment(appointment: MyPatientAppointment) {
    toast({
      type: 'confirm',
      content: 'Are you sure to cancel the appointment?',
      onClickConfirm: async () => {
        await cancelAppointmentByPatient({
          timeSlotId: appointment.timeSlotId,
          appointmentId: appointment.id,
        });
        await this.fetchPatientAppointment();
      },
    });
  }

  @autobind
  handleClearPatientCase() {
    this.setState({
      selectedPatientCase: null,
      diagnoses: '',
      symptoms: '',
      prescription: '',
    });
  }

  @autobind
  handleResetRecord() {
    this.setState({
      selectedRecord: null,
    });
  }

  @autobind
  handleAddCaseReport(d: MyDoctorAppointment) {
    this.setState({
      selectedPatientCase: d,
    });
  }

  @autobind
  handleSymptomsChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      symptoms: e.target.value,
    });
  }

  @autobind
  handleDiagnosesChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      diagnoses: e.target.value,
    });
  }

  @autobind
  handlePrescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      prescription: e.target.value,
    });
  }

  @autobind
  async handleCompleteCaseReport() {
    const {
      selectedPatientCase, symptoms, diagnoses, prescription,
    } = this.state;
    const description = { symptoms, diagnoses, prescription };
    await addPatientCaseReport({
      appointmentId: selectedPatientCase.id,
      caseDescription: description,
    });

    this.setState({
      selectedPatientCase: null,
      diagnoses: '',
      symptoms: '',
      prescription: '',
    });
  }

  renderAddCaseReport() {
    const { selectedPatientCase } = this.state;
    const { userStore } = this.props;
    const date = new Date(selectedPatientCase.date);
    return (
      <div className={cx('appointment')}>
        <div className={cx('appointment__buttonContainer')}>
          <Button type="secondary" className={cx('appointment__button')} onClick={this.handleClearPatientCase}>Back</Button>
          <Button type="primary" className={cx('appointment__button')} onClick={this.handleCompleteCaseReport}>Complete</Button>
        </div>
        <div className={cx('appointment__name')}>{`New Case Report for ${selectedPatientCase.name}`}</div>
        <div className={cx('appointment__largeContainer')}>
          <div className={cx('appointment__container')}>
            <div className={cx('appointment__indicator')}>APPOINTMENT ID</div>
            <div className={cx('appointment__normal')}>{selectedPatientCase.id}</div>
          </div>
          <div className={cx('appointment__container')}>
            <div className={cx('appointment__indicator')}>DEPARTMENT</div>
            <div className={cx('appointment__normal')}>{userStore.departmentName}</div>
          </div>
          <div className={cx('appointment__container')}>
            <div className={cx('appointment__indicator')}>DATE</div>
            <div className={cx('appointment__normal')}>{`${(date.getMonth() + 1)}-${date.getDate()}`}</div>
          </div>
        </div>
        <div className={cx('appointment__indicator')}>CASE DESCRIPTION</div>
        <div className={cx('appointment__indicator')}>SYMPTOMS</div>
        <textarea
          className={cx('appointment__input')}
          onChange={this.handleSymptomsChange}
        />
        <div className={cx('appointment__indicator')}>DIAGNOSES</div>
        <textarea
          className={cx('appointment__input')}
          onChange={this.handleDiagnosesChange}
        />
        <div className={cx('appointment__indicator')}>PRESCRIPTION</div>
        <textarea
          className={cx('appointment__input')}
          onChange={this.handlePrescriptionChange}
        />
      </div>
    );
  }

  renderPatient() {
    const { selectedPatient, selectedPatientAppointments } = this.state;
    const table = <Table className={cx('appointment__table')} columns={this.selectedPatientColumns} dataSource={selectedPatientAppointments} />
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
        <div className={cx('appointment__indicator')}>MEDICAL RECORDS</div>
        {table}
      </div>
    );
  }

  renderAppointment() {
    const { patientAppointments, doctorAppointments, message } = this.state;
    const reminder = message;
    const { userStore } = this.props;
    const isPatient = userStore!.role === 'PATIENT';
    const today = new Date();
    let greeting;
    if (today.getHours() < 12) {
      greeting = 'Good morning';
    } else if (today.getHours() < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }
    const table = isPatient ? <Table className={cx('appointment__table')} columns={this.patientColumns} dataSource={patientAppointments} /> : <Table className={cx('appointment__table')} columns={this.DoctorColumns} dataSource={doctorAppointments} />;
    return (
      <div className={cx('appointment')}>
        { isPatient && reminder.length > 0 && <div className = {cx('appointment__reminder')}>{reminder}</div> }
        <div className={cx('appointment__title')}>{`${greeting} ${userStore.firstName}.`}</div>
        <div className={cx('appointment__desc')}>
          <span className={cx('appointment__indicator')}>INCOMING APPOINTMENTS</span>
        </div>
        {table}
        {this.renderPastAppointment()}
      </div>
    );
  }

  renderPastAppointment() {
    const { patientPastAppointments } = this.state;
    if (patientPastAppointments.length === 0) {
      return null;
    }
    return (
      <>
        <div className={cx('appointment__desc')}>
          <span className={cx('appointment__indicator')}>
            PAST APPOINTMENTS
          </span>
          <Table className={cx('appointment__table')} columns={this.patientColumns} dataSource={patientPastAppointments} />
        </div>
      </>
    );
  }

  renderPatientRecord() {
    const { selectedRecord } = this.state;
    return <PatientRecord appointment={selectedRecord} onClickBack={this.handleResetRecord} />;
  }

  render() {
    const { selectedPatient, selectedRecord, selectedPatientCase } = this.state;
    let content: React.ReactNode;
    if (selectedRecord) {
      content = this.renderPatientRecord();
    } else if (selectedPatient) {
      content = this.renderPatient();
    } else if (selectedPatientCase) {
      content = this.renderAddCaseReport();
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
