import React, { Component, PropTypes } from 'react';
import {
  fontSizes,
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';
import Dropdown from './Dropdown';
import DropdownOption from './DropdownOption';

export default class FontSize extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    config: PropTypes.object,
  };

  state = {
    currentFontSize: undefined,
  };

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentFontSize: getSelectionCustomInlineStyle(editorState, ['FONTSIZE']).FONTSIZE,
      });
    }
  }

  componentWillReceiveProps(properties) {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentFontSize: getSelectionCustomInlineStyle(properties.editorState, ['FONTSIZE']).FONTSIZE,
      });
    }
  }

  toggleFontSize = (fontSize) => {
    const { editorState, onChange } = this.props;
    const fontSizeStr = fontSize && (fontSize.toString() || '');
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontSize',
      fontSizeStr,
    );
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    const { config: { icon, className } } = this.props;
    let { currentFontSize } = this.state;
    currentFontSize = currentFontSize
      && Number(currentFontSize.substring(9, currentFontSize.length));
    return (
      <div className="tool-item font-size-wrapper">
        <Dropdown
          className={`font-size-dropdown ${className}`}
          onChange={this.toggleFontSize}
        >
          {currentFontSize
            ?
            <span>{currentFontSize}</span>
            :
            <img
              src={icon}
              role="presentation"
            />
          }
          {
            fontSizes.map((size, index) => (
              <DropdownOption
                className="font-size-option"
                active={currentFontSize === size}
                value={`font-size-${size}`}
                key={index}
              >
                {size}
              </DropdownOption>
            ))
          }
        </Dropdown>
      </div>
    );
  }
}
