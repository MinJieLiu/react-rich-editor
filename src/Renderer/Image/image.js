import React, { PropTypes, Component } from 'react';
import { Entity, ContentBlock } from 'draft-js';
import classNames from 'classnames';
import './styles.css';
import Option from '../../components/Option';

export default class Image extends Component {

  static propTypes = {
    block: PropTypes.instanceOf(ContentBlock).isRequired,
  };

  state = {
    hovered: false,
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

  toggleHovered = () => {
    const hovered = !this.state.hovered;
    this.setState({
      hovered,
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
          L
        </Option>
        <Option
          onClick={this.setEntityAlignmentCenter}
          className="image-alignment-option"
        >
          C
        </Option>
        <Option
          onClick={this.setEntityAlignmentRight}
          className="image-alignment-option"
        >
          R
        </Option>
      </div>
    );
  }

  render() {
    const { block } = this.props;
    const { hovered } = this.state;
    const entity = Entity.get(block.getEntityAt(0));
    const { src, alignment } = entity.getData();
    return (
      <span
        onMouseEnter={this.toggleHovered}
        onMouseLeave={this.toggleHovered}
        className={classNames(
          'image-alignment',
          {
            'image-left': alignment === 'left',
            'image-right': alignment === 'right',
            'image-center': !alignment || alignment === 'none',
          },
        )}
      >
        <span className="image-imagewrapper">
          <img
            src={src}
            role="presentation"

          />
          {
            hovered ?
              this.renderAlignmentOptions()
              :
              undefined
          }
        </span>
      </span>
    );
  }
}
