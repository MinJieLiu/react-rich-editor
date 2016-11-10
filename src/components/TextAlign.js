import React, { Component, PropTypes } from 'react';
import {
  getSelectedBlocksMetadata,
  setBlockData,
  getFirstIcon,
} from '../utils';
import Option from './Option';
import Dropdown from './Dropdown';
import DropdownOption from './DropdownOption';

export default class TextAlign extends Component {

  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object,
  };

  state = {
    currentTextAlignment: undefined,
  };

  componentWillReceiveProps(properties) {
    if (properties.editorState !== this.props.editorState) {
      this.setState({
        currentTextAlignment: getSelectedBlocksMetadata(properties.editorState).get('text-align'),
      });
    }
  }

  addBlockAlignmentData = (value) => {
    const { editorState, onChange } = this.props;
    const { currentTextAlignment } = this.state;
    if (currentTextAlignment !== value) {
      onChange(setBlockData(editorState, { 'text-align': value }));
    } else {
      onChange(setBlockData(editorState, { 'text-align': undefined }));
    }
  };

  renderInFlatList(config) {
    const { currentTextAlignment } = this.state;
    const { options, left, center, right, justify, className } = config;
    return (
      <div className={`tool-item text-align-wrapper ${className}`}>
        {options.indexOf('left') >= 0 && (
          <Option
            value="left"
            className={left.className}
            active={currentTextAlignment === 'left'}
            onClick={this.addBlockAlignmentData}
          >
            <img
              src={left.icon}
              role="presentation"
            />
          </Option>
        )}
        {options.indexOf('center') >= 0 && (
          <Option
            value="center"
            className={center.className}
            active={currentTextAlignment === 'center'}
            onClick={this.addBlockAlignmentData}
          >
            <img
              src={center.icon}
              role="presentation"
            />
          </Option>
        )}
        {options.indexOf('right') >= 0 && (
          <Option
            value="right"
            className={right.className}
            active={currentTextAlignment === 'right'}
            onClick={this.addBlockAlignmentData}
          >
            <img
              src={right.icon}
              role="presentation"
            />
          </Option>
        )}
        {options.indexOf('justify') >= 0 && (
          <Option
            value="justify"
            className={justify.className}
            active={currentTextAlignment === 'justify'}
            onClick={this.addBlockAlignmentData}
          >
            <img
              src={justify.icon}
              role="presentation"
            />
          </Option>
        )}
      </div>
    );
  }

  renderInDropDown(config) {
    const { currentTextAlignment } = this.state;
    const { options, left, center, right, justify, className } = config;
    return (
      <Dropdown
        className={`tool-item text-align-dropdown ${className}`}
        onChange={this.addBlockAlignmentData}
      >
        <img
          src={getFirstIcon(config)}
          role="presentation"
        />
        {options.indexOf('left') >= 0 && (
          <DropdownOption
            value="left"
            active={currentTextAlignment === 'left'}
            className={`text-align-dropdown-option ${left.className}`}
          >
            <img
              src={left.icon}
              role="presentation"
            />
          </DropdownOption>
        )}
        {options.indexOf('center') >= 0 && (
          <DropdownOption
            value="center"
            active={currentTextAlignment === 'center'}
            className={`text-align-dropdown-option ${center.className}`}
          >
            <img
              src={center.icon}
              role="presentation"
            />
          </DropdownOption>
        )}
        {options.indexOf('right') >= 0 && (
          <DropdownOption
            value="right"
            active={currentTextAlignment === 'right'}
            className={`text-align-dropdown-option ${right.className}`}
          >
            <img
              src={right.icon}
              role="presentation"
            />
          </DropdownOption>
        )}
        {options.indexOf('justify') >= 0 && (
          <DropdownOption
            value="justify"
            active={currentTextAlignment === 'justify'}
            className={`text-align-dropdown-option ${justify.className}`}
          >
            <img
              src={justify.icon}
              role="presentation"
            />
          </DropdownOption>
        )}
      </Dropdown>
    );
  }

  render() {
    const { config } = this.props;
    if (config.inDropdown) {
      return this.renderInDropDown(config);
    }
    return this.renderInFlatList(config);
  }
}
