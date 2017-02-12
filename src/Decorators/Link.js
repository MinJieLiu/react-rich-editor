import React, { PropTypes, Component } from 'react';
import openLink from '../../static/images/openlink.svg';

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback,
  );
}

class Link extends Component {

  static propTypes = {
    entityKey: PropTypes.string,
    contentState: PropTypes.object,
    children: PropTypes.array,
  };

  state = {
    showPopOver: false,
  };

  openLink = () => {
    const { entityKey, contentState } = this.props;
    const { url } = contentState.getEntity(entityKey).getData();
    const linkTab = window.open(url, 'blank'); // eslint-disable-line no-undef
    linkTab.focus();
  };

  toggleShowPopOver = () => {
    const showPopOver = !this.state.showPopOver;
    this.setState({
      showPopOver,
    });
  };

  render() {
    const { children } = this.props;
    const { showPopOver } = this.state;
    return (
      <span
        className="link-decorator-wrapper"
        onMouseEnter={this.toggleShowPopOver}
        onMouseLeave={this.toggleShowPopOver}
      >
        <span className="link-decorator-link">{children}</span>
        {showPopOver ?
          <img
            src={openLink}
            role="presentation"
            onClick={this.openLink}
            className="link-decorator-icon"
          />
          : undefined
        }
      </span>
    );
  }
}

export default {
  strategy: findLinkEntities,
  component: Link,
};
