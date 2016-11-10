import React, { Component, PropTypes } from 'react';
import { EditorState, Modifier } from 'draft-js';
import Option from './Option';

const removeStyle = [
  'BOLD',
  'ITALIC',
  'UNDERLINE',
  'STRIKETHROUGH',
  'CODE',
  'FONTFAMILY',
  'COLOR',
  'BGCOLOR',
  'FONTSIZE',
  'SUPERSCRIPT',
  'SUBSCRIPT',
];

export default class Remove extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
  };

  removeAllInlineStyles = (editorState) => {
    let contentState = editorState.getCurrentContent();
    removeStyle.forEach((style) => {
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
      <div className="tool-item remove-wrapper">
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
