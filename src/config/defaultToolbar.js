import bold from '../../static/images/bold.svg';
import italic from '../../static/images/italic.svg';
import underline from '../../static/images/underline.svg';
import strikethrough from '../../static/images/strikethrough.svg';
import code from '../../static/images/code.svg';
import fontSize from '../../static/images/font-size.svg';
import indent from '../../static/images/indent.svg';
import outdent from '../../static/images/outdent.svg';
import ordered from '../../static/images/list-ordered.svg';
import unordered from '../../static/images/list-unordered.svg';
import left from '../../static/images/align-left.svg';
import center from '../../static/images/align-center.svg';
import right from '../../static/images/align-right.svg';
import justify from '../../static/images/align-justify.svg';
import color from '../../static/images/color.svg';
import eraser from '../../static/images/eraser.svg';
import link from '../../static/images/link.svg';
import unlink from '../../static/images/unlink.svg';
import emoji from '../../static/images/emoji.svg';
import image from '../../static/images/image.svg';
import undo from '../../static/images/undo.svg';
import redo from '../../static/images/redo.svg';
import subscript from '../../static/images/subscript.svg';
import superscript from '../../static/images/superscript.svg';

/**
* This is default toolbar configuration,
* whatever user passes in toolbar property is deeply merged with this to over-ride defaults.
*/
export default {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'remove', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'],
    bold: { icon: bold, className: undefined },
    italic: { icon: italic, className: undefined },
    underline: { icon: underline, className: undefined },
    strikethrough: { icon: strikethrough, className: undefined },
    code: { icon: code, className: undefined },
    superscript: { icon: superscript, className: undefined },
    subscript: { icon: subscript, className: undefined },
  },
  blockType: { className: undefined },
  fontSize: { icon: fontSize, className: undefined },
  fontFamily: { className: undefined },
  list: {
    inDropdown: false,
    className: undefined,
    options: ['unordered', 'ordered', 'indent', 'outdent'],
    unordered: { icon: unordered, className: undefined },
    ordered: { icon: ordered, className: undefined },
    indent: { icon: indent, className: undefined },
    outdent: { icon: outdent, className: undefined },
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    options: ['left', 'center', 'right', 'justify'],
    left: { icon: left, className: undefined },
    center: { icon: center, className: undefined },
    right: { icon: right, className: undefined },
    justify: { icon: justify, className: undefined },
  },
  colorPicker: { icon: color, className: undefined },
  link: {
    inDropdown: false,
    className: undefined,
    options: ['link', 'unlink'],
    link: { icon: link, className: undefined },
    unlink: { icon: unlink, className: undefined },
  },
  emoji: { icon: emoji, className: undefined },
  image: { icon: image, uploadCallback: undefined, className: undefined },
  remove: { icon: eraser, className: undefined },
  history: {
    inDropdown: false,
    className: undefined,
    options: ['undo', 'redo'],
    undo: { icon: undo, className: undefined },
    redo: { icon: redo, className: undefined },
  },
};
