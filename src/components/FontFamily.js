import React, { Component, PropTypes } from 'react';
import {
  fontFamilies,
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from '../utils';
import Dropdown from './Dropdown';
import DropdownOption from './DropdownOption';

export default class FontFamily extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    config: PropTypes.object,
  };

  state = {
    currentFontFamily: undefined,
  };

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentFontFamily: getSelectionCustomInlineStyle(editorState, ['FONTFAMILY']).FONTFAMILY,
      });
    }
  }

  componentWillReceiveProps(properties) {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentFontFamily: getSelectionCustomInlineStyle(properties.editorState, ['FONTFAMILY']).FONTFAMILY,
      });
    }
  }

  toggleFontFamily = (fontFamily) => {
    const { editorState, onChange } = this.props;
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontFamily',
      fontFamily,
    );
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    const { currentFontFamily } = this.state;
    const { config: { className } } = this.props;
    const currentFontFamilyStr =
      currentFontFamily && currentFontFamily.substring(11, currentFontFamily.length);
    return (
      <div className="tool-item font-family-wrapper">
        <Dropdown
          className={`font-family-dropdown ${className}`}
          onChange={this.toggleFontFamily}
          optionWrapperClassName="font-family-option-wrapper"
        >
          <span className="font-family-placeholder">
            {currentFontFamilyStr || '字体'}
          </span>
          {
            fontFamilies.map((family, index) => (
              <DropdownOption
                className="font-family-option"
                active={currentFontFamily === family}
                value={`fontFamily-${family}`}
                key={index}
              >
                {family}
              </DropdownOption>
            ))
          }
        </Dropdown>
      </div>
    );
  }
}
