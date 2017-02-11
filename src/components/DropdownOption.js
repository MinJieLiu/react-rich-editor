import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class DropdownOption extends Component {

  static propTypes = {
    children: PropTypes.any,
    value: PropTypes.any,
    onClick: PropTypes.func,
    onSelect: PropTypes.func,
    setHighlighted: PropTypes.func,
    index: PropTypes.number,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    highlighted: PropTypes.bool,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    disabledClassName: PropTypes.string,
    highlightedClassName: PropTypes.string,
  };

  onClick = (event) => {
    const {
      onSelect,
      onClick,
      value,
      disabled,
    } = this.props;
    if (!disabled) {
      if (onSelect) {
        onSelect(value);
      }
      if (onClick) {
        event.stopPropagation();
        onClick(value);
      }
    }
  };

  setHighlighted = () => {
    const { setHighlighted, index } = this.props;
    setHighlighted(index);
  };

  resetHighlighted = () => {
    const { setHighlighted } = this.props;
    setHighlighted(-1);
  };

  render() {
    const {
      children,
      active,
      disabled,
      highlighted,
      className,
      activeClassName,
      disabledClassName,
      highlightedClassName,
    } = this.props;

    return (
      <li
        className={classNames(
          'dropdown-option-default',
          className,
          {
            [`dropdown-option-active ${activeClassName}`]: active,
            [`dropdown-option-highlighted ${highlightedClassName}`]: highlighted,
            [`dropdown-option-disabled ${disabledClassName}`]: disabled,
          })
        }
        onMouseEnter={this.setHighlighted}
        onMouseLeave={this.resetHighlighted}
        onClick={this.onClick}
      >
        {children}
      </li>
    );
  }
}
