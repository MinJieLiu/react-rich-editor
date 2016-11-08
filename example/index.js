/* @flow */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import {
  convertFromHTML,
  convertToRaw,
  ContentState,
} from 'draft-js';
import { Editor } from '../src';
import styles from './styles.css';

const contentBlocks = convertFromHTML('<p>Lorem ipsum ' +
  'dolor sit amet, consectetur adipiscing elit. Mauris tortor felis, volutpat sit amet ' +
  'maximus nec, tempus auctor diam. Nunc odio elit,  ' +
  'commodo quis dolor in, sagittis scelerisque nibh. ' +
  'Suspendisse consequat, sapien sit amet pulvinar  ' +
  'tristique, augue ante dapibus nulla, eget gravida ' +
  'turpis est sit amet nulla. Vestibulum lacinia mollis  ' +
  'accumsan. Vivamus porta cursus libero vitae mattis. ' +
  'In gravida bibendum orci, id faucibus felis molestie ac.  ' +
  'Etiam vel elit cursus, scelerisque dui quis, auctor risus.</p>');

const contentState = ContentState.createFromBlockArray(contentBlocks);

const rawContentState = convertToRaw(contentState);

class Playground extends Component {

  state: any = {
    editorContent: undefined,
  };

  onEditorChange: Function = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  imageUploadCallBack: Function = file => new Promise(
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
          Toolbar is alwasy <sup>visible</sup>
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
            className="playground-content no-focus"
            value={draftToHtml(editorContent)}
          />
          <textarea
            className="playground-content no-focus"
            value={draftToMarkdown(editorContent)}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Playground />, document.getElementById('app')); // eslint-disable-line no-undef
