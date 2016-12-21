import React, { Component, PropTypes } from 'react';
import { Entity, RichUtils, EditorState, Modifier } from 'draft-js';
import {
  getSelectionText,
  getEntityRange,
  getSelectionEntity,
  getFirstIcon,
} from '../utils';
import Option from './Option';
import Dropdown from './Dropdown';
import DropdownOption from './DropdownOption';

export default class Link extends Component {

  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object,
  };

  state = {
    showModal: false,
    linkTitle: '',
    linkTarget: '',
  };

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentEntity: getSelectionEntity(editorState),
      });
    }
  }

  componentWillReceiveProps(properties) {
    const newState = {};
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      newState.currentEntity = getSelectionEntity(properties.editorState);
    }
    this.setState(newState);
  }

  toggleLinkModal = () => {
    const { editorState } = this.props;
    const { showModal, currentEntity } = this.state;
    const newState = {};
    newState.showModal = !showModal;
    if (newState.showModal) {
      newState.entity = currentEntity;
      const entityRange = currentEntity && getEntityRange(editorState, currentEntity);
      newState.linkTarget = currentEntity && Entity.get(currentEntity).get('data').url;
      newState.linkTitle = (entityRange && entityRange.text) ||
        getSelectionText(editorState);
    }
    this.setState(newState);
  };

  hideLinkModal = () => {
    this.setState({
      showModal: false,
    });
  };

  updateLinkTitle = (e) => {
    this.setState({
      linkTitle: e.target.value,
    });
  };

  updateLinkTarget = (e) => {
    this.setState({
      linkTarget: e.target.value,
    });
  };

  addLink = () => {
    const { editorState, onChange } = this.props;
    const { linkTitle, linkTarget, currentEntity } = this.state;
    let selection = editorState.getSelection();

    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      selection = selection.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end,
      });
    }
    const entityKey = Entity.create('LINK', 'MUTABLE', {
      title: linkTitle,
      url: linkTarget,
    });
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      `${linkTitle}`,
      editorState.getCurrentInlineStyle(),
      entityKey,
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'), true);
    this.toggleLinkModal();
  };

  removeLink = () => {
    const { editorState, onChange } = this.props;
    const { currentEntity } = this.state;
    let selection = editorState.getSelection();
    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      selection = selection.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end,
      });
      onChange(RichUtils.toggleLink(editorState, selection, null), true);
    }
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  renderAddLinkModal() {
    const { linkTitle, linkTarget } = this.state;
    return (
      <div
        className="editor-modal link-modal"
        onClick={this.stopPropagation}
        onMouseDown={this.stopPropagation}
        onMouseUp={this.stopPropagation}
      >
        <div className="link-modal-item">
          <span className="link-modal-label">文字</span>
          <input
            className="editor-input"
            onChange={this.updateLinkTitle}
            value={linkTitle}
          />
        </div>
        <div className="link-modal-item">
          <span className="link-modal-label">链接</span>
          <input
            className="editor-input"
            onChange={this.updateLinkTarget}
            value={linkTarget}
          />
        </div>
        <div className="link-modal-button-section">
          <button
            className="editor-button-primary"
            onClick={this.addLink}
            disabled={!linkTarget || !linkTitle}
          >
            插入
          </button>
          <button
            className="editor-button-default"
            onClick={this.toggleLinkModal}
          >
            取消
          </button>
        </div>
      </div>
    );
  }

  renderInFlatList(showModal, currentEntity, config) {
    const { options, link, unlink, className } = config;
    return (
      <div className={`tool-item link-wrapper ${className}`}>
        {options.indexOf('link') >= 0 && (
          <Option
            value="unordered-list-item"
            className={link.className}
            onClick={this.toggleLinkModal}
          >
            <img
              src={link.icon}
              role="presentation"
            />
          </Option>
        )}
        {options.indexOf('unlink') >= 0 && (
          <Option
            disabled={!currentEntity}
            value="ordered-list-item"
            className={unlink.className}
            onClick={this.removeLink}
          >
            <img
              src={unlink.icon}
              role="presentation"
            />
          </Option>
        )}
        {showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }

  renderInDropDown(showModal, currentEntity, config) {
    const { options, link, unlink, className } = config;
    return (
      <div className="tool-item link-wrapper" onClick={this.hideLinkModal}>
        <Dropdown
          className={`link-dropdown ${className}`}
          onChange={this.toggleInlineStyle}
        >
          <img
            src={getFirstIcon(config)}
            role="presentation"
          />
          {options.indexOf('link') >= 0 && (
            <DropdownOption
              onClick={this.toggleLinkModal}
              className={`link-dropdown-option ${link.className}`}
            >
              <img
                src={link.icon}
                role="presentation"
              />
            </DropdownOption>
          )}
          {options.indexOf('unlink') >= 0 && (
            <DropdownOption
              onClick={this.removeLink}
              disabled={!currentEntity}
              className={`link-dropdown-option ${unlink.className}`}
            >
              <img
                src={unlink.icon}
                role="presentation"
              />
            </DropdownOption>
          )}
        </Dropdown>
        {showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }

  render() {
    const { config } = this.props;
    const { showModal, currentEntity } = this.state;
    if (config.inDropdown) {
      return this.renderInDropDown(showModal, currentEntity, config);
    }
    return this.renderInFlatList(showModal, currentEntity, config);
  }
}
