import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Dropdown extends Component {

  static propTypes = {
    children: PropTypes.any,
    onChange: PropTypes.func,
    className: PropTypes.string,
    optionWrapperClassName: PropTypes.string,
  };

  state = {
    expanded: false,
    highlighted: -1,
  };

  onChange = (value) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
    this.toggleExpansion();
  };

  onKeyDown = (event) => {
    event.preventDefault();
    const { children } = this.props;
    const { expanded, highlighted } = this.state;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      if (!expanded) {
        this.toggleExpansion();
      } else {
        this.setHighlighted((highlighted === children[1].length - 1) ? 0 : highlighted + 1);
      }
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      this.setHighlighted(highlighted <= 0 ? children[1].length - 1 : highlighted - 1);
    } else if (event.key === 'Enter') {
      if (highlighted > -1) {
        this.onChange(this.props.children[1][highlighted].props.value);
      } else {
        this.toggleExpansion();
      }
    } else if (event.key === 'Escape') {
      this.collapse();
    }
  };

  setHighlighted = (highlighted) => {
    this.setState({
      highlighted,
    });
  };

  collapse = () => {
    this.setState({
      highlighted: -1,
      expanded: false,
    });
  };

  toggleExpansion = () => {
    const expanded = !this.state.expanded;
    this.setState({
      highlighted: -1,
      expanded,
    });
  };

  render() {
    const { children, className, optionWrapperClassName } = this.props;
    const { expanded, highlighted } = this.state;
    const options = children.slice(1, children.length);
    return (
      <div
        tabIndex="0"
        onKeyDown={this.onKeyDown}
        className={`dropdown-wrapper ${className}`}
        onMouseLeave={this.collapse}
      >
        <a
          className="dropdown-selected-text"
          onClick={this.toggleExpansion}
        >
          {children[0]}
          <div
            className={classNames({
              'dropdown-caretto-close': expanded,
              'dropdown-caretto-open': !expanded,
            })}
          />
        </a>
        {expanded ?
          <ul
            className={`dropdown-option-wrapper ${optionWrapperClassName}`}
          >
            {
              React.Children.map(options, (option, index) => {
                return option && React.cloneElement(
                    option, {
                      onSelect: this.onChange,
                      highlighted: highlighted === index,
                      setHighlighted: this.setHighlighted,
                      index,
                    });
              })
            }
          </ul> : undefined}
      </div>
    );
  }
}
