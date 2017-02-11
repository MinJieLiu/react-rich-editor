import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
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
    editorState: PropTypes.object,
    onChange: PropTypes.func,
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
    const {
      options,
      left,
      center,
      right,
      justify,
      className,
    } = config;
    return (
      <div
        className={classNames('tool-item', {
          [className]: !!className,
        })}
      >
        {options.indexOf('left') >= 0 && (
          <Option
            className={left.className}
            value="left"
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
            className={center.className}
            value="center"
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
            className={right.className}
            value="right"
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
            className={justify.className}
            value="justify"
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
    const {
      options,
      left,
      center,
      right,
      justify,
      className,
    } = config;
    return (
      <Dropdown
        className={classNames('tool-item text-align-dropdown', {
          [className]: !!className,
        })}
        onChange={this.addBlockAlignmentData}
      >
        <img
          src={getFirstIcon(config)}
          role="presentation"
        />
        {options.indexOf('left') >= 0 && (
          <DropdownOption
            className={left.className}
            value="left"
            active={currentTextAlignment === 'left'}
          >
            <img
              src={left.icon}
              role="presentation"
            />
          </DropdownOption>
        )}
        {options.indexOf('center') >= 0 && (
          <DropdownOption
            className={center.className}
            value="center"
            active={currentTextAlignment === 'center'}
          >
            <img
              src={center.icon}
              role="presentation"
            />
          </DropdownOption>
        )}
        {options.indexOf('right') >= 0 && (
          <DropdownOption
            className={right.className}
            value="right"
            active={currentTextAlignment === 'right'}
          >
            <img
              src={right.icon}
              role="presentation"
            />
          </DropdownOption>
        )}
        {options.indexOf('justify') >= 0 && (
          <DropdownOption
            className={justify.className}
            value="justify"
            active={currentTextAlignment === 'justify'}
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
