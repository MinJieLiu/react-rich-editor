import React, { Component, PropTypes } from 'react';
import { RichUtils } from 'draft-js';
import classNames from 'classnames';
import { getSelectedBlocksType } from '../utils';
import Dropdown from './Dropdown';
import DropdownOption from './DropdownOption';

export default class Block extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
    config: PropTypes.object,
  };

  state = {
    currentBlockType: 'unstyled',
  };

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentBlockType: getSelectedBlocksType(editorState),
      });
    }
  }

  componentWillReceiveProps(properties) {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentBlockType: getSelectedBlocksType(properties.editorState),
      });
    }
  }

  blocksTypes = [
    { label: 'Normal', style: 'unstyled' },
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
  ];

  toggleBlockType = (blockType) => {
    const { editorState, onChange } = this.props;
    const newState = RichUtils.toggleBlockType(
      editorState,
      blockType,
    );
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    let { currentBlockType } = this.state;
    if (currentBlockType === 'unordered-list-item' || currentBlockType === 'ordered-list-item') {
      currentBlockType = 'unstyled';
    }
    const currentBlockData = this.blocksTypes.filter(blk => blk.style === currentBlockType);
    const currentLabel = currentBlockData && currentBlockData[0] && currentBlockData[0].label;
    const { config: { className } } = this.props;
    return (
      <div
        className={classNames('tool-item', {
          [className]: !!className,
        })}
      >
        <Dropdown
          className="block-dropdown"
          onChange={this.toggleBlockType}
        >
          <span className="block-text">{currentLabel}</span>
          {
            this.blocksTypes.map((block, index) => (
              <DropdownOption
                active={currentBlockType === block.style}
                value={block.style}
                key={index}
              >
                {block.label}
              </DropdownOption>
            ))
          }
        </Dropdown>
      </div>
    );
  }
}
