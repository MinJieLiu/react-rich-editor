import React, { Component, PropTypes } from 'react';
import { EditorState, Modifier } from 'draft-js';
import classNames from 'classnames';
import { inlineStyles } from '../utils';
import Option from './Option';

export default class Remove extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
    config: PropTypes.object,
  };

  removeAllInlineStyles = (editorState) => {
    let contentState = editorState.getCurrentContent();
    inlineStyles.forEach((style) => {
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
      <div
        className={classNames('tool-item', {
          [className]: !!className,
        })}
      >
        <Option
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
