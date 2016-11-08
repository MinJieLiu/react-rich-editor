import React, { Component, PropTypes } from 'react';
import { getSelectionInlineStyle } from 'draftjs-utils';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import { getFirstIcon } from '../utils/toolbar';
import Option from './Option';
import Dropdown from './Dropdown';
import DropdownOption from './DropdownOption';

export default class Inline extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
  };

  state = {
    currentStyles: {},
  };

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentStyles: getSelectionInlineStyle(editorState),
      });
    }
  }

  componentWillReceiveProps(properties) {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentStyles: getSelectionInlineStyle(properties.editorState),
      });
    }
  }

  toggleInlineStyle = (style) => {
    const { editorState, onChange } = this.props;
    let newState = RichUtils.toggleInlineStyle(
      editorState,
      style,
    );
    if (style === 'SUBSCRIPT' || style === 'SUPERSCRIPT') {
      const removeStyle = style === 'SUBSCRIPT' ? 'SUPERSCRIPT' : 'SUBSCRIPT';
      const contentState = Modifier.removeInlineStyle(
        newState.getCurrentContent(),
        newState.getSelection(),
        removeStyle,
      );
      newState = EditorState.push(newState, contentState, 'change-inline-style');
    }
    if (newState) {
      onChange(newState, true);
    }
  };

  renderInFlatList(currentStyles, config) {
    return (
      <div className={`tool-item inline-wrapper ${config.className}`}>
        {
          config.options
            .map((style, index) =>
              <Option
                key={index}
                value={style.toUpperCase()}
                onClick={this.toggleInlineStyle}
                className={config[style].className}
                active={currentStyles[style.toUpperCase()] === true}
              >
                <img
                  role="presentation"
                  src={config[style].icon}
                />
              </Option>,
            )
        }
      </div>
    );
  }

  renderInDropDown(currentStyles, config) {
    return (
      <Dropdown
        className={`inline-dropdown ${config.className}`}
        onChange={this.toggleInlineStyle}
      >
        <img
          src={getFirstIcon(config)}
          role="presentation"
        />
        {
          config.options
            .map((style, index) =>
              <DropdownOption
                key={index}
                value={style.toUpperCase()}
                className={`inline-dropdownoption ${config[style].className}`}
                active={currentStyles[style.toUpperCase()] === true}
              >
                <img
                  src={config[style].icon}
                  role="presentation"
                />
              </DropdownOption>)
        }
      </Dropdown>
    );
  }

  render() {
    const { config } = this.props;
    const { currentStyles } = this.state;
    if (config.inDropdown) {
      return this.renderInDropDown(currentStyles, config);
    }
    return this.renderInFlatList(currentStyles, config);
  }
}
