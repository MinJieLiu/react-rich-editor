

import React, { Component, PropTypes } from 'react';
import { Entity, AtomicBlockUtils } from 'draft-js';
import classNames from 'classnames';
import Option from '../Option';
import Spinner from '../Spinner';
import './styles.css';

export default class ImageControl extends Component {

  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
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
    if (properties.config && this.props.config) {
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

  onDragEnter = (event) => {
    this.stopPropagation(event);
    this.setState({
      dragEnter: true,
    });
  };

  addImage = (event, imgSrc) => {
    const { editorState, onChange } = this.props;
    const src = imgSrc || this.state.imgSrc;
    const entityKey = Entity.create('IMAGE', 'MUTABLE', { src });
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
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
    newState.imgSrc = undefined;
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

  stopPropagationPreventDefault = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  renderAddImageModal() {
    const { imgSrc, showImageUpload, showImageLoading, dragEnter } = this.state;
    const { config: { uploadCallback } } = this.props;
    return (
      <div
        className="image-modal"
        onClick={this.stopPropagation}
      >
        <div className="image-modal-header">
          {uploadCallback ?
            <span
              onClick={this.showImageUploadOption}
              className="image-modal-header-option"
            >
              <span>File Upload</span>
              <span
                className={classNames(
                  'image-modal-header-label',
                  { 'image-modal-header-label-highlighted': showImageUpload }
                )}
              />
            </span>
            :
            undefined
          }
          <span
            onClick={this.showImageURLOption}
            className="image-modal-header-option"
          >
            <span>URL</span>
            <span
              className={classNames(
                'image-modal-header-label',
                { 'image-modal-header-label-highlighted': !showImageUpload }
              )}
            />
          </span>
        </div>
        {
          showImageUpload && uploadCallback ?
            <div>
              <div
                onDragEnter={this.stopPropagationPreventDefault}
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
                  Drop the file or click to upload
                </label>
              </div>
              <input
                type="file"
                id="file"
                onChange={this.selectImage}
                className="image-modal-upload-option-input"
              />
            </div> :
              <div className="image-modal-url-section">
                <input
                  className="image-modal-url-input"
                  placeholder="Enter url"
                  onChange={this.updateImageSrc}
                  onBlur={this.updateImageSrc}
                  value={imgSrc}
                />
              </div>
        }
        <span className="image-modal-btn-section">
          <button
            className="image-modal-btn"
            onClick={this.addImage}
            disabled={!imgSrc}
          >
            Add
          </button>
          <button
            className="image-modal-btn"
            onClick={this.toggleModal}
          >
            Cancel
          </button>
        </span>
        {showImageLoading ?
          <div className="image-modal-spinner">
            <Spinner />
          </div> :
          undefined}
      </div>
    );
  }

  render() {
    const { config: { icon, className } } = this.props;
    const { showModal } = this.state;
    return (
      <div className="image-wrapper">
        <Option
          className={className}
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
