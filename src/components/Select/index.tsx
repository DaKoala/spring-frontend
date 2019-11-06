import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import autobind from 'autobind-decorator';
import classNames from 'classnames/bind';
import styles from './index.less';
import animation from '../../styles/animation.less';

const cx = classNames.bind(styles);
const ani = classNames.bind(animation);

type OptionValue = string | number;

export interface Option {
  value: OptionValue;
  text: string;
}

interface SelectProps {
  className: string;
  label: string;
  required: boolean;
  defaultValue?: OptionValue;
  options: Option[];
  onChange: (value: OptionValue) => void;
}

interface SelectState {
  expanded: boolean;
  currentText: string;
  currentValue: OptionValue;
}

export default class Select extends PureComponent<SelectProps, SelectState> {
  state: SelectState = {
    expanded: false,
    currentValue: '',
    currentText: '',
  }

  static defaultProps = {
    className: '',
    required: false,
    options: [],
    onChange: () => {},
  }

  componentDidMount() {
    const { options, defaultValue } = this.props;
    const defaultOption = options.find((option) => option.value === defaultValue);
    if (defaultOption) {
      this.setState({
        currentValue: defaultOption.value,
        currentText: defaultOption.text,
      });
    }
  }

  @autobind
  hideOptions() {
    this.setState({
      expanded: false,
    }, () => {
      document.removeEventListener('click', this.hideOptions);
    });
  }

  @autobind
  handleBoxClick() {
    this.setState({
      expanded: true,
    }, () => {
      document.addEventListener('click', this.hideOptions);
    });
  }

  @autobind
  handleOptionClick(option: Option) {
    const { onChange } = this.props;
    this.setState({
      currentText: option.text,
      currentValue: option.value,
    });
    onChange(option.value);
  }

  renderOptions() {
    const { expanded, currentValue } = this.state;
    const { options } = this.props;
    const optionList = options.map((option) => {
      const { value, text } = option;
      const clickHandler = () => {
        this.handleOptionClick(option);
      };
      const optionClass = cx('select__box', 'select__box--option', { 'select__box--active': currentValue === option.value });
      return (
        <div onClick={clickHandler} key={value} className={optionClass}>
          {text}
        </div>
      );
    });
    const transition = {
      enter: ani('expand-down-enter'),
      enterActive: ani('expand-down-enter-active'),
      exit: ani('expand-down-exit'),
      exitActive: ani('expand-down-exit-active'),
    };
    return (
      <CSSTransition
        classNames={transition}
        in={expanded}
        timeout={300}
        unmountOnExit
      >
        <div className={cx('select__options')}>
          {optionList}
        </div>
      </CSSTransition>
    );
  }

  render() {
    const { expanded, currentText } = this.state;
    const { className, required, label } = this.props;
    return (
      <div className={cx('select', className)}>
        <div className={cx('select__label', { 'select__label--required': required })}>
          {label}
        </div>
        <div onClick={this.handleBoxClick} className={cx('select__box', { 'select__box--expanded': expanded })}>
          {currentText}
          <div className={cx('select__triangle')}>▾</div>
          {this.renderOptions()}
        </div>
      </div>
    );
  }
}
