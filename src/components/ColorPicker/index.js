import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import {
  colors,
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';
import Option from '../Option';
import './styles.css';

export default class ColorPicker extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
  };

  state = {
    currentColor: undefined,
    currentBgColor: undefined,
    showModal: false,
    currentStyle: 'color',
  };

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentColor: getSelectionCustomInlineStyle(editorState, ['COLOR']).COLOR,
        currentBgColor: getSelectionCustomInlineStyle(editorState, ['BGCOLOR']).BGCOLOR,
      });
    }
  }

  componentWillReceiveProps(properties) {
    const newState = {};
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      newState.currentColor
        = getSelectionCustomInlineStyle(properties.editorState, ['COLOR']).COLOR;
      newState.currentBgColor
        = getSelectionCustomInlineStyle(properties.editorState, ['BGCOLOR']).BGCOLOR;
    }
    this.setState(newState);
  }

  setCurrentStyleColor = () => {
    this.setState({
      currentStyle: 'color',
    });
  };

  setCurrentStyleBgcolor = () => {
    this.setState({
      currentStyle: 'bgcolor',
    });
  };

  toggleColor = (color) => {
    const { editorState, onChange } = this.props;
    const { currentStyle } = this.state;
    const newState = toggleCustomInlineStyle(
      editorState,
      currentStyle,
      `${currentStyle}-${color}`,
    );
    if (newState) {
      onChange(newState, true);
    }
  };

  toggleModal = () => {
    const showModal = !this.state.showModal;
    this.setState({
      showModal,
    });
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  renderModal = () => {
    const { currentColor, currentBgColor, currentStyle } = this.state;
    const currentSelectedColor = (currentStyle === 'color') ? currentColor : currentBgColor;
    return (
      <div
        className="colorpicker-modal"
        onClick={this.stopPropagation}
      >
        <span className="colorpicker-modal-header">
          <span
            className={classNames(
              'colorpicker-modal-style-label',
              { 'colorpicker-modal-style-label-active': currentStyle === 'color' },
            )}
            onClick={this.setCurrentStyleColor}
          >
            Text
          </span>
          <span
            className={classNames(
              'colorpicker-modal-style-label',
              { 'colorpicker-modal-style-label-active': currentStyle === 'bgcolor' },
            )}
            onClick={this.setCurrentStyleBgcolor}
          >
            Background
          </span>
        </span>
        <span className="colorpicker-modal-options">
          {
            colors.map((color, index) =>
              <Option
                value={color}
                key={index}
                className="colorpicker-option"
                activeClassName="colorpicker-option-active"
                active={currentSelectedColor === `${currentStyle}-${color}`}
                onClick={this.toggleColor}
              >
                <span
                  style={{ backgroundColor: color }}
                  className="colorpicker-cube"
                />
              </Option>)
          }
        </span>
      </div>
    );
  };

  render() {
    const { config: { icon, className } } = this.props;
    const { showModal } = this.state;
    return (
      <div className="colorpicker-wrapper">
        <Option
          onClick={this.toggleModal}
          className={className}
        >
          <img
            src={icon}
            role="presentation"
          />
        </Option>
        {showModal ? this.renderModal() : undefined}
      </div>
    );
  }
}
