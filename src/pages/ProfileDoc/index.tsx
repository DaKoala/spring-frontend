import React, { PureComponent } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames/bind";
import styles from "./index.less";
import UserStore from "@/stores/user";
import { formatDate } from "@/utils/time";
import InfoItem from "@/components/InfoItem";

const cx = classNames.bind(styles);

interface ProfileProps {
  userStore?: UserStore;
}

@inject("userStore")
@observer
export default class ProfileDoc extends PureComponent<ProfileProps> {
  get displayGender(): string {
    const { userStore } = this.props;
    const { gender } = userStore!;
    return `${gender.substring(0, 1).toUpperCase()}${gender.substring(1)}`;
  }

  get displayBirthday(): string {
    const { userStore } = this.props;
    const { birthday } = userStore!;
    return formatDate(birthday, "YYYY-MM-DD");
  }

  get displayHospital(): string {
    const { userStore } = this.props;
    const { hospital } = userStore!;
    return `${hospital.substring(0, 1).toUpperCase()}${hospital.substring(1)}`;
  }

  get displayDepartment(): string {
    const { userStore } = this.props;
    const { department } = userStore!;
    return `${department.substring(0, 1).toUpperCase()}${department.substring(
      1
    )}`;
  }

  get displayTitle(): string {
    const { userStore } = this.props;
    const { title } = userStore!;
    return `${title.substring(0, 1).toUpperCase()}${title.substring(1)}`;
  }

  render() {
    const { userStore } = this.props;
    const { fullName } = userStore!;
    return (
      <div className={cx("profile")}>
        <div className={cx("profile__name")}>{fullName}</div>
        <div className={cx("profile__support")}>
          <span>{this.displayGender}</span>
          <span>{this.displayBirthday}</span>
        </div>
        <div className={cx("profile__title")}>{this.displayTitle}</div>
        <div className={cx("profile__support")}>
          <span>{this.displayDepartment}</span>
          <span>{this.displayHospital}</span>
        </div>
      </div>
    );
  }
}
