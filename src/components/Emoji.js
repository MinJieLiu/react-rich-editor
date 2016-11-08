

import React, { Component, PropTypes } from 'react';
import { Modifier, EditorState } from 'draft-js';
import Option from './Option';

export default class Emoji extends Component {

  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object,
  };

  state = {
    showModal: false,
  };

  emojis = ['😀', '😁', '😂', '😃', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '🤗', '🤔', '😣', '😫', '😴', '😌',
    '🤓', '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈', '🙉', '🙊', '👦', '👧', '👨', '👩', '👶',
    '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙎', '🙅', '🙆', '💁', '🙋', '🙇', '💆', '🚶', '🏃', '💃', '👯', '🕴', '🗣',
    '👤', '👥', '🏇', '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '🚵', '🏎', '🏍', '👫', '💪', '👈', '👉', '👉', '👆', '🖕', '👇',
    '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👋', '👏', '🙌', '🙏', '👂', '👣', '👀', '👁', '💋', '💘', '💟', '💣', '💥', '🐵', '🐶',
    '🐇', '🐥', '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🌰', '🍞', '🍔', '🍟', '🍤', '🍨', '🍪', '🎂', '🍰', '🍵', '🍶', '🍾', '🍷', '🍸',
    '🍺', '🍻', '🍽', '🍴', '🌍', '🚌', '🚑', '🚒', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '💧', '🎄', '🎈', '🎉',
    '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎤', '🎧', '📻', '🎷', '🎸', '🎹', '📱', '💻', '🖥', '🖨', '📀', '🔍',
    '🕯', '📔', '💰', '💵', '💶', '💷', '📪', '🖊', '📅', '📊', '🔒', '🔓', '🔐', '🔑', '🔨', '🛠', '💉', '💊', '⛔', '⬆', '⬇', '⬅', '🔆',
    '✅', '❎', '💯', '🆗', '🚩', '🎌', '🏴', '🏳'];

  addEmoji = (event) => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      `${event.target.innerHTML} `,
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'), true);
    this.toggleModal();
  };

  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    });
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  renderEmojiModal() {
    return (
      <div
        className="emoji-modal"
        onClick={this.stopPropagation}
      >
        {
          this.emojis.map((emoji, index) => (<span
            key={index}
            className="emoji-icon"
            role="presentation"
            onClick={this.addEmoji}
          >{emoji}</span>))
        }
      </div>
    );
  }

  render() {
    const { config: { icon, className } } = this.props;
    const { showModal } = this.state;
    return (
      <div className="emoji-wrapper">
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
        {showModal ? this.renderEmojiModal() : undefined}
      </div>
    );
  }
}
