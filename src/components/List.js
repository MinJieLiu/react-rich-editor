import React, { Component, PropTypes } from 'react';
import { RichUtils } from 'draft-js';
import {
  changeDepth,
  getSelectedBlocksType,
  getFirstIcon,
} from '../utils';
import Option from './Option';
import Dropdown from './Dropdown';
import DropdownOption from './DropdownOption';

export default class List extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
  };

  state = {
    currentBlockType: 'unstyled',
  };

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentBlockType: getSelectedBlocksType(editorState),
      });
    }
  }

  componentWillReceiveProps(properties) {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentBlockType: getSelectedBlocksType(properties.editorState),
      });
    }
  }

  onDropdownChange = (value) => {
    if (value === 'unordered-list-item' || value === 'ordered-list-item') {
      this.toggleBlockType(value);
    } else if (value === 'indent') {
      this.indent();
    } else {
      this.outdent();
    }
  };

  options = [{ type: 'unordered', value: 'unordered-list-item' },
    { type: 'ordered', value: 'ordered-list-item' },
    { type: 'indent', value: 'indent' },
    { type: 'outdent', value: 'outdent' }];

  toggleBlockType = (blockType) => {
    const { onChange, editorState } = this.props;
    const newState = RichUtils.toggleBlockType(
      editorState,
      blockType,
    );
    if (newState) {
      onChange(newState, true);
    }
  };

  adjustDepth = (adjustment) => {
    const { onChange, editorState } = this.props;
    const newState = changeDepth(
      editorState,
      adjustment,
      4,
    );
    if (newState) {
      onChange(newState, true);
    }
  };

  indent = () => {
    this.adjustDepth(1);
  };

  outdent = () => {
    this.adjustDepth(-1);
  };

  // todo: evaluate refactoring this code to put a loop there and in other places also in code
  // hint: it will require moving click handlers
  renderInFlatList(currentBlockType, config) {
    const { options, unordered, ordered, indent, outdent, className } = config;
    return (
      <div className={`tool-item list-wrapper ${className}`}>
        {options.indexOf('unordered') >= 0 && (
          <Option
            value="unordered-list-item"
            onClick={this.toggleBlockType}
            className={unordered.className}
            active={currentBlockType === 'unordered-list-item'}
          >
            <img
              src={unordered.icon}
              role="presentation"
            />
          </Option>
        )}
        {options.indexOf('ordered') >= 0 && (
          <Option
            value="ordered-list-item"
            onClick={this.toggleBlockType}
            className={ordered.className}
            active={currentBlockType === 'ordered-list-item'}
          >
            <img
              src={ordered.icon}
              role="presentation"
            />
          </Option>
        )}
        {options.indexOf('indent') >= 0 && (
          <Option
            onClick={this.indent}
            className={indent.className}
          >
            <img
              src={indent.icon}
              role="presentation"
            />
          </Option>
        )}
        {options.indexOf('outdent') >= 0 && (
          <Option
            onClick={this.outdent}
            className={outdent.className}
          >
            <img
              src={outdent.icon}
              role="presentation"
            />
          </Option>
        )}
      </div>
    );
  }

  renderInDropDown(currentBlockType, config) {
    const { options, className } = config;
    return (
      <Dropdown
        className={`tool-item list-dropdown ${className}`}
        onChange={this.onDropdownChange}
      >
        <img
          src={getFirstIcon(config)}
          role="presentation"
        />
        { this.options
          .filter(option => options.indexOf(option.type) >= 0)
          .map((option, index) => (
            <DropdownOption
              key={index}
              value={option.value}
              className={`list-dropdown-option ${config[option.type].className}`}
              active={currentBlockType === option.value}
            >
              <img
                src={config[option.type].icon}
                role="presentation"
              />
            </DropdownOption>
          ))
        }
      </Dropdown>
    );
  }

  render() {
    const { config } = this.props;
    const { currentBlockType } = this.state;
    if (config.inDropdown) {
      return this.renderInDropDown(currentBlockType, config);
    }
    return this.renderInFlatList(currentBlockType, config);
  }
}
