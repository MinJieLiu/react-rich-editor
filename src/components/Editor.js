import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  DefaultDraftBlockRenderMap,
} from 'draft-js';
import {
  handleNewLine,
  customStyleMap,
} from 'draftjs-utils';
import { Map } from 'immutable';
import blockStyleFn from '../utils/BlockStyle';
import { mergeRecursive } from '../utils/toolbar';
import Inline from './Inline';
import Block from './Block';
import FontSize from './FontSize';
import FontFamily from './FontFamily';
import List from './List';
import TextAlign from './TextAlign';
import ColorPicker from './ColorPicker';
import Remove from './Remove';
import Link from './Link';
import Emoji from './Emoji';
import Image from './Image';
import History from './History';
import LinkDecorator from '../decorators/Link';
import ImageBlockRenderer from '../renderer/Image';
import defaultToolbar from '../config/defaultToolbar';

export default class WysiwygEditor extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    rawContentState: PropTypes.object,
    toolbarOnFocus: PropTypes.bool,
    toolbar: PropTypes.object,
    toolbarClassName: PropTypes.string,
    editorClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      editorState: undefined,
      toolBarMouseDown: false,
      editorFocused: false,
      editorMouseDown: false,
      toolbar: mergeRecursive(defaultToolbar, props.toolbar),
    };
  }

  componentWillMount() {
    let editorState;
    const decorator = new CompositeDecorator([LinkDecorator]);
    if (this.props.rawContentState) {
      const contentState = convertFromRaw(this.props.rawContentState);
      editorState = EditorState.createWithContent(contentState, decorator);
    } else {
      editorState = EditorState.createEmpty(decorator);
    }
    this.setState({
      editorState,
    });
  }

  componentWillReceiveProps(props) {
    if (this.props.toolbar !== props.toolbar) {
      this.setState({
        toolbar: mergeRecursive(defaultToolbar, props.toolbar),
      });
    }
  }

  onChange = (editorState, focusEditor) => {
    this.setState({
      editorState,
    }, this.afterChange(focusEditor));
  };

  onToolbarMouseDown = () => {
    this.setState({
      toolBarMouseDown: true,
    });
  };

  onToolbarMouseUp = () => {
    this.setState({
      toolBarMouseDown: false,
      editorFocused: true,
    });
  };

  onEditorFocus = () => {
    this.setState({
      toolBarMouseDown: false,
      editorFocused: true,
    });
  };

  onEditorBlur = () => {
    this.setState({
      editorFocused: false,
    });
  };

  onEditorMouseDown = () => {
    this.setState({
      editorMouseDown: true,
    });
  };

  onEditorMouseUp = () => {
    this.setState({
      editorMouseDown: false,
    });
  };

  setEditorReference = (ref) => {
    this.editor = ref;
  };

  focusEditor = () => {
    setTimeout(() => {
      this.editor.focus();
    });
  };

  afterChange = (focusEditor) => {
    setTimeout(() => {
      if (focusEditor) {
        this.focusEditor();
      }
      if (this.props.onChange) {
        const editorContent = convertToRaw(this.state.editorState.getCurrentContent());
        this.props.onChange(editorContent);
      }
    });
  };

  customBlockRenderMap = DefaultDraftBlockRenderMap.merge(new Map({
    unstyled: {
      element: 'p',
    },
  }));

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState, this.focusEditor);
      return true;
    }
    return false;
  };

  handleReturn = (event) => {
    const editorState = handleNewLine(this.state.editorState, event);
    if (editorState) {
      this.onChange(editorState);
      return true;
    }
    return false;
  };

  render() {
    const {
      editorState,
      editorFocused,
      editorMouseDown,
      toolBarMouseDown,
      toolbar,
    } = this.state;
    const {
      toolbarOnFocus,
      toolbarClassName,
      editorClassName,
      wrapperClassName,
    } = this.props;
    const {
      options,
      inline,
      blockType,
      fontSize,
      fontFamily,
      list,
      textAlign,
      colorPicker,
      link,
      emoji,
      image,
      remove,
      history,
    } = toolbar;

    const hasFocus = editorFocused || toolBarMouseDown || editorMouseDown;
    return (
      <div className={`editor-wrapper ${wrapperClassName}`}>
        {
          (hasFocus || !toolbarOnFocus) ?
            <div
              className={`editor-toolbar ${toolbarClassName}`}
              onMouseDown={this.onToolbarMouseDown}
              onMouseUp={this.onToolbarMouseUp}
              onClick={this.focusEditor}
            >
              {options.indexOf('inline') >= 0 && (
                <Inline
                  onChange={this.onChange}
                  editorState={editorState}
                  config={inline}
                />
              )}
              {options.indexOf('blockType') >= 0 && (
                <Block
                  onChange={this.onChange}
                  editorState={editorState}
                  config={blockType}
                />
              )}
              {options.indexOf('fontSize') >= 0 && (
                <FontSize
                  onChange={this.onChange}
                  editorState={editorState}
                  config={fontSize}
                />
              )}
              {options.indexOf('fontFamily') >= 0 && (
                <FontFamily
                  onChange={this.onChange}
                  editorState={editorState}
                  config={fontFamily}
                />
              )}
              {options.indexOf('list') >= 0 && (
                <List
                  onChange={this.onChange}
                  editorState={editorState}
                  config={list}
                />
              )}
              {options.indexOf('textAlign') >= 0 && (
                <TextAlign
                  onChange={this.onChange}
                  editorState={editorState}
                  config={textAlign}
                />
              )}
              {options.indexOf('colorPicker') >= 0 && <ColorPicker
                onChange={this.onChange}
                editorState={editorState}
                config={colorPicker}
              />}
              {options.indexOf('link') >= 0 && (
                <Link
                  editorState={editorState}
                  onChange={this.onChange}
                  config={link}
                />
              )}
              {options.indexOf('emoji') >= 0 && (
                <Emoji
                  editorState={editorState}
                  onChange={this.onChange}
                  config={emoji}
                />
              )}
              {options.indexOf('image') >= 0 && (
                <Image
                  editorState={editorState}
                  onChange={this.onChange}
                  config={image}
                />
              )}
              {options.indexOf('remove') >= 0 && (
                <Remove
                  editorState={editorState}
                  onChange={this.onChange}
                  config={remove}
                />
              )}
              {options.indexOf('history') >= 0 && (
                <History
                  editorState={editorState}
                  onChange={this.onChange}
                  config={history}
                />
              )}
            </div>
            :
            undefined
        }
        <div
          className={`editor-main ${editorClassName}`}
          onClick={this.focusEditor}
          onFocus={this.onEditorFocus}
          onBlur={this.onEditorBlur}
          onMouseUp={this.onEditorMouseUp}
          onMouseDown={this.onEditorMouseDown}
        >
          <Editor
            ref={this.setEditorReference}
            onTab={this.onTab}
            editorState={editorState}
            onChange={this.onChange}
            blockStyleFn={blockStyleFn}
            customStyleMap={customStyleMap}
            handleReturn={this.handleReturn}
            blockRendererFn={ImageBlockRenderer}
            blockRenderMap={this.customBlockRenderMap}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </div>
    );
  }
}
