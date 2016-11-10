import React, { PropTypes, Component } from 'react';
import { Entity, ContentBlock } from 'draft-js';
import classNames from 'classnames';
import Option from '../../components/Option';

export default class Image extends Component {

  static propTypes = {
    block: PropTypes.instanceOf(ContentBlock).isRequired,
  };

  state = {
    focused: false,
  };

  setEntityAlignmentLeft = () => {
    this.setEntityAlignment('left');
  };

  setEntityAlignmentRight = () => {
    this.setEntityAlignment('right');
  };

  setEntityAlignmentCenter = () => {
    this.setEntityAlignment('none');
  };

  setEntityAlignment = (alignment) => {
    const { block } = this.props;
    const entityKey = block.getEntityAt(0);
    Entity.mergeData(
      entityKey,
      { alignment },
    );
    this.setState({
      dummy: true,
    });
  };

  toggleFocused = () => {
    const focused = this.state.focused;
    this.setState({
      focused: !focused,
    });
  };

  renderAlignmentOptions() {
    return (
      <div
        className="image-alignment-options-popup"
      >
        <Option
          onClick={this.setEntityAlignmentLeft}
          className="image-alignment-option"
        >
          居左
        </Option>
        <Option
          onClick={this.setEntityAlignmentCenter}
          className="image-alignment-option"
        >
          居中
        </Option>
        <Option
          onClick={this.setEntityAlignmentRight}
          className="image-alignment-option"
        >
          居右
        </Option>
      </div>
    );
  }

  render() {
    const { block } = this.props;
    const { focused } = this.state;
    const entity = Entity.get(block.getEntityAt(0));
    const { src, alignment } = entity.getData();
    return (
      <span
        onClick={this.toggleFocused}
        className={classNames(
          'image-alignment',
          {
            'image-left': alignment === 'left',
            'image-right': alignment === 'right',
            'image-center': !alignment || alignment === 'none',
          },
        )}
      >
        <span className="image-alignment-wrapper">
          <img
            src={src}
            role="presentation"
            className={classNames(
              'image-alignment-image', {
                'image-alignment-image-focus': !!focused,
              },
            )}
          />
          {
            focused ?
              this.renderAlignmentOptions()
              :
              undefined
          }
        </span>
      </span>
    );
  }
}
