import { Component } from 'fibo-browser';

import './Content.scss';

export default class Content extends Component {
  constructor() {
    super('div');

    this.appendNewComponent('header', 'header');
    this.appendNewComponent('body', 'section', 'body');
    this.appendNewComponent('footer', 'footer');

    this.__header.appendNewComponent('brand', 'div', 'brand');

    this.__header.__brand.text = 'FiBo';
  }
}
