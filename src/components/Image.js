import React, { Component, PropTypes } from 'react';
import { AtomicBlockUtils } from 'draft-js';
import classNames from 'classnames';
import Option from './Option';
import Spinner from './Spinner';

export default class Image extends Component {

  static propTypes = {
    editorState: PropTypes.object,
    onChange: PropTypes.func,
    config: PropTypes.object,
  };

  state = {
    imgSrc: '',
    showModal: false,
    dragEnter: false,
    showImageUpload: !!this.props.config.uploadCallback,
    showImageLoading: false,
  };

  componentWillReceiveProps(properties) {
    if (properties.config !== this.props.config) {
      this.setState({
        showImageUpload: !!this.props.config.uploadCallback,
      });
    }
  }

  onImageDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.uploadImage(event.dataTransfer.files[0]);
  };

  onDragEnter = (e) => {
    this.stopPropagationPreventDefault(e);
    this.setState({
      dragEnter: true,
    });
  };

  addImage = (event, imgSrc) => {
    const { editorState, onChange } = this.props;
    const contentState = editorState.getCurrentContent();
    const src = imgSrc || this.state.imgSrc;
    const entityKey = contentState
      .createEntity('IMAGE', 'MUTABLE', { src })
      .getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' ',
    );
    onChange(newEditorState);
    this.toggleModal();
  };

  uploadImage = (file) => {
    this.toggleShowImageLoading();
    const { config: { uploadCallback } } = this.props;
    uploadCallback(file)
      .then(({ link }) => {
        this.setState({
          showImageLoading: false,
          dragEnter: false,
        });
        this.addImage(undefined, link);
      });
  };

  selectImage = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadImage(event.target.files[0]);
    }
  };

  toggleModal = () => {
    const { showModal } = this.state;
    const newState = {};
    newState.showModal = !showModal;
    newState.imgSrc = '';
    this.setState(newState);
  };

  updateImageSrc = (event) => {
    this.setState({
      imgSrc: event.target.value,
    });
  };

  toggleShowImageLoading = () => {
    const showImageLoading = !this.state.showImageLoading;
    this.setState({
      showImageLoading,
    });
  };

  showImageURLOption = () => {
    this.setState({
      showImageUpload: false,
    });
  };

  showImageUploadOption = () => {
    this.setState({
      showImageUpload: true,
    });
  };

  stopPropagationPreventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  stopPropagation = (e) => {
    e.stopPropagation();
  };

  renderAddImageModal() {
    const {
      imgSrc,
      showImageUpload,
      showImageLoading,
      dragEnter,
    } = this.state;
    const { config: { uploadCallback } } = this.props;
    return (
      <div
        className="editor-modal image-modal"
        onClick={this.stopPropagation}
        onMouseDown={this.stopPropagation}
        onMouseUp={this.stopPropagation}
      >
        <div className="image-modal-header">
          {uploadCallback ? (
            <span
              onClick={this.showImageUploadOption}
              className={classNames(
                'image-modal-header-option',
                { 'image-modal-header-option-highlighted': showImageUpload },
              )}
            >
              <span>文件上传</span>
            </span>
          ) : undefined}
          <span
            onClick={this.showImageURLOption}
            className={classNames(
              'image-modal-header-option',
              { 'image-modal-header-option-highlighted': !showImageUpload },
            )}
          >
            <span>链接</span>
          </span>
        </div>
        <div className="image-modal-content">
          {showImageUpload && uploadCallback
            ? (
              <div>
                <div
                  onDragEnter={this.onDragEnter}
                  onDragOver={this.stopPropagationPreventDefault}
                  onDrop={this.onImageDrop}
                  className={classNames(
                    'image-modal-upload-option',
                    { 'image-modal-upload-option-highlighted': dragEnter })}
                >
                  <label
                    htmlFor="file"
                    className="image-modal-upload-option-label"
                  >
                    点击或将文件拖到这里
                  </label>
                </div>
                <input
                  type="file"
                  id="file"
                  onChange={this.selectImage}
                  className="image-modal-upload-option-input"
                />
              </div>
            )
            : (
              <div className="image-modal-url-section">
                <input
                  className="editor-input"
                  placeholder="请输入图片链接"
                  onChange={this.updateImageSrc}
                  value={imgSrc}
                />
              </div>
              )}
          <div className="image-modal-btn-section">
            <button
              className="editor-button-primary"
              onClick={this.addImage}
              disabled={!imgSrc}
            >
              添加
            </button>
            <button
              className="editor-button-default"
              onClick={this.toggleModal}
            >
              取消
            </button>
          </div>
        </div>
        {showImageLoading ? (
          <div className="image-modal-spinner">
            <Spinner />
          </div>
        ) : undefined}
      </div>
    );
  }

  render() {
    const { config: { icon, className } } = this.props;
    const { showModal } = this.state;
    return (
      <div
        className={classNames('tool-item', {
          [className]: !!className,
        })}
      >
        <Option
          value="unordered-list-item"
          onClick={this.toggleModal}
        >
          <img
            src={icon}
            role="presentation"
          />
        </Option>
        {showModal ? this.renderAddImageModal() : undefined}
      </div>
    );
  }
}
