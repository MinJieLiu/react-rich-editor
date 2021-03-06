import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import {
  fontSizes,
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from '../utils';
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
    const { currentFontSize } = this.state;
    const currentFontSizeNumber = currentFontSize
      && Number(currentFontSize.substring(9, currentFontSize.length));
    return (
      <div
        className={classNames('tool-item', {
          [className]: !!className,
        })}
      >
        <Dropdown
          className="font-size-dropdown"
          onChange={this.toggleFontSize}
        >
          {currentFontSizeNumber ?
            <span className="font-size-text">{currentFontSizeNumber}</span>
            :
            <img
              src={icon}
              role="presentation"
            />
          }
          {
            fontSizes.map((size, index) => (
              <DropdownOption
                key={index}
                active={currentFontSize === size}
                value={`fontsize-${size}`}
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
