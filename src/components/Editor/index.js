

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
import blockStyleFn from '../../utils/BlockStyle';
import { mergeRecursive } from '../../utils/toolbar';
import InlineControl from '../InlineControl';
import BlockControl from '../BlockControl';
import FontSizeControl from '../FontSizeControl';
import FontFamilyControl from '../FontFamilyControl';
import ListControl from '../ListControl';
import TextAlignControl from '../TextAlignControl';
import ColorPicker from '../ColorPicker';
import RemoveControl from '../RemoveControl';
import LinkControl from '../LinkControl';
import EmojiControl from '../EmojiControl';
import ImageControl from '../ImageControl';
import HistoryControl from '../HistoryControl';
import LinkDecorator from '../../decorators/Link';
import ImageBlockRenderer from '../../renderer/Image';
import defaultToolbar from '../../config/defaultToolbar';
import './styles.css';

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
              {options.indexOf('inline') >= 0 && <InlineControl
                onChange={this.onChange}
                editorState={editorState}
                config={inline}
              />}
              {options.indexOf('blockType') >= 0 && <BlockControl
                onChange={this.onChange}
                editorState={editorState}
                config={blockType}
              />}
              {options.indexOf('fontSize') >= 0 && <FontSizeControl
                onChange={this.onChange}
                editorState={editorState}
                config={fontSize}
              />}
              {options.indexOf('fontFamily') >= 0 && <FontFamilyControl
                onChange={this.onChange}
                editorState={editorState}
                config={fontFamily}
              />}
              {options.indexOf('list') >= 0 && <ListControl
                onChange={this.onChange}
                editorState={editorState}
                config={list}
              />}
              {options.indexOf('textAlign') >= 0 && <TextAlignControl
                onChange={this.onChange}
                editorState={editorState}
                config={textAlign}
              />}
              {options.indexOf('colorPicker') >= 0 && <ColorPicker
                onChange={this.onChange}
                editorState={editorState}
                config={colorPicker}
              />}
              {options.indexOf('link') >= 0 && <LinkControl
                editorState={editorState}
                onChange={this.onChange}
                config={link}
              />}
              {options.indexOf('emoji') >= 0 && <EmojiControl
                editorState={editorState}
                onChange={this.onChange}
                config={emoji}
              />}
              {options.indexOf('image') >= 0 && <ImageControl
                editorState={editorState}
                onChange={this.onChange}
                config={image}
              />}
              {options.indexOf('remove') >= 0 && <RemoveControl
                editorState={editorState}
                onChange={this.onChange}
                config={remove}
              />}
              {options.indexOf('history') >= 0 && <HistoryControl
                editorState={editorState}
                onChange={this.onChange}
                config={history}
              />}
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
            spellCheck
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

// todo: rename code to monospace
// todo: evaluate draftjs-utils to move some methods here