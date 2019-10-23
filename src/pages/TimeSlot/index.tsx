import React, { PureComponent } from "react";
import classNames from "classnames/bind";
import styles from "./index.less";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Table, { Column } from '@/components/Table';
import { TimeSlotFormat, Indexable } from '@/constants';
import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import { viewDoctorTimeslot, postDoctorTimeslot } from '@/service';
import UserStore from '@/stores/user';
import FormatDate from '@/utils/time';

const cx = classNames.bind(styles);

interface DoctorProps {
  userStore: UserStore;
}

interface TimeSlotState {
  timeslots: (TimeSlotFormat & Indexable)[];
  selectedTimeSlot: TimeSlotFormat | null;
  isAdding: boolean;
  date: string;
  startTime: string;
  endTime: string;
  seat: number;
}

@inject('userStore')
@observer
export default class TimeSlot extends PureComponent<DoctorProps, TimeSlotState> {
  state: TimeSlotState = {
    timeslots: [],
    selectedTimeSlot: null,
    isAdding: false,
    date: '',
    startTime: '',
    endTime: '',
    seat: 0
  }

  private TimeSlotColumns: Column<TimeSlotFormat & Indexable>[] = [
    {
      key: 'date',
      title: 'DATE',
      width: '20%',
      render(item: TimeSlotFormat) {
        return item.date;
      },
    },
    {
      key: 'time',
      title: 'TIME',
      width: '20%',
      render(item: TimeSlotFormat) {
        return item.startTime;
      },
    },
    {
      key: 'seat',
      title: 'SEATS',
      width: '40%',
      render(item: TimeSlotFormat) {
        return item.seat;
      },
    },
    // {
    //   key: 'cancel',
    //   title: '',
    //   width: '20%',
    //   render: (item: TimeSlotFormat) => {
    //     // const clickHandler = () => { this.handleCancelTimeSlot(item); };
    //     // return (
    //     //   <button onClick={clickHandler} className={cx('timeslot__link')} type="button">Cancel</button>
    //     // );
    //   },
    // },
  ];

  componentDidMount() {
    this.fetchTimeSlots();
  }

  async fetchTimeSlots() {
    const { userStore } = this.props;
    const res = await viewDoctorTimeslot({
      doctorEmail: userStore!.email,
    });
    const timeslots = res.data.map((ts, index) => {
      var date = new Date(ts.date);
      ts.date = date.getDate().toString();
      const timeslotWithKey = ts as (TimeSlotFormat & Indexable);
      timeslotWithKey.key = String(index);

      return timeslotWithKey;
    });
    this.setState({
      timeslots,
    });
  }

  @autobind
  closeModal() {
    this.setState({
      isAdding: false,
      date: '',
      startTime:'',
      endTime: '',
      seat: 0
    });
  }

  @autobind
  async handleTimeSlotCreate() {
    const {date, startTime, endTime, seat} = this.state;

    const end1 = parseInt(endTime.split(":")[0])
    const end2 = parseInt(endTime.split(":")[1])
    const start1 = parseInt(startTime.split(":")[0])
    const start2 = parseInt(startTime.split(":")[1])

    const numTimeSlot = Math.round((end1 - start1)/2 + (end2 - start2)/30)

    await postDoctorTimeslot({
      date,
      startTime,
      numTimeSlot,
      seat
    });
    this.closeModal();
    this.fetchTimeSlots();
  }

  @autobind
  handleClickClose() {
    this.setState({
      isAdding: false,
    });
  }

  @autobind
  handleClickAdd() {
    this.setState({
      isAdding: true,
    });
  }

  @autobind
  handleSelectTimeSlot(d: TimeSlotFormat) {
    this.setState({
      selectedTimeSlot: d,
    });
  }

  @autobind
  handleClearSelection() {
    this.setState({
      selectedTimeSlot: null,
    });
  }

  @autobind
  handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      date: e.target.value,
    });
  }

  @autobind
  handleStartChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      startTime: e.target.value,
    });
  }

  @autobind
  handleEndChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      endTime: e.target.value,
    });
  }

  @autobind
  handleSeatChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      seat: parseInt(e.target.value),
    });
  }

  render() {
    const { timeslots, isAdding } = this.state;
    return (
      <div className={cx("timeslot")}>
        <div className={cx("timeslot__title")}>Time Slots</div>
        <div className={cx("timeslot__desc")}>
          <span className={cx("timeslot__indicator")}>INCOMING TIME SLOTS</span>
          <Button onClick={this.handleClickAdd} className={cx('timeslot__addButton')}>Add new</Button>
        </div>
        <Table className={cx('timeslot__table')} dataSource={timeslots} columns={this.TimeSlotColumns} />
        <Modal visible={isAdding} onMaskClick={this.handleClickClose}>
          <div className = {cx("timeslot__wrap")}>
            <span className={cx("timeslot__indicator")}>DATE</span>
            <Input
              key="date"
              className={cx('timeslot__input')}
              label="DATE(YYYY-MM-DD)"
              onChange={this.handleDateChange}
            />
            <span className={cx("timeslot__indicator")}>IN</span>
            <Input
              key="startTime"
              className={cx('timeslot__input')}
              label="TIME(HH:MM)"
              onChange={this.handleStartChange}
            />
            <span className={cx("timeslot__indicator")}>OUT</span>
            <Input
              key="endTime"
              className={cx('timeslot__input')}
              label="TIME(HH:MM)"
              onChange={this.handleEndChange}
            />
            <span className={cx("timeslot__indicator")}>SEATS</span>
            <Input
              key="seat"
              className={cx('timeslot__input')}
              label="NUM(00)"
              onChange={this.handleSeatChange}
            />
            <div className={cx("timeslot__buttons")}>
              <Button type = "secondary" className={cx("timeslot__cancel")} onClick={this.handleClickClose}>Cancel</Button>
              <Button onClick={this.handleTimeSlotCreate} className={cx("timeslot__create")}>Create</Button>
            </div>
          </div>
        </Modal>

      </div>
    );
  }
}
