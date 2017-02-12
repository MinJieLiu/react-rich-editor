import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Option from '../components/Option';
import left from '../../static/images/align-left.svg';
import center from '../../static/images/align-center.svg';
import right from '../../static/images/align-right.svg';

function findImageEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'IMAGE'
      );
    },
    callback,
  );
}

class Image extends Component {

  static propTypes = {
    contentState: PropTypes.object,
    entityKey: PropTypes.string,
  };

  state = {
    focused: false,
    alignment: 'none',
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
    const { contentState, entityKey } = this.props;
    contentState.mergeEntityData(
      entityKey,
      { alignment },
    );
    this.setState({
      alignment,
    });
  };

  handleFocus = (focused) => {
    this.setState({
      focused,
    });
  };

  renderAlignmentOptions() {
    return (
      <div
        className="image-decorator-options-popup"
      >
        <Option
          onClick={this.setEntityAlignmentLeft}
          className="image-decorator-option"
        >
          <img
            src={left}
            role="presentation"
          />
        </Option>
        <Option
          onClick={this.setEntityAlignmentCenter}
          className="image-decorator-option"
        >
          <img
            src={center}
            role="presentation"
          />
        </Option>
        <Option
          onClick={this.setEntityAlignmentRight}
          className="image-decorator-option"
        >
          <img
            src={right}
            role="presentation"
          />
        </Option>
      </div>
    );
  }

  render() {
    const {
      contentState,
      entityKey,
    } = this.props;
    const { focused } = this.state;
    const {
      src,
      width,
      height,
      alignment,
    } = contentState.getEntity(entityKey).getData();

    return (
      <span
        className={classNames(
          'image-decorator',
          {
            'image-left': alignment === 'left',
            'image-right': alignment === 'right',
            'image-center': !alignment || alignment === 'none',
          },
        )}
        onMouseEnter={() => {
          this.handleFocus(true);
        }}
        onMouseLeave={() => {
          this.handleFocus(false);
        }}
      >
        <span className="image-decorator-wrapper">
          <img
            src={src}
            role="presentation"
            className={classNames(
              'image-decorator-image', {
                'image-decorator-image-focus': focused,
              },
            )}
            width={width}
            height={height}
          />
          {
            focused
              ? this.renderAlignmentOptions()
              : undefined
          }
        </span>
      </span>
    );
  }
}

export default {
  strategy: findImageEntities,
  component: Image,
};
