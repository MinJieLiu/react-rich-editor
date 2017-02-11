import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import { getFirstIcon } from '../utils';
import Option from './Option';
import Dropdown from './Dropdown';
import DropdownOption from './DropdownOption';

export default class History extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
    config: PropTypes.object,
  };

  state = {
    undoDisabled: false,
    redoDisabled: false,
  };

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        undoDisabled: editorState.getUndoStack().size === 0,
        redoDisabled: editorState.getRedoStack().size === 0,
      });
    }
  }

  componentWillReceiveProps(properties) {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        undoDisabled: properties.editorState.getUndoStack().size === 0,
        redoDisabled: properties.editorState.getRedoStack().size === 0,
      });
    }
  }

  undo = () => {
    const { editorState, onChange } = this.props;
    const newState = EditorState.undo(editorState);
    if (newState) {
      onChange(newState, true);
    }
  };

  redo = () => {
    const { editorState, onChange } = this.props;
    const newState = EditorState.redo(editorState);
    if (newState) {
      onChange(newState, true);
    }
  };

  renderInDropDown(undoDisabled, redoDisabled, config) {
    const {
      options,
      undo,
      redo,
      className,
    } = config;
    return (
      <Dropdown
        className={classNames('tool-item history-dropdown', {
          [className]: !!className,
        })}
        onChange={this.toggleInlineStyle}
      >
        <img
          src={getFirstIcon(config)}
          role="presentation"
        />
        {options.indexOf('undo') >= 0 && (
          <DropdownOption
            className={undo.className}
            onClick={this.undo}
            disabled={undoDisabled}
          >
            <img
              src={undo.icon}
              role="presentation"
            />
          </DropdownOption>
        )}
        {options.indexOf('redo') >= 0 && (
          <DropdownOption
            className={redo.className}
            onClick={this.redo}
            disabled={redoDisabled}
          >
            <img
              src={redo.icon}
              role="presentation"
            />
          </DropdownOption>
        )}
      </Dropdown>
    );
  }

  renderInFlatList(undoDisabled, redoDisabled, config) {
    const {
      options,
      undo,
      redo,
      className,
    } = config;
    return (
      <div
        className={classNames('tool-item', {
          [className]: !!className,
        })}
      >
        {options.indexOf('undo') >= 0 && (
          <Option
            className={undo.className}
            value="unordered-list-item"
            onClick={this.undo}
            disabled={undoDisabled}
          >
            <img
              src={undo.icon}
              role="presentation"
            />
          </Option>
        )}
        {options.indexOf('redo') >= 0 && (
          <Option
            className={redo.className}
            value="ordered-list-item"
            onClick={this.redo}
            disabled={redoDisabled}
          >
            <img
              src={redo.icon}
              role="presentation"
            />
          </Option>
        )}
      </div>
    );
  }

  render() {
    const { config } = this.props;
    const {
      undoDisabled,
      redoDisabled,
    } = this.state;
    if (config.inDropdown) {
      return this.renderInDropDown(undoDisabled, redoDisabled, config);
    }
    return this.renderInFlatList(undoDisabled, redoDisabled, config);
  }

}
