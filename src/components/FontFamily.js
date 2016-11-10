import React, { Component, PropTypes } from 'react';
import {
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';
import Dropdown from './Dropdown';
import DropdownOption from './DropdownOption';

export default class FontFamily extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    config: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentFontFamily: undefined,
      fontFamilies: props.config.fontFamilies || [
        '黑体',
        '幼圆',
        '微软雅黑',
        '楷体',
        '宋体',
        'Verdana',
      ],
    };
  }

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
    const { fontFamilies, currentFontFamily } = this.state;
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
                value={`font-family-${family}`}
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
