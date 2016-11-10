import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import draftToHtml from 'draftjs-to-html';
// import draftToMarkdown from 'draftjs-to-markdown';
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
      xhr.open('POST', 'http://plan.v2.zhinanmao.com/common/uploadImg');
      const data = new FormData(); // eslint-disable-line no-undef
      data.append('file', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        const link = response.data.img_url + response.data.img_src;
        const data = {
          link,
        };
        resolve(data);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    }
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
                inline: {
                  inDropdown: true,
                },
                list: {
                  inDropdown: true,
                },
                textAlign: {
                  inDropdown: true,
                },
                link: {
                  inDropdown: true,
                },
                image: {
                  uploadCallback: this.imageUploadCallBack,
                },
                history: {
                  inDropdown: true,
                },
              }}
            />
          </div>
          <textarea
            className="playground-content"
            value={draftToHtml(editorContent)}
          />
          <textarea
            className="playground-content"
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Playground />, document.getElementById('app'));
