import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import draftToHtml from 'draftjs-to-html';
import {
  convertFromHTML,
  convertToRaw,
  ContentState,
} from 'draft-js';
import Editor from '../src';
import './styles.scss';

const contentBlocks = convertFromHTML(
  '<p>长忆西湖。尽日凭阑楼上望：三三两两钓鱼舟，岛屿正清秋。笛声依约芦花里，白鸟成行忽惊起。别来闲整钓鱼竿，思入水云寒。</p>',
);

const contentState = ContentState.createFromBlockArray(contentBlocks);

const rawContentState = convertToRaw(contentState);

class Playground extends Component {

  state = {
    editorContent: undefined,
  };

  onEditorChange = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  imageUploadCallBack = file => new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
      const data = new FormData(); // eslint-disable-line no-undef
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response.data);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    },
  );

  render() {
    const { editorContent } = this.state;
    return (
      <div className="playground-root">
        <div className="playground-label">
          React Rich Text Editor
        </div>
        <div className="playground-editorSection">
          <div className="playground-editorWrapper">
            <Editor
              toolbarClassName="playground-toolbar"
              wrapperClassName="playground-wrapper"
              editorClassName="playground-editor"
              onChange={this.onEditorChange}
              rawContentState={rawContentState}
              toolbar={{
                image: {
                  uploadCallback: this.imageUploadCallBack,
                },
              }}
            />
          </div>
          <textarea
            className="playground-content"
            value={draftToHtml(editorContent)}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Playground />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
