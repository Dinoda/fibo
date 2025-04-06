import { Component } from 'fibo-browser';

import Form from './Form.js';

import './Content.scss';

export default class Content extends Component {
  constructor() {
    super('div');

    this.appendNewComponent('header', 'header');
    this.appendNewComponent('body', 'section', 'body');
    this.appendNewComponent('footer', 'footer');

    this.__header.appendNewComponent('brand', 'div', 'brand');

    this.__header.__brand.text = 'FiBo';

    const f = new Form('get', '/api/work/:id');
    f.addField('input', 'id', 'number');
    f.addSubmitButton();
    this.__body.appendNewComponent('select', f);
  }
}
