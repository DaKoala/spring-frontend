import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames/bind';
import Button from '@/components/Button';
import Select from '@/components/Select';
import Table, { Column } from '@/components/Table';
import {
  Hospital,
  Department,
  Doctor,
  WithIndex,
  TimeSlotFormat,
} from '@/constants';
import {
  viewHospital,
  viewDepartment,
  searchDoctorByDepartment,
  viewDoctorTimeslot,
  postPatientAppointment,
} from '@/service';
import appendKey from '@/utils/appendKey';
import { addMinute } from '@/utils/time';
import RouterStore from '@/stores/router';
import styles from './index.less';

const cx = classNames.bind(styles);

interface MakeAppointmentProps {
  routerStore: RouterStore;
}

interface MakeAppointmentState {
  selectedHospital: Hospital;
  selectedDepartment: Department;
  selectedDoctor: Doctor;
  selectedDate: string;
  hospitals: WithIndex<Hospital>[];
  departments: WithIndex<Department>[];
  doctors: WithIndex<Doctor>[];
  timeSlots: WithIndex<TimeSlotFormat>[];
}

@inject('routerStore')
@observer
export default class MakeAppointment extends Component<MakeAppointmentProps, MakeAppointmentState> {
  state: MakeAppointmentState = {
    selectedHospital: null,
    selectedDepartment: null,
    selectedDoctor: null,
    selectedDate: '',
    hospitals: [],
    departments: [],
    doctors: [],
    timeSlots: [],
  }

  private dateOptions: { text: string; value: string }[] = [];

  private hospitalColumns: Column<WithIndex<Hospital>>[] = [
    {
      key: 'hospital',
      title: 'HOSPITAL',
      width: '30%',
      render: (hospital) => hospital.hospitalName,
    },
    {
      key: 'address',
      title: 'ADDRESS',
      width: '40%',
      render: () => '1555 Century Avenue, Pudong New District',
    },
    {
      key: 'select',
      title: '',
      width: '30%',
      render: (hospital) => {
        const clickHandler = () => {
          this.handleSelectHospital(hospital);
        };
        return <button onClick={clickHandler} type="button">Select</button>;
      },
    },
  ];

  private departmentColumns: Column<WithIndex<Department>>[] = [
    {
      key: 'department',
      title: 'DEPARTMENT',
      width: '80%',
      render: (department) => department.departmentName,
    },
    {
      key: 'select',
      title: '',
      width: '20%',
      render: (department) => {
        const clickHandler = () => {
          this.handleSelectDepartment(department);
        };
        return <button onClick={clickHandler} type="button">Select</button>;
      },
    },
  ];

  private doctorColumns: Column<WithIndex<Doctor>>[] = [
    {
      key: 'doctor',
      title: 'DOCTOR',
      width: '30%',
      render: (doctor) => `${doctor.firstName} ${doctor.lastName}`,
    },
    {
      key: 'title',
      title: 'TITLE',
      width: '30%',
      render: (doctor) => doctor.title,
    },
    {
      key: 'gender',
      title: 'GENDER',
      width: '30%',
      render: (doctor) => doctor.gender,
    },
    {
      key: 'select',
      title: '',
      width: '10%',
      render: (doctor) => {
        const clickHandler = () => {
          this.handleSelectDoctor(doctor);
        };
        return <button onClick={clickHandler} type="button">Select</button>;
      },
    },
  ];

  private timeSlotColumns: Column<WithIndex<TimeSlotFormat>>[] = [
    {
      key: 'date',
      title: 'DATE',
      width: '20%',
      render: (timeSlot) => timeSlot.date,
    },
    {
      key: 'time',
      title: 'TIME',
      width: '30%',
      render: (timeSlot) => addMinute(timeSlot.startTime, 30),
    },
    {
      key: 'seats',
      title: 'SEATS',
      width: '30%',
      render: (timeSlot) => timeSlot.seat,
    },
    {
      key: 'cancel',
      title: '',
      width: '20%',
      render: (timeSlot) => {
        const clickHandler = () => {
          this.handleMakeAppointment(timeSlot);
        };
        return <button onClick={clickHandler} type="button">Select</button>;
      },
    },
  ];

  async componentDidMount() {
    const res = await viewHospital();
    const hospitalsWithKey = appendKey(res.data, (hospital) => hospital.hospitalId);
    this.setState({
      hospitals: hospitalsWithKey,
    });
  }

  get userSelectedTimeSlots(): WithIndex<TimeSlotFormat>[] {
    const { timeSlots, selectedDate } = this.state;
    if (!selectedDate) {
      return timeSlots;
    }
    return timeSlots.filter((timeSlot) => timeSlot.date === selectedDate);
  }

  private generateDateOptions(timeSlots: TimeSlotFormat[]) {
    const uniqueDates = Array.from(new Set(timeSlots.map((timeSlot) => timeSlot.date)));
    this.dateOptions = uniqueDates.map((date) => ({ text: date, value: date }));
  }

  @autobind
  async handleMakeAppointment(timeSlot: TimeSlotFormat) {
    const { selectedDoctor } = this.state;
    await postPatientAppointment({
      timeSlotId: timeSlot.timeSlotId,
      doctorEmail: selectedDoctor.doctorEmail,
    });
    alert(`You successfully made an appointment with doctor ${selectedDoctor.firstName}`);
    const { routerStore } = this.props;
    routerStore.replace('/user');
  }

  @autobind
  async handleSelectHospital(hospital: Hospital) {
    this.setState({
      selectedHospital: hospital,
    });
    const res = await viewDepartment({
      hospitalId: hospital.hospitalId,
    });
    const departmentsWithKey = appendKey(res.data, (department) => String(department.departmentId));
    this.setState({
      departments: departmentsWithKey,
    });
  }

  @autobind
  async handleSelectDepartment(department: Department) {
    this.setState({
      selectedDepartment: department,
    });
    const res = await searchDoctorByDepartment({
      departmentId: department.departmentId,
    });
    const doctorsWithKey = appendKey(res.data, (doctor) => doctor.doctorEmail);
    this.setState({
      doctors: doctorsWithKey,
    });
  }

  @autobind
  async handleSelectDoctor(doctor: Doctor) {
    this.setState({
      selectedDoctor: doctor,
    });
    const res = await viewDoctorTimeslot({
      doctorEmail: doctor.doctorEmail,
    });
    const timeSlotsWithKey = appendKey(res.data, (timeSlot) => String(timeSlot.timeSlotId));
    this.generateDateOptions(timeSlotsWithKey);
    this.setState({
      timeSlots: timeSlotsWithKey,
    });
  }

  @autobind
  handleSelectDate(date: string) {
    this.setState({
      selectedDate: date,
    });
  }

  @autobind
  handleClickBack() {
    const { selectedDepartment, selectedDoctor } = this.state;
    if (selectedDoctor) {
      this.setState({
        selectedDoctor: null,
        selectedDate: '',
        timeSlots: [],
      });
    } else if (selectedDepartment) {
      this.setState({
        selectedDepartment: null,
        doctors: [],
      });
    } else {
      this.setState({
        selectedHospital: null,
        departments: [],
      });
    }
  }

  renderSubtitle() {
    const { selectedHospital, selectedDepartment, selectedDoctor } = this.state;
    if (!selectedHospital) {
      return <div className={cx('subtitle')}>SELECT HOSPITAL</div>;
    }
    const backText = '<<BACK';
    const backButton = <span className={cx('subtitle__btn')} onClick={this.handleClickBack}>{backText}</span>;
    const hospitalName = <span>{selectedHospital.hospitalName}</span>;
    const departmentName = selectedDepartment
      ? <span>{selectedDepartment.departmentName}</span> : null;
    const doctorName = selectedDoctor ? <span>{`${selectedDoctor.firstName} ${selectedDoctor.lastName}`}</span> : null;
    return (
      <div className={cx('subtitle')}>
        {backButton}
        {hospitalName}
        {departmentName}
        {doctorName}
      </div>
    );
  }

  renderSelection() {
    return <Select label="DATE" options={this.dateOptions} onChange={this.handleSelectDate} />;
  }

  renderContent() {
    const { selectedHospital, selectedDepartment, selectedDoctor } = this.state;
    let columns: Column<WithIndex<Hospital | Department | Doctor | TimeSlotFormat>>[];
    let dataSource: WithIndex<Hospital | Department | Doctor | TimeSlotFormat>[];
    if (!selectedHospital) {
      const { hospitals } = this.state;
      columns = this.hospitalColumns;
      dataSource = hospitals;
    } else if (!selectedDepartment) {
      const { departments } = this.state;
      columns = this.departmentColumns;
      dataSource = departments;
    } else if (!selectedDoctor) {
      const { doctors } = this.state;
      columns = this.doctorColumns;
      dataSource = doctors;
    } else {
      const { timeSlots } = this.state;
      columns = this.timeSlotColumns;
      dataSource = timeSlots;
    }
    return <Table className={cx('dataTable')} columns={columns} dataSource={dataSource} />;
  }

  render() {
    return (
      <div className={cx('makeAppointment')}>
        <div className={cx('makeAppointment__title')}>
          <div className={cx('title__text')}>Make New Appointment</div>
          <Button type="secondary">Cancel</Button>
        </div>
        {this.renderSubtitle()}
        {this.renderSelection()}
        {this.renderContent()}
      </div>
    );
  }
}
