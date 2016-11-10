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
  options: [
    'inline',
    'blockType',
    'fontSize',
    'fontFamily',
    'list',
    'textAlign',
    'colorPicker',
    'link',
    'emoji',
    'image',
    'remove',
    'history',
  ],
  inline: {
    inDropdown: false,
    className: '',
    options: ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'],
    bold: { icon: bold, className: '' },
    italic: { icon: italic, className: '' },
    underline: { icon: underline, className: '' },
    strikethrough: { icon: strikethrough, className: '' },
    code: { icon: code, className: '' },
    superscript: { icon: superscript, className: '' },
    subscript: { icon: subscript, className: '' },
  },
  blockType: { className: '' },
  fontSize: { icon: fontSize, className: '' },
  fontFamily: { className: '' },
  list: {
    inDropdown: false,
    className: '',
    options: ['unordered', 'ordered', 'indent', 'outdent'],
    unordered: { icon: unordered, className: '' },
    ordered: { icon: ordered, className: '' },
    indent: { icon: indent, className: '' },
    outdent: { icon: outdent, className: '' },
  },
  textAlign: {
    inDropdown: false,
    className: '',
    options: ['left', 'center', 'right', 'justify'],
    left: { icon: left, className: '' },
    center: { icon: center, className: '' },
    right: { icon: right, className: '' },
    justify: { icon: justify, className: '' },
  },
  colorPicker: { icon: color, className: '' },
  link: {
    inDropdown: false,
    className: '',
    options: ['link', 'unlink'],
    link: { icon: link, className: '' },
    unlink: { icon: unlink, className: '' },
  },
  emoji: { icon: emoji, className: '' },
  image: { icon: image, uploadCallback: '', className: '' },
  remove: { icon: eraser, className: '' },
  history: {
    inDropdown: false,
    className: '',
    options: ['undo', 'redo'],
    undo: { icon: undo, className: '' },
    redo: { icon: redo, className: '' },
  },
};
