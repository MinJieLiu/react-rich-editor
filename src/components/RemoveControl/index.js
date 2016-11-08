

import React, { Component, PropTypes } from 'react';
import { EditorState, Modifier } from 'draft-js'; import Option from '../Option';
import './styles.css';

export default class ColorPicker extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
  };

  removeAllInlineStyles = (editorState) => {
    let contentState = editorState.getCurrentContent();
    ['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'CODE',
      'FONTFAMILY', 'COLOR', 'BGCOLOR', 'FONTSIZE', 'SUPERSCRIPT', 'SUBSCRIPT'].forEach((style) => {
        contentState = Modifier.removeInlineStyle(
        contentState,
        editorState.getSelection(),
        style,
      );
      });
    return EditorState.push(editorState, contentState, 'change-inline-style');
  };

  removeInlineStyles = () => {
    const { editorState, onChange } = this.props;
    onChange(this.removeAllInlineStyles(editorState));
  };

  render() {
    const { config: { icon, className } } = this.props;
    return (
      <div className="remove-wrapper">
        <Option
          className={className}
          onClick={this.removeInlineStyles}
        >
          <img
            src={icon}
            role="presentation"
          />
        </Option>
      </div>
    );
  }
}

// todo: add unit test case
